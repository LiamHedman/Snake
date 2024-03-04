(()=>{"use strict";function e(t,n,o){var a,d;a=Math.floor(Math.random()*n),d=Math.floor(Math.random()*o);for(var i=0;i<t.snake_body.length;i++)if(a===t.snake_body[i][0]&&d===t.snake_body[i][1]||a===t.headX&&d===t.headY)return e(t,n,o);return[a,d]}function t(e){document.body.appendChild(e)}var n,o,a,d,i,r={snake_direction:"up",velocityX:0,velocityY:0,has_turned:!1,snake_body:[],headX:9,headY:9,head_last_cords:[9,9]},l=new Image,c=new Image,s=new Image,y=new Image;l.src="../Bilder/HeadUp.png",y.src="../Bilder/HeadRight.png",c.src="../Bilder/HeadDown.png",s.src="../Bilder/HeadLeft.png";var h=document.createElement("div"),u=document.createElement("button"),f=document.createElement("button"),p=document.createElement("div"),v=0,m=!1,b=!1;function g(){var t;b||(m?function(e,t){var n=e.createElement("div");n.textContent="GAME OVER",n.style.position="relative",n.style.top="-380px",n.style.left="0",n.style.color="white",n.style.fontFamily="Press Start 2P, monospace",n.style.fontSize="100px",e.body.appendChild(n),clearInterval(t)}(document,n):(function(e,t){t.fillStyle="rgb(0, 51, 102)",t.fillRect(0,0,e.width,e.height)}(o,a),function(e,t,n,o){o.fillStyle="red",o.beginPath(),o.arc(25*t+12.5,25*n+12.5,12.5,0,2*Math.PI),o.fill()}(0,d,i,a),function(e,t,n){return e.headX==t&&e.headY==n&&(e.snake_body.push([t,n]),!0)}(r,d,i)&&(v=function(e,t){var n=t+Math.floor(5*Math.random()+5);return e.textContent="SCORE: "+n,n}(h,v),t=e(r,20,20),d=t[0],i=t[1]),function(e,t,n,o,a,d,i){for(var r=e.snake_body.length-1;r>0;r--)e.snake_body[r]=e.snake_body[r-1];e.snake_body.length&&(e.snake_body[0]=[e.headX,e.headY]),e.headX+=e.velocityX,e.headY+=e.velocityY,function(e,t,n,o,a,d,i){switch(e.snake_direction){case"up":t.drawImage(n,e.headX*i,e.headY*i,i,i);break;case"down":t.drawImage(o,e.headX*i,e.headY*i,i,i);break;case"left":t.drawImage(a,e.headX*i,e.headY*i,i,i);break;case"right":t.drawImage(d,e.headX*i,e.headY*i,i,i)}}(e,t,n,o,a,d,25)}(r,a,l,c,s,y),function(e,t,n){for(var o=0;o<t.snake_body.length;o++){var a=(void 0,void 0,i=150-3*(d=o),r=Math.min(100,3*d),"rgb(".concat(r,", ").concat(i,", 0)"));e.fillStyle=a,e.fillRect(25*t.snake_body[o][0],25*t.snake_body[o][1],25,25)}var d,i,r}(a,r),m=function(e,t,n){for(var o=0;o<e.snake_body.length;o++)if(e.headX==e.snake_body[o][0]&&e.headY==e.snake_body[o][1])return!0;return e.headX<0||e.headX>19||e.headY<0||e.headY>19}(r),r.has_turned=!1))}window.onload=function(){var l;(o=document.getElementById("board")).height=500,o.width=500,a=o.getContext("2d"),l=e(r,20,20),d=l[0],i=l[1],document.addEventListener("keydown",(function(e){!function(e,t){t.has_turned||("ArrowUp"==e.code&&1!=t.velocityY?(t.snake_direction="up",t.velocityX=0,t.velocityY=-1):"ArrowDown"==e.code&&-1!=t.velocityY?(t.snake_direction="down",t.velocityX=0,t.velocityY=1):"ArrowRight"==e.code&&-1!=t.velocityX?(t.snake_direction="right",t.velocityX=1,t.velocityY=0):"ArrowLeft"==e.code&&1!=t.velocityX&&(t.snake_direction="left",t.velocityX=-1,t.velocityY=0)),t.has_turned=!0}(e,r)})),n=setInterval(g,100),function(e,t){e.style.position="relative",e.style.top="0",e.style.left="0",e.style.color="black",e.style.fontFamily="Press Start 2P, monospace",e.style.fontSize="20px",e.textContent="SCORE: "+t,document.body.appendChild(e)}(h,v),function(e){e.textContent="RESTART",e.style.position="relative",e.style.top="-520px",e.style.right="-180px",e.style.padding="5px 10px",e.style.fontSize="16px",e.style.cursor="pointer",e.style.color="white",e.style.backgroundColor="transparent",document.body.appendChild(e)}(u),p.innerText="Press SPACE to pause",t(p),u.addEventListener("click",(function(){location.reload()})),function(e){e.textContent="MENU",e.style.position="fixed",e.style.top="20px",e.style.left="20px",e.style.padding="5px 10px",e.style.fontSize="20px",e.style.cursor="pointer",e.style.color="white",e.style.backgroundColor="#003366",e.style.borderRadius="5px",document.body.appendChild(e)}(f),f.addEventListener("click",(function(){window.location.href="../index.html"}))},window.addEventListener("keydown",(function(e){"Space"===e.code&&(b?function(e,n,o){setInterval(e,100),n.innerText="Press SPACE to pause",t(n)}(g,p):function(e,n){clearInterval(n),e.innerText="Press SPACE to resume",t(e)}(p,n),b=!b)}))})();