/**
 * $Id$
 * Copyright (C) 2009 Klaus Reimer <k@ailis.de>
 * See LICENSE.txt for licensing information
 */


/**
 * Constructs a new Box with the specified sizes.
 * 
 * @param {Number} xRadius
 *            The X radius
 * @param {Number} yRadius
 *            The Y radius. Optional. Defaults to X radius.
 *            
 * @constructor
 * @class
 * @extends twodee.Model
 * A Box model.
 */

twodee.Box = function(xRadius, yRadius)
{
    if (yRadius === undefined) yRadius = xRadius;

    twodee.Model.call(this, [
            new twodee.Vector(-xRadius, yRadius),
            new twodee.Vector(xRadius, yRadius),
            new twodee.Vector(xRadius, -yRadius),
            new twodee.Vector(-xRadius, -yRadius)
        ],
        this.polygons = [
            new twodee.Polygon([ 0, 1, 2, 3 ])
        ]
    );
};
twodee.inherit(twodee.Box, twodee.Model);
