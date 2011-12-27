/**
 * Copyright (C) 2009-2011 Klaus Reimer <k@ailis.de>
 * See LICENSE.txt for licensing information.
 * 
 * @require twodee.js
 * @require twodee/SceneNode.js
 */

/**
 * Constructs a new polygon node.
 * 
 * @param {twodee.Polygon} polygon
 *            Optional polygon. If not set then it must be set with the
 *            setPolygon() method.
 * @param {string=} fillStyle
 *            Optional fill style. null means no filling. Default is a white
 *            color.
 * @param {string=} strokeStyle
 *            Optional stroke style. null means no stroking and this is the
 *            default.            
 *            
 * @constructor
 * @extends {twodee.SceneNode}
 * @class 
 * A node which draws a polygon.
 */
twodee.PolygonNode = function(polygon, fillStyle, strokeStyle)
{
    twodee.SceneNode.call(this);
    if (polygon) this.setPolygon(polygon);
    if (fillStyle !== undefined) this.fillStyle = fillStyle;
    if (strokeStyle !== undefined) this.strokeStyle = strokeStyle;
    twodee.PolygonNode.counter++;
};
twodee.inherit(twodee.PolygonNode, twodee.SceneNode);

/**
 * Instance counter.
 * 
 * @type {number} 
 */
twodee.PolygonNode.counter = 0; 

/**
 * The polygon. 
 * 
 * @private
 * @type {twodee.Polygon} 
 */
twodee.PolygonNode.prototype.polygon = null;

/**
 * The fill style.
 * 
 * @private
 * @type {?string}
 */
twodee.PolygonNode.prototype.fillStyle = "#fff";

/**
 * The stroke style.
 * 
 * @private
 * @type {?string}
 */
twodee.PolygonNode.prototype.strokeStyle = null;

/**
 * Sets the polygon.
 * 
 * @param {twodee.Polygon} polygon
 *            The polygon to set
 */
twodee.PolygonNode.prototype.setPolygon = function(polygon)
{
    this.setBounds(polygon);
    this.polygon = this.getBounds();
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
 * @param {?string} fillStyle
 *            The fill style to set
 */
twodee.PolygonNode.prototype.setFillStyle = function(fillStyle)
{
    this.fillStyle =  fillStyle;
};

/**
 * Returns the fill style.
 * 
 * @return {?string} The fill style
 */
twodee.PolygonNode.prototype.getFillStyle = function()
{
    return this.fillStyle;
};

/**
 * Sets the stroke style. null means no stroking.
 * 
 * @param {?string} strokeStyle
 *            The stroke style to set
 */
twodee.PolygonNode.prototype.setStrokeStyle = function(strokeStyle)
{
    this.strokeStyle = strokeStyle;
};

/**
 * Returns the stroke style.
 * 
 * @return {?string} The stroke style
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
 * @override
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
