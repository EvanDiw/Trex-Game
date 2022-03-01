var PLAY = 1;
var END = 0;
var gamestate = PLAY
var trex ,trex_running;
var ground, groundImage;
var gound2;
var cloud, cloudImage;
var cacti, cacti_1, cacti_2, cacti_3, cacti_4, cacti_5, cacti_6;
var score = 0;
var game_over, gameOverImg;
var restartImg
var jumpSound
var dieSound
var checkpointSound

function preload(){
//function to load all the animations/images/sounds to use them throughout the code. 
trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
trex_collided = loadAnimation("trex_collided.png");
groundImage = loadImage("ground2.png");
cloudImage = loadImage("cloud.png");
cacti_1 = loadImage("obstacle1.png");
cacti_2 = loadImage("obstacle2.png");
cacti_3 = loadImage("obstacle3.png");
cacti_4 = loadImage("obstacle4.png");
cacti_5 = loadImage("obstacle5.png");
cacti_6 = loadImage("obstacle6.png");
gameOverImg = loadImage("gameOver.png");
restartImg = loadImage("restart.png");
jumpSound = loadSound("jump.mp3");
dieSound = loadSound("die.mp3");
checkpointSound = loadSound("checkpoint.mp3");
}


function setup(){
  createCanvas(600,200);
  
  //create a trex sprite


 ground = createSprite(300, 190, 600, 10);
 ground.addImage("ground", groundImage);


 ground2 = createSprite(300, 195, 600, 10);
 ground2.visible = false;

 trex = createSprite(50, 189, 10, 10);
 trex.addAnimation("trex", trex_running);
 trex.addAnimation("collided", trex_collided)
 trex.scale = 0.5;


 //var ran = random(10, 60);
 //console.log(ran);
cloudsGroup = createGroup();
obstaclesGroup = createGroup();

//trex.debug = true;
trex.setCollider("circle", 0, 0, 50);

gameOver = createSprite(300, 88);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.5;

restart = createSprite(300, 130);
restart.addImage(restartImg);
restart.scale = 0.3;

gameOver.visible = false;
restart.visible = false;
}



function draw(){
  background(180)
  text(mouseX+ "," + mouseY, mouseX, mouseY);
  text("Score : " + score, 490, 20);

  if (gamestate === PLAY) {
    ground.velocityX = -(5 + score/100);
    score = score + Math.round(frameCount/60);
    if (score % 500 === 0 && score > 0) {
      checkpointSound.play();
    }
  console.log(trex.y);
  if (keyDown("space") && trex.y >= 165) {
  trex.velocityY = -13;
  jumpSound.play();
  }

  trex.changeAnimation("trex", trex_running);

//adds gravity to the game.
  trex.velocityY += 0.8;

  if (ground.x < 0) {
 ground.x = ground.width/2;
  }

  spawnClouds();
  spawnCacti();

  if (obstaclesGroup.isTouching(trex)) {

  gamestate = END;
   dieSound.play();
  // trex.velocityY = -13;
   
  }
  } 

  else if (gamestate === END) {
 
   ground.velocityX = 0;
   trex.velocityY = 0;
   obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);

    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    trex.changeAnimation("collided", trex_collided);

    gameOver.visible = true;
    restart.visible = true; 

    if (mousePressedOver(restart)) {
      reset ();
    }
  }
  trex.collide(ground2);

drawSprites();
}
function reset () {

  gamestate = PLAY;
  cloudsGroup.destroyEach();
  obstaclesGroup.destroyEach();
  restart.visible = false;
  gameOver.visible = false;
  trex.changeAnimation("trex", trex_running);
  score = 0;
}

function spawnClouds () {

  if (frameCount % 80 === 0) {
cloud = createSprite(590, 50)
cloud.addImage(cloudImage);
cloud.velocityX = -5;
cloud.scale = Math.round(random(0.8, 0.5))
cloud.y = Math.round(random(30, 130));
cloud.depth = trex.depth;
trex.depth += 1;

cloud.lifetime = 130;

cloudsGroup.add(cloud)
}
}

function spawnCacti () {

  if(frameCount % 70 ===0) {
    cacti = createSprite(590, 170);
    cacti.velocityX = -(5 + score/100);
    cacti.scale = 0.6;
    var rand = Math.round(random(1, 6));
    switch(rand) {
      case 1: cacti.addImage(cacti_1);
      break;
      case 2: cacti.addImage(cacti_2);
      break;
      case 3: cacti.addImage(cacti_3);
      break;
      case 4: cacti.addImage(cacti_4);
      break;
      case 5: cacti.addImage(cacti_5);
      break;
      case 6: cacti.addImage(cacti_6);
      break;
      default: break;

     
    }

    cacti.lifetime = 130;
    obstaclesGroup.add(cacti);
  }

}