/**
 * $Id$
 * Copyright (C) 2009 Klaus Reimer <k@ailis.de>
 * See LICENSE.txt for licensing information
 */


/**
 * Constructs a new polygon node.
 * 
 * @param {twodee.Polygon} polygon
 *            Optional polygon. If not set then it must be set with the
 *            setPolygon() method.
 * @param {twodee.Color} fillColor
 *            Optional fill color. null means no filling. Default is a white
 *            color.
 * @param {twodee.Color} strokeColor
 *            Optional stroke color. null means no stroking and this is the
 *            default.            
 *            
 * @constructor
 * @extends twodee.SceneNode
 * @class A node which draws a polygon.
 */

twodee.PolygonNode = function(polygon, fillColor, strokeColor)
{
    twodee.SceneNode.call(this);
    if (polygon) this.setPolygon(polygon);
    if (fillColor !== undefined) this.fillColor = fillColor;
    if (strokeColor !== undefined) this.strokeColor = strokeColor;
};
twodee.inherit(twodee.PolygonNode, twodee.SceneNode);

/** The polygon. @private @type {twodee.Polygon} */
twodee.PolygonNode.prototype.polygon = null;

/** The fill color. @private @type {twodee.Color} */
twodee.PolygonNode.prototype.fillColor = twodee.Color.WHITE;

/** The stroke color. @private @type {twodee.Color} */
twodee.PolygonNode.prototype.strokeColor = null;


/**
 * Sets the polygon.
 * 
 * @param {twodee.Polygon} polygon
 *            The polygon to set
 */

twodee.PolygonNode.prototype.setPolygon = function(polygon)
{
    this.setBounds(this.polygon = polygon.copy());
};


/**
 * Returns the polygon.
 * 
 * @return {twodee.Polygon} The polygon
 */

twodee.PolygonNode.prototype.getPolygon = function()
{
    return this.polygon;
};


/**
 * Sets the fill color. null means no filling.
 * 
 * @param {twodee.Color} fillColor
 *            The fill color
 */

twodee.PolygonNode.prototype.setFillColor = function(fillColor)
{
    this.fillColor = fillColor;
};


/**
 * Returns the fill color.
 * 
 * @return {twodee.Color} The fill color
 */

twodee.PolygonNode.prototype.getStrokeColor = function()
{
    return this.strokeColor;
};


/**
 * Sets the stroke color. null means no filling.
 * 
 * @param {twodee.Color} strokeColor
 *            The stroke color
 */

twodee.PolygonNode.prototype.setStrokeColor = function(strokeColor)
{
    this.strokeColor = strokeColor;
};


/**
 * Returns the stroke color.
 * 
 * @return {twodee.Color} The stroke color
 */

twodee.PolygonNode.prototype.getStrokeColor = function()
{
    return this.strokeColor;
};


/**
 * @see twodee.SceneNode#render
 * 
 * @param {CanvasRenderingContext2D} g
 *            The graphics context
 */

twodee.PolygonNode.prototype.render = function(g)
{   
    var polygon, fillColor, strokeColor;
    
    fillColor = this.fillColor;
    strokeColor = this.strokeColor;
    
    // Only do something when fill and stroke color is present
    if (fillColor || strokeColor)
    {
        // Apply the polygon to the canvas
        polygon = this.polygon;    
        polygon.apply(g);

        // Fill the polygon if fill color is set
        if (fillColor)
        {
            g.fillStyle = fillColor.toCSS();
            g.fill();
        }
        
        // Stroke the polygon if stroke color is set
        if (strokeColor)
        {
            g.strokeStyle = strokeColor.toCSS();
            g.stroke();
        }
    }
};
