/**
 * $Id$
 * Copyright (C) 2009 Klaus Reimer <k@ailis.de>
 * See LICENSE.txt for licensing information
 */


/**
 * Constructs a new model with the specified vertices and polygons.
 * 
 * @param {Array} vertices
 *            The model vertices
 * @param {Array} polygons
 *            The model polygons
 * @param {twodee.Color} color
 *            Optional color.
 *            
 * @constructor
 * @class The base class for all models.
 */

twodee.Model = function(vertices, polygons, color)
{
    this.vertices = vertices;
    this.polygons = polygons;
    if (color) this.color = color;
};

/** The vertices. @private @type {Array} */
twodee.Model.prototype.vertices = null;

/** The polygons. @private @type {Array} */
twodee.Model.prototype.polygons = null;

/** The color. @private @type {twodee.Color} */
twodee.Model.prototype.color = twodee.Color.GRAY;


/**
 * Returns the number of vertices used in this model.
 * 
 * @return {Number} The number of vertices used in this model
 */

twodee.Model.prototype.countVertices = function()
{
    return this.vertices.length;
};


/**
 * Returns the vertex with the specified index.
 * 
 * @param {Number} index
 *            The index
 * @return {Number}
 *            The vertex
 */

twodee.Model.prototype.getVertex = function(index)
{
    return this.vertices[index];
};


/**
 * Returns the number of polygons used in this model.
 * 
 * @return {Number} The number of polygons used in this model
 */

twodee.Model.prototype.countPolygons = function()
{
    return this.polygons.length;
};


/**
 * Returns the polygon with the specified index.
 * 
 * @param {Number} index
 *            The index
 * @return {Number} The polygon
 */

twodee.Model.prototype.getPolygon = function(index)
{
    return this.polygons[index];
};


/**
 * Returns the color of the model.
 * 
 * @return {twodee.Color}
 *            The color of the model. Never null.
 */

twodee.Model.prototype.getColor = function()
{
    return this.color;
};


/**
 * Converts the model into a JSON object with keys 'm', 'v' and 'p'.
 * 
 * @return {Object} The model as a JSON object
 */

twodee.Model.prototype.toJSON = function()
{
    var data, vertices, polygons, i, max;
    
    vertices = [];
    for (i = 0, max = this.vertices.length; i < max; i++)
        vertices.push(this.vertices[i].toJSON());
    polygons = [];
    for (i = 0, max = this.polygons.length; i < max; i++)
        polygons.push(this.polygons[i].toJSON());
    
    data = { "v": vertices, "p": polygons };
    if (this.color) data.c = this.color.toJSON();
    return data;
};


/**
 * Creates a new model instance with the data read from the
 * specified JSON object (with keys 'm' (Global model color), 'v' (Vertices)
 * and 'p' (Polygons)). Returns null if data
 * was empty.
 * 
 * @param {Object} data
 *            The model as JSON object
 * @return {twodee.Model} The model object or null if data was empty
 */

twodee.Model.fromJSON = function(data)
{
    var color, i, max, vertices;
    
    // Parse polygons
    polygons = [];
    for (i = 0, max = data.p.length; i < max; i++)
        polygons.push(twodee.Polygon.fromJSON(data.p[i]));

    // Parse vertexes
    vertices = [];
    for (i = 0, max = data.v.length; i < max; i++)
        vertices.push(twodee.Vector.fromJSON(data.v[i]));
    
    // Parse model color
    color = twodee.Color.fromJSON(data.c);

    // Construct the model
    return new twodee.Model(vertices, polygons, color);
};