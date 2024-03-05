(()=>{"use strict";function e(e,a,t,d,n,o,r,_,i,s,y,l){switch(e.snake_direction){case"up":t.drawImage(d,e.head_x*l,e.head_y*l,l,l);break;case"down":t.drawImage(n,e.head_x*l,e.head_y*l,l,l);break;case"left":t.drawImage(o,e.head_x*l,e.head_y*l,l,l);break;case"right":t.drawImage(r,e.head_x*l,e.head_y*l,l,l)}switch(a.snake_direction){case"up":t.drawImage(_,a.head_x*l,a.head_y*l,l,l);break;case"down":t.drawImage(i,a.head_x*l,a.head_y*l,l,l);break;case"left":t.drawImage(s,a.head_x*l,a.head_y*l,l,l);break;case"right":t.drawImage(y,a.head_x*l,a.head_y*l,l,l)}}function a(e,t,d){var n,o;n=Math.floor(Math.random()*t),o=Math.floor(Math.random()*d);for(var r=0;r<e.snake_body.length;r++)if(n===e.snake_body[r][0]&&o===e.snake_body[r][1]||n===e.head_x&&o===e.head_y)return a(e,t,d);return[n,o]}function t(e,a,t){return e.head_x==a&&e.head_y==t&&(e.snake_body.push([a,t]),!0)}function d(e,a,t,d,n,o,r){for(var _=e.snake_body.length-1;_>0;_--)e.snake_body[_]=e.snake_body[_-1];e.snake_body.length&&(e.snake_body[0]=[e.head_x,e.head_y]),e.head_x+=e.velocity_x,e.head_y+=e.velocity_y,function(e,a,t,d,n,o,r){switch(e.snake_direction){case"up":a.drawImage(t,e.head_x*r,e.head_y*r,r,r);break;case"down":a.drawImage(d,e.head_x*r,e.head_y*r,r,r);break;case"left":a.drawImage(n,e.head_x*r,e.head_y*r,r,r);break;case"right":a.drawImage(o,e.head_x*r,e.head_y*r,r,r)}}(e,a,t,d,n,o,r)}var n,o,r,_,i,s="none",y=25,l=document.createElement("button"),c=document.createElement("button"),h=document.createElement("div"),x=!1,p={snake_direction:"right",velocity_x:0,velocity_y:0,has_turned:!1,snake_body:[],head_x:0,head_y:0,head_last_cords:[0,0]},u={snake_direction:"left",velocity_x:0,velocity_y:0,has_turned:!1,snake_body:[],head_x:19,head_y:0,head_last_cords:[19,0]},v=new Image,g=new Image,k=new Image,b=new Image,f=new Image,w=new Image,m=new Image,I=new Image;v.src="../Bilder/HeadUp.png",b.src="../Bilder/HeadRight.png",g.src="../Bilder/HeadDown.png",k.src="../Bilder/HeadLeft.png",f.src="../Bilder/HeadUp(red).png",I.src="../Bilder/HeadRight(red).png",w.src="../Bilder/HeadDown(red).png",m.src="../Bilder/HeadLeft(red).png";var C=!1;function E(){var l,c;if(!x)if(C)!function(e,a,t){var d=e.createElement("div");"tie"==t?d.textContent="Tie!":"player1"==t?d.textContent="Winner is player one!":"player2"==t&&(d.textContent="Winner is player two!"),d.style.position="relative",d.style.top="-380px",d.style.left="0",d.style.color="white",d.style.fontFamily="Press Start 2P, monospace",d.style.fontSize="55px",e.body.appendChild(d),clearInterval(a)}(document,n,s);else{!function(e,a){a.fillStyle="rgb(0, 51, 102)",a.fillRect(0,0,e.width,e.height)}(o,r),function(e,a,t,d){d.fillStyle="red",d.beginPath(),d.arc(25*a+12.5,25*t+12.5,12.5,0,2*Math.PI),d.fill()}(0,_,i,r),t(p,_,i)?(l=a(p,20,20),_=l[0],i=l[1]):t(u,_,i)&&(c=a(u,20,20),_=c[0],i=c[1]),d(p,r,v,g,k,b,y),d(u,r,f,w,m,I,y),function(e,a,t){for(var d=0;d<a.snake_body.length;d++){var n=(void 0,void 0,r=150-3*(o=d),_=Math.min(100,3*o),"rgb(".concat(_,", ").concat(r,", 0)"));e.fillStyle=n,e.fillRect(25*a.snake_body[d][0],25*a.snake_body[d][1],25,25)}var o,r,_}(r,p),function(e,a,t){for(var d=0;d<a.snake_body.length;d++){var n=(void 0,void 0,r=150-3*(o=d),_=Math.min(100,3*o),"rgb(".concat(r,", ").concat(_,", 0)"));e.fillStyle=n,e.fillRect(25*a.snake_body[d][0],25*a.snake_body[d][1],25,25)}var o,r,_}(r,u),e(p,u,r,v,g,k,b,f,w,m,I,y),e(p,u,r,v,g,k,b,f,w,m,I,y),(p.head_last_cords==u.head_last_cords||p.head_x==u.head_x&&p.head_y==u.head_y||p.head_last_cords[0]==u.head_x&&p.head_last_cords[1]==u.head_y||u.head_last_cords[0]==p.head_x&&u.head_last_cords[1]==p.head_y||p.head_last_cords==u.snake_body[1]||u.head_last_cords==p.snake_body[1])&&(s="tie",C=!0),(p.head_x<0||p.head_x>19||p.head_y<0||p.head_y>19)&&(s="player2",C=!0);for(var h=0;h<p.snake_body.length;h++)p.head_x==p.snake_body[h][0]&&p.head_y==p.snake_body[h][1]&&(s="player2",C=!0);for(h=0;h<u.snake_body.length;h++)p.head_x==u.snake_body[h][0]&&p.head_y==u.snake_body[h][1]&&(s="player2",C=!0);for((u.head_x<0||u.head_x>19||u.head_y<0||u.head_y>19)&&(s="player1",C=!0),h=0;h<u.snake_body.length;h++)u.head_x==u.snake_body[h][0]&&u.head_y==u.snake_body[h][1]&&(s="player1",C=!0);for(h=0;h<p.snake_body.length;h++)u.head_x==p.snake_body[h][0]&&u.head_y==p.snake_body[h][1]&&(s="player1",C=!0);p.head_last_cords=[p.head_x,p.head_y],u.head_last_cords=[u.head_x,u.head_y],p.has_turned=!1,u.has_turned=!1}}window.onload=function(){var e,t,d;(o=document.getElementById("board")).height=500,o.width=500,r=o.getContext("2d"),e=a(p,20,20),_=e[0],i=e[1],document.addEventListener("keydown",(function(e){!function(e,a,t){a.has_turned||("KeyW"==e.code&&1!=a.velocity_y?(a.snake_direction="up",a.velocity_x=0,a.velocity_y=-1,a.has_turned=!0):"KeyS"==e.code&&-1!=a.velocity_y?(a.snake_direction="down",a.velocity_x=0,a.velocity_y=1,a.has_turned=!0):"KeyD"==e.code&&-1!=a.velocity_x?(a.snake_direction="right",a.velocity_x=1,a.velocity_y=0,a.has_turned=!0):"KeyA"==e.code&&1!=a.velocity_x&&(a.snake_direction="left",a.velocity_x=-1,a.velocity_y=0,a.has_turned=!0)),t.has_turned||("ArrowUp"==e.code&&1!=t.velocity_y?(t.snake_direction="up",t.velocity_x=0,t.velocity_y=-1,t.has_turned=!0):"ArrowDown"==e.code&&-1!=t.velocity_y?(t.snake_direction="down",t.velocity_x=0,t.velocity_y=1,t.has_turned=!0):"ArrowRight"==e.code&&-1!=t.velocity_x?(t.snake_direction="right",t.velocity_x=1,t.velocity_y=0,t.has_turned=!0):"ArrowLeft"==e.code&&1!=t.velocity_x&&(t.snake_direction="left",t.velocity_x=-1,t.velocity_y=0,t.has_turned=!0))}(e,p,u)})),n=setInterval(E,100),(t=l).textContent="RESTART",t.style.position="relative",t.style.top="-520px",t.style.right="-180px",t.style.padding="5px 10px",t.style.fontSize="16px",t.style.cursor="pointer",t.style.color="white",t.style.backgroundColor="transparent",document.body.appendChild(t),document.body.appendChild(l),h.innerText="Press SPACE to pause",function(e){document.body.appendChild(e)}(h),l.addEventListener("click",(function(){location.reload()})),(d=c).textContent="MENU",d.style.position="fixed",d.style.top="20px",d.style.left="20px",d.style.padding="5px 10px",d.style.fontSize="20px",d.style.cursor="pointer",d.style.color="white",d.style.backgroundColor="#003366",d.style.borderRadius="5px",document.body.appendChild(d),c.addEventListener("click",(function(){window.location.href="../index.html"})),document.body.appendChild(l)},window.addEventListener("keydown",(function(e){"Space"===e.code&&(x?(n=setInterval(E,100),h.innerText="Press SPACE to pause"):(clearInterval(n),h.innerText="Press SPACE to resume"),x=!x)}))})();