/**
 * $Id$
 * Copyright (C) 2009 Klaus Reimer <k@ailis.de>
 * See LICENSE.txt for licensing information
 */


/**
 * Constructs a new render polygon.
 *
 * @param {twodee.Model} model
 *             The original model this polygon is connected to
 * @param {twodee.Polygon} polygon
 *             The original polygon
 * @param {Array} vertices
 *             The vertices array
 *             
 * @constructor
 * @class A render polygon is a wrapper around a polygon for internal usage
 * while rendering. 
 */

twodee.RenderPolygon = function(model, polygon, vertices)
{
    var i, max;
    
    this.model = model;
    this.color = polygon.getColor();
    this.vertices = [];
    this.size = polygon.countVertices();
    this.origSize = this.size;
    for (i = 0, max = this.size; i < max; i++)
        this.vertices.push(vertices[polygon.getVertex(i)]);
    
    this.polygon = [];
    this.prevPolygon = [];
};

/** Speed-optimization vector cache. @private @type {twodee.Vector} */
twodee.RenderPolygon.V1 = new twodee.Vector();

/** Speed-optimization vector cache. @private @type {twodee.Vector} */
twodee.RenderPolygon.V2 = new twodee.Vector();

/** The array with the used vertices. @private @type {Array} */
twodee.RenderPolygon.prototype.vertices = null;

/** The current number of used vertices. @private @type {Number} */
twodee.RenderPolygon.prototype.size = 0;

/** The original number of vertices. @private @type {Number} */
twodee.RenderPolygon.prototype.origSize = 0;

/** The extra vectors added to the original ones. @private @type {Number} */
twodee.RenderPolygon.prototype.extras = 0;

/** The vertex indices that forms the polygon. @private @type {Array} */
twodee.RenderPolygon.prototype.polygon = null;

/** The previous vertex indices that forms the polygon. @private @type {Array} */
twodee.RenderPolygon.prototype.prevPolygon = null;

/** The normal vector cache. @private @type {twodee.Vector} */
twodee.RenderPolygon.prototype.normal = null;

/** The center vector cache. @private @type {twodee.Vector} */
twodee.RenderPolygon.prototype.center = null;

/** The referenced vertices. @private @type {Array} */
twodee.RenderPolygon.prototype.vertices = null;

/** The polygon color. @private @type {twodee.Color } */
twodee.RenderPolygon.prototype.color = null;

/** The model this polygon is connected to. @private @type {twodee.Model} */
twodee.RenderPolygon.prototype.model = null;


/**
 * Initializes the polygon for the next rendering. This simply resets the
 * vertex indices to the original order and resets the counter of extra
 * vertices.
 */

twodee.RenderPolygon.prototype.init = function()
{
    var i;
    
    this.size = this.origSize;
    for (i = this.size - 1; i >= 0; i--) this.polygon[i] = i;
    this.extras = 0;
};


/**
 * Returns the number of used vertices.
 * 
 * @return {NUmber} The number of used vertices
 */

twodee.RenderPolygon.prototype.countVertices = function()
{
    return this.size;
};


/**
 * Returns the vertex with the specified index.
 * 
 * @param {Number} index
 *            The vertex index
 * @return {twodee.Vector} The vertex
 */

twodee.RenderPolygon.prototype.getVertex = function(index)
{
    return this.vertices[this.polygon[index]];
};


/**
 * Returns the center of the polygon.
 * 
 * Speed-optimization: The calculated center vector is cached in an instance
 * scope variable to prevent creation of vector objects on reach frame render.
 * WARNING: If you want to use the returned center vector for a longer time
 * (and not only for a single frame) then you should copy the vector because
 * otherwise the content may change when the polygon changes.
 * 
 * @return {twodee.Vector} The center of the polygon
 */

twodee.RenderPolygon.prototype.getCenter = function()
{
    var vertexCount, ax, ay, i, v;
    
    vertexCount = this.size;
    ax = 0;
    ay = 0;

    for (i = 0; i < vertexCount; i++)
    {
        v = this.vertices[this.polygon[i]];
        ax += v.x;
        ay += v.y;
    }
    ax /= vertexCount;
    ay /= vertexCount;

    if (!this.center) this.center = new twodee.Vector();
    return this.center.set(ax, ay);
};


/**
 * Returns the polygon color. If it has a specific color then this one
 * is returned. Otherwise the global model color is returned.
 * 
 * @return {twodee.Color} The color to be used for this polygon
 */

twodee.RenderPolygon.prototype.getColor = function()
{
    if (this.color) return this.color;
    return this.model.getColor();
};
