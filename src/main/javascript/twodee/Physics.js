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
};

/** The drift vector. Length is units per second. @private @type {twodee.Vector} */
twodee.Physics.prototype.drift = null;

/** The spin in clock-wise RAD per second. @private @type {Number} */
twodee.Physics.prototype.spin = 0;


/**
 * Returns the drift vector. There is no setter because you should modify
 * the returned vector instead.
 * 
 * @return {twodee.Vector} The drift vector. Never null
 */

twodee.Physics.prototype.getDrift = function()
{
    return this.drift;
};


/**
 * Returns the spin in clock-wise RAD per second.
 * 
 * @return {Number} The current spin
 */

twodee.Physics.prototype.getSpin = function()
{
    return this.spin;
};


/**
 * Sets the spin in clock-wise RAD per second.
 * 
 * @param {Number} spin
 *            The spin to set
 */

twodee.Physics.prototype.setSpin = function(spin)
{
    this.spin = spin;
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
    var spin, transform, drift, factor, angle, v;
    
    transform = node.getTransform();
    factor = delta / 1000;
    
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
