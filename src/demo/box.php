<?php require("../../target/demo/resolver.php"); ?>
<!DOCTYPE html>
<html>
  <head>
    <title>TwoDee demo: Square</title>
    <? $resolver->includeScript("twodee/Polygon.js") ?>
    <? $resolver->includeScript("twodee/SceneNode.js") ?>
    <? $resolver->includeScript("twodee/Physics.js") ?>
    <? $resolver->includeScript("twodee/Scene.js") ?>
    <? $resolver->includeScript("twodee/FpsCounter.js") ?>    
    <script type="text/javascript">
    /* <![CDATA[ */

    // The box polygon
    var box = new twodee.Polygon([
        new twodee.Vector(-50, -50),
        new twodee.Vector(50, -50),
        new twodee.Vector(50, 50),
        new twodee.Vector(-50, 50)
    ]); 

    // Creates the root node
    var rootNode = new twodee.SceneNode();

    var innerNode = new twodee.SceneNode();
    rootNode.appendChild(innerNode);

    // Create the box node
    var boxNode = new twodee.PolygonNode(box);
    //boxNode.setCollidable(true);
    innerNode.appendChild(boxNode);

    // Apply physics
    var physics = new twodee.Physics();
    
    physics.setSpin(0.1 * Math.PI / 180);
    physics.getVelocity().set(0, 0);
    physics.getAcceleration().set(0.1, 0.1);
    physics.setMaxVelocity(50);
    physics.setMaxSpin(360 * Math.PI / 180);
    physics.setSpinAcceleration(0.1);
    physics.setLifetime(5);
    physics.setDecay(2);
    innerNode.setPhysics(physics);

    var boxNode2 = new twodee.PolygonNode(box);
    //boxNode2.setCollidable(true);
    boxNode2.setFillStyle("#f00");
    boxNode2.getTransform().translate(110, 0);
    innerNode.appendChild(boxNode2);

    // Watch collisions
    boxNode2.connect("collisionStarted", function(a, b) { console.log("Collision started"); });
    boxNode2.connect("collisionStopped", function(a, b) { console.log("Collision stopped"); });

    // Create the scene
    var scene = new twodee.Scene();    
    scene.setRootNode(rootNode);
    
    // The graphics context and the elements canvas
    var g;

    var fps = new twodee.FpsCounter();

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

        fps.frame();
        
        
        document.getElementById("debugInfo").innerHTML = fps.getFps() + "\n\n" + twodee.getDebugInfo();
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
      Copyright (C) 2009-2011 Klaus Reimer
    </p>
  </body>
</html>