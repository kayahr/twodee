/**
 * $Id$
 * Copyright (C) 2009 Klaus Reimer <k@ailis.de>
 * See LICENSE.txt for licensing information
 */


/**
 * Constructs a new render model.
 * 
 * @param {twodee.Model} model
 *            The original model
 *            
 * @constructor
 * @class A render model is a wrapper around a model which is used internally
 * for rendering the model. It is responsible for transforming the vertices
 * of the model (and caching them) and it also wraps the polygons of the
 * model with RenderPolygon objects.
 */

twodee.RenderModel = function(model)
{
    var i, max;
    
    this.model = model;
    
    this.vertices = [];
    for (i = 0, max = this.model.countVertices(); i < max; i++)
        this.vertices.push(this.model.getVertex(i).copy());
    
    this.polygons = [];
    for (i = 0, max = this.model.countPolygons();  i < max; i++)
        this.polygons.push(new twodee.RenderPolygon(model, this.model.getPolygon(i),
            this.vertices));
};

/** The vertices. @private @type {Array} */
twodee.RenderModel.prototype.vertices = null;

/** The polygons. @private @type {Array} */
twodee.RenderModel.prototype.polygons = null;

/** The model. @private @type {twodee.Model} */
twodee.RenderModel.prototype.model = null;


/**
 * Transforms this node model.
 * 
 * @param {twodee.Matrix} transform 
 *            The transformation matrix
 */

twodee.RenderModel.prototype.transform = function(transform)
{
    var i, max;
    
    // Transform the vertices
    for (i = 0, max = this.vertices.length; i < max; i++)
        this.model.getVertex(i).copy(this.vertices[i]).transform(transform);
};


/**
 * Returns the number of polygons.
 * 
 * @return {Number} The number of polygons
 */

twodee.RenderModel.prototype.countPolygons = function()
{
    return this.polygons.length;
};


/**
 * Returns the polygon with the specified index.
 *
 * @param {Number} index
 *            The polygon index
 * @return {twodee.RenderPolygon} The polygon
 */

twodee.RenderModel.prototype.getPolygon = function(index)
{
    return this.polygons[index];
};
