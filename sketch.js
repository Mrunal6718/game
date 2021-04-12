var bg,bg2;
var aladdin,aladdinImg;
var genie,genieImg;
var carpet,carpetImg;
var playButton,playButtonImg;
var gameState="start";
var edges;
var rock,rockGroup,rock1Img,rock2,rock2Group,rock2Img;
var coin,coinImg,coinGroup;
var gameover,gameoverImg;
var reset,resetImg;
var jafar,jafarImg;
var fire,fireImg,fireGroup;
var confetti,confettiImg;
var congratsImg;
var coinSound,dieSound,fireSound,jumpSound,resetSound,winSound;
var diamond, diamond_Img, diamondGroup;

var score = 0;
var lives = 3;

function preload(){
  bgImg= loadImage("Images/bg0.jpg");
  bgImg2=loadImage("Images/bg1.jpg");
  bgImg3=loadImage("Images/bg2.jpg");
  aladdinImg=loadImage("boy1.png");
  genieImg=loadImage("witch.png");
  //carpetImg=loadImage("Images/Carpet.png");
  playButtonImg=loadImage("play.png");
  rock1Img=loadImage("Images/rock1.png");
  rock2Img=loadImage("Images/rock2.png");
  coinImg = loadImage("Images/coin.png");
  gameoverImg = loadImage("Images/gameOver.png");
  resetImg = loadImage("Images/reset.png");
  jafarImg = loadImage("Indermen.png");
  fireImg = loadImage("Images/fire.png");
  jasmineImg = loadImage("princess.png");
  confettiImg = loadImage("star edited.png");
  congratsImg = loadImage("Images/congrats.png");
  diamond_Img = loadImage("diamond1.png");

  coinSound = loadSound("Sounds/coin.mp3");
  dieSound = loadSound("Sounds/die.mp3");
  fireSound = loadSound("Sounds/fire.mp3");
  jumpSound = loadSound("Sounds/jump.mp3");
  resetSound = loadSound("Sounds/reset.mp3");
  winSound = loadSound("Sounds/win.mp3");

}

function setup() {
  createCanvas(windowWidth,windowHeight);
  edges = createEdgeSprites();

  //Start
  setStart();

  //LevelOne
  setLevelOne();

  //LevelTwo
  setLevelTwo();
  
  //End
  setEnd();

}

function draw() {
  background("black");  

  drawSprites();

  //START Gamestate
  if(gameState==="start"){
    startState();
  }

  //LEVEL 1 Gamestate
  if(gameState==="LevelOne"){
	  playLevelOne();
  }

  //LEVEL 2 Gamestate
  if(gameState==="LevelTwo"){
    playLevelTwo();
  }

  //END State
  if(gameState === "End"){
    endState();
  }

  //END2 State
  if(gameState === "End2"){
    end2State();
  }

  //Win State
  if(gameState === "Win"){
    Win();
  }
}

function startState(){
  textSize(25);
    fill(254,182,21);
    stroke("white");
    text("Instructions :\n 1) Use arrow keys to move boy \n 2) Avoid rocks and reach 500 score in Level 1 \n 3) You have to save the princess from indermen in Level 2",width/2-250,height/2-50);

    bg.visible = true;
    //carpet.visible = true;
    genie.visible = true;
    playButton.visible = true;
    aladdin.visible = true;

    if(mousePressedOver(playButton)){
      resetSound.play();
	    clear();
      gameState="LevelOne";
    }
}

function setStart(){
  bg=createSprite(width/2,height/2,width,height);
  bg.addImage(bgImg);
  bg.visible = false;

  //carpet=createSprite(width/2-400, height/2+250);
  //carpet.addImage(carpetImg);
  //carpet.scale=0.3;
  //carpet.visible = false;
 
  genie=createSprite(width/2+550, height/2);
  genie.scale=0.4;
  genie.addImage(genieImg);
  genie.visible = false;

  playButton=createSprite(width/2,height/2+125);
  playButton.addImage(playButtonImg);
  playButton.scale=0.7;
  playButton.visible = false;

  aladdin=createSprite(width/2-425, height/2);
  aladdin.scale=0.35;
  aladdin.addImage(aladdinImg);
  aladdin.visible = false;
}

function setLevelOne(){
  bg2=createSprite(width/2,height/2-350,width,height);
  bg2.addImage(bgImg2);
  bg2.scale=3.5;
  bg2.visible = false;

  /*carpet2=createSprite(width/2-650, height-50);
  carpet2.addImage(carpetImg);
  carpet2.setCollider("rectangle",0,-30,carpet.width-100,carpet.height-300);
  carpet2.scale=0.4;
  carpet2.visible = false;*/

  aladdin2=createSprite(width/2-650, height-100);
  aladdin2.scale=0.35;
  aladdin2.addImage(aladdinImg);
  aladdin2.visible = false;

  invisibleGround = createSprite(width/2,height-30,width,30);
  invisibleGround.visible = false;

  rockGroup = new Group();
  rock2Group = new Group();
  coinGroup = new Group();
  diamondGroup = new Group();
	
}

function playLevelOne(){
	
	bg2.visible = true;
  //carpet2.visible = true;
  aladdin2.visible = true;
	
	textSize(25);
  textStyle(BOLD);
  fill(0);
	text("Score: " + score, width-200,100);
  text("Level 1",width/2,50);
    
    if(keyDown("space")){
      aladdin2.velocityY = -10;
      //carpet2.velocityY = -10;
     }

    if(keyDown("a")){
       aladdin2.velocityY = -10;

    }
  
    if(keyDown(LEFT_ARROW)){
      aladdin2.x = aladdin2.x - 5;
      //carpet2.x = carpet2.x - 5;
    }

    if(keyDown(RIGHT_ARROW)){
      aladdin2.x = aladdin2.x + 5;
      //carpet2.x = carpet2.x + 5;
    }

    aladdin2.velocityY = aladdin2.velocityY + 0.5;
    //carpet2.velocityY = aladdin2.velocityY;

    //carpet2.collide(edges);
    aladdin2.collide(edges);
    //carpet2.collide(invisibleGround);
    //aladdin2.collide(carpet2);

  if(score===100){
    clear();
    rockGroup.destroyEach();
    rock2Group.destroyEach();
    coinGroup.destroyEach();
    diamondGroup.destroyEach();
    gameState="LevelTwo";
  }

	for (var i = 0; i < coinGroup.length; i++) {
    
		if(coinGroup.get(i).isTouching(aladdin2)){
      coinSound.play();
			coinGroup.get(i).remove()
			score =score+100;
		}
	}

  for (var i = 0; i < diamondGroup.length; i++) {
    
		if(diamondGroup.get(i).isTouching(aladdin2)){
      coinSound.play();
			diamondGroup.get(i).remove()
			score =score+100;
		}
	}


	
	if(rockGroup.isTouching(aladdin2) || rock2Group.isTouching(aladdin2)){
    dieSound.play();
		gameState = "End";
	}
    
  rocks();
	createCoins();
  diamonds();
	
}

function rocks() {

  if (frameCount % 100 === 0) {
    rock = createSprite(width, Math.round(random(50,height-350)), 20 , 20);
    rock.addImage(rock1Img);
    rock.scale=0.1;
    rock.velocityX = -5;
    rock.lifetime = 300;

    rock2 = createSprite(-50, Math.round(random(50,height-350)), 20 , 20);
    rock2.addImage(rock2Img);
    rock2.scale=0.4;
    rock2.velocityX = 5;
    rock2.lifetime = 300;
    
    
   rockGroup.add(rock);
   rock2Group.add(rock2);
   
  }
}

function createCoins(){
 
	if (frameCount % 100 === 0) {
		coin = createSprite(Math.round(random(50,width)), -50, 20 , 20);
		coin.addImage(coinImg);
		coin.scale=0.1;
		coin.velocityY = 3;
		coin.lifetime = 150;
		coinGroup.add(coin);  
  }
}

function diamonds(){
if(frameCount % 100 ===0){
diamond = createSprite(Math.round(random(50,width -100)), -50, 20, 20);
diamond.addImage(diamond_Img);
diamond.scale = 0.09;
diamond.velocityY = 2;
diamond.lifetime = 150;
diamondGroup.add(diamond);

}
}

function setLevelTwo(){
  bg3=createSprite(width/2,height/2-350,width,height);
  bg3.addImage(bgImg3);
  bg3.scale=3;
  bg3.visible = false;

  /*carpet3=createSprite(width/2-650, height-50);
  carpet3.addImage(carpetImg);
  carpet3.setCollider("rectangle",0,-30,carpet.width-100,carpet.height-300);
  carpet3.scale=0.4;
  carpet3.visible = false;*/

  aladdin3=createSprite(width/2-650, height-100);
  aladdin3.scale=0.35;
  aladdin3.addImage(aladdinImg);
  aladdin3.visible = false;

  invisibleGround2 = createSprite(width/2,height-30,width,30);
  invisibleGround2.visible = false;

  jafar = createSprite(width-150,height/2,50,50);
  jafar.addImage(jafarImg);
  jafar.scale=0.9;
  jafar.visible = false;

  jasmine = createSprite(width-300,height-100,50,50);
  jasmine.addImage(jasmineImg);
  jasmine.scale=0.35;
  jasmine.visible = false;

  fireGroup = new Group();
	
}

function playLevelTwo(){
	
	bg3.visible = true;
  //carpet3.visible = true;
  aladdin3.visible = true;
  jafar.visible = true;
  jasmine.visible = true;
  jafar.bounceOff(invisibleGround2);
  jafar.velocityY = 4;
  
	
	textSize(25);
  textStyle(BOLD);
  fill(255);
	text("Lives: " + lives, width/2-700,100);
  text("Level 2",width/2,50);

    if(keyDown(UP_ARROW)){
      aladdin3.velocityY = -10;
      //carpet3.velocityY = -10;
    }

    if(keyDown(LEFT_ARROW)){
      aladdin3.x = aladdin3.x - 5;
      //carpet3.x = carpet3.x - 5;
    }

    if(keyDown(RIGHT_ARROW)){
      aladdin3.x = aladdin3.x + 5;
      //carpet3.x = carpet3.x + 5;
    }

    aladdin3.velocityY = aladdin3.velocityY + 0.5;
    //carpet3.velocityY = aladdin3.velocityY;

    //carpet3.collide(edges);
    aladdin3.collide(edges);
    //carpet3.collide(invisibleGround2);
    //aladdin3.collide(carpet3);

    if(lives===0){
      dieSound.play();
      gameState = "End2";
    }

    for (var i = 0; i < fireGroup.length; i++) {
      
      if(fireGroup.get(i).isTouching(aladdin3)){
        dieSound.play();
        fireGroup.get(i).remove()
        lives--;
      }
    }

    if(aladdin3.isTouching(jasmine)){
      winSound.play();
      gameState = "Win";
    }

    createFire();
}

function createFire() {

  if(frameCount % 40 === 0){
    fire= createSprite(width-150, Math.round(random(50,height-50)), 75, 20);
    fire.velocityX = -25;
    fire.addImage(fireImg);
    fire.scale=0.2;
    fire.lifetime = 1000;
    jafar.y = fire.y;
    fireGroup.add(fire);
    fireSound.play();
    
  }
  
}

function setEnd(){
  gameOver = createSprite(width/2,height/2-100,100,100);
  gameOver.addImage(gameoverImg);
  gameOver.scale = 2;
  gameOver.visible = false;

  reset = createSprite(width/2,height/2,100,100);
  reset.addImage(resetImg);
  reset.scale = 0.5;
  reset.visible = false;
}

function endState(){
	rockGroup.destroyEach();
  rock2Group.destroyEach();
	coinGroup.destroyEach();
  aladdin2.setVelocity(0,0);
  //carpet2.setVelocity(0,0);
	gameOver.visible = true;
  reset.visible = true;

  if(mousePressedOver(reset)){
    resetSound.play();
    score = 0;
    gameState = "LevelOne";
    gameOver.visible = false;
    reset.visible = false;
  }

}

function end2State(){
	fireGroup.destroyEach();
  aladdin3.setVelocity(0,0);
  //carpet3.setVelocity(0,0);
  jafar.setVelocity(0,0);
	gameOver.visible = true;
  reset.visible = true;

  if(mousePressedOver(reset)){
    resetSound.play();
    lives = 3;
    gameState = "LevelTwo";
    gameOver.visible = false;
    reset.visible = false;
  }

}

function Win(){

	fireGroup.destroyEach();
  aladdin3.setVelocity(0,0);
  //carpet3.setVelocity(0,0);
  jafar.visible=false;
  reset.visible = true;
  

  if(frameCount % 15 === 0){
    confetti = createSprite(Math.round(random(50,width-100)),-10,100,100);
    confetti.addImage(confettiImg);
    confetti.scale=0.1;
    confetti.velocityY = 5;
  }
  
  imageMode(CENTER);
  image(congratsImg,width/2,height/2-150,500,300);

  if(mousePressedOver(reset)){
    resetSound.play();
   location.reload();
  }

}






