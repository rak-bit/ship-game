var PLAY = 1;
var END = 0;
var gameState = PLAY;

var ship_State=0;

var skybg, waterbg, shipimg, helicopterimg, bombimg, restartimg;
var water, ship, helicopter, bomb, endG;
var helicopterGroup, bombGroup;
var score = 0;



function preload(){
  skybg = loadImage("skybg.jpg");
  waterbg = loadImage("waterbg.png");
  shipimg = loadAnimation("ship.png","ship2.png","ship.png");
  helicopterimg = loadImage("helicopter.png");
  bombimg = loadImage("bomb.png");
  restartimg=loadImage("gameOver.png");
}

function setup() {
  createCanvas(800, 450);
  
  //creating water ground
    water=createSprite(400,320,800,450);
    water.addImage(waterbg);
    water.velocityX=3;
 
  
  
  //creating ship
    ship=createSprite(90,240);
    ship.addAnimation('Ship',shipimg);
    ship.scale=0.43;
//ship.debug="true";
    
  
  //creating helicopter group
    helicopterGroup=new Group();


  //creating bomb group
    bombGroup=new Group();
    

  //ship.debug = "true";

}

function draw() {
  background(skybg);
  fill("yellow")
  textSize(15);
  text("SURVIVAL TIME: "+ score, 600,30);
  drawSprites();
  //gameState play
  if(gameState === PLAY){
    //increase score
    score = score + Math.round(frameCount/225);
    
    if(keyDown(LEFT)){
      ship.x=ship.x-3;
      if(ship.x<=10){
        ship.x=10;
        ship.y=230;   
      }
    }
    if(keyDown(RIGHT)){
        ship.x=ship.x+3;
        if(ship.x>=700){
          ship.x=700; 
          ship.y=230;
        }
    }

    if(water.x>500){
      water.x=450;
    }
    //Call user defined function
   
    spawnHelicopter();
    spawnBomb();
    if(bombGroup.isTouching(ship)){
        gameState = END;
        endG = createSprite(400,200,50,50);
        endG.addImage(restartimg);
        ship.destroy();
        bombGroup.destroyEach();
        helicopterGroup.destroyEach();
        water.velocityX=0;
      }
    }
}
  
 
 //for infinite background 
 //if(water.position.x < 300){
   // water.position.x = 400;
  //}

function spawnHelicopter(){
  if(frameCount%300 === 0){
    helicopter = createSprite(800,40,200,50);
    helicopter.addImage("helicopter",helicopterimg);
    helicopter.setVelocity(-5,0);
    
    helicopter.scale = 0.5;
    
    helicopterGroup.add(helicopter);
  }
}

function spawnBomb(){
 // create bombs at random position
 //use Math.random
 if(frameCount%225==0){
    bomb=createSprite(Math.round(random(90,800)),60,50,50);
    bomb.addImage(bombimg);
    bomb.setVelocity(0,3);
    bomb.scale=0.15;
    bombGroup.add(bomb);
 }
}




