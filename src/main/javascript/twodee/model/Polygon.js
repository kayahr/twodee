/**
 * $Id$
 * Copyright (C) 2009 Klaus Reimer <k@ailis.de>
 * See LICENSE.txt for licensing information
 */


/**
 * @constructor
 * Constructs a new polygon
 * 
 * @param {Array} vertices
 *            The referenced vertices
 * @param {twodee.Color} color
 *            Optional polygon-specific color. If not set then the polygon
 *            uses the color of the model.
 *            
 * @class
 * A polygon
 */

twodee.Polygon = function(vertices, color)
{
    this.vertices = vertices;
    if (color) this.color = color;
    this.constructor.counter++;
};

/** Instance counter. @private @type {Number} */
twodee.Polygon.counter = 0; 

/** The color used by this polygon. @private @type {twodee.Color} */
twodee.Polygon.prototype.color = null;


/**
 * Returns and resets the current instance counter.
 * 
 * @return {Number} The number of created instances since the last call
 */

twodee.Polygon.count = function()
{
    var value = this.counter;
    this.counter = 0;
    return value;
};


/**
 * Returns the number of referenced vertices.
 * 
 * @return {Number} The number of references vertices
 */

twodee.Polygon.prototype.countVertices = function()
{
    return this.vertices.length;
};


/**
 * Returns the vertex with the specified index.
 * 
 * @param {Number} index
 *            The index
 * @return {Number} The vertex
 */

twodee.Polygon.prototype.getVertex = function(index)
{
    return this.vertices[index];
};


/**
 * Returns the color. Returns null if this polygon is not using a
 * polygon-specific color and uses the one of the model instead.
 * 
 * @return {twodee.Color} The color
 */

twodee.Polygon.prototype.getColor = function()
{
    return this.color;
};


/**
 * Sets the color. Set it to null to remove the polygon-specific
 * color. The model color is used then.
 * 
 * @param {twodee.Color} color
 *            The color to set
 */

twodee.Polygon.prototype.setColor = function(color)
{
    this.color = color;
};


/**
 * Converts the polygon into a JSON object with keys 'v' (Array with vertex
 * indices) and optionally 'm' (The polygon-specific color).
 * 
 * @return {Object} The polygon as a JSON object
 */

twodee.Polygon.prototype.toJSON = function()
{
    var data;
    
    data = { "v": this.vertices };
    if (this.color) data.c = this.color.toJSON();
    return data;
};


/**
 * Creates a new polygon instance with the data read from the
 * specified JSON object (with keys 'v' and 'm'). Returns null if data
 * was empty.
 * 
 * @param {Object} data
 *            The polygon as JSON object
 * @return {twodee.Polygon} The polygon object or null if data was empty
 */

twodee.Polygon.fromJSON = function(data)
{
    if (!data) return null;
    return new twodee.Polygon(data.v, twodee.Color.fromJSON(data.c));
};
