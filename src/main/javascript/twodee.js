/** The twodee namespace */
var twodee = {};
window["twodee"] = twodee;

/**
 * Debug info counter map.
 * 
 * @private
 * @type {?Object.<string, number>}
 */ 
twodee.debugInfo = null;


/**
 * Derives subClass from superClass.
 * 
 * @param {Function} subClass
 *            The sub class
 * @param {Function} superClass
 *            The super class
 */

twodee.inherit = function(subClass, superClass)
{
    var tmp = superClass.prototype;
    superClass = new Function();
    superClass.prototype = tmp;
    subClass.prototype = new superClass();
    subClass.prototype.constructor = subClass;
};


/**
 * Returns debugging info.
 * 
 * @return {string} The debugging info
 */

twodee.getDebugInfo = function()
{
    var boundingBox, matrix, physics, polygon, polygonNode,
        sceneNode, vector, info, d;
    
    d = twodee.debugInfo;
    boundingBox = twodee.BoundingBox.counter;
    matrix = twodee.Matrix.counter;
    physics = twodee.Physics.counter;
    polygon = twodee.Polygon.counter;
    polygonNode = twodee.PolygonNode.counter;
    sceneNode = twodee.SceneNode.counter;
    vector = twodee.Vector.counter;
    
    info = "Objects (since last call):\n" +
        "  BoundingBox: " + boundingBox + " (" + (boundingBox - (d ? d["boundingBox"] : 0)) + ")\n" +
        "  Matrix: " + matrix + " (" + (matrix - (d ? d["matrix"] : 0)) + ")\n" +
        "  Physics: " + physics + " (" + (physics - (d ? d["physics"] : 0)) + ")\n" +
        "  Polygon: " + polygon + " (" + (polygon - (d ? d["polygon"] : 0)) + ")\n" +
        "  PolygonNode: " + polygonNode + " (" + (polygonNode - (d ? d["polygonNode"] : 0)) + ")\n" +
        "  SceneNode: " + sceneNode + " (" + (sceneNode - (d ? d["sceneNode"] : 0)) + ")\n" +
        "  Vector: " + vector + " (" + (vector - (d ? d["vector"] : 0)) + ")\n";

    if (!d) d = twodee.debugInfo = {};
    d["boundingBox"] = boundingBox;
    d["matrix"] = matrix;
    d["physics"] = physics;
    d["polygon"] = polygon;
    d["polygonNode"] = polygonNode;
    d["sceneNode"] = sceneNode;
    d["vector"] = vector;
    
    return info;
};
