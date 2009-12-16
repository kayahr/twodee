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
    this.buffer = new twodee.PolygonBuffer();
};

/** The root node of the scene. @private @type {twodee.SceneNode} */
twodee.Scene.prototype.rootNode = null;

/** The polygon buffer. @private @type {twodee.PolygonBuffer} */
twodee.Scene.prototype.buffer = null;

/** The last update timestamp. @private @type {Number} */
twodee.Scene.prototype.lastUpdate = 0;


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
    var now;
    
    if (!this.rootNode) return;

    if (delta === undefined)
    {
        now = new Date().getTime();
        delta = now - this.lastUpdate;
        this.lastUpdate = now;
        
        // If delta is too large then ignore this update
        if (delta > 10000) return;
    }
    
    // Update the root node
    this.rootNode.update(delta);  
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
 * @param {twodee.RenderOptions} renderOptions
 *            The render options
 * @param {twodee.CameraNode} camera
 *            The camera node to use. If it is null then a fixed unrotated
 *            default camera at position 0,0 is used
 */

twodee.Scene.prototype.render = function(g, width, height, renderOptions,
    camera)
{
    var rootTransform;
    
    // If no root node is set yet then do nothing
    if (!this.rootNode) return;

    // Calculate the root transformation
    rootTransform = this.rootNode.getTransform();
    if (camera)
    {
        rootTransform =
            camera.getTransform().copy().invert()
                .transform(rootTransform);
    }

    // Initialize the polygon buffer and recursively render the scene
    // nodes into it
    this.buffer.prepare(width, height);
    this.buffer.setRenderOptions(renderOptions);
    this.rootNode.render(this.buffer, rootTransform);

    // Render the polygon buffer onto the screen
    this.buffer.render(g);
};


/**
 * Returns debugging info. The debugInfo flag in the rendering options must
 * be set to true to get up-to-date debug info.
 * 
 * @return {String} The debug info
 */

twodee.Scene.prototype.getDebugInfo = function()
{
    return this.buffer.getDebugInfo();
};
