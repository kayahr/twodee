/**
 * $Id$
 * Copyright (C) 2009 Klaus Reimer <k@ailis.de>
 * See LICENSE.txt for licensing information
 */


/**
 * Constructs a new physics model.
 * 
 * @constructor
 * @class A physics model
 */

twodee.Physics = function()
{
    this.drift = new twodee.Vector();
    this.acceleration = new twodee.Vector();
};

/** The drift vector. Length is units per second. @private @type {twodee.Vector} */
twodee.Physics.prototype.drift = null;

/** The acceleration vector.Length is units per square second. @private @type {twodee.Vector} */
twodee.Physics.prototype.acceleration = null;

/** The spin in anti-clockwise RAD per second. @private @type {Number} */
twodee.Physics.prototype.spin = 0;

/** The spin acceleration in anti-clockwise RAD per square second. @private @type {Number} */
twodee.Physics.prototype.spinAcceleration = 0;

/** The lifetime in seconds. @private @type {Number} */
twodee.Physics.prototype.lifetime = Infinity;


/**
 * Returns the drift vector. The length is units per second. There is no setter
 * because you should modify the returned vector instead.
 * 
 * @return {twodee.Vector} The drift vector. Never null
 */

twodee.Physics.prototype.getDrift = function()
{
    return this.drift;
};


/**
 * Returns the acceleration vector. The length is units per square second.
 * There is no setter because you should modify the returned vector instead.
 * 
 * @return {twodee.Vector} The acceleration vector. Never null
 */

twodee.Physics.prototype.getAcceleration= function()
{
    return this.acceleration;
};


/**
 * Returns the spin in anti-clockwise RAD per second.
 * 
 * @return {Number} The current spin
 */

twodee.Physics.prototype.getSpin = function()
{
    return this.spin;
};


/**
 * Sets the spin in anti-clockwise RAD per second.
 * 
 * @param {Number} spin
 *            The spin to set
 */

twodee.Physics.prototype.setSpin = function(spin)
{
    this.spin = spin;
};


/**
 * Returns the spin acceleration in anti-clockwise RAD per square second.
 * 
 * @return {Number} The current spin acceleration
 */

twodee.Physics.prototype.getSpinAcceleration = function()
{
    return this.spinAcceleration;
};


/**
 * Sets the spin acceleration in anti-clockwise RAD per square second.
 * 
 * @param {Number} spinAcceleration
 *            The spin acceleration to set
 */

twodee.Physics.prototype.setSpinAcceleration = function(spinAcceleration)
{
    this.spinAcceleration = spinAcceleration;
};


/**
 * Returns the lifetime in seconds. May return Infinity.
 * 
 * @return {Number} The lifetime
 */

twodee.Physics.prototype.getLifetime = function()
{
    return this.lifetime;
};


/**
 * Sets the lifetime in seconds. Default value is Infinity.
 * 
 * @param {Number} lifetime
 *            The lifetime to set
 */

twodee.Physics.prototype.setLifetime = function(lifetime)
{
    this.lifetime = lifetime;
};


/**
 * Processes the physics model for the specified node and time delta.
 * 
 * @param {twodee.SceneNode} node
 *            The scene node to update
 * @param {Number} delta
 *            The time delta 
 */

twodee.Physics.prototype.process = function(node, delta)
{
    var spin, transform, drift, factor, angle, v, acceleration,
        spinAcceleration;
    
    factor = delta / 1000;

    // Process the lifetime
    this.lifetime = Math.max(0, this.lifetime - factor);
    if (!this.lifetime)
    {
        node.remove();
        return;
    }
    
    // Process the acceleration
    acceleration = this.acceleration;
    if (!acceleration.isZero())
        this.drift.add(acceleration.copy().scale(factor));
    
    // Process the spin acceleration
    spinAcceleration = this.spinAcceleration;
    if (spinAcceleration)
        this.spin += spinAcceleration * factor;

    transform = node.getTransform();
    
    // Process the spinning
    spin = this.spin;
    if (spin)
    {
        transform.rotate(spin * factor);
    }
    
    // Process the drifting
    drift = this.drift;
    if (!drift.isZero())
    {
        angle = transform.getRotationAngle();
        v = drift.copy().rotate(-angle);
        transform.translate(v.x * factor, v.y * factor);
    }
    
};
