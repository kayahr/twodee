/**
 * Copyright (C) 2009-2011 Klaus Reimer <k@ailis.de>
 * See LICENSE.txt for licensing information.
 * 
 * @require twodee.js
 * @require twodee/Vector.js
 * @use jquery.js
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
    twodee.Matrix.counter++;
    this.translation = new twodee.Vector();
};

/**
 * Instance counter.
 * 
 * @type {number}
 */
twodee.Matrix.counter = 0;

/** 
 * A temporary matrix for internal operations.
 * 
 * @private
 * @type {twodee.Matrix}
 */
twodee.Matrix.TMP = new twodee.Matrix();

/**
 * Cached translation vector.
 * @private
 * @type {twodee.Vector}
 */
twodee.Matrix.prototype.translation;

/**
 * The matrix entry 0;0.
 * 
 * @type {number}
 */
twodee.Matrix.prototype.m00 = 1;

/**
 * The matrix entry 0;1.
 * 
 * @type {number}
 */
twodee.Matrix.prototype.m01 = 0;

/**
 * The matrix entry 0;2.
 * 
 * @type {number}
 */
twodee.Matrix.prototype.m02 = 0;

/**
 * The matrix entry 1;0.
 * 
 * @type {number}
 */
twodee.Matrix.prototype.m10 = 0;

/**
 * The matrix entry 1;1.
 * 
 * @type {number}
 */
twodee.Matrix.prototype.m11 = 1;

/**
 * The matrix entry 1;2.
 * 
 * @type {number}
 */
twodee.Matrix.prototype.m12 = 0;

/**
 * The matrix entry 0;0.
 * 
 * @type {number}
 */
twodee.Matrix.prototype.m20 = 0;

/**
 * The matrix entry 0;1.
 * 
 * @type {number}
 */
twodee.Matrix.prototype.m21 = 0;

/**
 * The matrix entry 0;2.
 * 
 * @type {number}
 */
twodee.Matrix.prototype.m22 = 1;

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
 * @param {number} m00
 *            The matrix entry 0;0
 * @param {number} m01
 *            The matrix entry 0;1
 * @param {number} m02
 *            The matrix entry 0;2
 * @param {number} m10
 *            The matrix entry 1;0
 * @param {number} m11
 *            The matrix entry 1;1
 * @param {number} m12
 *            The matrix entry 1;2
 * @param {number} m20
 *            The matrix entry 2;0
 * @param {number} m21
 *            The matrix entry 2;1
 * @param {number} m22
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
 * Sets the matrix entries.
 * 
 * @param {twodee.Matrix} transform
 *            The matrix to get the entries from
 * @return {twodee.Matrix}
 *            This matrix
 */
twodee.Matrix.prototype.setTransform = function(transform)
{
    this.m00 = transform.m00;
    this.m01 = transform.m01;
    this.m02 = transform.m02;
    this.m10 = transform.m10;
    this.m11 = transform.m11;
    this.m12 = transform.m12;
    this.m20 = transform.m20;
    this.m21 = transform.m21;
    this.m22 = transform.m22;
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
 * @param {number} angle
 *            The rotation angle in anti-clockwise RAD
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
 * Returns the rotation angle in anti-clockwise RAD.
 * 
 * @return {number} The rotation angle in anti-clockwise RAD
 */
twodee.Matrix.prototype.getRotationAngle = function()
{
    return Math.atan2(this.m10, this.m00);
};

/**
 * Sets the entries of this matrix to a scaling matrix.
 * 
 * @param {number} fx
 *            The X scale factor
 * @param {number=} fy
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
 * @param {number} f
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
 * @param {number} f
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
 * @param {number} dx
 *            The X delta
 * @param {number} dy
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
 * Returns the X translation of the matrix.
 * 
 * @return {number} The X translation
 */
twodee.Matrix.prototype.getTranslationX = function()
{
    return this.m02;
};

/**
 * Returns the Y translation of the matrix.
 * 
 * @return {number} The Y translation
 */
twodee.Matrix.prototype.getTranslationY = function()
{
    return this.m12;
};

/**
 * Returns The translation vector of the current matrix. Attention! This
 * vector is reused and updated to the current translation whenever this
 * method is called. So you may want to clone the vector if you need it for
 * a longer time.
 * 
 * @return {twodee.Vector} The translation vector of the matrix
 */
twodee.Matrix.prototype.getTranslation = function()
{
    return this.translation.set(this.m02, this.m12);
};

/**
 * Sets the entries of this matrix to a X translation matrix.
 * 
 * @param {number} d
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
 * @param {number} d
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
 * @param {number} f
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
 * @param {number} f
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
 * @param {number} dx
 *            The X delta
 * @param {number} dy
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
 * @param {number} d
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
 * @param {number} d
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
 * @param {number} fx
 *            The X factor
 * @param {number=} fy
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
 * @param {number} f
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
 * @param {number} f
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
 * @param {number} r
 *            The angle in anti-clockwise RAD
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
 * @return {number} The determinant of the matrix
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
