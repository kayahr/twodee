<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
  <head>
    <title>ThreeDee demo: Box</title>
    <script src="../scripts/twodee.js" type="text/javascript"></script>
    <script type="text/javascript">
    /* <![CDATA[ */

    // The box polygon
    var box = new twodee.Polygon([
        new twodee.Vector(-50, -50),
        new twodee.Vector(50, -50),
        new twodee.Vector(50, 50),
        new twodee.Vector(-50, 50)
    ]);

    function handleCollisionStart(node1, node2)
    {
        console.log(node1.name + " started to collide with " + node2.name);
        console.log(node1.getParentNode());
        node1.remove();
    } 

    function handleCollisionStop(node1, node2)
    {
        console.log(node1.name + " stopped to collide with " + node2.name);
    } 

    // Creates the root node
    var rootNode = new twodee.SceneNode();

    var innerNode = new twodee.SceneNode();
    rootNode.appendChild(innerNode);

    // Create the box node
    var boxNode1 = new twodee.PolygonNode(box);
    boxNode1.connect("collisionStarted", handleCollisionStart);
    boxNode1.connect("collisionStopped", handleCollisionStop);
    boxNode1.name = "white";
    innerNode.appendChild(boxNode1);
    boxNode1.getTransform().translate(-75, -75);
    boxNode1.setCollisionType(1);
    
    var boxNode2 = new twodee.PolygonNode(box);
    boxNode2.connect("collisionStarted", handleCollisionStart);
    boxNode2.connect("collisionStopped", handleCollisionStop);
    boxNode2.name = "red";
    innerNode.appendChild(boxNode2);
    boxNode2.setFillStyle("#f00");
    boxNode2.getTransform().translate(75, 75);
    boxNode2.setCollisionType(1);

    var boxNode3 = new twodee.PolygonNode(box);
    boxNode3.connect("collisionStarted", handleCollisionStart);
    boxNode3.connect("collisionStopped", handleCollisionStop);
    boxNode3.name = "green";
    innerNode.appendChild(boxNode3);
    boxNode3.setFillStyle("#0f0");
    boxNode3.setCollisionType(1);
    boxNode3.setCollisionMask(1);    

    // Create the scene
    var scene = new twodee.Scene();    
    scene.setRootNode(rootNode);
    
    // The graphics context and the elements canvas
    var g;

    function init()
    {
        var canvas;
        
        canvas = document.getElementById("canvas");
        g = canvas.getContext("2d");
        setInterval(render, 0);
    }

    function render()
    {
        var canvas, width, height;
        
        canvas = g.canvas;
        width = canvas.width;
        height = canvas.height;

        g.clearRect(0, 0, width, height);

        scene.update(); 
        scene.render(g, width, height);
    }
    
    /* ]]> */
    </script>
  </head>
  <body onload="init()">
    <h1>TwoDee demo: Square</h1>
    <p>
      This demo shows a simple rotating square. 
    </p>
    <hr />
    <div style="position:relative">
      <canvas id="canvas" width="480" height="320" style="background:black"></canvas>
      <pre id="debugInfo" style="position:absolute;left:5px;top:5px;font-size:12px;color:#0f0;margin:0"></pre>     
    </div>
    <hr />
    <p>
      Copyright (C) 2009 Klaus Reimer
    </p>
  </body>
</html>
