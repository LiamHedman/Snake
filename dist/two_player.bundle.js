(()=>{"use strict";function e(e,a,d,t,n,o,r,i,s,c,l,h){switch(e.snake_direction){case"up":d.drawImage(t,e.headX*h,e.headY*h,h,h);break;case"down":d.drawImage(n,e.headX*h,e.headY*h,h,h);break;case"left":d.drawImage(o,e.headX*h,e.headY*h,h,h);break;case"right":d.drawImage(r,e.headX*h,e.headY*h,h,h)}switch(a.snake_direction){case"up":d.drawImage(i,a.headX*h,a.headY*h,h,h);break;case"down":d.drawImage(s,a.headX*h,a.headY*h,h,h);break;case"left":d.drawImage(c,a.headX*h,a.headY*h,h,h);break;case"right":d.drawImage(l,a.headX*h,a.headY*h,h,h)}}function a(e,d,t){var n,o;n=Math.floor(Math.random()*d),o=Math.floor(Math.random()*t);for(var r=0;r<e.snake_body.length;r++)if(n===e.snake_body[r][0]&&o===e.snake_body[r][1]||n===e.headX&&o===e.headY)return a(e,d,t);return[n,o]}function d(e,a,d){return e.headX==a&&e.headY==d&&(e.snake_body.push([a,d]),!0)}function t(e,a,d,t,n,o,r){for(var i=e.snake_body.length-1;i>0;i--)e.snake_body[i]=e.snake_body[i-1];e.snake_body.length&&(e.snake_body[0]=[e.headX,e.headY]),e.headX+=e.velocityX,e.headY+=e.velocityY,function(e,a,d,t,n,o,r){switch(e.snake_direction){case"up":a.drawImage(d,e.headX*r,e.headY*r,r,r);break;case"down":a.drawImage(t,e.headX*r,e.headY*r,r,r);break;case"left":a.drawImage(n,e.headX*r,e.headY*r,r,r);break;case"right":a.drawImage(o,e.headX*r,e.headY*r,r,r)}}(e,a,d,t,n,o,r)}var n,o,r,i,s,c=25,l=document.createElement("button"),h=document.createElement("button"),y=document.createElement("div"),_=!1,u={snake_direction:"right",velocityX:0,velocityY:0,has_turned:!1,snake_body:[],headX:0,headY:0,head_last_cords:[0,0]},v={snake_direction:"left",velocityX:0,velocityY:0,has_turned:!1,snake_body:[],headX:19,headY:0,head_last_cords:[19,0]},g=new Image,k=new Image,f=new Image,p=new Image,b=new Image,w=new Image,X=new Image,Y=new Image;g.src="../Bilder/HeadUp.png",p.src="../Bilder/HeadRight.png",k.src="../Bilder/HeadDown.png",f.src="../Bilder/HeadLeft.png",b.src="../Bilder/HeadUp(red).png",Y.src="../Bilder/HeadRight(red).png",w.src="../Bilder/HeadDown(red).png",X.src="../Bilder/HeadLeft(red).png";var m=!1;function I(){var l,h;if(!_)if(m)!function(e,a){var d=e.createElement("div");d.textContent="GAME OVER",d.style.position="relative",d.style.top="-380px",d.style.left="0",d.style.color="white",d.style.fontFamily="Press Start 2P, monospace",d.style.fontSize="100px",e.body.appendChild(d),clearInterval(a)}(document,n);else{!function(e,a){a.fillStyle="rgb(0, 51, 102)",a.fillRect(0,0,e.width,e.height)}(o,r),function(e,a,d,t){t.fillStyle="red",t.beginPath(),t.arc(25*a+12.5,25*d+12.5,12.5,0,2*Math.PI),t.fill()}(0,i,s,r),d(u,i,s)?(l=a(u,20,20),i=l[0],s=l[1]):d(v,i,s)&&(h=a(v,20,20),i=h[0],s=h[1]),t(u,r,g,k,f,p,c),t(v,r,b,w,X,Y,c),function(e,a,d){for(var t=0;t<a.snake_body.length;t++){var n=(void 0,void 0,r=150-3*(o=t),i=Math.min(100,3*o),"rgb(".concat(i,", ").concat(r,", 0)"));e.fillStyle=n,e.fillRect(25*a.snake_body[t][0],25*a.snake_body[t][1],25,25)}var o,r,i}(r,u),function(e,a,d){for(var t=0;t<a.snake_body.length;t++){var n=(void 0,void 0,r=150-3*(o=t),i=Math.min(100,3*o),"rgb(".concat(r,", ").concat(i,", 0)"));e.fillStyle=n,e.fillRect(25*a.snake_body[t][0],25*a.snake_body[t][1],25,25)}var o,r,i}(r,v),e(u,v,r,g,k,f,p,b,w,X,Y,c),e(u,v,r,g,k,f,p,b,w,X,Y,c),(u.head_last_cords==v.head_last_cords||u.headX==v.headX&&u.headY==v.headY||u.head_last_cords[0]==v.headX&&u.head_last_cords[1]==v.headY||v.head_last_cords[0]==u.headX&&v.head_last_cords[1]==u.headY||u.head_last_cords==v.snake_body[1]||v.head_last_cords==u.snake_body[1])&&(m=!0),(u.headX<0||u.headX>19||u.headY<0||u.headY>19)&&(m=!0);for(var y=0;y<u.snake_body.length;y++)u.headX==u.snake_body[y][0]&&u.headY==u.snake_body[y][1]&&(m=!0);for(y=0;y<v.snake_body.length;y++)u.headX==v.snake_body[y][0]&&u.headY==v.snake_body[y][1]&&(m=!0);for((v.headX<0||v.headX>19||v.headY<0||v.headY>19)&&(m=!0),y=0;y<v.snake_body.length;y++)v.headX==v.snake_body[y][0]&&v.headY==v.snake_body[y][1]&&(m=!0);for(y=0;y<u.snake_body.length;y++)v.headX==u.snake_body[y][0]&&v.headY==u.snake_body[y][1]&&(m=!0);u.head_last_cords=[u.headX,u.headY],v.head_last_cords=[v.headX,v.headY],u.has_turned=!1,v.has_turned=!1}}window.onload=function(){var e;(o=document.getElementById("board")).height=500,o.width=500,r=o.getContext("2d"),e=a(u,20,20),i=e[0],s=e[1],document.addEventListener("keydown",(function(e){!function(e,a,d){a.has_turned||("KeyW"==e.code&&1!=a.velocityY?(a.snake_direction="up",a.velocityX=0,a.velocityY=-1,a.has_turned=!0):"KeyS"==e.code&&-1!=a.velocityY?(a.snake_direction="down",a.velocityX=0,a.velocityY=1,a.has_turned=!0):"KeyD"==e.code&&-1!=a.velocityX?(a.snake_direction="right",a.velocityX=1,a.velocityY=0,a.has_turned=!0):"KeyA"==e.code&&1!=a.velocityX&&(a.snake_direction="left",a.velocityX=-1,a.velocityY=0,a.has_turned=!0)),d.has_turned||("ArrowUp"==e.code&&1!=d.velocityY?(d.snake_direction="up",d.velocityX=0,d.velocityY=-1,d.has_turned=!0):"ArrowDown"==e.code&&-1!=d.velocityY?(d.snake_direction="down",d.velocityX=0,d.velocityY=1,d.has_turned=!0):"ArrowRight"==e.code&&-1!=d.velocityX?(d.snake_direction="right",d.velocityX=1,d.velocityY=0,d.has_turned=!0):"ArrowLeft"==e.code&&1!=d.velocityX&&(d.snake_direction="left",d.velocityX=-1,d.velocityY=0,d.has_turned=!0))}(e,u,v)})),n=setInterval(I,100),function(e){e.textContent="RESTART",e.style.position="relative",e.style.top="-520px",e.style.right="-180px",e.style.padding="5px 10px",e.style.fontSize="16px",e.style.cursor="pointer",e.style.color="white",e.style.backgroundColor="transparent",document.body.appendChild(e)}(l),document.body.appendChild(l),y.innerText="Press SPACE to pause",function(e){document.body.appendChild(e)}(y),l.addEventListener("click",(function(){location.reload()})),function(e){e.textContent="MENU",e.style.position="fixed",e.style.top="20px",e.style.left="20px",e.style.padding="5px 10px",e.style.fontSize="20px",e.style.cursor="pointer",e.style.color="white",e.style.backgroundColor="#003366",e.style.borderRadius="5px",document.body.appendChild(e)}(h),h.addEventListener("click",(function(){window.location.href="../index.html"})),document.body.appendChild(l)},window.addEventListener("keydown",(function(e){"Space"===e.code&&(_?(n=setInterval(I,100),y.innerText="Press SPACE to pause"):(clearInterval(n),y.innerText="Press SPACE to resume"),_=!_)}))})();