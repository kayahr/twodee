/**
 * $Id$
 * Copyright (C) 2009 Klaus Reimer <k@ailis.de>
 * See LICENSE.txt for licensing information
 */


/**
 * @constructor
 * Constructs a new model node.
 * 
 * @param {String} text
 *            The text
 * @param {String} font
 *            Optional font (CSS definition)
 * @param {String} color
 *            Optional color (CSS definition)
 *            
 * @class
 * @extends twodee.SceneNode
 * A node which draws a model.
 */

twodee.TextNode = function(text, font, color)
{
    var e, s;
    
    twodee.SceneNode.call(this);
    this.text = text;
    if (font) this.font = font;
    if (color) this.fontSize = color;
    e = this.element = document.createElement("div");
    e.innerHTML = text;
    s = e.style;
    s.position = "absolute";
    s.font = this.font;
    s.color = this.color;
    s.fontSize = this.size + "px";
};
twodee.inherit(twodee.TextNode, twodee.SceneNode);

/** The HTML element. @private @type {HTMLElement} */
twodee.TextNode.prototype.element = null;

/** The text. @private @type {String} */
twodee.TextNode.prototype.text = "";

/** The font (CSS definition without size.) @private @type {String} */
twodee.TextNode.prototype.font = "20pt Arial";

/** The text color. @private @type {String} */
twodee.TextNode.prototype.color = "#ccc";


/**
 * Sets the text.
 * 
 * @param {String} text
 *            The text to set
 */

twodee.TextNode.prototype.setText = function(text)
{
    if (text != this.text)
    {
        this.element.innerHTML = text;
        this.text = text;
    }
};


/**
 * Returns the text.
 * 
 * @return {String} The text
 */

twodee.TextNode.prototype.getText = function()
{
    return this.text;
};


/**
 * Sets the text (CSS definition)
 * 
 * @param {String} font
 *            The font to set
 */

twodee.TextNode.prototype.setFont = function(font)
{
    if (font != this.font)
    {
        this.element.style.font = font;
        this.font = font;
    }
};


/**
 * Returns the font (CSS definition).
 * 
 * @return {String} The font
 */

twodee.TextNode.prototype.getFont = function()
{
    return this.font;
};


/**
 * Sets the color (CSS definition).
 * 
 * @param {String} color
 *            The color to set
 */

twodee.TextNode.prototype.setColor  = function(color)
{
    if (color != this.color)
    {
        this.element.style.color = color;
        this.color = color;
    }
};


/**
 * Returns the color (CSS definition).
 * 
 * @return {String} The color
 */

twodee.TextNode.prototype.getColor = function()
{
    return this.color;
};

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
