/**
 * $Id$
 * Copyright (C) 2009 Klaus Reimer <k@ailis.de>
 * See LICENSE.txt for licensing information
 */


/**
 * @constructor
 * Constructs a new matrix initialized as an identity matrix.
 *            
 * @class
 * A matrix with 3x3 entries
 */

twodee.Matrix = function()
{
    this.constructor.counter++;
};

/** Instance counter. @private @type {Number} */
twodee.Matrix.counter = 0;

/** A temporary matrix for internal operations. @private @type {twodee.Matrix} */
twodee.Matrix.TMP = new twodee.Matrix();

/** The matrix entry 0;0. @type {Number} */
twodee.Matrix.prototype.m00 = 1;

/** The matrix entry 0;1. @type {Number} */
twodee.Matrix.prototype.m01 = 0;

/** The matrix entry 0;2. @type {Number} */
twodee.Matrix.prototype.m02 = 0;

/** The matrix entry 1;0. @type {Number} */
twodee.Matrix.prototype.m10 = 0;

/** The matrix entry 1;1. @type {Number} */
twodee.Matrix.prototype.m11 = 1;

/** The matrix entry 1;2. @type {Number} */
twodee.Matrix.prototype.m12 = 0;

/** The matrix entry 0;0. @type {Number} */
twodee.Matrix.prototype.m20 = 0;

/** The matrix entry 0;1. @type {Number} */
twodee.Matrix.prototype.m21 = 0;

/** The matrix entry 0;2. @type {Number} */
twodee.Matrix.prototype.m22 = 1;


/**
 * Returns and resets the current instance counter.
 * 
 * @return {Number} The number of created instances since the last call
 */

twodee.Matrix.count = function()
{
    var value = this.counter;
    this.counter = 0;
    return value;
};


/**
 * Returns a copy of this matrix. If a target matrix is specified then the
 * matrix is copied into this target matrix. If not specified then a new
 * fresh matrix is created.
 * 
 * @param {twodee.Matrix} target
 *            Optional target matrix
 * @return {twodee.Matrix} A copy of this matrix
 */

twodee.Matrix.prototype.copy = function(target)
{
    return (target ? target : new twodee.Matrix()).set(
        this.m00, this.m01, this.m02,
        this.m10, this.m11, this.m12,
        this.m20, this.m21, this.m22);
};


/**
 * Sets the matrix entries.
 * 
 * @param {Number} m00
 *            The matrix entry 0;0
 * @param {Number} m01
 *            The matrix entry 0;1
 * @param {Number} m02
 *            The matrix entry 0;2
 * @param {Number} m10
 *            The matrix entry 1;0
 * @param {Number} m11
 *            The matrix entry 1;1
 * @param {Number} m12
 *            The matrix entry 1;2
 * @param {Number} m20
 *            The matrix entry 2;0
 * @param {Number} m21
 *            The matrix entry 2;1
 * @param {Number} m22
 *            The matrix entry 2;2
 * @return {twodee.Matrix}
 *            This matrix
 */

twodee.Matrix.prototype.set = function(m00, m01, m02, m10, m11, m12,
    m20, m21, m22)
{
    this.m00 = m00;
    this.m01 = m01;
    this.m02 = m02;
    this.m10 = m10;
    this.m11 = m11;
    this.m12 = m12;
    this.m20 = m20;
    this.m21 = m21;
    this.m22 = m22;
    return this;
};


/**
 * Sets the entries of this matrix to an identity matrix.
 * 
 * @return {twodee.Matrix}
 *             The matrix
 */

twodee.Matrix.prototype.setIdentity = function()
{
    return this.set(
        1, 0, 0,
        0, 1, 0,
        0, 0, 1);
};


/**
 * Sets the entries of this matrix to a rotation matrix.
 * 
 * @param {Number} angle
 *            The rotation angle in anti-clock-wise RAD
 * @return {twodee.Matrix}
 *            This matrix
 */

twodee.Matrix.prototype.setRotate = function(angle)
{
    var s, c;
    
    s = Math.sin(angle);
    c = Math.cos(angle);
    return this.set(
        c, -s, 0,
        s,  c, 0,
        0,  0, 1);
};


/**
 * Sets the entries of this matrix to a scaling matrix.
 * 
 * @param {Number} fx
 *            The X scale factor
 * @param {Number} fy
 *            The Y scale factor. Optional. Defaults to fx.
 * @return {twodee.Matrix}
 *            This matrix
 */

twodee.Matrix.prototype.setScale = function(fx, fy)
{
    return this.set(
        fx, 0, 0,
        0, fy === undefined ? fx : fy, 0,
        0, 0, 1);
};


/**
 * Sets the entries of this matrix to a X scaling matrix.
 * 
 * @param {Number} f
 *            The scale factor
 * @return {twodee.Matrix}
 *            This matrix
 */

twodee.Matrix.prototype.setScaleX = function(f)
{
    return this.set(
        f, 0, 0,
        0, 1, 0,
        0, 0, 1);
};


/**
 * Sets the entries of this matrix to a Y scaling matrix.
 * 
 * @param {Number} f
 *            The scale factor
 * @return {twodee.Matrix}
 *            This matrix
 */

twodee.Matrix.prototype.setScaleY = function(f)
{
    return this.set(
        1, 0, 0,
        0, f, 0,
        0, 0, 1);
};


/**
 * Sets the entries of this matrix to a translation matrix.
 * 
 * @param {Number} dx
 *            The X delta
 * @param {Number} dy
 *            The Y delta.
 * @return {twodee.Matrix}
 *            This matrix
 */

twodee.Matrix.prototype.setTranslate = function(dx, dy)
{
    return this.set(
        1, 0, dx,
        0, 1, dy,
        0, 0,  1);
};


/**
 * Sets the entries of this matrix to a X translation matrix.
 * 
 * @param {Number} d
 *            The delta
 * @return {twodee.Matrix}
 *            This matrix
 */

twodee.Matrix.prototype.setTranslateX = function(d)
{
    return this.set(
        1, 0, d,
        0, 1, 0,
        0, 0, 1);
};


/**
 * Sets the entries of this matrix to a Y translation matrix.
 * 
 * @param {Number} d
 *            The delta
 * @return {twodee.Matrix}
 *            This matrix
 */

twodee.Matrix.prototype.setTranslateY = function(d)
{
    return this.set(
        1, 0, 0,
        0, 1, d,
        0, 0, 1);
};


/**
 * Multiplies this matrix with the specified matrix. The result is written
 * to this matrix.
 * 
 * @param {twodee.Matrix} m
 *            The other matrix
 * @return {twodee.Matrix}
 *            This matrix
 */

twodee.Matrix.prototype.transform = function(m)
{
    return this.set(
        this.m00 * m.m00 + this.m01 * m.m10 + this.m02 * m.m20,
        this.m00 * m.m01 + this.m01 * m.m11 + this.m02 * m.m21,
        this.m00 * m.m02 + this.m01 * m.m12 + this.m02 * m.m22,

        this.m10 * m.m00 + this.m11 * m.m10 + this.m12 * m.m20,
        this.m10 * m.m01 + this.m11 * m.m11 + this.m12 * m.m21,
        this.m10 * m.m02 + this.m11 * m.m12 + this.m12 * m.m22,

        this.m20 * m.m00 + this.m21 * m.m10 + this.m22 * m.m20,
        this.m20 * m.m01 + this.m21 * m.m11 + this.m22 * m.m21,
        this.m20 * m.m02 + this.m21 * m.m12 + this.m22 * m.m22);
};


/**
 * Multiplies this matrix with the specified factor.
 * 
 * @param {Number} f
 *            The factor
 * @return {twodee.Matrix}
 *            This matrix
 */

twodee.Matrix.prototype.multiply = function(f)
{
    this.m00 *= f;
    this.m01 *= f;
    this.m02 *= f;
    this.m10 *= f;
    this.m11 *= f;
    this.m12 *= f;
    this.m20 *= f;
    this.m21 *= f;
    this.m22 *= f;
    return this;
};


/**
 * Divides this matrix by the specified factor.
 * 
 * @param {Number} f
 *            The factor
 * @return {twodee.Matrix}
 *            This matrix
 */

twodee.Matrix.prototype.divide = function(f)
{
    this.m00 /= f;
    this.m01 /= f;
    this.m02 /= f;
    this.m10 /= f;
    this.m11 /= f;
    this.m12 /= f;
    this.m20 /= f;
    this.m21 /= f;
    this.m22 /= f;
    return this;
};


/**
 * Translates this matrix by the specified deltas
 * 
 * @param {Number} dx
 *            The X delta
 * @param {Number} dy
 *            The Y delta
 * @return {twodee.Matrix}
 *            This matrix
 */

twodee.Matrix.prototype.translate = function(dx, dy)
{
    return this.transform(twodee.Matrix.TMP.setTranslate(dx, dy));
};


/**
 * X-Translates this matrix by the specified delta
 * 
 * @param {Number} d
 *            The delta
 * @return {twodee.Matrix}
 *            This matrix
 */

twodee.Matrix.prototype.translateX = function(d)
{
    return this.transform(twodee.Matrix.TMP.setTranslateX(d));
};


/**
 * Y-Translates this matrix by the specified delta
 * 
 * @param {Number} d
 *            The delta
 * @return {twodee.Matrix}
 *            This matrix
 */

twodee.Matrix.prototype.translateY = function(d)
{
    return this.transform(twodee.Matrix.TMP.setTranslateY(d));
};


/**
 * Scales this matrix by the specified factors
 * 
 * @param {Number} fx
 *            The X factor
 * @param {Number} fy
 *            The Y factor. Optional. Defaults to fx.
 * @return {twodee.Matrix}
 *            This matrix
 */

twodee.Matrix.prototype.scale = function(fx, fy)
{
    return this.transform(twodee.Matrix.TMP.setScale(fx,
        fy === undefined ? fx : fy));
};


/**
 * X-Scales this matrix by the specified factor
 * 
 * @param {Number} f
 *            The factor
 * @return {twodee.Matrix}
 *            This matrix
 */

twodee.Matrix.prototype.scaleX = function(f)
{
    return this.transform(twodee.Matrix.TMP.setScaleX(f));
};


/**
 * Y-Scales this matrix by the specified factor
 * 
 * @param {Number} f
 *            The factor
 * @return {twodee.Matrix}
 *            This matrix
 */

twodee.Matrix.prototype.scaleY = function(f)
{
    return this.transform(twodee.Matrix.TMP.setScaleY(f));
};


/**
 * Rotates this matrix by the specified angle
 * 
 * @param {Number} r
 *            The angle in clock-wise RAD
 * @return {twodee.Matrix}
 *            This matrix
 */

twodee.Matrix.prototype.rotate = function(r)
{
    return this.transform(twodee.Matrix.TMP.setRotate(r));
};


/**
 * Returns the determinant of the matrix.
 * 
 * @return {Number} The determinant of the matrix
 */

twodee.Matrix.prototype.getDeterminant = function()
{
    return this.m00 * this.m11 * this.m22 + this.m01 * this.m12 * this.m20 +
           this.m02 * this.m10 * this.m21 - this.m00 * this.m12 * this.m21 -
           this.m01 * this.m10 * this.m22 - this.m02 * this.m11 * this.m20;
};


/**
 * Inverts this matrix.
 * 
 * @return {twodee.Matrix}
 *            This matrix
 */

twodee.Matrix.prototype.invert = function()
{
    var d;
    
    d = this.getDeterminant(); 
    return this.set(
            this.m11*this.m22 - this.m12*this.m21,
            this.m02*this.m21 - this.m01*this.m22,
            this.m01*this.m12 - this.m02*this.m11,
            this.m12*this.m20 - this.m10*this.m22,
            this.m00*this.m22 - this.m02*this.m20,
            this.m02*this.m10 - this.m00*this.m12,
            this.m10*this.m21 - this.m11*this.m20,
            this.m01*this.m20 - this.m00*this.m21,
            this.m00*this.m11 - this.m01*this.m10).divide(d);
};
