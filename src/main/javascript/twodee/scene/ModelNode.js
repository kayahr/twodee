/**
 * $Id$
 * Copyright (C) 2009 Klaus Reimer <k@ailis.de>
 * See LICENSE.txt for licensing information
 */


/**
 * @constructor
 * Constructs a new model node.
 * 
 * @param {twodee.Model} model
 *            The model
 *            
 * @class
 * @extends twodee.SceneNode
 * A node which draws a model.
 */

twodee.ModelNode = function(model)
{
    twodee.SceneNode.call(this);
    this.model = new twodee.RenderModel(model);
};
twodee.inherit(twodee.ModelNode, twodee.SceneNode);

/** The model. @private @type {twodee.RenderModel} */
twodee.ModelNode.prototype.model = null;


/**
 * @see twodee.SceneNode#render
 * 
 * @param {twodee.PolygonBuffer} buffer
 *            The polygon buffer
 * @param {twodee.Matrix} transform
 *            The transformation matrix
 */

twodee.ModelNode.prototype.render = function(buffer, transform)
{
    buffer.addModel(this.model, transform);
    twodee.SceneNode.prototype.render.call(this, buffer, transform);
};
