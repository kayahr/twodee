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

twodee.TextNode = function(text, font, fontSize)
{
    var e, s;
    
    twodee.SceneNode.call(this);
    this.text = text;
    if (font) this.font = font;
    if (fontSize) this.fontSize = fontSize;
    e = this.element = document.createElement("div");
    e.innerHTML = text;
    s = e.style;
    s.color = "#fff";
    s.position = "absolute";
    s.font = this.font;    
};
twodee.inherit(twodee.TextNode, twodee.SceneNode);

/** The HTML element. @private @type {HTMLElement} */
twodee.TextNode.prototype.element = null;

/** The text. @private @type {String} */
twodee.TextNode.prototype.text = "";

/** The font (CSS definition without size.) @private @type {String} */
twodee.TextNode.prototype.font = "Arial";

/** The font size in coordinate system unit. @private @type {Number} */
twodee.TextNode.prototype.fontSize = 12;


/**
 * @see twodee.SceneNode#render
 * 
 * @param {twodee.PolygonBuffer} buffer
 *            The polygon buffer
 * @param {twodee.Matrix} transform
 *            The transformation matrix
 */

twodee.TextNode.prototype.render = function(buffer, transform)
{
    buffer.addElement(this.element, transform);
    twodee.SceneNode.prototype.render.call(this, buffer, transform);
};
