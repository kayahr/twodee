/**
 * Copyright (C) 2009-2011 Klaus Reimer <k@ailis.de>
 * See LICENSE.txt for licensing information.
 * 
 * @require twodee.js
 * @require twodee/Object.js
 */

/**
 * Constructs a new scene node.
 *            
 * @constructor
 * @extends {twodee.Object}
 * @class
 * A scene node. Can be used directly to create invisible group nodes or can
 * be extended to implement other node types.
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

/**
 * Instance counter.
 * 
 * @type {number}
 */
twodee.SceneNode.counter = 0; 

/**
 * The node polygon ID.
 * 
 * @private 
 * @type {number}
 */
twodee.SceneNode.prototype.id = 0;

/**
 * The parent node. Can be null if there is none.
 * 
 * @private 
 * @type {?twodee.SceneNode}
 */
twodee.SceneNode.prototype.parentNode = null;

/** 
 * The next sibling node. Can be null if there is none.
 * 
 * @private 
 * @type {?twodee.SceneNode} 
 */
twodee.SceneNode.prototype.nextSibling = null;

/** 
 * The previous sibling node. Can be null if there is none.
 * 
 * @private 
 * @type {?twodee.SceneNode}
 */
twodee.SceneNode.prototype.previousSibling = null;

/**
 * The first child node. Can be null if there is none.
 * 
 * @private 
 * @type {?twodee.SceneNode}
 */
twodee.SceneNode.prototype.firstChild = null;

/** 
 * The last child node. Can be null if there is none.
 * 
 * @private 
 * @type {?twodee.SceneNode}
 */
twodee.SceneNode.prototype.lastChild = null;

/**
 * The transformation of this node.
 * 
 * @private
 * @type {?twodee.Matrix}
 */
twodee.SceneNode.prototype.transform = null;

/**
 * The effective transformation of this node.
 * 
 * @private 
 * @type {?twodee.Matrix}
 */
twodee.SceneNode.prototype.effectiveTransform = null;

/** 
 * The node bounds.
 * 
 * @private 
 * @type {?twodee.Polygon}
 */
twodee.SceneNode.prototype.bounds = null;

/**
 * The collision type. 0 = None.
 * 
 * @private 
 * @type {number}
 */
twodee.SceneNode.prototype.collisionType = 0;

/**
 * The collision mask.
 * 
 * @private 
 * @type {number}
 */
twodee.SceneNode.prototype.collisionMask = 0;

/**
 * Map with nodes which collided with this one.
 * 
 * @private 
 * @type {!Object.<string, twodee.SceneNode>}
 */
twodee.SceneNode.prototype.collisions;

/**
 * Map with nodes which collided previously with this one.
 * 
 * @private 
 * @type {!Object.<string, twodee.SceneNode>}
 */
twodee.SceneNode.prototype.previousCollisions;

/**
 * The physics model. 
 * 
 * @private 
 * @type {?twodee.Physics}
 */
twodee.SceneNode.prototype.physics = null;

/** 
 * If node is enabled or not. 
 * 
 * @private 
 * @type {boolean} 
 */
twodee.SceneNode.prototype.enabled = true;

/** 
 * The opacity.
 * 
 * @private 
 * @type {number}
 */
twodee.SceneNode.prototype.opacity = 1;

/**
 * Returns the node id.
 * 
 * @return {number} The node id
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
    oldParent = insertNode.parentNode;
    if (oldParent) oldParent.removeChild(insertNode);

    // Insert the node
    oldPrevious = referenceNode.previousSibling;
    if (oldPrevious)
        oldPrevious.nextSibling = insertNode;
    else
        this.firstChild = insertNode;
    referenceNode.previousSibling = insertNode;
    insertNode.previousSibling = oldPrevious;
    insertNode.nextSibling = referenceNode;
    insertNode.parentNode = this;
};

/**
 * Checks if this node has child nodes.
 * 
 * @return {boolean}
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
 * Removes all child nodes.
 */
twodee.SceneNode.prototype.removeChildren = function()
{
    while (this.firstChild) this.removeChild(this.firstChild);
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
 * Do not call this method yourself. It is triggered by the scene.
 * 
 * @param {twodee.Matrix} baseTransform
 *            The base transformation to apply to nodes without a parent.
 * @return {twodee.Matrix} The calculated effetive transformation of this node
 */
twodee.SceneNode.prototype.updateTransformation = function(baseTransform)
{
    var parentNode, transform, bounds;
        
    // If node has a parent node then apply the effective parent transformation
    // to effective node transformation
    parentNode = this.parentNode;
    if (parentNode)
    {        
        this.effectiveTransform = parentNode.effectiveTransform.copy(this.effectiveTransform);
        transform = this.effectiveTransform.transform(this.transform);
    }
    else
    {
        // If no parent node is present then effective transform is
        // the local transform
        this.effectiveTransform = baseTransform.copy(this.effectiveTransform);
        transform = this.effectiveTransform.transform(this.transform);
    }

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
 * Sets the bounds of this node. Specify null to use no bounds.
 * 
 * @param {twodee.Polygon} bounds
 *            The node bounds to set
 */
twodee.SceneNode.prototype.setBounds = function(bounds)
{
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
 * Sets the collision type of the node.
 * 
 * @param {number} collisionType
 *            The collision type to set. 0 means that the node is not
 *            collidable at all.
 */
twodee.SceneNode.prototype.setCollisionType = function(collisionType)
{
    this.collisionType = collisionType;
};

/**
 * Returns the collisiton type of the node. May return 0 of node is
 * not collidable.
 * 
 * @return {number} The collision type of the node
 */
twodee.SceneNode.prototype.getCollisionType = function()
{
    return this.collisionType;
};

/**
 * Sets the collision bit mask of the node.
 *
 * @param {number} collisionMask
 *            The collision bit mask to set.
 */
twodee.SceneNode.prototype.setCollisionMask = function(collisionMask)
{
    this.collisionMask = collisionMask;
};

/**
 * Returns the collisiton bit mask of the node.
 *
 * @return {number} The collision bit mask
 */
twodee.SceneNode.prototype.getCollisionMask = function()
{
    return this.collisionMask;
};

/**
 * Checks if the node is collidable. It is only collidable when it has
 * a collision type and bounds set.
 * 
 * @return {boolean} True if node is collidable, false if not
 */
twodee.SceneNode.prototype.isCollidable = function()
{
    return !!this.collisionType && !!this.bounds;
};

/**
 * Checks if this node collides with the specified node.
 * 
 * Do not call this method yourself, it's called by the scene.
 * 
 * @param {twodee.SceneNode} other
 *            The other scene node
 * @return {boolean} True if nodes collide, false if not
 */
twodee.SceneNode.prototype.collidesWith = function(other)
{    
    // Can't collide if one of the nodes is not in scene
    if (!this.parentNode) return false;
    if (!other.getParentNode()) return false;    
        
    // Check if nodes can collide according to the collision type and
    // the collision mask.
    if (!(this.collisionMask & other.collisionType)) return false;

    // Check if bounds collide
    return this.bounds.collidesWith(other.bounds);
};

/**
 * Informs the node that it has collided with the specified node.
 * 
 * Do not call this method yourself, it is called by the scene.
 * 
 * @param {twodee.SceneNode} other
 *            The node this one has collided with
 */
twodee.SceneNode.prototype.collide = function(other)
{
    this.collisions["" + other.getId()] = other;
};

/**
 * Finishes the collision detection. This must be called after rendering of
 * the scene is complete. It checks which collisions are new or obsolete and
 * sends the required signals.
 *
 * Don't call this method yourself, it is done by the Scene.
 */
twodee.SceneNode.prototype.processCollisions = function()
{
    var /** @type {string} */ id, collisions, previousCollisions;
    
    // Create shorthand variables
    collisions = this.collisions;
    previousCollisions = this.previousCollisions;
    
    // Check for new collisions
    if (this.parentNode)
    {
        for (id in collisions)
        {
            if (!(id in previousCollisions))
            {
                if (collisions[id].parentNode)
                    this.sendSignal("collisionStarted", this, collisions[id]);
                
                // Process no more collisions if we were removed from the scene
                if (!this.parentNode) break;
            }
        }
    }
    
    // Check for old collisions
    for (id in previousCollisions)
    {
        if (!(id in collisions))
        {
            this.sendSignal("collisionStopped", this, previousCollisions[id]);            
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
 * @param {number} delta
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

/**
 * Enables the node.
 */
twodee.SceneNode.prototype.enable = function()
{
    this.setEnabled(true);
};

/**
 * Disables the node.
 */
twodee.SceneNode.prototype.disable = function()
{
    this.setEnabled(false);
};

/**
 * Enables or disables the node.
 * 
 * @param {boolean} enabled
 *            True to enable the node, false to disable it
 */
twodee.SceneNode.prototype.setEnabled = function(enabled)
{
    this.enabled = enabled;
};

/**
 * Checks if node is enabled or not.
 * 
 * @return {boolean} True if node is enabled, false if not
 */
twodee.SceneNode.prototype.isEnabled = function()
{
    return this.enabled;
};

/**
 * Sets the opacity of the node.
 * 
 * @param {number} opacity
 *            The opacity to set. 1.0 = Fully solid, 0.0 = fully transparent
 */
twodee.SceneNode.prototype.setOpacity = function(opacity)
{
    this.opacity = opacity;
};

/**
 * Returns the current opacity of the node.
 * 
 * @return {number}
 *             The node opacity. 1.0 = Fully solid, 0.0 = fully transparent
 */
twodee.SceneNode.prototype.getOpacity = function()
{
    return this.opacity;
};
