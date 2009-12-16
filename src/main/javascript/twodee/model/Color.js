/**
 * $Id$
 * Copyright (C) 2009 Klaus Reimer <k@ailis.de>
 * See LICENSE.txt for licensing information
 */


/**
 * Constructs a new color.
 * 
 * @param {Number} red
 *            The red component (0.0 - 1.0)
 * @param {Number} green
 *            The green component (0.0 - 1.0)
 * @param {Number} blue
 *            The blue component (0.0 - 1.0)
 *            
 * @constructor
 * @class A color
 */

twodee.Color = function(red, green, blue)
{
    if (red) this.red = red;
    if (green) this.green = green;
    if (blue) this.blue = blue;
    this.css = "rgb(" + parseInt(this.red * 255) + "," +
        parseInt(this.green * 255) + "," +
        parseInt(this.blue * 255) + ")";
    this.constructor.counter++;
};

/** Instance counter. @private @type {Number} */
twodee.Color.counter = 0;

/** The red component. @private @type {Number} */
twodee.Color.prototype.red = 0;

/** The red component. @private @type {Number} */
twodee.Color.prototype.green = 0;

/** The red component. @private @type {Number} */
twodee.Color.prototype.blue = 0;

/** The CSS representation of the color. @private @type {String} */
twodee.Color.prototype.css = "rgb(0,0,0)";

/** Black color. @final @type {twodee.Color} */
twodee.Color.BLACK = new twodee.Color();

/** Red color. @final @type {twodee.Color} */
twodee.Color.RED = new twodee.Color(1, 0, 0);

/** Red color. @final @type {twodee.Color} */
twodee.Color.GREEN = new twodee.Color(0, 1, 0);

/** Blue color. @final @type {twodee.Color} */
twodee.Color.BLUE = new twodee.Color(0, 0, 1);

/** Dark gray color. @final @type {twodee.Color} */
twodee.Color.DARK_GRAY = new twodee.Color(0.25, 0.25, 0.25);

/** Dark gray color. @final @type {twodee.Color} */
twodee.Color.GRAY = new twodee.Color(0.5, 0.5, 0.5);

/** Yellow color. @final @type {twodee.Color} */
twodee.Color.YELLOW = new twodee.Color(1, 1, 0);

/** White color. @final @type {twodee.Color} */
twodee.Color.WHITE = new twodee.Color(1, 1, 1);


/**
 * Returns and resets the current instance counter.
 * 
 * @return {Number} The number of created instances since the last call
 */

twodee.Color.count = function()
{
    var value = this.counter;
    this.counter = 0;
    return value;
};


/**
 * Returns the red component.
 * 
 * @return {Number} The red component
 */

twodee.Color.prototype.getRed = function()
{
    return this.red;
};


/**
 * Returns the green component (0.0-1.0).
 * 
 * @return {Number} The green component
 */

twodee.Color.prototype.getGreen = function()
{
    return this.green;
};


/**
 * Returns the blue component (0.0-1.0).
 * 
 * @return {Number} The blue component
 */

twodee.Color.prototype.getBlue = function()
{
    return this.blue;
};


/**
 * Returns the CSS representation of the color (0.0-1.0).
 * 
 * @return {String} The CSS representation of the color
 */

twodee.Color.prototype.toCSS = function()
{
    return this.css;
};


/**
 * Returns the three color components as an array. The entries are in the
 * range from 0.0 to 1.0.
 *
 * @return {Array} The three color components as an array
 */

twodee.Color.prototype.getComponents = function()
{
    return [ this.red, this.green, this.blue ];
};


/**
 * Returns a color component. 0=red, 1=green, 2=blue.
 *
 * @param {Number} component
 *            The component index
 * @return {Number} The color component (0-1)
 */

twodee.Color.prototype.getComponent = function(component)
{
    return (component ? (component == 1 ? this.green : this.blue) : this.red);
};


/**
 * Converts the color into a JSON object with keys 'r', 'g' and 'b' and
 * returns it.
 * 
 * @return {Object} The color as a JSON object
 */

twodee.Color.prototype.toJSON = function()
{
    return { "r": this.red, "g": this.green, "b": this.blue };
};


/**
 * Creates a new color instance with the color components read from the
 * specified JSON object (with keys 'r', 'g' and 'b'). Returns null if
 * data was empty
 * 
 * @param {Object} data
 *            The color as JSON object
 * @return {twodee.Color} The color object or null if data was empty
 */

twodee.Color.fromJSON = function(data)
{
    if (!data) return null;
    return new twodee.Color(data.r, data.g, data.b);
};
