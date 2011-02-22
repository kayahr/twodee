/*
 * Copyright (C) 2009-2011 Klaus Reimer <k@ailis.de>
 * See LICENSE.txt for licensing information.
 * 
 * @require twodee.js
 */


/**
 * Constructs a new twodee object.
 * 
 * @constructor
 * @class The base class for other twodee objects
 */

twodee.Object = function()
{
    this.slots = [];
};

/**
 * The connected slots.
 * 
 * @private
 * @type {Object.<string, Array.<{func:function(...),context:Object}>>}
 */
twodee.Object.prototype.slots = null;


/**
 * Returns the array with slots connected to the specified signal. If it
 * does not exist then a new empty array is created for this signal.
 * 
 * @param {string} signal
 *            The signal
 * @return {Array.<{func:function(...),context:Object}>} The array with connected slots.
 * @private
 */

twodee.Object.prototype.getSlots = function(signal)
{	
    var slots; 
    
    slots = this.slots[signal];
    if (!slots) slots = this.slots[signal] = [];
    return slots;
};


/**
 * Connects a slot to a signal.
 * 
 * @param {string} signal
 *            The signal
 * @param {function(...)} func
 *            The slot function
 * @param {Object} context
 *            The function context (Optional, defaults to "window")
 */

twodee.Object.prototype.connect = function(signal, func, context)
{
    this.getSlots(signal).push({ func: func, context: context ? context : window});
};


/**
 * Disconnects a slot from a signal.
 * 
 * @param {string} signal
 *            The signal. If not specified then everything is disconnected
 * @param {function(...)} func
 *            The slot function. If not specified then all handlers for 
 *            specified signal are disconnected
 * @param {Object} context
 *            The function context (Optional, defaults to "window")
 */

twodee.Object.prototype.disconnect = function(signal, func, context)
{
    var slots, i, slot;
    
    // If no signal was specified then all signal handlers are disconnected
    if (!signal)
    {
        this.slots = null;
        return;
    }
    if (!context) context = window;
    slots = this.getSlots(signal);
    for (i = slots.length - 1; i >= 0; i--)
    {
    	slot = slots[i];
        if (!func || (slot.func == func && slot.context == context))
        {
            slots.splice(i, 1);
        }
    }
};


/**
 * Sends a signal.
 * 
 * @param {string} signal
 *            The signal to send
 * @param {...} varargs
 *            Variable number of optional arguments passed to the slots
 */

twodee.Object.prototype.sendSignal = function(signal, varargs)
{
    var slots, i, args, slot;
    
    // Build arguments array 
    args = [];
    for (i = 1; i < arguments.length; i++) args.push(arguments[i]);
    
    // Call all connected slots
    slots = this.getSlots(signal);
    for (i = slots.length - 1; i >= 0; i--)
    {
    	slot = slots[i];
        slot.func.apply(slot.context, args);
    }
};
