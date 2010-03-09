/**
 * $Id$
 * Copyright (C) 2009 Klaus Reimer <k@ailis.de>
 * See LICENSE.txt for licensing information
 */


/**
 * Constructs a new bounding box
 * 
 * @constructor
 * @class A bounding box
 */

twodee.BoundingBox = function()
{
    twodee.BoundingBox.counter++;
};

/** Instance counter. @private @type {number} */
twodee.BoundingBox.counter = 0;

/** The top bound. @private @type {number} */
twodee.BoundingBox.prototype.top = Number.POSITIVE_INFINITY;

/** The right bound. @private @type {number} */
twodee.BoundingBox.prototype.right = Number.NEGATIVE_INFINITY;

/** The bottom bound. @private @type {number} */
twodee.BoundingBox.prototype.bottom = Number.NEGATIVE_INFINITY;

/** The left bound. @private @type {number} */
twodee.BoundingBox.prototype.left = Number.POSITIVE_INFINITY;


/**
 * Resets the bounding box to no bounds.
 */

twodee.BoundingBox.prototype.reset = function()
{
    this.top = Number.POSITIVE_INFINITY;
    this.right = Number.NEGATIVE_INFINITY;
    this.bottom = Number.NEGATIVE_INFINITY;
    this.left = Number.POSITIVE_INFINITY;
};


/**
 * Updates the bounding box with the specified vector
 * 
 * @param {twodee.Vector} v
 *            The vector
 */

twodee.BoundingBox.prototype.update = function(v)
{
    var x, y;
    
    x = v.x;
    y = v.y;
    this.top = Math.min(this.top, y);
    this.right = Math.max(this.right, x);
    this.bottom = Math.max(this.bottom, y);
    this.left = Math.min(this.left, x);
};


/**
 * Checks if this bounding box collides with the specified other bounding
 * box.
 * 
 * @param {twodee.BoundingBox} other
 *            The other bounding box
 * @return {boolean} True if bounding boxes collide, false if not
 */

twodee.BoundingBox.prototype.collidesWith = function(other)
{
    return this.top <= other.bottom &&
           this.bottom >= other.top &&
           this.left <= other.right &&
           this.right >= other.left;
};


/**
 * Returns the width of the bounding box.
 * 
 * @return {number} The bounding box width
 */

twodee.BoundingBox.prototype.getWidth = function()
{
    return this.right - this.left;
};


/**
 * Returns the height of the bounding box.
 * 
 * @return {number} The bounding box height
 */

twodee.BoundingBox.prototype.getHeight = function()
{
    return this.bottom - this.top;
};
