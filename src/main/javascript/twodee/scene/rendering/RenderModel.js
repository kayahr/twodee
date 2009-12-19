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
 * @param {twodee.ModelNode} node
 *            The scene node
 *            
 * @constructor
 * @class A render model is a wrapper around a model which is used internally
 * for rendering the model. It is responsible for transforming the vertices
 * of the model (and caching them) and it also wraps the polygons of the
 * model with RenderPolygon objects.
 */

twodee.RenderModel = function(model, node)
{
    var i, max;
    
    this.model = model;
    this.node = node;
    
    this.vertices = [];
    for (i = 0, max = this.model.countVertices(); i < max; i++)
        this.vertices.push(this.model.getVertex(i).copy());
    
    this.polygons = [];
    for (i = 0, max = this.model.countPolygons();  i < max; i++)
        this.polygons.push(new twodee.RenderPolygon(this, this.model.getPolygon(i),
            this.vertices));
    
    this.collisions = {};

    this.id = this.constructor.counter++;    
};

/** Instance counter. @private @type {Number} */
twodee.RenderModel.counter = 0; 

/** The node polygon ID. @private @type {Number} */
twodee.RenderModel.prototype.id = 0;

/** The vertices. @private @type {Array} */
twodee.RenderModel.prototype.vertices = null;

/** The polygons. @private @type {Array} */
twodee.RenderModel.prototype.polygons = null;

/** The model. @private @type {twodee.Model} */
twodee.RenderModel.prototype.model = null;

/** The connected node. @private @type {twodee.SceneNode} */
twodee.RenderModel.prototype.node = null;

/** The collision map. @private @type {Object} */
twodee.RenderModel.prototype.collisions = null;


/**
 * Returns the node id.
 * 
 * @return {Number} The node id
 */

twodee.RenderModel.prototype.getId = function()
{
    return this.id;
};


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


/**
 * Informs the model that some polygon of this model has started colliding
 * with a polygon of some other model.
 * 
 * @param {twodee.Polygon} myPolygon
 *            My polygon which stopped colliding 
 * @param {twodee.Polygon} otherPolygon
 *            The other polygon 
 */

twodee.RenderModel.prototype.startCollide = function(myPolygon, otherPolygon)
{
    var id, other;
    
    other = otherPolygon.getModel();
    id = other.getId();
    if (!(id in this.collisions))
    {
        this.collisions[id] = 1;
        this.node.sendSignal("startCollide", other.node);
    }
    else this.collisions[id]++;
};


/**
 * Informs the model that some polygon of this model has stopped colliding
 * with a polygon of some other model.
 * 
 * @param {twodee.Polygon} myPolygon
 *            My polygon which stopped colliding 
 * @param {twodee.Polygon} otherPolygon
 *            The other polygon 
 */

twodee.RenderModel.prototype.stopCollide = function(myPolygon, otherPolygon)
{
    var id, count, other;
    
    other = otherPolygon.getModel();
    id = other.getId();
    count = --this.collisions[id];
    if (!count)
    {
        delete this.collisions[id];
        this.node.sendSignal("stopCollide", other.node);
    }
};
