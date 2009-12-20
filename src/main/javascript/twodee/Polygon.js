/**
 * $Id$
 * Copyright (C) 2009 Klaus Reimer <k@ailis.de>
 * See LICENSE.txt for licensing information
 */


/**
 * Constructs a new polygon
 * 
 * @param {Array} vertices
 *            The vertices as array of vectors.
 *            
 * @constructor
 * @class A polygon
 */

twodee.Polygon = function(vertices)
{
    this.vertices = vertices;
    this.transformedVertices = [];
    this.boundingBox = new twodee.BoundingBox();
    this.reset();
    this.constructor.counter++;
};

/** Instance counter. @private @type {Number} */
twodee.Polygon.counter = 0; 

/** The transformed vertices. @private @type {Array} */
twodee.Polygon.prototype.transformedVertices = null;

/** The vertices of the polygon. @private @type {Array} */
twodee.Polygon.prototype.vertices = null;

/** The bounding box. @private @type {twodee.BoundingBox} */
twodee.Polygon.prototype.boundingBox = null;



/**
 * Returns and resets the current instance counter.
 * 
 * @return {Number} The number of created instances since the last call
 */

twodee.Polygon.count = function()
{
    var value = this.counter;
    this.counter = 0;
    return value;
};


/**
 * Returns a copy of this polygon.
 * 
 * @return {twodee.Polygon} The polygon copy
 */

twodee.Polygon.prototype.copy = function()
{
    return new twodee.Polygon(this.vertices.slice(0));
};


/**
 * Resets the transformed state of the polygon.
 * 
 * @private
 */

twodee.Polygon.prototype.reset = function()
{
    var i, transformedVertices, vertices, vertex;
    
    transformedVertices = this.transformedVertices;
    vertices = this.vertices;
    i = transformedVertices.length = vertices.length;
    this.boundingBox.reset();
    while (--i >= 0)
    {
        vertex = vertices[i];
        transformedVertices[i] = vertex.copy(
            transformedVertices[i]);
        this.boundingBox.update(vertex);
    }
};


/**
 * Applies the polygon as a path to the specified canvas 2D context.
 * 
 * @param {CanvasRenderingContext2D} g
 *            The canvas 2D context to apply the polygon to
 */

twodee.Polygon.prototype.apply = function(g)
{
    var max, vertices, vertex, i;
    
    vertices = this.transformedVertices;
    max = vertices.length;
    g.beginPath();
    vertex = vertices[0];
    g.moveTo(vertex.x, vertex.y);
    for (i = 1; i < max; i++)
    {
        vertex = vertices[i];
        g.lineTo(vertex.x, vertex.y);
    }
    if (max > 2) g.closePath();    
};


/**
 * Transforms the vertices of the polygon with the specified matrix.
 * 
 * @param {twodee.Matrix} m
 *            The matrix to transform this polygon with
 */

twodee.Polygon.prototype.transform = function(m)
{
    var vertices, i;
    
    vertices = this.transformedVertices;
    this.boundingBox.reset();
    for (i = vertices.length - 1; i >= 0; i--)
        this.boundingBox.update(vertices[i].transform(m));
};


/**
 * Sets the transformation of the polygon. This method uses the original
 * vertices instead of the already transformed vertices. So using this
 * method is effectively the same as calling reset() and then transform().
 * But its a little bit faster.
 * 
 * @param {twodee.Matrix} m
 *            The matrix to transform this polygon with
 */

twodee.Polygon.prototype.setTransform = function(m)
{
    var vertices, transformedVertices, i;
    
    vertices = this.vertices;
    transformedVertices = this.transformedVertices;
    this.boundingBox.reset();
    for (i = vertices.length - 1; i >= 0; i--)
        this.boundingBox.update(vertices[i].copy(
            transformedVertices[i]).transform(m));
};


/**
 * Returns the number of polygon vertices.
 * 
 * @return {Number} The number of polygon vertices
 */

twodee.Polygon.prototype.countVertices = function()
{
    return this.transformedVertices.length;
};


/**
 * Checks if the this polygon collides with the specified other polygon.
 * Note that this check only works for convex polygons. A simple bounding box
 * check is done before the complex polygon collision detection is used.
 * 
 * @param {jade.Polygon} other
 *            The other polygon to test collision with
 * @return {Boolean}
 *            True if the polygons collide, false if not 
 */

twodee.Polygon.prototype.collidesWith = function(other)
{
    var i, max;
    
    // If bounding boxes do not collide then the polygons can't collide
    if (!this.boundingBox.collidesWith(other.boundingBox)) return false;
    
    // Process all faces of the first polygon
    for (i = 0, max = this.countVertices().length; i < max; i++)
        if (this.isSeparationAxis(other, i)) return false;

    // Process all faces of the second polygon
    max = other.countVertices();
    if (max > 2)
        for (i = 0; i < max; i++)
            if (other.isSeparationAxis(this, i)) return false;
    
    // Found no separation axis so the polygons must collide
    return true;
};


/**
 * Checks if the specified face is the separation axis between this polygon
 * and the specified other polygon. The faceIndex parameter specifies the index
 * of the vector pair (defining the face) in the current polygon.
 * 
 * @param {twodee.Polygon} other
 *            The other polygon 
 * @param {Number} faceIndex
 *            The index of the first vector of the face.
 * @return {Boolean}
 *             If the face vector is a separation axis or not
 * @private
 */

twodee.Polygon.prototype.isSeparationAxis = function(other, faceIndex)
{
    var normal, point, base, dir1, dir2, i, max, faceIndex2, pointIndex,
        vertices, otherVertices, tmp1, tmp2;

    // Get static temporary vectors (Prevents garbage collector stressing)
    tmp1 = this.constructor.V1;
    tmp2 = this.constructor.V2;

    // Create some shortcuts
    vertices = this.transformedVertices;
    otherVertices = other.transformedVertices;

    max = this.vertices.length;
    faceIndex2 = faceIndex == max - 1 ? 0 : faceIndex + 1;
    pointIndex = faceIndex2 == max - 1 ? 0: faceIndex2 + 1;

    // Get the face (and it's normal)
    base = vertices[faceIndex];
    normal = vertices[faceIndex2].copy(tmp1).sub(base).orthogonal();
    
    // Check on which side the first polygon is
    point = vertices[pointIndex].copy(tmp2).sub(base);
    dir1 = point.dot(normal) > 0;
    
    // Check if all points of second polygon are on the other side
    for (i = 0, max = otherVertices.length; i < max; i++)
    {
        point = otherVertices[i].copy(tmp2).sub(base);
        dir2 = point.dot(normal) > 0;
        
        // If point is on the same side as the first polygon then this is
        // not a separation axis
        if (dir1 == dir2) return false;
    }
    
    // Separation axis is valid
    return true;    
};
