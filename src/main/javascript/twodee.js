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

twodee.arrayCount = 0;

twodee.objectCount = 0;

twodee.countArrays = function()
{
    var result;
    
    result = this.arrayCount;
    this.arrayCount = 0;
    return result;
};

twodee.countObjects = function()
{
    var result;
    
    result = this.objectCount;
    this.objectCount = 0;
    return result;
};

twodee.newArray = function()
{
    this.arrayCount++;
    return [];
};

twodee.newObject = function()
{
    this.objectCount++;
    return {};
};