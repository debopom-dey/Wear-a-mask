var PLAY = 1;
var END = 0;
var gameState = PLAY;

var boy,virus,mask,boyImg,virusImg,maskImg,score,gameState,gameOverImg,game_over,punch,gameEnd,bgImg
function preload() {
  boyImg=loadImage("boy1.png");
  virusImg=loadImage("virus.png");
  maskImg=loadImage("mask.png");
  gameOverImg=loadImage("game_over.png")
  punch=loadSound("Punch.mp3")
  gameEnd=loadSound("GameEnd.mp3")
  bgImg=loadImage("bg.jpg")
}

function setup() {
  createCanvas(1200,600);
  boy=createSprite(100,300)
  boy.addImage("boyImg",boyImg)
  boy.scale=0.15;
  mask=createSprite(650,550)
  mask.addImage("maskImg",maskImg)
  mask.scale=0.2;
  score=0;
  game_over=createSprite(500,200);
  game_over.addImage(gameOverImg);
  game_over.scale=0.2
  game_over.visible=false
  virusGroup=new Group;
 //boy.debug=true
 boy.setCollider("rectangle",20,0,850,1000)
}

function draw() {
  background(bgImg);
  fill(255,255,255);
  textSize(20)
  textFont("Elephant")
  text("score:"+score,500,500);
if(gameState===PLAY){
  if(keyDown(UP_ARROW)){
    mask.y=mask.y-(10+score/5)
  }  
  if(mask.isTouching(virusGroup)){
    virusGroup.destroyEach();
    mask.y=550;
    score=score+1;
    punch.play()
  }
  if(virusGroup.isTouching(boy)){
    gameState=END;
    gameEnd.play()
    virusGroup.destroyEach();
  }
 if (gameState===END){
  game_over.visible=true;
  boy.visible=false;
  mask.visible=false;
  virusGroup.setLifetimeEach(-1);
  virusGroup.setVelocityXEach(0)
 
  }
  spawnviruses()
}
  drawSprites();
}
  function spawnviruses(){
    if (frameCount % 150 === 0){
       virus = createSprite(850,300,10,40);
      virus.velocityX = -(6+2*score/2) ;
    virus.addImage(virusImg)
      
       //assign scale and lifetime to the obstacle           
       virus.scale = 0.25;
       virus.lifetime = 300;
      
      //add each obstacle to the group
       virusGroup.add(virus);
    }
   }
  
