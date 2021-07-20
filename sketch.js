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
var rope,fruit,ground,rope2,rope3;
var fruit_con,fruit_con2,fruit_con3;
var fruit_con_2;

var bg_img;
var food;
var rabbit;

var button,blower,button2,button3;
var bunny;
var blink,eat,sad;
var mute_btn;
var balloon;

var fr,rope2;

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;
var air;
var canW,canH;

var yellowStar1,yellowStar2,greyStar1,greyStar2;
var yellowStarImg,greyStarImg;

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');

  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');

  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");

  yellowStarImg = loadImage("yellowStar.png");
  greyStarImg = loadImage("greyStar.png");
  
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() {
  createCanvas(600,700)
  //var isMobile = /iPhone | iPad | iPod | Android /i.test(navigator.userAgent);
  //if(isMobile){
   //canW = displayWidth;
   //canH = displayHeight;
  // createCanvas(displayWidth + 80, displayHeight)
  //}else{
    //canW = windowWidth;
    //canH = windowHeight;
    //createCanvas(windowWidth,windowHeight);
 // }
  
 
  frameRate(80);

  bk_song.play();
  bk_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;
  
  button = createImg('cut_btn.png');
  button.position(220,30);
  button.size(50,50);
  button.mouseClicked(drop);

  //button2 = createImg('cut_btn.png');
  //button2.position(30,220);
  //button2.size(50,50);
 //button2.mouseClicked(drop2);

  button3 = createImg('cut_btn.png');
  button3.position(300,30);
  button3.size(50,50);
  button3.mouseClicked(drop3);

  balloon = createImg('balloon.png');
  balloon.position(260,370);
  balloon.size(120,80);
  balloon.mouseClicked(airBlow);

  mute_btn = createImg('mute.png');
  mute_btn.position(width - 50,20);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute);


  
  rope = new Rope(7,{x:245,y:30});
  //rope2 = new Rope(6,{x:50,y:235});
  rope3 = new Rope(8,{x:325,y:30});

  ground = new Ground(200,height,width,20);

  blink.frameDelay = 20;
  eat.frameDelay = 20;

  bunny = createSprite(170,height - 80,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');

  yellowStar1 = createSprite(500,100,50,50)
  yellowStar2 = createSprite(100,200,50,50)

  yellowStar1.addImage(yellowStarImg);
  yellowStar2.addImage(yellowStarImg);

  yellowStar1.scale = 0.2;
  yellowStar2.scale = 0.2;

  greyStar1 = createSprite(20,20,50,50);
  greyStar2 = createSprite(70,20,50,50);

  greyStar1.addImage(greyStarImg);
  greyStar2.addImage(greyStarImg);

  greyStar1.scale = 0.2;
  greyStar2.scale = 0.2;
  
  
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  //fruit_con2 = new Link(rope2,fruit);
  fruit_con3 = new Link(rope3,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,width,height);

  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  rope.show();
  //rope2.show();
  rope3.show();
  Engine.update(engine);
  ground.show();

  drawSprites();

  if(collide(fruit,bunny)==true)
  {
    bunny.changeAnimation('eating');
    eating_sound.play();
  }

  if(collide1(fruit,yellowStar1,20)==true)
  {
    yellowStar1.visible = false;
    greyStar1.addImage(yellowStarImg);
  }

  if(collide1(fruit,yellowStar2,20)==true)
  {
    yellowStar2.visible = false;
    greyStar2.addImage(yellowStarImg);
  }

  if(fruit!=null && fruit.position.y>=650)
  {
    bunny.changeAnimation('crying');
    bk_song.stop();
    sad_sound.play();
    fruit=null;
     
   }
   
}

function drop()
{
  cut_sound.play();
  rope.break();
  fruit_con.detach();
  fruit_con = null; 
}

//function drop2()
//{
  //cut_sound.play();
  //rope2.break();
  //fruit_con2.detach();
  //fruit_con2 = null; 
//}

function drop3()
{
  cut_sound.play();
  rope3.break();
  fruit_con3.detach();
  fruit_con3 = null; 
}

function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,fruit);
               fruit = null;
               return true; 
            }
            else{
              return false;
            }
         }
}


function mute()
{
  if(bk_song.isPlaying())
     {
      bk_song.stop();
     }
     else{
      bk_song.play();
     }
}

function airBlow(){
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:random(-0.05,0.05),y:random(-0.05,0.05)})
  air.play();
}

function collide1(body,sprite,x)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=x)
            {
               return true; 
            }
            else{
              return false;
            }
         }
}