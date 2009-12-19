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
    this.updaters = [];
    
    this.id = this.constructor.counter++;
};
twodee.inherit(twodee.SceneNode, twodee.Object);

/** Instance counter. @private @type {Number} */
twodee.SceneNode.counter = 0; 

/** The node polygon ID. @private @type {Number} */
twodee.SceneNode.prototype.id = 0;

/** The registered updaters. @private @type {Array} */
twodee.SceneNode.prototype.updaters = null;

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
 * Appends the specified node as a child node to this node. If the node was
 * previously connected to a different parent node then it is first
 * disconnected from this parent.
 * 
 * @param {twodee.SceneNode} node
 *            The node to append to this node
 */

twodee.SceneNode.prototype.appendChild = function(node)
{    
    var oldParent;
    
    if (!node) throw new Error("node must not be null");
    if (node == this) throw new Error("node can not be a child of itself");

    // Remove from old parent if there is one
    oldParent = node.parentNode;
    if (oldParent) oldParent.removeChild(node);

    // Append the child
    node.previousSibling = this.lastChild;
    if (this.lastChild) this.lastChild.nextSibling = node;
    this.lastChild = node;
    if (!this.firstChild) this.firstChild = node;
    node.parentNode = this;
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
 * Updates the node with the specified time delta. Default implementation is
 * executing the connected node updaters and calling the update method of
 * all child nodes.
 * 
 * @param {Number} delta
 *            The time elapsed since the last scene update (in nanoseconds)
 */

twodee.SceneNode.prototype.update = function(delta)
{
    var childNode, i, max;
    
    for (i = 0, max = this.updaters.length; i < max; i++)
    {
        this.updaters[i].update(this, delta);
    }

    childNode = this.firstChild;
    while (childNode)
    {
        childNode.update(delta);
        childNode = childNode.getNextSibling();
    }
};


/**
 * Renders the node. Default implementation is doing nothing except calling
 * the render method of all child nodes.
 * 
 * @param {twodee.PolygonBuffer} buffer
 *            The polygon buffer
 * @param {twodee.Matrix} transform
 *            The current transformation
 */

twodee.SceneNode.prototype.render = function(buffer, transform)
{
    var childNode;
    
    childNode = this.firstChild;
    while (childNode)
    {
        childNode.render(buffer, transform.copy().transform(childNode
            .getTransform()));
        childNode = childNode.getNextSibling();
    }
};


/**
 * Returns the effective transformation of this node by recursively
 * traversing the path up the root node and multiplying all found
 * transformations. Depending on the complexity of your scene graph this is
 * time-consuming so thing twice if you really need it.
 * 
 * @return The effective transformation
 */

twodee.SceneNode.prototype.getEffectiveTransform = function()
{
    if (this.parentNode != null)
        return this.parentNode.getEffectiveTransform().copy().transform(
            this.transform);
    else
        return this.transform.copy();
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
 * Sets the transformation matrix.
 * 
 * @param {twodee.Matrix} transform
 *            The transformation matrix to set
 */

twodee.SceneNode.prototype.setTransform = function(transform)
{
    if (!transform) throw new Error("transform must be set");
    this.transform = transform;
};


/**
 * Adds the specified node updater to this node.
 * 
 * @param {twodee.NodeUpdater} updater
 *            The updater to add
 */

twodee.SceneNode.prototype.addUpdater = function(updater)
{
    this.updaters.push(updater);
};


/**
 * Removes the specified node updater from this node.
 * 
 * @param {twodee.NodeUpdater} updater
 *            The updater to remove
 */

twodee.SceneNode.prototype.removeUpdater = function(updater)
{
    var i;
    
    for (i = this.updaters.length - 1; i >= 0; i--)
    {
        if (this.updaters[i] == updater)
        {
            this.updaters.splice(i, 1);
            break;
        }
    }
};
