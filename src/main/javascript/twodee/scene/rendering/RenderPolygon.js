/**
 * $Id$
 * Copyright (C) 2009 Klaus Reimer <k@ailis.de>
 * See LICENSE.txt for licensing information
 */


/**
 * Constructs a new render polygon.
 *
 * @param {twodee.RenderModel} model
 *             The render model this polygon is connected to
 * @param {twodee.Polygon} polygon
 *             The original polygon
 * @param {Array} vertices
 *             The vertices array
 *             
 * @constructor
 * @class A render polygon is a wrapper around a polygon for internal usage
 * while rendering. 
 */

twodee.RenderPolygon = function(model, polygon, vertices)
{
    var i, max;
    
    this.model = model;
    this.color = polygon.getColor();
    this.vertices = [];
    this.size = polygon.countVertices();
    this.origSize = this.size;
    for (i = 0, max = this.size; i < max; i++)
        this.vertices.push(vertices[polygon.getVertex(i)]);
    
    this.polygon = [];
    this.prevPolygon = [];
    
    this.collisions = {};
    this.prevCollisions = {};
    
    this.id = this.constructor.counter++;    
};

/** Instance counter. @private @type {Number} */
twodee.RenderPolygon.counter = 0; 

/** Speed-optimization vector cache. @private @type {twodee.Vector} */
twodee.RenderPolygon.V1 = new twodee.Vector();

/** Speed-optimization vector cache. @private @type {twodee.Vector} */
twodee.RenderPolygon.V2 = new twodee.Vector();

/** The render polygon ID. @private @type {Number} */
twodee.RenderPolygon.prototype.id = 0;

/** The array with the used vertices. @private @type {Array} */
twodee.RenderPolygon.prototype.vertices = null;

/** The current number of used vertices. @private @type {Number} */
twodee.RenderPolygon.prototype.size = 0;

/** The original number of vertices. @private @type {Number} */
twodee.RenderPolygon.prototype.origSize = 0;

/** The extra vectors added to the original ones. @private @type {Number} */
twodee.RenderPolygon.prototype.extras = 0;

/** The vertex indices that forms the polygon. @private @type {Array} */
twodee.RenderPolygon.prototype.polygon = null;

/** The previous vertex indices that forms the polygon. @private @type {Array} */
twodee.RenderPolygon.prototype.prevPolygon = null;

/** The normal vector cache. @private @type {twodee.Vector} */
twodee.RenderPolygon.prototype.normal = null;

/** The center vector cache. @private @type {twodee.Vector} */
twodee.RenderPolygon.prototype.center = null;

/** The referenced vertices. @private @type {Array} */
twodee.RenderPolygon.prototype.vertices = null;

/** The polygon color. @private @type {twodee.Color } */
twodee.RenderPolygon.prototype.color = null;

/** The render model this polygon is connected to. @private @type {twodee.RenderModel} */
twodee.RenderPolygon.prototype.model = null;

/** The collision map. @private @type {Object} */
twodee.RenderPolygon.prototype.collisions = null;

/** The previous collision map. @private @type {Object} */
twodee.RenderPolygon.prototype.prevCollisions = null;

/** If polygon collided. @private @type {Boolean} */
twodee.RenderPolygon.prototype.collided = false;

/** If polygon collided previously. @private @type {Boolean} */
twodee.RenderPolygon.prototype.prevCollided = false;


/**
 * Returns the render polygon id.
 * 
 * @return {Number} The render polygon id
 */

twodee.RenderPolygon.prototype.getId = function()
{
    return this.id;
};


/**
 * Initializes the polygon for the next rendering. This simply resets the
 * vertex indices to the original order and resets the counter of extra
 * vertices.
 */

twodee.RenderPolygon.prototype.init = function()
{
    var i;
    
    this.size = this.origSize;
    for (i = this.size - 1; i >= 0; i--) this.polygon[i] = i;
    this.extras = 0;
};


/**
 * Returns the number of used vertices.
 * 
 * @return {NUmber} The number of used vertices
 */

twodee.RenderPolygon.prototype.countVertices = function()
{
    return this.size;
};


/**
 * Returns the vertex with the specified index.
 * 
 * @param {Number} index
 *            The vertex index
 * @return {twodee.Vector} The vertex
 */

twodee.RenderPolygon.prototype.getVertex = function(index)
{
    return this.vertices[this.polygon[index]];
};


/**
 * Returns the center of the polygon.
 * 
 * Speed-optimization: The calculated center vector is cached in an instance
 * scope variable to prevent creation of vector objects on reach frame render.
 * WARNING: If you want to use the returned center vector for a longer time
 * (and not only for a single frame) then you should copy the vector because
 * otherwise the content may change when the polygon changes.
 * 
 * @return {twodee.Vector} The center of the polygon
 */

twodee.RenderPolygon.prototype.getCenter = function()
{
    var vertexCount, ax, ay, i, v;
    
    vertexCount = this.size;
    ax = 0;
    ay = 0;

    for (i = 0; i < vertexCount; i++)
    {
        v = this.vertices[this.polygon[i]];
        ax += v.x;
        ay += v.y;
    }
    ax /= vertexCount;
    ay /= vertexCount;

    if (!this.center) this.center = new twodee.Vector();
    return this.center.set(ax, ay);
};


/**
 * Returns the polygon color. If it has a specific color then this one
 * is returned. Otherwise the global model color is returned.
 * 
 * @return {twodee.Color} The color to be used for this polygon
 */

twodee.RenderPolygon.prototype.getColor = function()
{
    if (this.color) return this.color;
    return this.model.model.getColor();
};


/**
 * Checks if the this polygon collides with the specified polygon.
 * 
 * @param {jade.RenderPolygon} other
 *            The other polygon to test collision with
 * @return {Boolean}
 *            If the polygons collide or not 
 */

twodee.RenderPolygon.prototype.collidesWith = function(other)
{
    var i, max;
    
    // If one of the polygons is empty then they don't collide
    if (!this.size || !other.size) return false;
    
    // If bounding boxes do not collide then the polygons can't collide
    // TODO if (!this.getBounds().collide(other.getBounds())) return false;
    
    // Process all faces of the first polygon
    for (i = 0, max = this.size; i < max; i++)
    {
        if (this.isSeparationAxis(other, i)) return false;
    }

    // Process all faces of the second polygon
    if (other.size > 2)
    {
        for (i = 0, max = other.size; i < max; i++)
        {
            if (other.isSeparationAxis(this, i)) return false;
        }
    }
    
    // Found no separation axis so the polygons must collide
    return true;
};


/**
 * Checks if the specified face is the separation axis between this polygon
 * and the specified polygon. The faceIndex parameter specifies the index of
 * the vector pair (defining the face) in the current polygon.
 * 
 * @param {jade.RenderPolygon} other
 *            The other polygon 
 * @param {Number} faceIndex
 *            The index of the first vector of the face.
 * @return {Boolean}
 *             If the face vector is a separation axis or not
 */

twodee.RenderPolygon.prototype.isSeparationAxis = function(other, faceIndex)
{
    var normal, point, base, dir1, dir2, i, max, faceIndex2, pointIndex;

    faceIndex2 = faceIndex == this.size - 1 ? 0 : faceIndex + 1;
    pointIndex = faceIndex2 == this.size - 1 ? 0: faceIndex2 + 1;

    // Get the face (and it's normal)
    base = this.vertices[faceIndex];
    normal = this.vertices[faceIndex2].copy().sub(base).orthogonal();
    
    // Check on which side the first polygon is
    point = this.vertices[pointIndex].copy().sub(base);
    dir1 = point.dot(normal) > 0;
    
    // Check if all points of second polyhon are on the other side
    for (i = 0, max = other.size; i < max; i++)
    {
        point = other.vertices[i].copy().sub(base);
        dir2 = point.dot(normal) > 0;
        
        // If point is on the same side as the first polygon then this is
        // not a separation axis
        if (dir1 == dir2) return false;
    }
    
    // Separation axis is valid
    return true;    
};


/**
 * Checks if this polygon is collidable.
 * 
 * @return {Boolean} True if polygon is collidable, false if not
 */

twodee.RenderPolygon.prototype.isCollidable = function()
{
    return this.model.node.isCollidable();
};


/**
 * Initializes the collision detection for this polygon. Must be called when
 * the polygon is added to the polygon buffer for frame rendering.
 */

twodee.RenderPolygon.prototype.initCollisions = function()
{
    // If polygon didn't collide the last two times then do nothing
    if (!this.collided && !this.prevCollided) return;
    
    this.prevCollisions = this.collisions;
    this.collisions = {};
    this.prevCollided = this.collided;
    this.collided = false;
};


/**
 * Informs the polygon that it has collided with the specified polygon.
 * 
 * @param {twodee.Polygon} other
 *            The other polygon this one has collided with 
 */

twodee.RenderPolygon.prototype.collide = function(other)
{
    var id;
    
    id = other.getId();
    if (!(id in this.collisions))
    {
        this.collided = true;
        this.collisions[id] = other;        
    }
};


/**
 * Finishes collision detection. Must be called for all collidable render
 * models after adding all polygons to the polygon buffer.
 */

twodee.RenderPolygon.prototype.doneCollisions = function()
{
    var id;
    
    // If polygon didn't collide the last two times then do nothing
    if (!this.collided && !this.prevCollided) return;
    
    // Check for started collisions
    for (id in this.collisions)
    {
        if (!(id in this.prevCollisions))
        {
            this.model.startCollide(this, this.collisions[id]);
        }
    }

    // Check for stopped collisions
    for (id in this.prevCollisions)
    {
        if (!(id in this.collisions))
        {
            this.model.stopCollide(this, this.prevCollisions[id]);
        }
    }
};


/**
 * Returns the render model this polygon is connected to.
 * 
 * @return {twodee.RenderPolygon} The model
 */

twodee.RenderPolygon.prototype.getModel = function()
{
    return this.model;
};
