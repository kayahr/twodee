/**
 * $Id$
 * Copyright (C) 2009 Klaus Reimer <k@ailis.de>
 * See LICENSE.txt for licensing information
 */


/**
 * @constructor
 * Constructs a new empty vector.
 * 
 * @param {Number} x
 *            The X coordinate (Optional)
 * @param {Number} y
 *            The Y coordinate (Optional)
 * 
 * @class
 * A vector with two elements
 */

twodee.Vector = function(x, y)
{
    if (x) this.x = x;
    if (y) this.y = y;
    this.constructor.counter++;
};

/** Instance counter. @private @type {Number} */
twodee.Vector.counter = 0;

/** The X coordinate. @type {Number} */
twodee.Vector.prototype.x = 0;

/** The Y coordinate. @type {Number} */
twodee.Vector.prototype.y = 0;


/**
 * Returns and resets the current instance counter.
 * 
 * @return {Number} The number of created instances since the last call
 */

twodee.Vector.count = function()
{
    var value = this.counter;
    this.counter = 0;
    return value;
};


/**
 * Returns a copy of this vector.
 * 
 * @param {twodee.Vector} v
 *            Optional target vector
 * @return {twodee.Vector} A copy of this vector (or the target vector)
 */

twodee.Vector.prototype.copy = function(v)
{
    return (v ? v : new twodee.Vector()).set(this.x, this.y);
};


/**
 * Checks if this vector is a zero vector.
 * 
 * @return {Boolean} True if vector is a zero vector, false if not
 */

twodee.Vector.prototype.isZero = function()
{
    return !this.x && !this.y; 
};


/**
 * Sets the vector coordinates.
 * 
 * @param {Number} x
 *            The X coordinate
 * @param {Number} y
 *            The Y coordinate
 * @return {twodee.Vector}
 *            This vector
 */            

twodee.Vector.prototype.set = function(x, y)
{
    this.x = x;
    this.y = y;
    return this;
};


/**
 * Adds the coordinates of the specified vector to this one.
 * 
 * @param {twodee.Vector} v
 *            The vector to add
 * @return {twodee.Vector} This vector
 */

twodee.Vector.prototype.add = function(v)
{
    this.x += v.x;
    this.y += v.y;
    return this;
};


/**
 * Subtracts the coordinates of the specified vector from this one.
 * 
 * @param {twodee.Vector} v
 *            The vector to subtract
 * @return {twodee.Vector} This vector
 */

twodee.Vector.prototype.sub = function(v)
{
    this.x -= v.x;
    this.y -= v.y;
    return this;
};


/**
 * Scales the vector with the specified factors.
 * 
 * @param {Number} fx
 *            The X factor
 * @param {Number} fy
 *            The Y factor (Optional. Defaults to fx)
 * @return {twodee.Vector} This vector
 */

twodee.Vector.prototype.scale = function(fx, fy)
{
    this.x *= fx;
    this.y *= fy === undefined ? fx : fy;
    return this;
};


/**
 * Rotates the vector by the specified angle.
 * 
 * @param {Number} angle
 *            The rotation angle in anti-clockwise RAD.
 * @return {twodee.Vector} This vector
 */

twodee.Vector.prototype.rotate = function(angle)
{
    var x, y, s, c;
    
    s = Math.sin(angle);
    c = Math.cos(angle);
    x = this.x;
    y = this.y;
    this.x = x * c - y * s;
    this.y = x * s + y * c;
    return this;
};


/**
 * Creates and returns the dot product of this vector and the specified one.
 * 
 * @param {twodee.Vector} v
 *            The other vector
 * @return {Number}
 *            The dot product
 */

twodee.Vector.prototype.dot = function(v)
{
    return this.x * v.x + this.y * v.y;
};


/**
 * Creates the cross product of this vector and the specified one and stores
 * the result back into this vector.
 * 
 * @param {twodee.Vector} v
 *            The other vector
 * @return {twodee.Vector} This vector
 */

twodee.Vector.prototype.cross = function(v)
{
    var x, y;
    
    x = this.y * v.x - this.x * v.y;
    y = this.x * v.y - this.y * v.x;
    this.x = x;
    this.y = y;
    return this;
};


/**
 * Returns the length of the vector.
 * 
 * @return {Number} The vector length
 */

twodee.Vector.prototype.getLength = function()
{
    return Math.sqrt(this.x * this.x + this.y * this.y);
};


/**
 * Converts this vector into a unit vector with length 1.
 * 
 * @return {twodee.Vector} This vector
 */

twodee.Vector.prototype.toUnit = function()
{
    var len;
    
    len = this.getLength();
    this.x /= len;
    this.y /= len;
    return this;
};


/**
 * Returns the angle between this vector and the specified one.
 * 
 * @param {twodee.Vector} v
 *            The other vector
 * @return {Number} The angle in anti-clockwise RAD.
 */

twodee.Vector.prototype.getAngle = function(v)
{
    return Math.acos(this.copy().toUnit().dot(v.toUnit()));
};


/**
 * Transforms this vector with the specified matrix.
 * 
 * @param {twodee.Matrix} m
 *            The matrix
 * @return {twodee.Vector}
 *            This vector
 */

twodee.Vector.prototype.transform = function(m)
{
    return this.set(
        m.m00 * this.x + m.m01 * this.y + m.m02,
        m.m10 * this.x + m.m11 * this.y + m.m12);
};


/**
 * Converts the vector into a JSON object with keys 'x' and 'y'.
 * 
 * @return {Object} The vector as a JSON object
 */

twodee.Vector.prototype.toJSON = function()
{
    return { "x": this.x, "y": this.y };
};


/**
 * Creates a new vector instance with the data read from the
 * specified JSON object (with keys 'x', and 'y'). Returns null if data
 * was empty.
 * 
 * @param {Object} data
 *            The vector as JSON object
 * @return {twodee.Vector} The vector object or null if data was empty
 */

twodee.Vector.fromJSON = function(data)
{
    if (!data) return null;
    return new twodee.Vector(data.x, data.y);
};


/**
 * Converts this vector into its orthogonal vector and returns a reference to
 * it.
 * 
 * @return {twodee.Vector}
 *             The reference to this vector
 */

twodee.Vector.prototype.orthogonal = function()
{
    var tmp = this.x;
    this.x = -this.y;
    this.y = tmp;
    return this;
};