/**
 * @type {Object}
 */
var twodee = {};

/**
 * @param {Function} subClass
 * @param {Function} superClass
 */
twodee.inherit = function(subClass, superClass) {};


/**
 * @return {string}
 */
twodee.getDebugInfo = function() {};


/*****************************************************************************
 * twodee.Object
 *****************************************************************************/

/**
 * @constructor
 */

twodee.Object = function() {};

/**
 * @param {string} signal
 * @param {function(...)} func
 * @param {Object} context
 */
twodee.Object.prototype.connect = function(signal, func, context) {};

/**
 * @param {string} signal
 * @param {function(...)} func
 * @param {Object} context
 */
twodee.Object.prototype.disconnect = function(signal, func, context) {};

/**
 * @param {string} signal
 * @param {...} varargs
 */
twodee.Object.prototype.sendSignal = function(signal, varargs) {};


/*****************************************************************************
 * twodee.Matrix
 *****************************************************************************/

/**
 * @constructor
 */

twodee.Matrix = function() {};

/**
 * @type {number}
 */
twodee.Matrix.prototype.m00;

/**
 * @type {number}
 */
twodee.Matrix.prototype.m01;

/**
 * @type {number}
 */
twodee.Matrix.prototype.m02;

/**
 * @type {number}
 */
twodee.Matrix.prototype.m10;

/**
 * @type {number}
 */
twodee.Matrix.prototype.m11;

/**
 * @type {number}
 */
twodee.Matrix.prototype.m12 ;

/**
 * @type {number}
 */
twodee.Matrix.prototype.m20;

/**
 * @type {number}
 */
twodee.Matrix.prototype.m21;

/**
 * @type {number}
 */
twodee.Matrix.prototype.m22;


/**
 * @param {twodee.Matrix} target
 * @return {twodee.Matrix}
 */
twodee.Matrix.prototype.copy = function(target) {};

/**
 * @param {number} m00
 * @param {number} m01
 * @param {number} m02
 * @param {number} m10
 * @param {number} m11
 * @param {number} m12
 * @param {number} m20
 * @param {number} m21
 * @param {number} m22
 * @return {twodee.Matrix}
 */
twodee.Matrix.prototype.set = function(m00, m01, m02, m10, m11, m12,
    m20, m21, m22) {};

/**
 * @param {twodee.Matrix} transform
 * @return {twodee.Matrix}
 */
twodee.Matrix.prototype.setTransform = function(transform) {};

/**
 * @return {twodee.Matrix}
 */
twodee.Matrix.prototype.setIdentity = function() {};

/**
 * @param {number} angle
 * @return {twodee.Matrix}
 */
twodee.Matrix.prototype.setRotate = function(angle) {};

/**
 * @return {number}
 */
twodee.Matrix.prototype.getRotationAngle = function() {};

/**
 * @param {number} fx
 * @param {number} fy
 * @return {twodee.Matrix}
 */
twodee.Matrix.prototype.setScale = function(fx, fy) {};

/**
 * @param {number} f
 * @return {twodee.Matrix}
 */
twodee.Matrix.prototype.setScaleX = function(f) {};

/**
 * @param {number} f
 * @return {twodee.Matrix}
 */
twodee.Matrix.prototype.setScaleY = function(f) {};

/**
 * @param {number} dx
 * @param {number} dy
 * @return {twodee.Matrix}
 */
twodee.Matrix.prototype.setTranslate = function(dx, dy) {};

/**
 * @param {number} d
 * @return {twodee.Matrix}
 */
twodee.Matrix.prototype.setTranslateX = function(d) {};

/**
 * @param {number} d
 * @return {twodee.Matrix}
 */
twodee.Matrix.prototype.setTranslateY = function(d) {};

/**
 * @param {twodee.Matrix} m
 * @return {twodee.Matrix}
 */
twodee.Matrix.prototype.transform = function(m) {};

/**
 * @param {number} f
 * @return {twodee.Matrix}
 */
twodee.Matrix.prototype.multiply = function(f) {};

/**
 * @param {number} f
 * @return {twodee.Matrix}
 */
twodee.Matrix.prototype.divide = function(f) {};

/**
 * @param {number} dx
 * @param {number} dy
 * @return {twodee.Matrix}
 */
twodee.Matrix.prototype.translate = function(dx, dy) {};

/**
 * @param {number} d
 * @return {twodee.Matrix}
 */
twodee.Matrix.prototype.translateX = function(d) {};

/**
 * @param {number} d
 * @return {twodee.Matrix}
 */
twodee.Matrix.prototype.translateY = function(d) {};

/**
 * @param {number} fx
 * @param {number=} fy
 * @return {twodee.Matrix}
 */
twodee.Matrix.prototype.scale = function(fx, fy) {};

/**
 * @param {number} f
 * @return {twodee.Matrix}
 */
twodee.Matrix.prototype.scaleX = function(f) {};

/**
 * @param {number} f
 * @return {twodee.Matrix}
 */
twodee.Matrix.prototype.scaleY = function(f) {};

/**
 * @param {number} r
 * @return {twodee.Matrix}
 */
twodee.Matrix.prototype.rotate = function(r) {};

/**
 * @return {number} The determinant of the matrix
 */
twodee.Matrix.prototype.getDeterminant = function() {};

/**
 * @return {twodee.Matrix}
 */
twodee.Matrix.prototype.invert = function() {};


/*****************************************************************************
 * twodee.Vector
 *****************************************************************************/

/**
 * @constructor
 * @param {number=} x
 * @param {number=} y
 */
twodee.Vector = function(x, y) {};

/**
 * @type {number}
 */
twodee.Vector.prototype.x;

/**
 * @type {number}
 */
twodee.Vector.prototype.y;

/**
 * @param {twodee.Vector=} v
 * @return {twodee.Vector}
 */
twodee.Vector.prototype.copy = function(v) {};

/**
 * @return {boolean}
 */
twodee.Vector.prototype.isZero = function() {};

/**
 * @param {number} x
 * @param {number} y
 * @return {twodee.Vector}
 */            
twodee.Vector.prototype.set = function(x, y) {};

/**
 * @param {twodee.Vector} v
 * @return {twodee.Vector}
 */

twodee.Vector.prototype.add = function(v) {};

/**
 * @param {twodee.Vector} v
 * @return {twodee.Vector}
 */
twodee.Vector.prototype.sub = function(v) {};

/**
 * @param {number} fx
 * @param {number=} fy
 * @return {twodee.Vector}
 */

twodee.Vector.prototype.scale = function(fx, fy) {};


/**
 * @param {number} angle
 * @return {twodee.Vector}
 */
twodee.Vector.prototype.rotate = function(angle) {};

/**
 * @param {twodee.Vector} v
 * @return {number}
 */
twodee.Vector.prototype.dot = function(v) {};

/**
 * @param {twodee.Vector} v
 * @return {twodee.Vector}or
 */
twodee.Vector.prototype.cross = function(v) {};

/**
 * @return {number}
 */
twodee.Vector.prototype.getLength = function() {};

/**
 * @return {twodee.Vector}
 */
twodee.Vector.prototype.toUnit = function() {};

/**
 * @param {twodee.Vector} v
 * @return {number}
 */
twodee.Vector.prototype.getAngle = function(v) {};

/**
 * @param {twodee.Matrix} m
 * @return {twodee.Vector}
 */
twodee.Vector.prototype.transform = function(m) {};

/**
 * @return {Object}
 */
twodee.Vector.prototype.toJSON = function() {};

/**
 * @param {{x:number,y:number}} data
 * @return {twodee.Vector}
 */
twodee.Vector.fromJSON = function(data) {};

/**
 * @return {twodee.Vector}
 */
twodee.Vector.prototype.orthogonal = function() {};


/*****************************************************************************
 * twodee.BoundingBox
 *****************************************************************************/

/**
 * @constructor
 */
twodee.BoundingBox = function() {};

/**
 */
twodee.BoundingBox.prototype.reset = function() {};

/**
 * @param {twodee.Vector} v
 */
twodee.BoundingBox.prototype.update = function(v) {};

/**
 * @param {twodee.BoundingBox} other
 * @return {boolean}
 */
twodee.BoundingBox.prototype.collidesWith = function(other) {};

/**
 * @return {number}
 */
twodee.BoundingBox.prototype.getWidth = function() {};

/**
 * @return {number}
 */
twodee.BoundingBox.prototype.getHeight = function() {};



// ============================================================================
// twodee.Polygon
// ============================================================================

/**
 * @constructor
 * @param {Array.<twodee.Vector>} vertices
 */
twodee.Polygon = function(vertices) {};

/**
 * @return {twodee.Polygon}
 */
twodee.Polygon.prototype.copy = function() {};

/**
 * @param {CanvasRenderingContext2D} g
 */
twodee.Polygon.prototype.apply = function(g) {};

/**
 * @param {twodee.Matrix} m
 */
twodee.Polygon.prototype.transform = function(m) {};

/**
 * @param {twodee.Matrix} m
 */
twodee.Polygon.prototype.setTransform = function(m) {};

/**
 * @return {number}
 */
twodee.Polygon.prototype.countVertices = function() {};

/**
 * @param {number} index
 * @return {twodee.Vector}
 */
twodee.Polygon.prototype.getVertex = function(index) {};

/**
 * @param {twodee.Polygon} other
 * @return {boolean}
 */
twodee.Polygon.prototype.collidesWith = function(other) {};

/**
 * @return {twodee.BoundingBox}
 */
twodee.Polygon.prototype.getBoundingBox = function() {};


/*****************************************************************************
 * twodee.Physics
 *****************************************************************************/

/**
 * @constructor
 */
twodee.Physics = function() {};

/**
 * @return {twodee.Vector}
 */
twodee.Physics.prototype.getVelocity = function() {};

/**
 * @param {number} minVelocity
 */
twodee.Physics.prototype.setMinVelocity = function(minVelocity) {};

/**
 * @return {number} The minimum velocity
 */
twodee.Physics.prototype.getMinVelocity = function() {};

/**
 * @param {number} maxVelocity
 */
twodee.Physics.prototype.setMaxVelocity = function(maxVelocity) {};

/**
 * @return {number}
 */
twodee.Physics.prototype.getMaxVelocity = function() {};

/**
 * @return {twodee.Vector}
 */
twodee.Physics.prototype.getAcceleration = function() {};

/**
 * @return {number}
 */
twodee.Physics.prototype.getSpin = function() {};

/**
 * @param {number} spin
 */
twodee.Physics.prototype.setSpin = function(spin) {};

/**
 * @return {number}
 */
twodee.Physics.prototype.getSpinAcceleration = function() {};

/**
 * @param {number} spinAcceleration
 */
twodee.Physics.prototype.setSpinAcceleration = function(spinAcceleration) {};

/**
 * @return {number}
 */
twodee.Physics.prototype.getMinSpin = function() {};

/**
 * @param {number} minSpin
 */
twodee.Physics.prototype.setMinSpin = function(minSpin) {};

/**
 * @return {number}
 */
twodee.Physics.prototype.getMaxSpin = function() {};

/**
 * @param {number} maxSpin
 */
twodee.Physics.prototype.setMaxSpin = function(maxSpin) {};

/**
 * @return {number} The lifetime
 */
twodee.Physics.prototype.getLifetime = function() {};

/**
 * @param {number} lifetime
 */
twodee.Physics.prototype.setLifetime = function(lifetime) {};

/**
 * @param {number} decay
 */
twodee.Physics.prototype.setDecay = function(decay) {};

/**
 * @return {number}
 */
twodee.Physics.prototype.getDecay = function() {};

/**
 * @param {twodee.SceneNode} node
 * @param {number} delta
 */
twodee.Physics.prototype.process = function(node, delta) {};


/*****************************************************************************
 * twodee.SceneNode
 *****************************************************************************/

/**
 * @constructor
 * @extends twodee.Object
 */
twodee.SceneNode = function() {};

/**
 * @return {number}
 */
twodee.SceneNode.prototype.getId = function() {};

/**
 * @return {twodee.SceneNode}
 */
twodee.SceneNode.prototype.getFirstChild = function() {};

/**
 * @return {twodee.SceneNode}
 */
twodee.SceneNode.prototype.getLastChild = function() {};

/**
 * @return {twodee.SceneNode}
 */
twodee.SceneNode.prototype.getNextSibling = function() {};

/**
 * @return {twodee.SceneNode}
 */
twodee.SceneNode.prototype.getParentNode = function() {};

/**
 * @return {twodee.SceneNode}
 */
twodee.SceneNode.prototype.getPreviousSibling = function() {};

/**
 * @param {twodee.SceneNode} insertNode
 * @param {twodee.SceneNode} referenceNode
 */
twodee.SceneNode.prototype.insertBefore = function(insertNode, referenceNode) {};

/**
 * @return {boolean}
 */
twodee.SceneNode.prototype.hasChildNodes = function() {};

/**
 */
twodee.SceneNode.prototype.remove = function() {};

/**
 */
twodee.SceneNode.prototype.removeChildren = function() {};

/**
 * @param {twodee.SceneNode} node
 */
twodee.SceneNode.prototype.removeChild = function(node) {};

/**
 * @param {twodee.SceneNode} node
 */
twodee.SceneNode.prototype.appendChild = function(node) {};

/**
 * @param {twodee.SceneNode} oldNode
 * @param {twodee.SceneNode} newNode
 */
twodee.SceneNode.prototype.replaceChild = function(oldNode, newNode) {};

/**
 * @return {twodee.Matrix}
 */
twodee.SceneNode.prototype.getTransform = function() {};

/**
 * @param {twodee.Polygon} bounds
 */
twodee.SceneNode.prototype.setBounds = function(bounds) {};

/**
 * @return {twodee.Polygon}
 */
twodee.SceneNode.prototype.getBounds = function() {};

/**
 * @param {number} collisionType
 */
twodee.SceneNode.prototype.setCollisionType = function(collisionType){};

/**
 * @return {number}
 */
twodee.SceneNode.prototype.getCollisionType = function() {};

/**
 * @param {number} collisionMask
 */
twodee.SceneNode.prototype.setCollisionMask = function(collisionMask) {};

/**
 * @return {number}
 */
twodee.SceneNode.prototype.getCollisionMask = function() {};

/**
 * @return {boolean}
 */
twodee.SceneNode.prototype.isCollidable = function() {};

/**
 * @param {twodee.Physics} physics
 */
twodee.SceneNode.prototype.setPhysics = function(physics) {};

/**
 * @return {twodee.Physics}
 */
twodee.SceneNode.prototype.getPhysics = function() {};

/**
 * @param {number} delta
 */
twodee.SceneNode.prototype.update = function(delta) {};

/**
 * @param {CanvasRenderingContext2D} g
 * @param {twodee.Matrix} transform
 */
twodee.SceneNode.prototype.render = function(g, transform) {};

/**
 */
twodee.SceneNode.prototype.enable = function() {};

/**
 */
twodee.SceneNode.prototype.disable = function() {};

/**
 * @param {boolean} enabled
 */
twodee.SceneNode.prototype.setEnabled = function(enabled) {};

/**
 * @return {boolean}
 */
twodee.SceneNode.prototype.isEnabled = function() {};

/**
 * @param {number} opacity
 */
twodee.SceneNode.prototype.setOpacity = function(opacity) {};

/**
 * @return {number}
 */
twodee.SceneNode.prototype.getOpacity = function() {};



/*****************************************************************************
 * twodee.PolygonNode
 *****************************************************************************/

/**
 * @param {twodee.Polygon} polygon
 * @param {string=} fillStyle
 * @param {string=} strokeStyle
 * @constructor
 * @extends twodee.SceneNode
 */
twodee.PolygonNode = function(polygon, fillStyle, strokeStyle) {};

/**
 * @param {twodee.Polygon} polygon
 */
twodee.PolygonNode.prototype.setPolygon = function(polygon) {};

/**
 * @return {twodee.Polygon}
 */
twodee.PolygonNode.prototype.getPolygon = function() {};

/**
 * @param {?string} fillStyle
 */
twodee.PolygonNode.prototype.setFillStyle = function(fillStyle) {};

/**
 * @return {?string}
 */
twodee.PolygonNode.prototype.getFillStyle = function() {};

/**
 * @param {?string} strokeStyle
 */
twodee.PolygonNode.prototype.setStrokeStyle = function(strokeStyle) {};

/**
 * @return {?string}
 */
twodee.PolygonNode.prototype.getStrokeStyle = function() {};


/*****************************************************************************
 * twodee.ImageNode
 *****************************************************************************/

/**
 * @param {HTMLImageElement|Image} image
 * @constructor
 * @extends twodee.SceneNode
 */
twodee.ImageNode = function(image) {};

/**
 * @param {HTMLImageElement|Image} image
 */
twodee.ImageNode.prototype.setImage = function(image) {};

/**
 * @return {HTMLImageElement|Image}
 */
twodee.ImageNode.prototype.getImage = function() {};

/**
 * @param {boolean} showBounds
 */
twodee.ImageNode.prototype.setShowBounds = function(showBounds) {};


/*****************************************************************************
 * twodee.Scene
 *****************************************************************************/

/**
 * @constructor
 */
twodee.Scene = function() {};


/**
 * @param {twodee.SceneNode} rootNode
 */

twodee.Scene.prototype.setRootNode = function(rootNode) {};

/**
 * @return {twodee.SceneNode}
 */
twodee.Scene.prototype.getRootNode = function() {};

/**
 * @param {number} delta
 */
twodee.Scene.prototype.update = function(delta) {};

/**
 * @param {CanvasRenderingContext2D} g
 * @param {number} width
 * @param {number} height
 */
twodee.Scene.prototype.render = function(g, width, height) {};

/**
 */
twodee.Scene.prototype.pause = function() {};

/**
 */
twodee.Scene.prototype.resume = function() {};


/*****************************************************************************
 * twodee.FpsCounter
 *****************************************************************************/

/**
 * @constructor
 */

twodee.FpsCounter = function() {};

/**
 */
twodee.FpsCounter.prototype.frame = function() {};

/**
 * @return {number}
 */
twodee.FpsCounter.prototype.getFps = function() {};
