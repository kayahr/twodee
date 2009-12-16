/**
 * $Id$
 * Copyright (C) 2009 Klaus Reimer <k@ailis.de>
 * See LICENSE.txt for licensing information
 */


/**
 * Constructs a new camera node.
 * 
 * @constructor
 * @extends twodee.SceneNode
 * @class A camera node
 */

twodee.CameraNode = function()
{
    twodee.SceneNode.call(this);
};
twodee.inherit(twodee.CameraNode, twodee.SceneNode);
