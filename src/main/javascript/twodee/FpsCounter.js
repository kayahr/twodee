/**
 * Copyright (C) 2009-2011 Klaus Reimer <k@ailis.de>
 * See LICENSE.txt for licensing information.
 * 
 * @require twodee.js
 */

/**
 * Constructs a new FPS counter.
 * 
 * @constructor
 * @class Counts frames per second.
 */
twodee.FpsCounter = function()
{
    // Empty
};

/**
 * The last time a result was calculated.
 * 
 * @private
 * @type {number}
 */
twodee.FpsCounter.prototype.lastResult = 0;

/** 
 * The last calculated FPS value.
 * 
 * @private
 * @type {number} 
 */
twodee.FpsCounter.prototype.fps = 0;

/** 
 * The current FPS counter.
 * 
 * @private
 * @type {number}
 */
twodee.FpsCounter.prototype.counter = 0;

/**
 * This method must be called each time a frame is drawn.
 */
twodee.FpsCounter.prototype.frame = function()
{
    var now;
    
    now = new Date().getTime();
    this.counter++;
    if (this.lastResult == 0)
    {
        this.lastResult = now;
    }
    else if (this.lastResult + 1000 < now)
    {
        this.lastResult = now;
        this.fps = this.counter;
        this.counter = 0;
    }
};

/**
 * Returns the number of frames per second.
 * 
 * @return {number} The number of frames per second
 */
twodee.FpsCounter.prototype.getFps = function()
{
    return this.fps;
};
