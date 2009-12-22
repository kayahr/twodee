/**
 * $Id$
 * Copyright (C) 2009 Klaus Reimer <k@ailis.de>
 * See LICENSE.txt for licensing information
 */


/**
 * Constructs a new image node.
 * 
 * @param {Image} image
 *            Optional image. If not set then it must be set with the
 *            setImage() method.
 *            
 * @constructor
 * @extends twodee.SceneNode
 * @class A node which draws an image.
 */

twodee.ImageNode = function(image)
{
    twodee.SceneNode.call(this);
    if (image) this.setImage(image);
    twodee.ImageNode.counter++;
};
twodee.inherit(twodee.ImageNode, twodee.SceneNode);

/** Instance counter. @private @type {Number} */
twodee.ImageNode.counter = 0; 

/** The image. @private @type {Image} */
twodee.ImageNode.prototype.image = null;

/** If bounds should be drawn (For debugging). @private @type {Boolean} */
twodee.ImageNode.prototype.showBounds = false;


/**
 * Sets the image
 * 
 * @param {Image} image
 *            The image to set
 */

twodee.ImageNode.prototype.setImage = function(image)
{
    this.image = image;
};


/**
 * Returns the image.
 * 
 * @return {Image} The image
 */

twodee.ImageNode.prototype.getImage = function()
{
    return this.image;
};


/**
 * Enables or disables the display of node bounds. This is for debugging
 * purposes.
 * 
 * @param {Boolean} showBounds
 *            True to show the bounds, false to hide them
 */

twodee.ImageNode.prototype.setShowBounds = function(showBounds)
{
    this.showBounds = showBounds;
};


/**
 * @see twodee.SceneNode#render
 * 
 * @param {CanvasRenderingContext2D} g
 *            The graphics context
 * @param {twodee.Matrix} transform
 *            The transformation
 */

twodee.ImageNode.prototype.render = function(g, transform)
{   
    var width, height, img;
    
    img = this.image;
    
    if (!img) return;
    width = img.width;
    height = img.height;
    if (!width || !height) return;
    
    g.save(),
    g.transform(transform.m00, transform.m10, transform.m01, transform.m11,
        transform.m02, transform.m12);
    g.drawImage(img, -width / 2, -height / 2);
    g.restore();

    if (this.showBounds)
    {
        this.bounds.apply(g);
        g.strokeStyle = "red";
        g.stroke();
    }
};
