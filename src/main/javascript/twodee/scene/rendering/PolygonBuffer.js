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
    this.vertices = twodee.newArray();
    this.polygons = twodee.newArray();
    this.collidePolygons = twodee.newArray();
    this.elements = twodee.newArray();
    this.fpsCounter = new twodee.FpsCounter();
};

/** The frame ID. @prototype @type {Number} */
twodee.PolygonBuffer.prototype.frameId = 0;

/** The last gathered debug info. @private @type {String} */
twodee.PolygonBuffer.prototype.debugInfo = "";

/** The vertices in the buffer. @private @type {Array} */
twodee.PolygonBuffer.prototype.vertices = null;

/** The polygons in the buffer. @private @type {Array} */
twodee.PolygonBuffer.prototype.polygons = null;

/** The elements in the buffer. @private @type {Array} */
twodee.PolygonBuffer.prototype.elements = null;

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
    this.vertices.length = 0;
    this.polygons.length = 0;
    this.collidePolygons.length = 0;
    this.elements.length = 0;

    // Remember output size
    this.width = width;
    this.height = height;
};


/**
 * Adds an HTML element to the buffer.
 * 
 * @param {HTMLElement} element
 *            The element to add
 * @param {twodee.Matrix} transform
 *            The transformation matrix to use
 */

twodee.PolygonBuffer.prototype.addElement = function(element, transform)
{
    var s;
    
    s = element.style;
    s.left = Math.round(this.width / 2 - element.offsetWidth / 2) + "px";
    s.top = Math.round(this.height / 2 - element.offsetHeight / 2) + "px";
    transform.applyToElement(element);
    this.elements.push(element);
};


/**
 * Adds the specified model to the polygon buffer.
 * 
 * @param {twodee.RenderModel} model
 *            The model to add
 * @param {twodee.Matrix} transform
 *            The transformation matrix to use
 * @param {Boolean} collidable
 *            If model is collidable
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
 * @param {HTMLElement} container
 *            The container element for HTML element nodes
 */

twodee.PolygonBuffer.prototype.render = function(g, container)
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
        if (solid && vertexCount > 2)
        {
            g.fillStyle = polygon.getColor().toCSS();
            g.strokeStyle = polygon.getColor().toCSS();
            g.fill();
            if (this.renderOptions.outline)
            {
                g.strokeStyle = this.renderOptions.outlineColor || g.fillStyle;
                g.stroke();
            }
        }
        else
        {
            g.strokeStyle = polygon.getColor().toCSS();
            g.stroke();
        }        

        // Draw bounding boxes
        /*
        g.strokeStyle = "red";
        g.strokeRect(polygon.left, polygon.top, polygon.right - polygon.left, polygon.bottom - polygon.top);
        */

        // Update counters if needed
        if (debugInfo)
        {
            polygonCounter++;
            vertexCounter += vertexCount; 
        }
    }

    // Render HTML elements
    //if (container) this.renderElements(container);
    
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
                "\n  Polygon: " + twodee.Polygon.count() +
                "\n  Arrays: " + twodee.countArrays() +
                "\n  Maps: " + twodee.countObjects() +
                "\n\nPooled objectes:" +
                "\n  Matrix: " + twodee.Matrix.countPooled()
        }
    }

    // Restore the original transformation
    g.restore();

    // Increase the frame id
    this.frameId++;
};


/**
 * Renders the HTML elements.
 * 
 * @param {HTMLElement} container
 *            The container HTML element
 * @private
 */

twodee.PolygonBuffer.prototype.renderElements = function(container)
{
    var prevElement, element, i, max;
    
    // Draw HTML elements
    for (i = 0, max = this.elements.length; i < max; i++)
    {
        element = this.elements[i];
        if (element.parentNode != container)
            container.appendChild(element);
        element.frameId = this.frameId;
    }

    // Remove obsolete HTML elements
    element = container.lastChild;
    while (element)
    {
        prevElement = element.reviousSibling;
        if (element.frameId != this.frameId)
            container.removeChild(element);
        element = prevElement;
    }    
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
