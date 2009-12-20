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
 * @param {String} fillStyle
 *            Optional fill style. null means no filling. Default is a white
 *            color.
 * @param {String} strokeStyle
 *            Optional stroke style. null means no stroking and this is the
 *            default.            
 *            
 * @constructor
 * @extends twodee.SceneNode
 * @class A node which draws a polygon.
 */

twodee.PolygonNode = function(polygon, fillStyle, strokeStyle)
{
    twodee.SceneNode.call(this);
    if (polygon) this.setPolygon(polygon);
    if (fillStyle !== undefined) this.fillStyle = fillStyle;
    if (strokeStyle !== undefined) this.strokeStyle = strokeStyle;
    this.constructor.counter++;
};
twodee.inherit(twodee.PolygonNode, twodee.SceneNode);

/** Instance counter. @private @type {Number} */
twodee.PolygonNode.counter = 0; 

/** The polygon. @private @type {twodee.Polygon} */
twodee.PolygonNode.prototype.polygon = null;

/** The fill style. @private @type {String} */
twodee.PolygonNode.prototype.fillStyle = "#fff";

/** The stroke style. @private @type {String} */
twodee.PolygonNode.prototype.strokeStyle = null;


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
 * Sets the fill style. null means no filling.
 * 
 * @param {String} fillStyle
 *            The fill style to set
 */

twodee.PolygonNode.prototype.setFillStyle = function(fillStyle)
{
    this.fillStyle =  fillStyle;
};


/**
 * Returns the fill style.
 * 
 * @return {String} The fill style
 */

twodee.PolygonNode.prototype.getStrokeStyle = function()
{
    return this.strokeStyle;
};


/**
 * Sets the stroke style. null means no stroking.
 * 
 * @param {String} strokeStyle
 *            The stroke style to set
 */

twodee.PolygonNode.prototype.setStrokeStyle = function(strokeStyle)
{
    this.strokeStyle = strokeStyle;
};


/**
 * Returns the stroke style.
 * 
 * @return {String} The stroke style
 */

twodee.PolygonNode.prototype.getStrokeStyle = function()
{
    return this.strokeStyle;
};


/**
 * @see twodee.SceneNode#render
 * 
 * @param {CanvasRenderingContext2D} g
 *            The graphics context
 */

twodee.PolygonNode.prototype.render = function(g)
{   
    var polygon, fillStyle, strokeStyle;
    
    fillStyle = this.fillStyle;
    strokeStyle = this.strokeStyle;
    
    // Only do something when fill and stroke color is present
    if (fillStyle || strokeStyle)
    {
        // Apply the polygon to the canvas
        polygon = this.polygon;    
        polygon.apply(g);

        // Fill the polygon if fill color is set
        if (fillStyle)
        {
            g.fillStyle = fillStyle;
            g.fill();
        }
        
        // Stroke the polygon if stroke color is set
        if (strokeStyle)
        {
            g.strokeStyle = strokeStyle;
            g.stroke();
        }
    }
};
