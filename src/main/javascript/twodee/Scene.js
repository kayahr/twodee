/**
 * $Id$
 * Copyright (C) 2009 Klaus Reimer <k@ailis.de>
 * See LICENSE.txt for licensing information
 */


/**
 * @constructor
 * Constructs a new scene.
 *            
 * @class
 * A scene
 */

twodee.Scene = function()
{
    this.collidables = [];
};

/** The root node of the scene. @private @type {twodee.SceneNode} */
twodee.Scene.prototype.rootNode = null;

/** The last update timestamp. @private @type {Number} */
twodee.Scene.prototype.lastUpdate = 0;

/** Temporary array with collidables during rendering. @private @type {Array} */
twodee.Scene.prototype.collidables = null;


/**
 * Sets the root node.
 * 
 * @param {twodee.SceneNode} rootNode
 *            The root node to set
 */

twodee.Scene.prototype.setRootNode = function(rootNode)
{
    this.rootNode = rootNode;
};


/**
 * Returns the current root node.
 * 
 * @return {twodee.SceneNode}
 *            The current root node
 */

twodee.Scene.prototype.getRootNode = function()
{
    return this.rootNode;
};


/**
 * Updates the scene with the specified time delta (milliseconds);
 * 
 * @param {Number} delta
 *            The time elapsed since the last call to this method measured
 *            in milliseconds. This is optional. If not specified then
 *            it is calculated automatically
 */

twodee.Scene.prototype.update = function(delta)
{
    var now, node;
    
    if (!(node = this.rootNode)) return;

    if (delta === undefined)
    {
        now = new Date().getTime();
        delta = now - this.lastUpdate;
        this.lastUpdate = now;
        
        // If delta is too large then ignore this update
        if (delta > 10000) return;
    }
    
    // Update the root node
    this.updateNode(node, delta);  
};


/**
 * Updates the specified node and its children (recursively).
 * 
 * @param {twodee.SceneNode} node
 *            The node to update
 * @param {Number} delta
 *            The time elapsed since the last call to this method measured
 *            in milliseconds.
 * @private
 */

twodee.Scene.prototype.updateNode = function(node, delta)
{
    var child;
    
    node.update(delta);
    child = node.getFirstChild();
    while (child)
    {
        this.updateNode(child, delta);
        child = child.getNextSibling();
    }
};


/**
 * Renders the scene.
 * 
 * @param {CanvasRenderingContext2D} g
 *            The graphics context
 * @param {Number} width
 *            The output width in pixels
 * @param {Number} height
 *            The output height in pixels
 */

twodee.Scene.prototype.render = function(g, width, height)
{
    var node, i, collidables;
    
    // If no root node is set yet then do nothing
    if (!(node = this.rootNode)) return;
    
    // Prepare the canvas
    g.save();
    g.translate(width / 2, height / 2);
    
    // Render the root node
    this.renderNode(node, g);

    // Restore the canvas
    g.restore();

    // Finish collision detection
    collidables = this.collidables;
    for (i = collidables.length - 1; i >= 0; i--)
        collidables[i].processCollisions();
    collidables.length = 0;
};


/**
 * Renders the specified node and its children (recursively).
 * 
 * @param {twodee.SceneNode} node
 *            The node to render
 * @param {CanvasRenderingContext2D} g
 *            The graphics context
 * @private
 */

twodee.Scene.prototype.renderNode = function(node, g)
{
    var transform, child, i, other, collidables;
    
    // Update the effective transformation of the node
    transform = node.updateTransformation();
    
    // Update collision state
    if (node.isCollidable())
    {
        collidables = this.collidables;
        for (i = collidables.length - 1; i >= 0; i--)
        {
            other = collidables[i];
            if (node.collidesWith(other))
            {
                node.collide(other);
                other.collide(node);
            }
        }
        collidables.push(node);
    }
    
    // Render the node
    node.render(g, transform);
    
    // Process all the child nodes (recursively)
    child = node.getFirstChild();
    while (child)
    {
        this.renderNode(child, g);
        child = child.getNextSibling();
    }
};
