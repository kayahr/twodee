/**
 * $Id$
 * Copyright (C) 2009 Klaus Reimer <k@ailis.de>
 * See LICENSE.txt for licensing information
 */


/**
 * Constructs a new scene node.
 *            
 * @constructor
 * @class
 * @extends twodee.Object
 * A scene node. Can be used directly to create invisible group nodes or can be
 * extended to implement other node types.
 */

twodee.SceneNode = function()
{
    twodee.Object.call(this);
    this.transform = new twodee.Matrix();
    this.collisions = {};
    this.previousCollisions = {};
    
    this.id = twodee.SceneNode.counter++;
};
twodee.inherit(twodee.SceneNode, twodee.Object);

/** Instance counter. @private @type {Number} */
twodee.SceneNode.counter = 0; 

/** The node polygon ID. @private @type {Number} */
twodee.SceneNode.prototype.id = 0;

/** The parent node. Can be null if there is none. @private @type {twodee.SceneNode} */
twodee.SceneNode.prototype.parentNode = null;

/** The next sibling node. Can be null if there is none. @private @type {twodee.SceneNode} */
twodee.SceneNode.prototype.nextSibling = null;

/** The previous sibling node. Can be null if there is none. @private @type {twodee.SceneNode} */
twodee.SceneNode.prototype.previousSibling = null;

/** The first child node. Can be null if there is none. @private @type {twodee.SceneNode} */
twodee.SceneNode.prototype.firstChild = null;

/** The last child node. Can be null if there is none. @private @type {twodee.SceneNode} */
twodee.SceneNode.prototype.lastChild = null;

/** The transformation of this node. @private @type {twodee.Matrix} */
twodee.SceneNode.prototype.transform = null;

/** The effective transformation of this node. @private @type {twodee.Matrix} */
twodee.SceneNode.prototype.effectiveTransform = null;

/** The node bounds. @private @type {twodee.Matrix} */
twodee.SceneNode.prototype.bounds = null;

/** If this node is collidable or not. @private @type {Boolean} */
twodee.SceneNode.prototype.collidable = false;

/** Map with nodes which collided with this one. @private @type {Object} */
twodee.SceneNode.prototype.collisions = null;

/** Map with nodes which collided previously with this one. @private @type {Object} */
twodee.SceneNode.prototype.previousCollisions = null;

/** The physics model. @private @type {twodee.Physics} */
twodee.SceneNode.prototype.physics = null;


/**
 * Returns the node id.
 * 
 * @return {Number} The node id
 */

twodee.SceneNode.prototype.getId = function()
{
    return this.id;
};


/**
 * Returns the first child node of this node. If the node has no child nodes
 * then null is returned.
 * 
 * @return {twodee.SceneNode}
 *            The first child node or null if there are no child nodes
 */

twodee.SceneNode.prototype.getFirstChild = function()
{
    return this.firstChild;
};


/**
 * Returns the last child node of this node. If the node has no child nodes
 * then null is returned.
 * 
 * @return {twodee.SceneNode}
 *             The last child node or null if there are no child nodes
 */

twodee.SceneNode.prototype.getLastChild = function()
{
    return this.lastChild;
};


/**
 * Returns the next sibling of this node. If the node is the last child node
 * of its parent then null is returned because there can't be a next
 * sibling.
 * 
 * @return {twodee.SceneNode}
 *            The next sibling of this node or null if there is no next sibling
 */

twodee.SceneNode.prototype.getNextSibling = function()
{
    return this.nextSibling;
};


/**
 * Returns the parent node. If the node has no root node yet then null is
 * returned.
 * 
 * @return {twodee.SceneNode}
 *            The parent node or null if there is none
 */

twodee.SceneNode.prototype.getParentNode = function()
{
    return this.parentNode;
};


/**
 * Returns the previous sibling of this node. If the node is the first child
 * node of its parent then null is returned because there can't be a
 * previous sibling.
 * 
 * @return {twodee.SceneNode}
 *            The previous sibling of this node or null if there is no previous
 *            sibling
 */

twodee.SceneNode.prototype.getPreviousSibling = function()
{
    return this.previousSibling;
};


/**
 * Inserts a new child node before the specified reference node. If the new
 * node was already connected to a parent then it is disconnected from this
 * parent first.
 * 
 * @param {twodee.SceneNode} insertNode
 *            The new node to insert
 * @param {twodee.SceneNode} referenceNode
 *            The reference node
 */

twodee.SceneNode.prototype.insertBefore = function(insertNode, referenceNode)
{
    var oldParent, oldPrevious;
    
    if (!insertNode) throw new Error("newNode must be set");
    if (!referenceNode) throw new Error("referenceNode must be set");
    if (insertNode == this)
        throw new Error("newNode can not be a child of itself");

    // Verify that reference node is our child
    if (referenceNode.parentNode != this)
        throw new Error("Reference node is not my child node");

    // Remove from old parent if there is one
    oldParent = newNode2.parentNode;
    if (oldParent) oldParent.removeChild(insertNode);

    // Insert the node
    oldPrevious = referenceNode.previousSibling;
    if (oldPrevious)
        oldPrevious.nextSibling = insertNode;
    else
        this.firstChild = insertNode;
    referenceNode.previousSibling = insertNode;
    newNode.previousSibling = oldPrevious;
    newNode.nextSibling = referenceNode;
    newNode.parentNode = this;
};


/**
 * Checks if this node has child nodes.
 * 
 * @return {Boolean}
 *            True if this node has child nodes, false if not
 */

twodee.SceneNode.prototype.hasChildNodes = function()
{
    return !!this.firstChild;
};


/**
 * Removes this node from its parent.
 */

twodee.SceneNode.prototype.remove = function()
{
    var parentNode;
    
    parentNode = this.parentNode;
    if (parentNode) parentNode.removeChild(this);
};


/**
 * Removes the specified child node from this node.
 * 
 * @param {twodee.SceneNode} node
 *            The node to remove
 */

twodee.SceneNode.prototype.removeChild = function(node)
{
    var next, prev;
    
    if (!node) throw new Error("node must be set");

    // Verify that node is our child
    if (node.parentNode != this) throw new Error("node is not my child node");

    // Remove node from linked list
    next = node.nextSibling;
    prev = node.previousSibling;
    if (next) next.previousSibling = prev;
    if (prev) prev.nextSibling = next;

    // Correct first/last reference
    if (node == this.firstChild) this.firstChild = next;
    if (node == this.lastChild) this.lastChild = prev;

    // Remove all references from node
    node.parentNode = null;
    node.nextSibling = null;
    node.previousSibling = null;
};


/**
 * Appends the specified node as a child node to this node. If the node was
 * previously connected to a different parent node then it is first
 * disconnected from this parent.
 * 
 * @param {twodee.SceneNode} node
 *            The node to append to this node
 */

twodee.SceneNode.prototype.appendChild = function(node)
{    
    var oldParent, previousSibling;
    
    if (!node) throw new Error("node must not be null");
    if (node == this) throw new Error("node can not be a child of itself");

    // Remove from old parent if there is one
    oldParent = node.parentNode;
    if (oldParent) oldParent.removeChild(node);

    // Append the child
    previousSibling = node.previousSibling = this.lastChild;
    if (previousSibling) previousSibling.nextSibling = node;
    this.lastChild = node;
    if (!this.firstChild) this.firstChild = node;
    node.parentNode = this;
};


/**
 * Replaces the specified old node with the specified new node. If the new
 * node was already connected to a parent then it is disconnected from this
 * parent first.
 * 
 * @param {twodee.SceneNode} oldNode
 *            The old node to be replaced by the new one
 * @param {twodee.SceneNode} newNode
 *            The new node to replace the old one
 */

twodee.SceneNode.prototype.replaceChild = function(oldNode, newNode)
{
    var next;
    
    if (!oldNode) throw new Error("oldNode must be set");
    if (!newNode) throw new Error("newNode must be set");
    if (newNode == this)
        throw new Error("node can not be a child of itself");

    // Verify that old node is our child
    if (oldNode.parentNode != this)
        throw new Error("node is not my child node");

    // New node is the same as the old node then do nothing
    if (newNode != oldNode)
    {
        next = oldNode.nextSibling;
        this.removeChild(oldNode);
        if (next == null)
            this.appendChild(newNode);
        else
            this.insertBefore(newNode, next);
    }
};


/**
 * Transforms the node according to its effective transformation (Calculated
 * from its local transformation and the effective transformation of its
 * parent).
 * 
 * @return {twodee.Matrix} The calculated effetive transformation of this node
 * 
 * @private Called from Scene class while rendering
 */

twodee.SceneNode.prototype.updateTransformation = function()
{
    var parentNode, transform, bounds;
    
    // Initialize effective transformation with local transformation
    transform = this.effectiveTransform = this.transform.copy(
        this.effectiveTransform);
    
    // If node has a parent node then apply the effective parent transformation
    // to effective node transformation
    parentNode = this.parentNode;
    if (parentNode)
        transform.transform(parentNode.effectiveTransform);

    // Transform the bounds if this node has bounds
    bounds = this.bounds;
    if (bounds) bounds.setTransform(transform);
    
    // Return the effective transformation
    return transform;
};


/**
 * Returns the current transformation matrix.
 * 
 * @return {twodee.Matrix}
 *             The current transformation matrix
 */

twodee.SceneNode.prototype.getTransform = function()
{
    return this.transform;
};


/**
 * Sets the bounds of this node. Specify null to use no bounds. Nodes without
 * bounds never participate in collision detection.
 * 
 * @param {twodee.Polygon} bounds
 *            The node bounds to set
 */

twodee.SceneNode.prototype.setBounds = function(bounds)
{
    if (this.collidable && !bounds)
        throw new Error("Collidable nodes must have bounds");
    this.bounds = bounds.copy();
};


/**
 * Returns the bounds of this node.
 * 
 * @return {twodee.Polygon} The node bounds
 */

twodee.SceneNode.prototype.getBounds = function()
{
    return this.bounds;
};


/**
 * Sets the collidable state of the node.
 * 
 * @param {Boolean} collidable
 *            True to mark the node as collidable, false to disable
 *            collision detection for the node
 */

twodee.SceneNode.prototype.setCollidable = function(collidable)
{
    if (collidable && !this.bounds)
        throw new Error("Node has no bounds so it can't be collidable");
    
    this.collidable = collidable;
};


/**
 * Checks if this node is collidable.
 * 
 * @return {Boolean} True if node is collidable, false if not
 */

twodee.SceneNode.prototype.isCollidable = function()
{
    return this.collidable;
};


/**
 * Checks if this node collides with the specified node.
 * 
 * @param {twodee.SceneNode} other
 *            The other scene node
 * @return {Boolean} True if nodes collide, false if not
 * 
 * @private Called from Scene class
 */

twodee.SceneNode.prototype.collidesWith = function(other)
{
    return this.bounds.collidesWith(other.bounds);
};


/**
 * Informs the node that it has collided with the specified node.
 * 
 * @param {twodee.SceneNode} other
 *            The node this one has collided with
 * 
 * @private Called from Scene class
 */

twodee.SceneNode.prototype.collide = function(other)
{
    this.collisions[other.getId()] = other;
};


/**
 * Finishes the collision detection. This must be called after rendering of
 * the scene is complete. It checks which collisions are new or obsolete and
 * sends the required signals.
 * 
 * @private Called from Scene class
 */

twodee.SceneNode.prototype.processCollisions = function()
{
    var id, collisions, previousCollisions;
    
    // Create shorthand variables
    collisions = this.collisions;
    previousCollisions = this.previousCollisions;
    
    // Check for new collisions
    for (id in collisions)
    {
        if (!(id in previousCollisions))
        {
            this.sendSignal("collisionStarted", collisions[id]);
        }
    }
    
    // Check for old collisions
    for (id in previousCollisions)
    {
        if (!(id in collisions))
        {
            this.sendSignal("collisionStopped", previousCollisions[id]);            
        }
        delete previousCollisions[id];
    }
    
    // Remember current collisions for next run
    for (id in collisions)
    {
        previousCollisions[id] = this.collisions[id];
        delete collisions[id];
    }
};


/**
 * Sets the physics model. Specify null to remove the existing physics model.
 * 
 * @param {twodee.Physics} physics
 *            The physics model to set
 */

twodee.SceneNode.prototype.setPhysics = function(physics)
{
    this.physics = physics;
};


/**
 * Returns the physics model. May return null if node has no physics model.
 * 
 * @return {twodee.Physics} The physics model or null if not present
 */

twodee.SceneNode.prototype.getPhysics = function()
{
    return this.physics;
};

/**
 * Updates the node with the specified time delta. Default implementation is
 * processing the physics model if present.
 * 
 * @param {Number} delta
 *            The time elapsed since the last scene update (in milliseconds)
 */

twodee.SceneNode.prototype.update = function(delta)
{
    var physics;
    
    // Process the physics model if present
    physics = this.physics;
    if (physics) physics.process(this, delta);
};


/**
 * Renders the node. Default implementation does nothing.
 * 
 * @param {CanvasRenderingContext2D} g
 *            The graphics context
 * @param {twodee.Matrix} transform
 *            The effective transformation. This is already applied to the
 *            node bounds.
 */

twodee.SceneNode.prototype.render = function(g, transform)
{
    // Empty
};
