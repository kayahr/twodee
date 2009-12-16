/**
 * $Id$
 * Copyright (C) 2009 Klaus Reimer <k@ailis.de>
 * See LICENSE.txt for licensing information
 */


/**
 * Constructs a new keyboard updater connected to the specified HTML element.
 * 
 * @param {HTMLElement} element
 *            The angle the node should be rotated around the X axis per
 *            second. Measured in clock-wise RAD.
 *            
 * @constructor
 * @extends twodee.NodeUpdater
 * @class This updater can be bound to a HTML element (Window is default) where
 * it listens for key presses and releases to transform the connected node
 * according to the key pressed and velocity settings.
 */

twodee.KeyboardUpdater = function(element)
{
    var updater;
    
    twodee.NodeUpdater.call(this);
    if (!element) element = window;
    this.element = element;
    
    updater = this;
    
    element.addEventListener("keydown", function(e) { updater.handleKeyDown(e); }, false);     
    element.addEventListener("keyup", function(e) { updater.handleKeyUp(e); }, false);     
};
twodee.inherit(twodee.KeyboardUpdater, twodee.NodeUpdater);

/** The angle in clock-wise RAD */
twodee.KeyboardUpdater.prototype.speed = 10;

/** The rotation speed */
twodee.KeyboardUpdater.prototype.rotSpeed = 45 * Math.PI / 180;


/**
 * Handles the key down event.
 * 
 * @param {Event} e
 *           The key down event
 * @private
 */

twodee.KeyboardUpdater.prototype.handleKeyDown = function(e)
{
    switch (e.keyCode)
    {
        case 38:
        case 87:
            this.up = true;
            break;
            
        case 40:
        case 83:
            this.down = true;
            break;
                        
        case 37:
        case 65:
            this.left = true;
            break;

        case 39:
        case 68:
            this.right = true;
            break;

        case 81:
            this.rollLeft = true;
            break;
            
        case 69:
            this.rollRight = true;
            break;

        default:
            return;
    }
    e.preventDefault();
};


/**
 * Handles the key up event.
 * 
 * @param {Event} e
 *           The key down event
 * @private
 */

twodee.KeyboardUpdater.prototype.handleKeyUp = function(e)
{
    switch (e.keyCode)
    {
        case 38:
        case 87:
            this.up = false;
            break;
            
        case 40:
        case 83:
            this.down = false;
            break;
                        
        case 37:
        case 65:
            this.left = false;
            break;

        case 39:
        case 68:
            this.right = false;
            break;

        case 81:
            this.rollLeft = false;
            break;
            
        case 69:
            this.rollRight = false;
            break;

        default:
            return;
    }
    e.preventDefault();
};

/**
 * @see twodee.NodeUpdater#update
 * 
 * @param {twodee.SceneNode} node
 *            The node to update
 * @param {Number} delta
 *            The time elapsed since the last scene update (in milliseconds)
 */

twodee.KeyboardUpdater.prototype.update = function(node, delta)
{
    var x, y, z, rx, ry, rz, transform;
    
    x = this.right ? 1 : (this.left ? -1 : 0);
    y = this.down ? 1 : (this.up ? -1 : 0);
    r = this.rotateLeft ? 1 : (this.rotateRight ? -1 : 0);

    transform = node.getTransform();
    
    transform.translate(x * this.speed * delta / 1000, y * this.speed
        * delta / 1000);
    
    transform.rotateZ(r * this.rotSpeed * delta / 1000);
};
