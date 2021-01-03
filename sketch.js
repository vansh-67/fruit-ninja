//To create sprites.
var alien,alien_ani,alien_group;
var alien_side;
var sword,sword_img;
var fruit;
//To create variable for fruits images.
var fruit_img1,fruit_img2,fruit_img3,fruit_img4; 
//To create a variable which declares side of fruit.
var fruit_side;
//To create variable for fruit group.
var fruit_group;
//To create score and chance.
var score = 0;
var chance = 3;
//To create game states.
var PLAY = 3;
var END = 0;
var gameState = PLAY;
//To create game over and restart images.
var gameOver,gameOver_img;
var bg,bg_img;
var restart,restart_img;
//To create different sounds.
var gameOver_sound;
var swordCut_sound;

function preload(){
//To load images,animation and sounds.
  alien_ani = loadAnimation("alien1.png","alien2.png");
 
  sword_img = loadImage("sword.png");
  swordCut_sound = loadSound("knifeSwooshSound.mp3");
  
  fruit_img1 = loadImage("fruit1.png");
  fruit_img2 = loadImage("fruit2.png");
  fruit_img3 = loadImage("fruit3.png");
  fruit_img4 = loadImage("fruit4.png");
  
  gameOver_img = loadImage("gameover.png");
  gameOver_sound = loadSound("gameover.mp3");
  
  bg_img = loadImage("ninja cutter.jpg");
  restart_img = loadImage("restart1.png");
}

function setup(){
  createCanvas(400,400);
  
//To create sprites , add images and set a collider for sword.
  sword = createSprite(300,300,10,10);
  sword.addImage("sword_img",sword_img);
  sword.scale = 0.5;
  sword.setCollider("rectangle",0,0,70,90);
  
  gameOver = createSprite(200,200,10,10);
  gameOver.addImage("gameover",gameOver_img);
  
  restart = createSprite(200,250,10,10);
  restart.addImage("restart",restart_img);
  restart.scale = 0.2;
  
  bg = createSprite(200,200,10,10);
  bg.addImage("background",bg_img);
  bg.scale = 3;
  sword.depth = bg.depth;
  sword.depth = sword.depth+1;
  gameOver.depth = bg.depth;
  gameOver.depth = gameOver.depth+1;
  restart.depth = bg.depth;
  restart.depth = restart.depth+1;
  
//To create groups.
  fruit_group = new Group();
  alien_group = new Group();
  
}

function draw(){
//To clear the screen.
  background("pink");
  
//To understand which game state is going on.  
  console.log(gameState);
  
if(gameState === PLAY){
  createFruit();
  drawAliens();
  
//If sword touches fruit it should destroy and score increases by 1.
for(var i = 0 ; i<fruit_group.length ; i++){
  if(sword.isTouching(fruit_group[i])){
  fruit_group[i].destroy();
  score = score+2;
  swordCut_sound.play();
 }
}
  
//If sword touches the alien it should destroy and chance decreases by 1.
  for(var j = 0 ; j<alien_group.length ; j++){
  if(sword.isTouching(alien_group[j])){
  alien_group[j].destroy();
  chance = chance-1;
  gameOver_sound.play();
 }
}
    
//Sword will move with mouse.
  sword.x = World.mouseX;
  sword.y = World.mouseY;
  
//In game state is play then game over and restart is invisible
  gameOver.visible = false;
  restart.visible = false;
}
  
//If chance is 0 then game state becomes end.
  if(chance === 0){
  gameState = END;
}
  
if(gameState === END){
// In game state end fruit and alien group is destroyed.
  fruit_group.destroyEach();
  alien_group.destroyEach();
//Placement of sword is above game over sprite.
  sword.x = 215;
  sword.y = 140;
//Game over and restart sprites are visible 
  gameOver.visible = true;
  restart.visible = true;
  
//If mouse is pressed over restart in game state end the game state agian becomes play.
if(mousePressedOver(restart)){
  gameState = PLAY;
  score = 0;
  chance = 3;
 }
}
  
//To draw sprites.  
  drawSprites();
  
//To show text. 
  fill("white");
  textSize(20);
  text("score:"+score,300,50);
  text("chance:"+chance,50,50);
}

function createFruit(){
  
//If frame count is divided by 50 and remainder is .
if(frameCount%50 === 0){
//To create a local random variable.
  var rand = Math.round(random(1,4));
  
//To create fruit sprite and a random y position of fruit
  fruit = createSprite(200,200,10,10);
  fruit.y = Math.round(random(20,360));
  
//To add fruit in a group and to set a lifetime to avoid memory leak
  fruit_group.add(fruit);
  fruit_group.setLifetimeEach(100);
 
//So that fruit comes in different images.
  switch(rand){
    case 1:  fruit.addImage("fruit1.img",fruit_img1);
  fruit.scale = 0.2;
      break;
    case 2: fruit.addImage("fruit2.img",fruit_img2);
  fruit.scale = 0.2;
      break;
    case 3:fruit.addImage("fruit3.img",fruit_img3);
  fruit.scale = 0.2;
      break;
    case 4: fruit.addImage("fruit4.img",fruit_img4);
  fruit.scale = 0.12;
      break;
    }
//So that fruit comes from opposite sides.
  fruit_side = Math.round(random(1,2));

if(fruit_side === 1){
  fruit.x = 405;
  fruit.velocityX = -(5+score/4);
 }
else if(fruit_side === 2){
   fruit.x = -5;
   fruit.velocityX = 5+score/4;
  }
 }
}

function drawAliens(){
//If frame count is divided by 80 and remainder is equals to 0.
if(frameCount%60 === 0){
//To create alien sprite, random y positionand to add an aninmation.
  alien = createSprite(200,200,10,10);
  alien.y = Math.round(random(20,360));
  alien.addAnimation("alien_ani",alien_ani);
  alien.scale = 0.8;
//To add alien in a group and to set a lifetime to avoid memory leak .
  alien_group.add(alien);
  alien_group.setLifetimeEach(100);
  
//So that alien comes from both the sides.
  alien_side = Math.round(random(1,2));
  
   if(alien_side === 1){
     alien.x = 405;
     alien.velocityX = -(4+score/4);
   }
else if(alien_side === 2){
   alien.x = -5;
   alien.velocityX = 4+score/4;
   }
  }
 }