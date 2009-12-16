var twodee = {};

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
    /** */ function tmp() { /* Empty */ }
    tmp.prototype = superClass.prototype;
    subClass.prototype = new tmp();
    subClass.prototype.constructor = subClass;
};