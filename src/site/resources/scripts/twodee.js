/**
 * @provide twodee/PolygonNode.js
 * @provide twodee/Object.js
 * @provide twodee/Matrix.js
 * @provide twodee/ImageNode.js
 * @provide twodee/Polygon.js
 * @provide twodee/Scene.js
 * @provide twodee/FpsCounter.js
 * @provide twodee/Vector.js
 * @provide twodee/SceneNode.js
 * @provide twodee/Physics.js
 * @provide twodee.js
 * @provide twodee/BoundingBox.js
 */
/*

 TwoDee - JavaScript 2D scene graph engine
 http://kayahr.github.com/twodee

 Copyright (C) 2009-2011 Klaus Reimer <k@ailis.de>

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Lesser General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU Lesser General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>

*/
var twodee={};twodee.debugInfo=null;twodee.inherit=function(subClass,superClass){var tmp=superClass.prototype;superClass=new Function;superClass.prototype=tmp;subClass.prototype=new superClass;subClass.prototype.constructor=subClass};
twodee.getDebugInfo=function(){var boundingBox,matrix,physics,polygon,polygonNode,sceneNode,vector,info,d;d=twodee.debugInfo;boundingBox=twodee.BoundingBox.counter;matrix=twodee.Matrix.counter;physics=twodee.Physics.counter;polygon=twodee.Polygon.counter;polygonNode=twodee.PolygonNode.counter;sceneNode=twodee.SceneNode.counter;vector=twodee.Vector.counter;info="Objects (since last call):\n"+"  BoundingBox: "+boundingBox+" ("+(boundingBox-(d?d["boundingBox"]:0))+")\n"+"  Matrix: "+matrix+" ("+(matrix-
(d?d["matrix"]:0))+")\n"+"  Physics: "+physics+" ("+(physics-(d?d["physics"]:0))+")\n"+"  Polygon: "+polygon+" ("+(polygon-(d?d["polygon"]:0))+")\n"+"  PolygonNode: "+polygonNode+" ("+(polygonNode-(d?d["polygonNode"]:0))+")\n"+"  SceneNode: "+sceneNode+" ("+(sceneNode-(d?d["sceneNode"]:0))+")\n"+"  Vector: "+vector+" ("+(vector-(d?d["vector"]:0))+")\n";if(!d)d=twodee.debugInfo={};d["boundingBox"]=boundingBox;d["matrix"]=matrix;d["physics"]=physics;d["polygon"]=polygon;d["polygonNode"]=polygonNode;
d["sceneNode"]=sceneNode;d["vector"]=vector;return info};twodee.Object=function(){this.slots=[]};
twodee.Object.prototype.slots=null;twodee.Object.prototype.getSlots=function(signal){var slots;slots=this.slots[signal];if(!slots)slots=this.slots[signal]=[];return slots};
twodee.Object.prototype.connect=function(signal,func,context){this.getSlots(signal).push({func:func,context:context?context:window})};
twodee.Object.prototype.disconnect=function(signal,func,context){var slots,i,slot;if(!signal){this.slots=null;return}if(!context)context=window;slots=this.getSlots(signal);for(i=slots.length-1;i>=0;i--){slot=slots[i];if(!func||slot.func==func&&slot.context==context)slots.splice(i,1)}};
twodee.Object.prototype.sendSignal=function(signal,varargs){var slots,i,args,slot;args=[];for(i=1;i<arguments.length;i++)args.push(arguments[i]);slots=this.getSlots(signal);for(i=slots.length-1;i>=0;i--){slot=slots[i];slot.func.apply(slot.context,args)}};twodee.SceneNode=function(){twodee.Object.call(this);this.transform=new twodee.Matrix;this.collisions={};this.previousCollisions={};this.id=twodee.SceneNode.counter++};
twodee.inherit(twodee.SceneNode,twodee.Object);twodee.SceneNode.counter=0;twodee.SceneNode.prototype.id=0;twodee.SceneNode.prototype.parentNode=null;twodee.SceneNode.prototype.nextSibling=null;twodee.SceneNode.prototype.previousSibling=null;twodee.SceneNode.prototype.firstChild=null;twodee.SceneNode.prototype.lastChild=null;twodee.SceneNode.prototype.transform=null;twodee.SceneNode.prototype.effectiveTransform=null;twodee.SceneNode.prototype.bounds=null;twodee.SceneNode.prototype.collisionType=0;
twodee.SceneNode.prototype.collisionMask=0;twodee.SceneNode.prototype.collisions;twodee.SceneNode.prototype.previousCollisions;twodee.SceneNode.prototype.physics=null;twodee.SceneNode.prototype.enabled=true;twodee.SceneNode.prototype.opacity=1;twodee.SceneNode.prototype.getId=function(){return this.id};
twodee.SceneNode.prototype.getFirstChild=function(){return this.firstChild};
twodee.SceneNode.prototype.getLastChild=function(){return this.lastChild};
twodee.SceneNode.prototype.getNextSibling=function(){return this.nextSibling};
twodee.SceneNode.prototype.getParentNode=function(){return this.parentNode};
twodee.SceneNode.prototype.getPreviousSibling=function(){return this.previousSibling};
twodee.SceneNode.prototype.insertBefore=function(insertNode,referenceNode){var oldParent,oldPrevious;if(!insertNode)throw new Error("newNode must be set");if(!referenceNode)throw new Error("referenceNode must be set");if(insertNode==this)throw new Error("newNode can not be a child of itself");if(referenceNode.parentNode!=this)throw new Error("Reference node is not my child node");oldParent=insertNode.parentNode;if(oldParent)oldParent.removeChild(insertNode);oldPrevious=referenceNode.previousSibling;
if(oldPrevious)oldPrevious.nextSibling=insertNode;else this.firstChild=insertNode;referenceNode.previousSibling=insertNode;insertNode.previousSibling=oldPrevious;insertNode.nextSibling=referenceNode;insertNode.parentNode=this};
twodee.SceneNode.prototype.hasChildNodes=function(){return!!this.firstChild};
twodee.SceneNode.prototype.remove=function(){var parentNode;parentNode=this.parentNode;if(parentNode)parentNode.removeChild(this)};
twodee.SceneNode.prototype.removeChildren=function(){while(this.firstChild)this.removeChild(this.firstChild)};
twodee.SceneNode.prototype.removeChild=function(node){var next,prev;if(!node)throw new Error("node must be set");if(node.parentNode!=this)throw new Error("node is not my child node");next=node.nextSibling;prev=node.previousSibling;if(next)next.previousSibling=prev;if(prev)prev.nextSibling=next;if(node==this.firstChild)this.firstChild=next;if(node==this.lastChild)this.lastChild=prev;node.parentNode=null;node.nextSibling=null;node.previousSibling=null};
twodee.SceneNode.prototype.appendChild=function(node){var oldParent,previousSibling;if(!node)throw new Error("node must not be null");if(node==this)throw new Error("node can not be a child of itself");oldParent=node.parentNode;if(oldParent)oldParent.removeChild(node);previousSibling=node.previousSibling=this.lastChild;if(previousSibling)previousSibling.nextSibling=node;this.lastChild=node;if(!this.firstChild)this.firstChild=node;node.parentNode=this};
twodee.SceneNode.prototype.replaceChild=function(oldNode,newNode){var next;if(!oldNode)throw new Error("oldNode must be set");if(!newNode)throw new Error("newNode must be set");if(newNode==this)throw new Error("node can not be a child of itself");if(oldNode.parentNode!=this)throw new Error("node is not my child node");if(newNode!=oldNode){next=oldNode.nextSibling;this.removeChild(oldNode);if(next==null)this.appendChild(newNode);else this.insertBefore(newNode,next)}};
twodee.SceneNode.prototype.updateTransformation=function(baseTransform){var parentNode,transform,bounds;parentNode=this.parentNode;if(parentNode){this.effectiveTransform=parentNode.effectiveTransform.copy(this.effectiveTransform);transform=this.effectiveTransform.transform(this.transform)}else{this.effectiveTransform=baseTransform.copy(this.effectiveTransform);transform=this.effectiveTransform.transform(this.transform)}bounds=this.bounds;if(bounds)bounds.setTransform(transform);return transform};
twodee.SceneNode.prototype.getTransform=function(){return this.transform};
twodee.SceneNode.prototype.setBounds=function(bounds){this.bounds=bounds.copy()};
twodee.SceneNode.prototype.getBounds=function(){return this.bounds};
twodee.SceneNode.prototype.setCollisionType=function(collisionType){this.collisionType=collisionType};
twodee.SceneNode.prototype.getCollisionType=function(){return this.collisionType};
twodee.SceneNode.prototype.setCollisionMask=function(collisionMask){this.collisionMask=collisionMask};
twodee.SceneNode.prototype.getCollisionMask=function(){return this.collisionMask};
twodee.SceneNode.prototype.isCollidable=function(){return!!this.collisionType&&!!this.bounds};
twodee.SceneNode.prototype.collidesWith=function(other){if(!this.parentNode)return false;if(!other.getParentNode())return false;if(!(this.collisionMask&other.collisionType))return false;return this.bounds.collidesWith(other.bounds)};
twodee.SceneNode.prototype.collide=function(other){this.collisions[""+other.getId()]=other};
twodee.SceneNode.prototype.processCollisions=function(){var id,collisions,previousCollisions;collisions=this.collisions;previousCollisions=this.previousCollisions;if(this.parentNode)for(id in collisions)if(!(id in previousCollisions)){if(collisions[id].parentNode)this.sendSignal("collisionStarted",this,collisions[id]);if(!this.parentNode)break}for(id in previousCollisions){if(!(id in collisions))this.sendSignal("collisionStopped",this,previousCollisions[id]);delete previousCollisions[id]}for(id in collisions){previousCollisions[id]=
this.collisions[id];delete collisions[id]}};
twodee.SceneNode.prototype.setPhysics=function(physics){this.physics=physics};
twodee.SceneNode.prototype.getPhysics=function(){return this.physics};
twodee.SceneNode.prototype.update=function(delta){var physics;physics=this.physics;if(physics)physics.process(this,delta)};
twodee.SceneNode.prototype.render=function(g,transform){};
twodee.SceneNode.prototype.enable=function(){this.setEnabled(true)};
twodee.SceneNode.prototype.disable=function(){this.setEnabled(false)};
twodee.SceneNode.prototype.setEnabled=function(enabled){this.enabled=enabled};
twodee.SceneNode.prototype.isEnabled=function(){return this.enabled};
twodee.SceneNode.prototype.setOpacity=function(opacity){this.opacity=opacity};
twodee.SceneNode.prototype.getOpacity=function(){return this.opacity};twodee.PolygonNode=function(polygon,fillStyle,strokeStyle){twodee.SceneNode.call(this);if(polygon)this.setPolygon(polygon);if(fillStyle!==undefined)this.fillStyle=fillStyle;if(strokeStyle!==undefined)this.strokeStyle=strokeStyle;twodee.PolygonNode.counter++};
twodee.inherit(twodee.PolygonNode,twodee.SceneNode);twodee.PolygonNode.counter=0;twodee.PolygonNode.prototype.polygon=null;twodee.PolygonNode.prototype.fillStyle="#fff";twodee.PolygonNode.prototype.strokeStyle=null;twodee.PolygonNode.prototype.setPolygon=function(polygon){this.setBounds(polygon);this.polygon=this.getBounds()};
twodee.PolygonNode.prototype.getPolygon=function(){return this.polygon};
twodee.PolygonNode.prototype.setFillStyle=function(fillStyle){this.fillStyle=fillStyle};
twodee.PolygonNode.prototype.getFillStyle=function(){return this.fillStyle};
twodee.PolygonNode.prototype.setStrokeStyle=function(strokeStyle){this.strokeStyle=strokeStyle};
twodee.PolygonNode.prototype.getStrokeStyle=function(){return this.strokeStyle};
twodee.PolygonNode.prototype.render=function(g){var polygon,fillStyle,strokeStyle;fillStyle=this.fillStyle;strokeStyle=this.strokeStyle;if(fillStyle||strokeStyle){polygon=this.polygon;polygon.apply(g);if(fillStyle){g.fillStyle=fillStyle;g.fill()}if(strokeStyle){g.strokeStyle=strokeStyle;g.stroke()}}};twodee.Vector=function(x,y){if(x)this.x=x;if(y)this.y=y;twodee.Vector.counter++};
twodee.Vector.counter=0;twodee.Vector.prototype.x=0;twodee.Vector.prototype.y=0;twodee.Vector.prototype.copy=function(v){return(v?v:new twodee.Vector).set(this.x,this.y)};
twodee.Vector.prototype.isZero=function(){return!this.x&&!this.y};
twodee.Vector.prototype.set=function(x,y){this.x=x;this.y=y;return this};
twodee.Vector.prototype.add=function(v){this.x+=v.x;this.y+=v.y;return this};
twodee.Vector.prototype.sub=function(v){this.x-=v.x;this.y-=v.y;return this};
twodee.Vector.prototype.scale=function(fx,fy){this.x*=fx;this.y*=fy===undefined?fx:fy;return this};
twodee.Vector.prototype.rotate=function(angle){var x,y,s,c;s=Math.sin(angle);c=Math.cos(angle);x=this.x;y=this.y;this.x=x*c-y*s;this.y=x*s+y*c;return this};
twodee.Vector.prototype.dot=function(v){return this.x*v.x+this.y*v.y};
twodee.Vector.prototype.cross=function(v){var x,y;x=this.y*v.x-this.x*v.y;y=this.x*v.y-this.y*v.x;this.x=x;this.y=y;return this};
twodee.Vector.prototype.getLength=function(){return Math.sqrt(this.x*this.x+this.y*this.y)};
twodee.Vector.prototype.toUnit=function(){var len;len=this.getLength();this.x/=len;this.y/=len;return this};
twodee.Vector.prototype.getAngle=function(v){var angle=Math.atan2(this.x,this.y);if(v)angle-=Math.atan2(v.x,v.y);if(angle>Math.PI)angle-=Math.PI*2;return angle};
twodee.Vector.prototype.transform=function(m){return this.set(m.m00*this.x+m.m01*this.y+m.m02,m.m10*this.x+m.m11*this.y+m.m12)};
twodee.Vector.prototype.toJSON=function(){return{"x":this.x,"y":this.y}};
twodee.Vector.fromJSON=function(data){if(!data)return null;return new twodee.Vector(data.x,data.y)};
twodee.Vector.prototype.orthogonal=function(){var tmp=this.x;this.x=-this.y;this.y=tmp;return this};twodee.Matrix=function(){twodee.Matrix.counter++;this.translation=new twodee.Vector};
twodee.Matrix.counter=0;twodee.Matrix.TMP=new twodee.Matrix;twodee.Matrix.prototype.translation;twodee.Matrix.prototype.m00=1;twodee.Matrix.prototype.m01=0;twodee.Matrix.prototype.m02=0;twodee.Matrix.prototype.m10=0;twodee.Matrix.prototype.m11=1;twodee.Matrix.prototype.m12=0;twodee.Matrix.prototype.m20=0;twodee.Matrix.prototype.m21=0;twodee.Matrix.prototype.m22=1;
twodee.Matrix.prototype.copy=function(target){return(target?target:new twodee.Matrix).set(this.m00,this.m01,this.m02,this.m10,this.m11,this.m12,this.m20,this.m21,this.m22)};
twodee.Matrix.prototype.set=function(m00,m01,m02,m10,m11,m12,m20,m21,m22){this.m00=m00;this.m01=m01;this.m02=m02;this.m10=m10;this.m11=m11;this.m12=m12;this.m20=m20;this.m21=m21;this.m22=m22;return this};
twodee.Matrix.prototype.setTransform=function(transform){this.m00=transform.m00;this.m01=transform.m01;this.m02=transform.m02;this.m10=transform.m10;this.m11=transform.m11;this.m12=transform.m12;this.m20=transform.m20;this.m21=transform.m21;this.m22=transform.m22;return this};
twodee.Matrix.prototype.setIdentity=function(){return this.set(1,0,0,0,1,0,0,0,1)};
twodee.Matrix.prototype.setRotate=function(angle){var s,c;s=Math.sin(angle);c=Math.cos(angle);return this.set(c,-s,0,s,c,0,0,0,1)};
twodee.Matrix.prototype.getRotationAngle=function(){return Math.atan2(this.m10,this.m00)};
twodee.Matrix.prototype.setScale=function(fx,fy){return this.set(fx,0,0,0,fy===undefined?fx:fy,0,0,0,1)};
twodee.Matrix.prototype.setScaleX=function(f){return this.set(f,0,0,0,1,0,0,0,1)};
twodee.Matrix.prototype.setScaleY=function(f){return this.set(1,0,0,0,f,0,0,0,1)};
twodee.Matrix.prototype.setTranslate=function(dx,dy){return this.set(1,0,dx,0,1,dy,0,0,1)};
twodee.Matrix.prototype.getTranslationX=function(){return this.m02};
twodee.Matrix.prototype.getTranslationY=function(){return this.m12};
twodee.Matrix.prototype.getTranslation=function(){return this.translation.set(this.m02,this.m12)};
twodee.Matrix.prototype.setTranslateX=function(d){return this.set(1,0,d,0,1,0,0,0,1)};
twodee.Matrix.prototype.setTranslateY=function(d){return this.set(1,0,0,0,1,d,0,0,1)};
twodee.Matrix.prototype.transform=function(m){return this.set(this.m00*m.m00+this.m01*m.m10+this.m02*m.m20,this.m00*m.m01+this.m01*m.m11+this.m02*m.m21,this.m00*m.m02+this.m01*m.m12+this.m02*m.m22,this.m10*m.m00+this.m11*m.m10+this.m12*m.m20,this.m10*m.m01+this.m11*m.m11+this.m12*m.m21,this.m10*m.m02+this.m11*m.m12+this.m12*m.m22,this.m20*m.m00+this.m21*m.m10+this.m22*m.m20,this.m20*m.m01+this.m21*m.m11+this.m22*m.m21,this.m20*m.m02+this.m21*m.m12+this.m22*m.m22)};
twodee.Matrix.prototype.multiply=function(f){this.m00*=f;this.m01*=f;this.m02*=f;this.m10*=f;this.m11*=f;this.m12*=f;this.m20*=f;this.m21*=f;this.m22*=f;return this};
twodee.Matrix.prototype.divide=function(f){this.m00/=f;this.m01/=f;this.m02/=f;this.m10/=f;this.m11/=f;this.m12/=f;this.m20/=f;this.m21/=f;this.m22/=f;return this};
twodee.Matrix.prototype.translate=function(dx,dy){return this.transform(twodee.Matrix.TMP.setTranslate(dx,dy))};
twodee.Matrix.prototype.translateX=function(d){return this.transform(twodee.Matrix.TMP.setTranslateX(d))};
twodee.Matrix.prototype.translateY=function(d){return this.transform(twodee.Matrix.TMP.setTranslateY(d))};
twodee.Matrix.prototype.scale=function(fx,fy){return this.transform(twodee.Matrix.TMP.setScale(fx,fy===undefined?fx:fy))};
twodee.Matrix.prototype.scaleX=function(f){return this.transform(twodee.Matrix.TMP.setScaleX(f))};
twodee.Matrix.prototype.scaleY=function(f){return this.transform(twodee.Matrix.TMP.setScaleY(f))};
twodee.Matrix.prototype.rotate=function(r){return this.transform(twodee.Matrix.TMP.setRotate(r))};
twodee.Matrix.prototype.getDeterminant=function(){return this.m00*this.m11*this.m22+this.m01*this.m12*this.m20+this.m02*this.m10*this.m21-this.m00*this.m12*this.m21-this.m01*this.m10*this.m22-this.m02*this.m11*this.m20};
twodee.Matrix.prototype.invert=function(){var d;d=this.getDeterminant();return this.set(this.m11*this.m22-this.m12*this.m21,this.m02*this.m21-this.m01*this.m22,this.m01*this.m12-this.m02*this.m11,this.m12*this.m20-this.m10*this.m22,this.m00*this.m22-this.m02*this.m20,this.m02*this.m10-this.m00*this.m12,this.m10*this.m21-this.m11*this.m20,this.m01*this.m20-this.m00*this.m21,this.m00*this.m11-this.m01*this.m10).divide(d)};twodee.BoundingBox=function(){twodee.BoundingBox.counter++};
twodee.BoundingBox.counter=0;twodee.BoundingBox.prototype.top=Number.POSITIVE_INFINITY;twodee.BoundingBox.prototype.right=Number.NEGATIVE_INFINITY;twodee.BoundingBox.prototype.bottom=Number.NEGATIVE_INFINITY;twodee.BoundingBox.prototype.left=Number.POSITIVE_INFINITY;twodee.BoundingBox.prototype.reset=function(){this.top=Number.POSITIVE_INFINITY;this.right=Number.NEGATIVE_INFINITY;this.bottom=Number.NEGATIVE_INFINITY;this.left=Number.POSITIVE_INFINITY};
twodee.BoundingBox.prototype.update=function(v){var x,y;x=v.x;y=v.y;this.top=Math.min(this.top,y);this.right=Math.max(this.right,x);this.bottom=Math.max(this.bottom,y);this.left=Math.min(this.left,x)};
twodee.BoundingBox.prototype.collidesWith=function(other){return this.top<=other.bottom&&this.bottom>=other.top&&this.left<=other.right&&this.right>=other.left};
twodee.BoundingBox.prototype.getWidth=function(){return this.right-this.left};
twodee.BoundingBox.prototype.getHeight=function(){return this.bottom-this.top};twodee.Polygon=function(vertices){this.vertices=vertices;this.transformedVertices=[];this.boundingBox=new twodee.BoundingBox;this.reset();twodee.Polygon.counter++};
twodee.Polygon.counter=0;twodee.Polygon.V1=new twodee.Vector;twodee.Polygon.V2=new twodee.Vector;twodee.Polygon.prototype.transformedVertices=null;twodee.Polygon.prototype.vertices=null;twodee.Polygon.prototype.boundingBox=null;
twodee.Polygon.prototype.reset=function(){var i,transformedVertices,vertices,vertex;transformedVertices=this.transformedVertices;vertices=this.vertices;i=transformedVertices.length=vertices.length;this.boundingBox.reset();while(--i>=0){vertex=vertices[i];transformedVertices[i]=vertex.copy(transformedVertices[i]);this.boundingBox.update(vertex)}};
twodee.Polygon.prototype.copy=function(){var newVertices,vertices,i,max;vertices=this.vertices;newVertices=[];for(i=0,max=vertices.length;i<max;i++)newVertices.push(vertices[i].copy());return new twodee.Polygon(newVertices)};
twodee.Polygon.prototype.apply=function(g){var max,vertices,vertex,i;vertices=this.transformedVertices;max=vertices.length;g.beginPath();vertex=vertices[0];g.moveTo(vertex.x,vertex.y);for(i=1;i<max;i++){vertex=vertices[i];g.lineTo(vertex.x,vertex.y)}if(max>2)g.closePath()};
twodee.Polygon.prototype.transform=function(m){var vertices,i;vertices=this.transformedVertices;this.boundingBox.reset();for(i=vertices.length-1;i>=0;i--)this.boundingBox.update(vertices[i].transform(m))};
twodee.Polygon.prototype.setTransform=function(m){var vertices,transformedVertices,i;vertices=this.vertices;transformedVertices=this.transformedVertices;this.boundingBox.reset();for(i=vertices.length-1;i>=0;i--)this.boundingBox.update(vertices[i].copy(transformedVertices[i]).transform(m))};
twodee.Polygon.prototype.countVertices=function(){return this.vertices.length};
twodee.Polygon.prototype.getVertex=function(index){return this.vertices[index]};
twodee.Polygon.prototype.collidesWith=function(other){var i,max;if(!this.boundingBox.collidesWith(other.boundingBox))return false;for(i=0,max=this.countVertices();i<max;i++)if(this.isSeparationAxis(other,i))return false;max=other.countVertices();if(max>2)for(i=0;i<max;i++)if(other.isSeparationAxis(this,i))return false;return true};
twodee.Polygon.prototype.isSeparationAxis=function(other,faceIndex){var normal,point,base,dir1,dir2,i,max,faceIndex2,pointIndex,vertices,otherVertices,tmp1,tmp2;tmp1=twodee.Polygon.V1;tmp2=twodee.Polygon.V2;vertices=this.transformedVertices;otherVertices=other.transformedVertices;max=this.vertices.length;faceIndex2=faceIndex==max-1?0:faceIndex+1;pointIndex=faceIndex2==max-1?0:faceIndex2+1;base=vertices[faceIndex];normal=vertices[faceIndex2].copy(tmp1).sub(base).orthogonal();point=vertices[pointIndex].copy(tmp2).sub(base);
dir1=point.dot(normal)>0;for(i=0,max=otherVertices.length;i<max;i++){point=otherVertices[i].copy(tmp2).sub(base);dir2=point.dot(normal)>0;if(dir1==dir2)return false}return true};
twodee.Polygon.prototype.getBoundingBox=function(){return this.boundingBox};twodee.Physics=function(){this.velocity=new twodee.Vector;this.acceleration=new twodee.Vector;twodee.Physics.counter++};
twodee.Physics.counter=0;twodee.Physics.V=new twodee.Vector;twodee.Physics.prototype.velocity=null;twodee.Physics.prototype.minVelocity=Number.NEGATIVE_INFINITY;twodee.Physics.prototype.maxVelocity=Number.POSITIVE_INFINITY;twodee.Physics.prototype.acceleration=null;twodee.Physics.prototype.spin=0;twodee.Physics.prototype.spinAcceleration=0;twodee.Physics.prototype.minSpin=Number.NEGATIVE_INFINITY;twodee.Physics.prototype.maxSpin=Number.POSITIVE_INFINITY;twodee.Physics.prototype.scaling=1;
twodee.Physics.prototype.lifetime=Number.POSITIVE_INFINITY;twodee.Physics.prototype.decay=1;twodee.Physics.prototype.getVelocity=function(){return this.velocity};
twodee.Physics.prototype.setMinVelocity=function(minVelocity){this.minVelocity=minVelocity;return this};
twodee.Physics.prototype.getMinVelocity=function(){return this.minVelocity};
twodee.Physics.prototype.setMaxVelocity=function(maxVelocity){this.maxVelocity=maxVelocity;return this};
twodee.Physics.prototype.getMaxVelocity=function(){return this.maxVelocity};
twodee.Physics.prototype.getAcceleration=function(){return this.acceleration};
twodee.Physics.prototype.getSpin=function(){return this.spin};
twodee.Physics.prototype.setSpin=function(spin){this.spin=spin;return this};
twodee.Physics.prototype.getSpinAcceleration=function(){return this.spinAcceleration};
twodee.Physics.prototype.setSpinAcceleration=function(spinAcceleration){this.spinAcceleration=spinAcceleration;return this};
twodee.Physics.prototype.getMinSpin=function(){return this.minSpin};
twodee.Physics.prototype.setMinSpin=function(minSpin){this.minSpin=minSpin;return this};
twodee.Physics.prototype.getMaxSpin=function(){return this.maxSpin};
twodee.Physics.prototype.setMaxSpin=function(maxSpin){this.maxSpin=maxSpin;return this};
twodee.Physics.prototype.getScaling=function(){return this.scaling};
twodee.Physics.prototype.setScaling=function(scaling){this.scaling=scaling;return this};
twodee.Physics.prototype.getLifetime=function(){return this.lifetime};
twodee.Physics.prototype.setLifetime=function(lifetime){this.lifetime=lifetime;return this};
twodee.Physics.prototype.setDecay=function(decay){this.decay=decay;return this};
twodee.Physics.prototype.getDecay=function(){return this.decay};
twodee.Physics.prototype.process=function(node,delta){var spin,transform,velocity,factor,angle,v,acceleration,spinAcceleration,curVelocity,maxVelocity,minVelocity,lifetime,decay,scaling;factor=delta/1E3;this.lifetime=lifetime=Math.max(0,this.lifetime-factor);if(!lifetime){node.remove();return}decay=this.decay;if(decay>lifetime)node.setOpacity(lifetime/decay);transform=node.getTransform();v=twodee.Physics.V;velocity=this.velocity;if(!velocity.isZero()){angle=transform.getRotationAngle();velocity.copy(v).rotate(-angle);
transform.translate(v.x*factor,v.y*factor)}acceleration=this.acceleration;if(!acceleration.isZero()){velocity.add(acceleration.copy(v).scale(factor));curVelocity=velocity.getLength();maxVelocity=this.maxVelocity;minVelocity=this.minVelocity;if(curVelocity>maxVelocity)velocity.scale(maxVelocity/curVelocity);else if(curVelocity<minVelocity)velocity.scale(minVelocity/curVelocity)}spin=this.spin;if(spin)transform.rotate(spin*factor);scaling=this.scaling;if(scaling!=1)transform.scale(Math.pow(scaling,
factor));spinAcceleration=this.spinAcceleration;if(spinAcceleration)this.spin=Math.max(this.minSpin,Math.min(this.maxSpin,spin+spinAcceleration*factor))};twodee.ImageNode=function(image){twodee.SceneNode.call(this);if(image)this.setImage(image);twodee.ImageNode.counter++};
twodee.inherit(twodee.ImageNode,twodee.SceneNode);twodee.ImageNode.counter=0;twodee.ImageNode.prototype.image=null;twodee.ImageNode.prototype.showBounds=false;twodee.ImageNode.prototype.setImage=function(image){this.image=image};
twodee.ImageNode.prototype.getImage=function(){return this.image};
twodee.ImageNode.prototype.setShowBounds=function(showBounds){this.showBounds=showBounds};
twodee.ImageNode.prototype.render=function(g,transform){var width,height,img,bounds;img=this.image;if(!img)return;width=img.width;height=img.height;if(!width||!height)return;g.save();g.transform(transform.m00,transform.m10,transform.m01,transform.m11,transform.m02,transform.m12);g.drawImage(img,-width/2,-height/2);g.restore();if(this.showBounds){bounds=this.getBounds();if(bounds){bounds.apply(g);g.strokeStyle="red";g.stroke()}}};twodee.Scene=function(){this.collidables=[];this.baseTransform=new twodee.Matrix};
twodee.Scene.prototype.rootNode=null;twodee.Scene.prototype.lastUpdate=0;twodee.Scene.prototype.collidables=null;twodee.Scene.prototype.paused=false;twodee.Scene.prototype.baseTransform;twodee.Scene.prototype.setRootNode=function(rootNode){this.rootNode=rootNode};
twodee.Scene.prototype.getRootNode=function(){return this.rootNode};
twodee.Scene.prototype.update=function(delta){var now,node,maxDelta;if(this.paused||!(node=this.rootNode))return;if(!delta||delta<0){if(delta<0)maxDelta=-delta;else maxDelta=1E3;now=(new Date).getTime();delta=Math.max(0,Math.min(maxDelta,now-this.lastUpdate));this.lastUpdate=now}this.updateNode(node,delta)};
twodee.Scene.prototype.updateNode=function(node,delta){var child,next;node.update(delta);child=node.getFirstChild();while(child){next=child.getNextSibling();this.updateNode(child,delta);child=next}};
twodee.Scene.prototype.render=function(g,width,height){var node,i,collidables,baseTransform;if(!(node=this.rootNode))return;g.save();this.baseTransform.setTranslate(width/2,height/2);this.renderNode(node,g);g.restore();collidables=this.collidables;for(i=collidables.length-1;i>=0;i--)collidables[i].processCollisions();collidables.length=0};
twodee.Scene.prototype.renderNode=function(node,g){var transform,child,i,other,collidables,next;if(!node.isEnabled())return;transform=node.updateTransformation(this.baseTransform);if(node.isCollidable()){collidables=this.collidables;for(i=collidables.length-1;i>=0;i--){other=collidables[i];if(node.collidesWith(other))node.collide(other);if(other.collidesWith(node))other.collide(node)}collidables.push(node)}g.save();g.globalAlpha=g.globalAlpha*node.getOpacity();node.render(g,transform);child=node.getFirstChild();
while(child){next=child.getNextSibling();this.renderNode(child,g);child=next}g.restore()};
twodee.Scene.prototype.pause=function(){this.paused=true;this.lastUpdate=0};
twodee.Scene.prototype.resume=function(){this.paused=false};twodee.FpsCounter=function(){};
twodee.FpsCounter.prototype.lastResult=0;twodee.FpsCounter.prototype.fps=0;twodee.FpsCounter.prototype.counter=0;twodee.FpsCounter.prototype.frame=function(){var now;now=(new Date).getTime();this.counter++;if(this.lastResult==0)this.lastResult=now;else if(this.lastResult+1E3<now){this.lastResult=now;this.fps=this.counter;this.counter=0}};
twodee.FpsCounter.prototype.getFps=function(){return this.fps};