(()=>{"use strict";function e(e,t){var n=t+Math.floor(5*Math.random()+5);return e.textContent="SCORE: "+n,n}function t(e,n,o){var a,d;a=Math.floor(Math.random()*n),d=Math.floor(Math.random()*o);for(var r=0;r<e.snake_body.length;r++)if(a===e.snake_body[r][0]&&d===e.snake_body[r][1]||a===e.headX&&d===e.headY)return t(e,n,o);return[a,d]}function n(e,t,n,o,a){a.fillStyle=o,a.beginPath(),a.arc(t*e+e/2,n*e+e/2,e/2,0,2*Math.PI),a.fill()}function o(e,t,n){return e.headX==t&&e.headY==n&&(e.snake_body.push([t,n]),!0)}var a,d,r,i,l,c,s,y,h,u,p,f,v,b,g,m=25,k=20,w=20,_={snake_direction:"up",velocityX:0,velocityY:0,has_turned:!1,snake_body:[],headX:9,headY:9,head_last_cords:[9,9]},x=new Image,X=new Image,Y=new Image,C=new Image;x.src="../Bilder/HeadUp.png",C.src="../Bilder/HeadRight.png",X.src="../Bilder/HeadDown.png",Y.src="../Bilder/HeadLeft.png";var E=document.createElement("div"),S=document.createElement("button"),I=document.createElement("button"),M=document.createElement("div"),R=0,P=!1;function A(){var S,I,M,A,B,L;P?function(e,t){var n=e.createElement("div");n.textContent="GAME OVER",n.style.position="relative",n.style.top="-380px",n.style.left="0",n.style.color="white",n.style.fontFamily="Press Start 2P, monospace",n.style.fontSize="100px",e.body.appendChild(n),clearInterval(t)}(document,a):(function(e,t){t.fillStyle="rgb(0, 51, 102)",t.fillRect(0,0,e.width,e.height)}(d,r),n(m,i,l,"red",r),n(m,c,s,"blue",r),n(m,y,h,"yellow",r),n(m,u,p,"orange",r),n(m,f,v,"green",r),n(m,b,g,"purple",r),o(_,i,l)&&(R=e(E,R),S=t(_,w,k),i=S[0],l=S[1]),o(_,c,s)&&(R=e(E,R),I=t(_,w,k),c=I[0],s=I[1]),o(_,y,h)&&(R=e(E,R),M=t(_,w,k),h=M[0],h=M[1]),o(_,u,p)&&(R=e(E,R),A=t(_,w,k),u=A[0],p=A[1]),o(_,f,v)&&(R=e(E,R),B=t(_,w,k),f=B[0],v=B[1]),o(_,b,g)&&(R=e(E,R),L=t(_,w,k),b=L[0],g=L[1]),function(e,t,n,o,a,d,r){for(var i=e.snake_body.length-1;i>0;i--)e.snake_body[i]=e.snake_body[i-1];e.snake_body.length&&(e.snake_body[0]=[e.headX,e.headY]),e.headX+=e.velocityX,e.headY+=e.velocityY,function(e,t,n,o,a,d,r){switch(e.snake_direction){case"up":t.drawImage(n,e.headX*r,e.headY*r,r,r);break;case"down":t.drawImage(o,e.headX*r,e.headY*r,r,r);break;case"left":t.drawImage(a,e.headX*r,e.headY*r,r,r);break;case"right":t.drawImage(d,e.headX*r,e.headY*r,r,r)}}(e,t,n,o,a,d,25)}(_,r,x,X,Y,C),function(e,t,n){for(var o=0;o<t.snake_body.length;o++){var a=(void 0,void 0,r=150-3*(d=o),i=Math.min(100,3*d),"rgb(".concat(i,", ").concat(r,", 0)"));e.fillStyle=a,e.fillRect(25*t.snake_body[o][0],25*t.snake_body[o][1],25,25)}var d,r,i}(r,_),P=function(e,t,n){for(var o=0;o<e.snake_body.length;o++)if(e.headX==e.snake_body[o][0]&&e.headY==e.snake_body[o][1])return!0;return e.headX<0||e.headX>19||e.headY<0||e.headY>19}(_),_.has_turned=!1)}window.onload=function(){var e,n,o,m,x,X;(d=document.getElementById("board")).height=500,d.width=500,r=d.getContext("2d"),e=t(_,w,k),i=e[0],l=e[1],n=t(_,w,k),c=n[0],s=n[1],o=t(_,w,k),y=o[0],h=o[1],m=t(_,w,k),u=m[0],p=m[1],x=t(_,w,k),f=x[0],v=x[1],X=t(_,w,k),b=X[0],g=X[1],document.addEventListener("keydown",(function(e){!function(e,t){t.has_turned||("ArrowUp"==e.code&&1!=t.velocityY?(t.snake_direction="up",t.velocityX=0,t.velocityY=-1):"ArrowDown"==e.code&&-1!=t.velocityY?(t.snake_direction="down",t.velocityX=0,t.velocityY=1):"ArrowRight"==e.code&&-1!=t.velocityX?(t.snake_direction="right",t.velocityX=1,t.velocityY=0):"ArrowLeft"==e.code&&1!=t.velocityX&&(t.snake_direction="left",t.velocityX=-1,t.velocityY=0)),t.has_turned=!0}(e,_)})),a=setInterval(A,100),function(e,t){e.style.position="relative",e.style.top="0",e.style.left="0",e.style.color="black",e.style.fontFamily="Press Start 2P, monospace",e.style.fontSize="20px",e.textContent="SCORE: "+t,document.body.appendChild(e)}(E,R),function(e){e.textContent="RESTART",e.style.position="relative",e.style.top="-520px",e.style.right="-180px",e.style.padding="5px 10px",e.style.fontSize="16px",e.style.cursor="pointer",e.style.color="white",e.style.backgroundColor="transparent",document.body.appendChild(e)}(S),M.innerText="Press SPACE to pause",function(e){document.body.appendChild(e)}(M),S.addEventListener("click",(function(){location.reload()})),function(e){e.textContent="MENU",e.style.position="fixed",e.style.top="20px",e.style.left="20px",e.style.padding="5px 10px",e.style.fontSize="20px",e.style.cursor="pointer",e.style.color="white",e.style.backgroundColor="#003366",e.style.borderRadius="5px",document.body.appendChild(e)}(I),I.addEventListener("click",(function(){window.location.href="../index.html"}))}})();