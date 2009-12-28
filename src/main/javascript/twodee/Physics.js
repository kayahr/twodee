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
    this.velocity = new twodee.Vector();
    this.acceleration = new twodee.Vector();
    twodee.Physics.counter++;
};

/** Instance counter. @private @type {Number} */
twodee.Physics.counter = 0;

/** A static temporary vector for speed optimization. @private @type {twodee.Vector} */
twodee.Physics.V = new twodee.Vector();

/** The velocity vector. Length is units per second. @private @type {twodee.Vector} */
twodee.Physics.prototype.velocity = null;

/** The minimum velocity in units per second. @private @type {Number} */
twodee.Physics.prototype.minVelocity = Number.NEGATIVE_INFINITY;

/** The maximum velocity in units per second. @private @type {Number} */
twodee.Physics.prototype.maxVelocity = Number.POSITIVE_INFINITY;

/** The acceleration vector.Length is units per square second. @private @type {twodee.Vector} */
twodee.Physics.prototype.acceleration = null;

/** The spin in anti-clockwise RAD per second. @private @type {Number} */
twodee.Physics.prototype.spin = 0;

/** The spin acceleration in anti-clockwise RAD per square second. @private @type {Number} */
twodee.Physics.prototype.spinAcceleration = 0;

/** The minimum spin acceleration. @private @type {Number} */
twodee.Physics.prototype.minSpin = Number.NEGATIVE_INFINITY;

/** The maximum spin acceleration. @private @type {Number} */
twodee.Physics.prototype.maxSpin = Number.POSITIVE_INFINITY;

/** The lifetime in seconds. @private @type {Number} */
twodee.Physics.prototype.lifetime = Number.POSITIVE_INFINITY;


/**
 * Returns the velocity vector. The length is units per second. There is no setter
 * because you should modify the returned vector instead.
 * 
 * @return {twodee.Vector} The velocity vector. Never null
 */

twodee.Physics.prototype.getVelocity = function()
{
    return this.velocity;
};


/**
 * Sets the minimum velocity in units per second.
 * 
 * @param {Number} minVelocity
 *            The minimum velocity to set
 */

twodee.Physics.prototype.setMinVelocity = function(minVelocity)
{
    this.minVelocity = minVelocity;
};


/**
 * Returns the minimum velocity in units per second.
 * 
 * @return {Number} The minimum velocity
 */

twodee.Physics.prototype.getMinVelocity = function()
{
    return this.minVelocity;
};


/**
 * Sets the maximum velocity in units per second.
 * 
 * @param {Number} maxVelocity
 *            The maximum velocity to set
 */

twodee.Physics.prototype.setMaxVelocity = function(maxVelocity)
{
    this.maxVelocity = maxVelocity;
};


/**
 * Returns the maximum velocity in units per second.
 * 
 * @return {Number} The maximum velocity
 */

twodee.Physics.prototype.getMaxVelocity = function()
{
    return this.maxVelocity;
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
 * Returns the minimum spin in anti-clockwise RAD per second.
 * 
 * @return {Number} The minimum spin
 */

twodee.Physics.prototype.getMinSpin = function()
{
    return this.minSpin;
};


/**
 * Sets the minimum spin in anti-clockwise RAD per second.
 * 
 * @param {Number} minSpin
 *            The minimum spin to set
 */

twodee.Physics.prototype.setMinSpin = function(minSpin)
{
    this.minSpin = minSpin;
};


/**
 * Returns the maximum spin in anti-clockwise RAD per second.
 * 
 * @return {Number} The maximum spin
 */

twodee.Physics.prototype.getMaxSpin = function()
{
    return this.maxSpin;
};


/**
 * Sets the maximum spin in anti-clockwise RAD per second.
 * 
 * @param {Number} maxSpin
 *            The maximum spin to set
 */

twodee.Physics.prototype.setMaxSpin = function(maxSpin)
{
    this.maxSpin = maxSpin;
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
    var spin, transform, velocity, factor, angle, v, acceleration,
        spinAcceleration, curVelocity, maxVelocity, minVelocity;
    
    factor = delta / 1000;

    // Process the lifetime
    this.lifetime = Math.max(0, this.lifetime - factor);
    if (!this.lifetime)
    {
        node.remove();
        return;
    }

    // Get the current node transform and a temporary vector
    transform = node.getTransform();    
    v = twodee.Physics.V;

    // Process the velocity
    velocity = this.velocity;
    if (!velocity.isZero())
    {
        angle = transform.getRotationAngle();
        velocity.copy(v).rotate(-angle);
        transform.translate(v.x * factor, v.y * factor);
    }    

    // Process the acceleration
    acceleration = this.acceleration;
    if (!acceleration.isZero())
    {
        velocity.add(acceleration.copy(v).scale(factor));
        curVelocity = velocity.getLength();
        maxVelocity = this.maxVelocity;
        minVelocity = this.minVelocity;
        if (curVelocity > maxVelocity)
            velocity.scale(maxVelocity / curVelocity);
        else if (curVelocity < minVelocity)
            velocity.scale(minVelocity / curVelocity);
    }
        
    // Process the spinning
    spin = this.spin;
    if (spin) transform.rotate(spin * factor);

    // Process the spin acceleration
    spinAcceleration = this.spinAcceleration;
    if (spinAcceleration)
        this.spin = Math.max(this.minSpin, Math.min(this.maxSpin, spin +
            spinAcceleration * factor));
};
