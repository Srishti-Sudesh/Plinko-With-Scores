var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
 
var particles = [];
var plinkos = [];
var divisions = [];
var gameState = "start";
var particle;
var count = 0;
var divisionHeight=300;
var score =0;


function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;

 
  ground = new Floor(width/2,795,width,10);

   for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
   }
    for (var j = 75; j <=width; j=j+50){
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50){
       plinkos.push(new Plinko(j,175));
    }

     for (var j = 75; j <=width; j=j+50) {
    plinkos.push(new Plinko(j,275));
    }

     for (var j = 50; j <=width-10; j=j+50) {
       plinkos.push(new Plinko(j,375));
    }

    
}
 

function draw() {
  background("black");
  textSize(20)
  Engine.update(engine);
 
  textSize(25);
  fill("white");
  text("SCORE: "+ score,5,25)

  text("500",20,555);
  text("500",100,555);
  text("500",180,555);
  text("500",260,555);

  text("100",340,555);
  text("100",420,555);
  text("100",500,555);

  text("200",580,555);
  text("200",660,555);
  text("200",740,555);


  if (gameState==="end"){
    textSize(45);
    fill("white");
    text("GAME OVER",290,450)
  }

   for (var i = 0; i < plinkos.length; i++) {
     plinkos[i].display();
   }
  for (var j = 0; j < particles.length; j++) {
     particles[j].display();
   }
   for (var k = 0; k < divisions.length; k++) {
     divisions[k].display();
   }

   if(particle!=null){
      particle.display();
       
       if (particle.body.position.y>560){
             if (particle.body.position.x < 300) 
             {
                 score=score+500;      
                 particle=null;
                 if ( count>= 5) gameState ="end";                          
             }
        
    else if (particle.body.position.x < 600 && particle.body.position.x > 301 ) {
                   score = score + 100;
                   particle=null;
                   if ( count>= 5) gameState ="end";
   }

    else if (particle.body.position.x < 900 && particle.body.position.x > 601 ){
                   score = score + 200;
                   particle=null;
                   if ( count>= 5)  gameState ="end";
   }      
             
       }
 
     }

   ground.display();
 
}

  
function mousePressed(){
  if(gameState=="start"){
    count++;
    particle=new Particle(mouseX, 10, 10, 10); 
  }   
}