/**
 * $Id$
 * Copyright (C) 2009 Klaus Reimer <k@ailis.de>
 * See LICENSE.txt for licensing information
 */


/**
 * @constructor
 * Constructs a new polygon buffer.
 *            
 * @class
 * A polygon buffer
 */

twodee.PolygonBuffer = function()
{
    this.vertices = [];
    this.polygons = [];
    this.collidePolygons = [];
    this.fpsCounter = new twodee.FpsCounter();
};

/** The last gathered debug info. @private @type {String} */
twodee.PolygonBuffer.prototype.debugInfo = "";

/** The vertices in the buffer. @private @type {Array} */
twodee.PolygonBuffer.prototype.vertices = null;

/** The polygons in the buffer. @private @type {Array} */
twodee.PolygonBuffer.prototype.polygons = null;

/** The polygons which can collide. @private @type {Array} */
twodee.PolygonBuffer.prototype.collidePolygons = null;

/** The screen width. @private @type {Number} */
twodee.PolygonBuffer.prototype.width = 0;

/** The screen height. @private @type {Number} */
twodee.PolygonBuffer.prototype.height = 0;

/** The FPS counter. @private @type {twodee.FpsCounter} */
twodee.PolygonBuffer.prototype.fpsCounter = null;


/**
 * Sets the render options.
 * 
 * @param {twodee.RenderOptions} renderOptions
 *            The render options to set
 */

twodee.PolygonBuffer.prototype.setRenderOptions = function(renderOptions)
{
    this.renderOptions = renderOptions;
};


/**
 * Prepares the polygon buffer for the next use.
 * 
 * @param width
 *            The output width in pixels
 * @param height
 *            The output height in pixels
 */

twodee.PolygonBuffer.prototype.prepare = function(width, height)
{
    // Reset the buffer
    this.vertices = [];
    this.polygons = [];
    this.collidePolygons = [];

    // Remember output size
    this.width = width;
    this.height = height;
};


/**
 * Adds the specified model to the polygon buffer.
 * 
 * @param {twodee.RenderModel} model
 *            The model to add
 * @param {twodee.Matrix} transform
 *            The transformation matrix to use
 */

twodee.PolygonBuffer.prototype.addModel = function(model, transform, collidable)
{
    var i, max, polygon, j, jmax;
    
    // Transform the vertices of the model
    model.transform(transform);
    
    // Create the transformed polygons and add them to the buffer
    for (i = 0, max = model.countPolygons(); i < max; i++)
    {
        polygon = model.getPolygon(i);
        
        polygon.init();

        // Check for collisions
        if (collidable)
        {
            polygon.initCollisions();
            for (j = 0, jmax = this.collidePolygons.length; j < jmax; j++)
            {
                other = this.collidePolygons[j];
                
                if (polygon.collidesWith(other))
                {
                    polygon.collide(other);
                    other.collide(polygon);
                }
            }
            this.collidePolygons.push(polygon);
        }
        
        // Add the polygon to the buffer
        this.polygons.push(polygon);        
    }
};


/**
 * Renders the polygon buffer.
 * 
 * @param {CanvasRenderingContext2D} g
 *            The graphics context
 */

twodee.PolygonBuffer.prototype.render = function(g)
{
    var x, y, i, max, vertexCount, polygon, v, vertex,
        solid, debugInfo, fpsInfo, polygonCounter, vertexCounter;

    // Pull render options in local variables
    solid = this.renderOptions.solid;
    debugInfo = this.renderOptions.debugInfo;
    fpsInfo = this.renderOptions.fpsInfo;
    
    // Initialize counters if needed
    polygonCounter = 0;
    vertexCounter = 0;
    
    // Remember the old transformation and then apply the screen center
    // transformation
    g.save();
    g.translate(this.width / 2, this.height / 2);

    // Set the default stroke color
    g.strokeStyle = "#fff";
    
    // Finish collision detection
    for (i = 0, max = this.collidePolygons.length; i < max; i++)
        this.collidePolygons[i].doneCollisions();

    // Draw the polygons
    for (i = 0, max = this.polygons.length; i < max; i++)
    {
        polygon = this.polygons[i];
        
        // Render the path
        vertexCount = polygon.countVertices();
        g.beginPath();
        for (v = 0; v < vertexCount; v++)
        {
            vertex = polygon.getVertex(v);

            x = vertex.x;
            y = vertex.y;

            if (v)
                g.lineTo(x, y);
            else
                g.moveTo(x, y);
        }
        g.closePath();

        // Set fill or stroke color (Depends on if solid polygons are rendered)
        if (solid)
        {
            g.fillStyle = polygon.getColor().toCSS();
            g.fill();
            if (this.renderOptions.outline)
            {
                g.strokeStyle = this.renderOptions.outlineColor || g.fillStyle;
                g.stroke();
            }
        }
        else
        {
            g.stroke();
        }        
        
        // Update counters if needed
        if (debugInfo)
        {
            polygonCounter++;
            vertexCounter += vertexCount; 
        }
    }
    
    // Gather debugging info if requested
    if (fpsInfo || debugInfo)
    {
        if (fpsInfo)
        {
            this.fpsCounter.frame();
            this.debugInfo = "Frames/s: " + this.fpsCounter.getFps();
            if (debugInfo) this.debugInfo += "\n\n";
        }
        else this.debugInfo = "";
        
        if (debugInfo)
        {
            this.debugInfo += "Vertices: " + vertexCounter +
                "\nPolygons: " + polygonCounter +
                "\n\nNew objects for this frame:" +
                "\n  Vector: " + twodee.Vector.count() +
                "\n  Matrix: " + twodee.Matrix.count() +
                "\n  Color: " + twodee.Color.count() +
                "\n  Polygon: " + twodee.Polygon.count();
        }
    }

    // Restore the original transformation
    g.restore();
};


/**
 * Returns debugging info. The debugInfo flag in the rendering options must
 * be set to true to get up-to-date debug info.
 * 
 * @return {String} The debug info
 */

twodee.PolygonBuffer.prototype.getDebugInfo = function()
{
    return this.debugInfo;
};
