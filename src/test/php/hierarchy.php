<?php require "../../../target/demo/resolver.php" ?>
<!DOCTYPE html>
<html>
  <head>
    <?php $resolver->includeScript("twodee/Scene.js"); ?>
    <?php $resolver->includeScript("twodee/SceneNode.js"); ?>
    <?php $resolver->includeScript("twodee/PolygonNode.js"); ?>
    <?php $resolver->includeScript("twodee/Polygon.js"); ?>
    <?php $resolver->includeScript("twodee/Physics.js"); ?>
    <script type="text/javascript">
    /* <![CDATA[ */
    
    var canvas, ctx, scene;
    
    function test()
    {
        canvas = document.getElementById("output");
        ctx = canvas.getContext("2d");

        scene = new twodee.Scene();

        var root = new twodee.SceneNode();
        scene.setRootNode(root);

        var base = new twodee.PolygonNode(new twodee.Polygon([
            new twodee.Vector(-100, 5),
            new twodee.Vector(100, 5),
            new twodee.Vector(100, -5),
            new twodee.Vector(-100, -5)
        ]));        
        base.setStrokeStyle("black");
        base.setFillStyle("green");
        base.setPhysics(new twodee.Physics().setSpin(1));
        root.appendChild(base);

        var end1 = new twodee.PolygonNode(new twodee.Polygon([
            new twodee.Vector(-25, 5),
            new twodee.Vector(25, 5),
            new twodee.Vector(25, -5),
            new twodee.Vector(-25, -5)
        ]));        
        end1.getTransform().translate(100, 0);
        end1.setStrokeStyle("black");
        end1.setFillStyle("yellow");
        end1.setPhysics(new twodee.Physics().setSpin(5));
        base.appendChild(end1);
        
        var end2 = new twodee.PolygonNode(new twodee.Polygon([
            new twodee.Vector(-25, 5),
            new twodee.Vector(25, 5),
            new twodee.Vector(25, -5),
            new twodee.Vector(-25, -5)
        ]));        
        end2.getTransform().translate(-100, 0);
        end2.setStrokeStyle("black");
        end2.setFillStyle("yellow");
        end2.setPhysics(new twodee.Physics().setSpin(-10));
        base.appendChild(end2);
      
        setInterval(render, 20);
    }    

    function render()
    {
        var width, height;

        width = canvas.width;
        height = canvas.height;
        ctx.clearRect(0, 0, width, height);
        scene.update();
        scene.render(ctx, width, height);
    }
    
    /* ]]> */
    </script>
  </head>
  <body onload="test()">
    <h1>Hierarchy test</h1>
    <canvas id="output" width="256" height="256"></canvas>
  </body>
</html>
    