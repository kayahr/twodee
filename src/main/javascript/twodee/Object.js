/**
 * $Id$
 * Copyright (C) 2009 Klaus Reimer <k@ailis.de>
 * See LICENSE.txt for licensing information
 */


/**
 * Constructs a new twodee object.
 * 
 * @constructor
 * @class The base class for other twodee objects
 */

twodee.Object = function()
{
    this.slots = twodee.newArray();
};

/** The connected slots. @private @type {Array} */
twodee.Object.prototype.slots = null;


/**
 * Returns the array with slots connected to the specified signal. If it
 * does not exist then a new empty array is created for this signal.
 * 
 * @param {String} signal
 *            The signal
 * @return {Array} The array with connected slots.
 * @private
 */

twodee.Object.prototype.getSlots = function(signal)
{
    var slots;
    
    slots = this.slots[signal];
    if (!slots) slots = this.slots[signal] = twodee.newArray();
    return slots;
};


/**
 * Connects a slot to a signal.
 * 
 * @param {String} signal
 *            The signal
 * @param {Function} func
 *            The slot function
 * @param {Object} context
 *            The function context (Optional, defaults to "window")
 */

twodee.Object.prototype.connect = function(signal, func, context)
{
    this.getSlots(signal).push([ func, context ? context : window]);
};


/**
 * Disconnects a slot from a signal.
 * 
 * @param {String} signal
 *            The signal. If not specified then everything is disconnected
 * @param {Function} func
 *            The slot function. If not specified then all handlers for 
 *            specified signal are disconnected
 * @param {Object} context
 *            The function context (Optional, defaults to "window")
 */

twodee.Object.prototype.disconnect = function(signal, func, context)
{
    var slots, i;
    
    // If no signal was specified then all signal handlers are disconnected
    if (!signal)
    {
        target.connectedSlots = null;
        return;
    }
    
    if (!context) context = window;
    slots = this.getSlots(signal);
    for (i = slots.length - 1; i >= 0; i--)
    {
        if (!func || (slots[i][0] == func && slots[i][1] == context))
        {
            slots.splice(i, 1);
        }
    }
};


/**
 * Sends a signal.
 * 
 * @param {String} signal
 *            The signal to send
 * @param {Object} args__
 *            Variable number of optional arguments passed to the slots
 */

twodee.Object.prototype.sendSignal = function(signal, args__)
{
    var slots, i, args;
    
    // Build arguments array 
    args = twodee.newArray();
    for (i = 2; i < arguments.length; i++) args.push(arguments[i]);
    
    // Call all connected slots
    slots = this.getSlots(signal);
    for (i = slots.length - 1; i >= 0; i--)
    {
        slots[i][0].apply(slots[i][1], args);
    }
};
