/**
 * $Id$
 * Copyright (C) 2009 Klaus Reimer <k@ailis.de>
 * See LICENSE.txt for licensing information
 */


/**
 * The roll updater rotates a node.
 * 
 * @param {Number} angle
 *            The angle the node should be rotated per
 *            second. Measured in clock-wise RAD.
 *            
 * @constructor
 * @extends twodee.NodeUpdater
 * @class
 * A plane
 */

twodee.RotateUpdater = function(angle)
{
    twodee.NodeUpdater.call(this);
    this.angle = angle;
};
twodee.inherit(twodee.RotateUpdater, twodee.NodeUpdater);

/** The angle in clock-wise RAD */
twodee.RotateUpdater.prototype.angle;


/**
 * Returns the current angle.
 * 
 * @return {Number}
 *            The angle the node is rotated around the X axis per second.
 *            Measured in clock-wise RAD.
 */

twodee.RotateUpdater.prototype.getAngle = function()
{
    return this.angle;
};


/**
 * Sets the angle.
 * 
 * @param {Number} angle
 *            The angle the node should be rotated around the X axis per
 *            second. Measured in clock-wise RAD.
 */

twodee.RotateUpdater.prototype.setAngle = function(angle)
{
    this.angle = angle;
};


/**
 * @see twodee.NodeUpdater#update
 * 
 * @param {twodee.SceneNode} node
 *            The node to update
 * @param {Number} delta
 *            The time elapsed since the last scene update (in milliseconds)
 */

twodee.RotateUpdater.prototype.update = function(node, delta)
{
    // Do nothing if angle is 0
    if (this.angle == 0) return;

    node.getTransform().rotate(this.angle * delta / 1000);
};
