/**
 * $Id$
 * Copyright (C) 2009 Klaus Reimer <k@ailis.de>
 * See LICENSE.txt for licensing information
 */


/**
 * Constructs new render options.
 *            
 * @constructor
 * @class The render options
 */

twodee.RenderOptions = function()
{
    // Empty
};

/** If polygons should be filled. @type {Boolean} */
twodee.RenderOptions.prototype.solid = true;

/** If frames/s info should be gathered. @type {Boolean} */
twodee.RenderOptions.prototype.fpsInfo = false;

/** If debugging info should be gathered. @type {Boolean} */
twodee.RenderOptions.prototype.debugInfo = false;

/** If outline should be rendered when filling polygons. @type {Boolean} */
twodee.RenderOptions.prototype.outline = false;

/** The outline color (null=fill color). @type {String} */
twodee.RenderOptions.prototype.outlineColor = null;
