/**
 * Copyright (C) 2009-2011 Klaus Reimer <k@ailis.de>
 * See LICENSE.txt for licensing information.
 * 
 * @require twodee.js
 */

/**
 * Constructs a new scene.
 * 
 * @constructor
 * @class
 * A scene.
 */
twodee.Scene = function()
{
    this.collidables = [];
    this.baseTransform = new twodee.Matrix();
};

/** 
 * The root node of the scene. 
 * 
 * @private 
 * @type {twodee.SceneNode} */
twodee.Scene.prototype.rootNode = null;

/** 
 * The last update timestamp. 
 * 
 * @private 
 * @type {number}
 */
twodee.Scene.prototype.lastUpdate = 0;

/** 
 * Temporary array with collidables during rendering. 
 * 
 * @private 
 * @type {Array.<twodee.SceneNode>}
 */
twodee.Scene.prototype.collidables = null;

/** 
 * If scene is paused or not. 
 * 
 * @private 
 * @type {boolean}
 */
twodee.Scene.prototype.paused = false;

/**
 * The base transformation.
 * 
 * @private
 * @type {!twodee.Matrix}
 */
twodee.Scene.prototype.baseTransform;

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
 * @param {number} delta
 *            The time elapsed since the last call to this method measured
 *            in milliseconds. This is optional. If not specified
 *            then it is calculated automatically. If negative then the 
 *            absolute value is used as the maximum time delta. This means
 *            that a automatically calculated time delta which is larger then
 *            this maximum value is trimmed down to the maximum time delta.
 *            The default maximum value is 1000.
 */
twodee.Scene.prototype.update = function(delta)
{
    var now, node, maxDelta;
    
    if (this.paused || !(node = this.rootNode)) return;
    
    if (!delta || delta < 0)
    {
        if (delta < 0)
            maxDelta = -delta;
        else
            maxDelta = 1000;

        now = new Date().getTime();
        delta = Math.max(0, Math.min(maxDelta, now - this.lastUpdate));
        this.lastUpdate = now;
    }

    // Update the root node
    this.updateNode(node, delta);  
};

/**
 * Updates the specified node and its children (recursively).
 * 
 * @param {twodee.SceneNode} node
 *            The node to update
 * @param {number} delta
 *            The time elapsed since the last call to this method measured
 *            in milliseconds.
 * @private
 */
twodee.Scene.prototype.updateNode = function(node, delta)
{
    var child, next;
    
    node.update(delta);
    child = node.getFirstChild();
    while (child)
    {
        next = child.getNextSibling();
        this.updateNode(child, delta);
        child = next;
    }
};

/**
 * Renders the scene.
 * 
 * @param {CanvasRenderingContext2D} g
 *            The graphics context
 * @param {number} width
 *            The output width in pixels
 * @param {number} height
 *            The output height in pixels
 */
twodee.Scene.prototype.render = function(g, width, height)
{
    var node, i, collidables, baseTransform;
    
    // If no root node is set yet then do nothing
    if (!(node = this.rootNode)) return;
    
    // Prepare the canvas
    g.save();

    // Reset base transform to screen center
    this.baseTransform.setTranslate(width / 2, height / 2);
    
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
    var transform, child, i, other, collidables, next;
    
    // Do nothing if node is disabled
    if (!node.isEnabled()) return;
    
    // Update the effective transformation of the node
    transform = node.updateTransformation(this.baseTransform);
    
    // Update collision state
    if (node.isCollidable())
    {
        collidables = this.collidables;
        for (i = collidables.length - 1; i >= 0; i--)
        {
            other = collidables[i];
            
            if (node.collidesWith(other))
                node.collide(other);
            
            if (other.collidesWith(node))
                other.collide(node);
        }
        collidables.push(node);
    }
    
    // Remember current context configuration
    g.save();
    
    // Calculate the global alpha for this node and its child nodes
    g.globalAlpha = g.globalAlpha * node.getOpacity();
    
    // Render the node itself
    node.render(g, transform);
    
    // Process all the child nodes (recursively)
    child = node.getFirstChild();
    while (child)
    {
        next = child.getNextSibling();
        this.renderNode(child, g);
        child = next;
    }
    
    // Restore old context configuration
    g.restore();
};

/**
 * Pause the scene. No more updates are done, but rendering continues.
 */
twodee.Scene.prototype.pause = function()
{
    this.paused = true;
    this.lastUpdate = 0;
};

/**
 * Resumes the scene.
 */
twodee.Scene.prototype.resume = function()
{
    this.paused = false;
};
