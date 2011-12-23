/**
 * Copyright (C) 2009-2011 Klaus Reimer <k@ailis.de>
 * See LICENSE.txt for licensing information.
 * 
 * @use twodee/PolygonNode.js
 * @use twodee/BoundingBox.js
 * @use twodee/Matrix.js
 * @use twodee/Physics.js
 * @use twodee/Polygon.js
 * @use twodee/SceneNode.js
 * @use twodee/Vector.js
 */

/** 
 * @license
 * TwoDee - JavaScript 2D scene graph engine
 * http://kayahr.github.com/twodee
 * 
 * Copyright (C) 2009-2011 Klaus Reimer <k@ailis.de>
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>
 * 
 */

/** 
 * The twodee namespace
 * @type {Object} 
 */
var twodee = {};

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
