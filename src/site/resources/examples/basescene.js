// Create the scene
var scene = new twodee.Scene();       

// Setup the root node
var rootNode = new twodee.SceneNode();
scene.setRootNode(rootNode);

// The canvas element and its 2D context. Initialized once on startup.
var canvas, ctx;

// The interval ID needed to stop rendering.
var renderId;

// Initializes the render loop. Must be called once.
function init()
{
    canvas = document.getElementById("output");
    ctx = canvas.getContext("2d");
} 

// Starts the render loop.
function start()
{
    renderId = setInterval(render, 20);
}
    
// Stops the render loop.
function stop()
{
    clearInterval(renderId);
}
        
// Renders a single frame.        
function render()
{
    var width, height;

    // Get the canvas size
    width = canvas.width;
    height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Update and render the scene
    scene.update(); 
    scene.render(ctx, width, height);
}
