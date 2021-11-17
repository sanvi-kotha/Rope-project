const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var fruit,rope;
var fruit_con;
var bunny;

var bg_img;
var food;
var rabbit;
var button, blower;
var blink;
var eat;
var sad;
var sound_eat, sound_cut,sound_sad, sound_blink, sound_air;


function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');
  blink = loadAnimation('blink_1.png','blink_2.png','blink_3.png');
  eat  = loadAnimation('eat_0.png','eat_1.png','eat_2.png','eat_3.png','eat_4.png');
  sad = loadAnimation('sad_1.png','sad_2.png','sad_3.png');

sound_blink = loadSound("sound1.mp3");
sound_sad = loadSound("sad.wav");
sound_cut = loadSound("rope_cut.mp3");
sound_air = loadSound("air.wav");
sound_eat = loadSound("eating_sound.mp3");

  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  
  eat.looping = false;
  sad.looping = false;



  
}

function setup() 
{
  createCanvas(500,700);

  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,680,600,20);

  rope = new Rope(7,{x:245,y:30});
  fruit = Bodies.circle(300,300,20);

  Matter.Composite.add(rope.body,fruit);


  bunny = createSprite(220,575,100,100);
  bunny.addImage(rabbit);
  bunny.scale = 0.3; 

  blink.frameDelay = 20;
  eat.frameDelay = 20;
  sad.frameDelay = 20;

  bunny.addAnimation("blinking",blink);
  bunny.addAnimation("eating",eat);
  bunny.addAnimation("crying",sad);
  bunny.changeAnimation("blinking");
  
  sound_blink.play();
  sound_blink.setVolume(0.5);

  button = createImg("cut_button.png");
  button.position(220,30);
  button.size(50,50);
  button.mouseClicked(drop);

  mute_button = createImg("https://raw.githubusercontent.com/pro-whitehatjr/C32_SA_1/main/mute.png");
  mute_button.position(10,10);
  mute_button.size(50,50);
  mute_button.mouseClicked(mute_sound);

 blower = createImg("https://raw.githubusercontent.com/pro-whitehatjr/C32_SA_1/main/balloon.png");
 blower.position (10,250);
 blower.size(150,100);
 blower.mouseClicked(airblow);

  fruit_con = new Link(rope,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  imageMode(CENTER);

  

}

function draw() 
{
  background(51);

  image(bg_img,width/2,height/2,490,690);
 
 
  rope.show();
  Engine.update(engine);
  ground.show();
  
  if(fruit!= null) {
  image(food,fruit.position.x,fruit.position.y,70,70);
  }
 

  if (collide(fruit,bunny) == true){

    bunny.changeAnimation("eating");
    sound_blink.stop();
    sound_eat.play();
  }

  if(collide(fruit,ground.body) == true){
    bunny.changeAnimation("crying");
    sound_blink.stop();
    sound_sad.play();  }

  drawSprites();
}


function airblow(){
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.01,y:0});
  sound_air.play();
  
}
function drop(){

  // break the rope
  rope.break();
  fruit_con.detach();
  fruit_con = null;

  sound_cut.play();

}

function mute_sound(){
  if(sound_blink.isPlaying())
     {
      sound_blink.stop();
     }
     else{
      sound_blink.play();
     }
}
function collide(body,sprite){

   if (body!=null){
      
    var dis = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y);
    if (dis <= 80){
      World.remove(engine.world,fruit);
      fruit = null;
      return true;
    }
    else {
      return false;
    }

   }
}