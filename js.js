var jet = document.getElementById("jet");
var board = document.getElementById("board");
var win  = document.getElementById("win");
var quest = document.getElementById("quest");
var playbtn = document.getElementById("Play");
var playbtn1 = document.getElementById("Play1");
var playbtn2 = document.getElementById("Play2");

window.addEventListener("keydown", (e) => {
    var vertical = parseInt(window.getComputedStyle(jet).getPropertyValue("top"));
    var horizontal = parseInt(window.getComputedStyle(jet).getPropertyValue("left"));
    if (e.key == "ArrowUp") {
        jet.style.top = vertical - 10 + "px";
    }
    if (e.key == "ArrowDown") {
        jet.style.top = vertical + 10 + "px";
    }
    if (e.key == "ArrowLeft") {
        jet.style.left = horizontal - 10 + "px";
    }
    if (e.key == "ArrowRight") {
        jet.style.left = horizontal + 10 + "px";
    }

    if (e.code == "Space") { // lőszer 
        var bullet = document.createElement("div");
        bullet.classList.add("bullets");
        board.appendChild(bullet);
        bullet.style.left = horizontal + "px";
        bullet.style.top = vertical + "px";
        


         


        var movebullet = setInterval(() => {
            

            var rocks = document.getElementsByClassName("rocks"); // találat,
            for (var i = 0; i < rocks.length; i++) {
                var rock = rocks[i];

                var rockbound = rock.getBoundingClientRect();
                var bulletbund = bullet.getBoundingClientRect();
                var bumm = document.createElement("img");
               // console.log("bullet "+bulletbund.left)
                // console.log("rock "+rockbound.left)
                if (bulletbund.left >= rockbound.left &&
                    bulletbund.right >= rockbound.right &&
                    bulletbund.top >= rockbound.top &&
                    bulletbund.bottom <= rockbound.bottom
                ) {
                    rock.parentElement.removeChild(rock);

                    var robbanHang = new Audio('robbanas.mp3');
                    var gyozelemHang = new Audio('win.mp3');
                    var lvlupHang = new Audio('lvlup.mp3');
                    document.getElementById("points").innerHTML =
                        parseInt(document.getElementById("points").innerHTML) + 1;
                        bullet.parentElement.removeChild(bullet);  // megallitja hogy a golyo tovabb mennjen 
                        robbanHang.play();

                        if (document.getElementById("points").innerHTML ==10){
                            lvlupHang.play();
                            alert("Are you ready for the next level?");
                            var lvl2 = document.getElementById("lvl2");
                            lvl2.style.display="flex";
                            var generaterocks = setInterval(() => {
                                var rock = document.createElement("div");
                                rock.classList.add("rocks");
                                var rockright = parseInt(window.getComputedStyle(rock).getPropertyValue("left"));
                            
                                rock.style.bottom = Math.floor(Math.random() * 550) + "px";
                                board.appendChild(rock);
                            }, 1000); 
                            

                            
                           
                           
                           
                        }
                        if (document.getElementById("points").innerHTML ==20){
                            gyozelemHang.play(); 
                            win.style.display ="flex";
                            board.style.display="none";
                            points.style.display="none";
                            playbtn.style.display="none";
                            playbtn1.style.display="none";
                            playbtn2.style.display="none";
                }
                
            }
            }

               

            var bulletright = parseInt(window.getComputedStyle(bullet).getPropertyValue("left"));
            bullet.style.left = bulletright + 3 + "px";
           
        });

    }
});





var generaterocks = setInterval(() => {
    var rock = document.createElement("div");
    rock.classList.add("rocks");
    var rockleft = parseInt(window.getComputedStyle(rock).getPropertyValue("right"));

    rock.style.bottom = Math.floor(Math.random() * 550) + "px";
    board.appendChild(rock);
}, 2000);

var moverocks = setInterval(() => {

    var rocks = document.getElementsByClassName("rocks");
    if (rocks != undefined) {
        for (var i = 0; i < rocks.length; i++) {
           
            
            var rock = rocks[i]
            var rocktop = parseInt(window.getComputedStyle(rock).getPropertyValue("left")
            
            );

            rock.style.left = rocktop - 1 + "px";

        }
    }
}, 1);


 playbtn.onclick = function(){board.style.display="flex" , 
 playbtn.style.display="none", 
 quest.style.display="flex", 
 canvas.style.display="none"};


 //splash screen
setTimeout(() => {
    
    document.getElementById('Splash').classList.toggle('fade');
    if (Splash.opacity != 0){ Splash.style.display="none"};
   
}, 2000 ) ;



// animált háttér

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

//egér helyzet

let mouse = {
    x: null,
    y: null,
    radius: ( canvas.height/100) * (canvas.width/100)
}

window.addEventListener('mousemove', 
function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
}
);

// részecske csinálás

class Particle {
    constructor(x,y, directionX, directionY, size,color){
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
   
    }
    draw () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = 'rgb(250,250,0)';
        ctx.fill();
    }
   

    update() {
        
        if (this.x > canvas.width || this.x <0 ){
            this.directionX = -this.directionX;

        }
        if (this.y > canvas.height || this.y < 0){
            this.directionY =-this.directionY
        }


        let dx = mouse.x - this.x;
        let dy= mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        if (distance < mouse.radius + this.size){
            if (mouse.x <this.x && this.x <canvas.width - this.size * 2){
                this.x +=10;

            }
            if ( mouse.x > this.x && this.x > this.size * 10){
                this.x -=10;
            }
            if (mouse.y > this.y && this.y < canvas.height - this.size*10){
                this.y +=10;
            }
            if (mouse.y > this.y && this.y > this.size * 10){
                this.y -=10;
            }
        }
// részecske mozgatás
        this.x -= this.directionX;
        this.y += this.directionY;
//részecske rajzolás
        this.draw();
    }

}

 // részecske tömb
function init (){
    particlesArray = [];
    let numberOfParticles = (canvas.height* canvas.width) /15000;
    for ( let i = 0; i < numberOfParticles*4; i++){
        let size = (Math.random() * 3) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size )) + size);
        let y = (Math.random() * ((innerHeight - size * 2) - (size )) + size);
        let directionX = (Math.random()* 5) - 4.5;
        let directionY = (Math.random()* 5 ) -4.5;
        let color = 'rgb((255,255,0))';

        particlesArray.push(new Particle(x,y,directionX, directionY, size, color));

    }

}

function connect(){
    let  opacityValue = 1;
    for ( let a = 0 ; a < particlesArray.length; a++) {
       for ( let b = 0 ; b < particlesArray.length; b++) {
           let distance = ((particlesArray[a].x - particlesArray[b].x)
           * (particlesArray[a].x - particlesArray[b].x ))
           + ((particlesArray[a].y - particlesArray[b].y ) * ( particlesArray[a].y - particlesArray[b].y));
           if (distance < ( canvas.width/8 )* (canvas.height/8)){
               opacityValue = 1 - (distance/20000);
               ctx.strokeStyle = 'rgb(0,0,0)' + opacityValue + ')';
               ctx.lineWidth= 1;
               ctx.beginPath();
               ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
               ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
               ctx.stroke();
           }
       }
    }
}




function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,innerWidth, innerHeight);

    for ( let i = 0; i < particlesArray.length;i++){
        particlesArray[i].update();
    }
    // connect();  // meggondoltam magam mert így  jobb.
}
 


window.addEventListener('resize',
function(){
    canvas.width = this.innerWidth;
    canvas.height= this.innerHeight;
    mouse.radius = ((canvas.height/80)* ( canvas.height/80));
    init ();
});

// mouse out event

window.addEventListener('mouseout',
function(){
    mouse.x = undefined;
    mouse.x = undefined;
}
)

init();
animate();







        