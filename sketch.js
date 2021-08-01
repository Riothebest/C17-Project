var path,mainCyclist;
var player1,player2,player3;
var pathImg,mainRacerImg1,mainRacerImg2;

var restart, restartImg;

var oppPink1Img,oppPink2Img;
var oppYellow1Img,oppYellow2Img;
var oppRed1Img,oppRed2Img;
var gameOverImg,cycleBell;

var pinkCG, yellowCG,redCG; 

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var gameOver;

function preload(){
  pathImg = loadImage("Road.png");
  mainRacerImg1 = loadAnimation("mainPlayer1.png","mainPlayer2.png");
  mainRacerImg2= loadAnimation("mainPlayer3.png");
  
  oppPink1Img = loadAnimation("opponent1.png","opponent2.png");
  oppPink2Img = loadAnimation("opponent3.png");
  
  oppYellow1Img = loadAnimation("opponent4.png","opponent5.png");
  oppYellow2Img = loadAnimation("opponent6.png");
  
  oppRed1Img = loadAnimation("opponent7.png","opponent8.png");
  oppRed2Img = loadAnimation("opponent9.png");
  
  cycleBell = loadSound("bell.mp3");
  gameOverImg = loadImage("gameOver.png");

  restartImg = loadImage("restart.png");

}

function setup(){
  
  createCanvas(1200,300);
  // Moving background
  path  = createSprite(100,150);
  path.addImage(pathImg);
  path.velocityX = -5;

  //creating boy running
  mainCyclist  = createSprite(70,150);
  mainCyclist.addAnimation("cyclying",mainRacerImg1);
  mainCyclist.addAnimation("fallen",mainRacerImg2);
  mainCyclist.scale=0.07;
    
  //set collider for mainCyclist
  //mainCyclist.debug = true;
  mainCyclist.setCollider("rectangle",0,0,1000,1400);
    
  gameOver = createSprite(650,150);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.8;
  gameOver.visible = false;

  restart = createSprite(1020,230,10,10);
  restart.addImage(restartImg);
  restart.scale = 0.9;

    
  pinkCG = new Group();
  yellowCG = new Group();
  redCG = new Group();

  
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,900,30);
  
  if(gameState===PLAY){
    restart.visible = false;
    
    distance = distance + Math.round(getFrameRate()/60);
    path.velocityX = -(6 + 2*distance/150);
    
    mainCyclist.y = World.mouseY;
    mainCyclist.changeAnimation("cyclying",mainRacerImg1)
    
    edges= createEdgeSprites();
    mainCyclist .collide(edges);
    
    //code to reset the background
    if(path.x < 0 ){
      path.x = width/2;
    }
    
      //code to play cycle bell sound
    if(keyDown("space"))
    {
      cycleBell.play();
    }
    
    //creating continous opponent players
    var select_oppPlayer = Math.round(random(1,3));
    
    if (World.frameCount % 150 == 0)
    {
      if (select_oppPlayer == 1)
       {
        pinkCyclists();
      } 

      else if (select_oppPlayer == 2) 
      {
        yellowCyclists();
      } 
      
      else 
      {
        redCyclists();
      }
    }
  
   if(pinkCG.isTouching(mainCyclist))
   {
     gameState = END;
     player1.velocityY = 0;
     player1.changeAnimation(oppPink2Img);
     player1.destroy();
    }
    
    if(yellowCG.isTouching(mainCyclist))
    {
      gameState = END;
      player2.velocityY = 0;
      player2.changeAnimation(oppYellow2Img);
      player2.destroy();
    }
    
    if(redCG.isTouching(mainCyclist))
    {
      gameState = END;
      player3.velocityY = 0;
      player3.changeAnimation(oppRed2Img);
      player3.destroy();
      }
    
  }

  else if (gameState === END)
   {
    gameOver.visible = true;
    restart.visible= true;
    //Add code to show restart game instrution in text here
    fill("red");
    textSize(40); 
    text("Click here to restart ==>",550,250)
  
    path.velocityX = 0;
    mainCyclist.velocityY = 0;
    mainCyclist.changeAnimation("fallen",mainRacerImg2);
  
    pinkCG.setVelocityXEach(0);
    pinkCG.setLifetimeEach(-1);

  
    yellowCG.setVelocityXEach(0);
    yellowCG.setLifetimeEach(-1);
  
    redCG.setVelocityXEach(0);
    redCG.setLifetimeEach(-1);

    //write condition for calling reset( )
    if(mousePressedOver(restart))
    {
        resetGame();
    }
  }
}

function pinkCyclists()
{
        player1 =createSprite(1200,Math.round(random(50, 250)),10,10);
        player1.scale =0.06;
        player1.velocityX = -(6 + 2*distance/150);
        player1.addAnimation("cycling1",oppPink1Img);
        //player1.addAnimation("fallen1",oppPink2Img);
        player1.setLifetime=170;
        //player1.debug = true;
        player1.setCollider("rectangle",0,0,1000,1000);
        pinkCG.add(player1);
}

function yellowCyclists()
{
        player2 =createSprite(1200,Math.round(random(50, 250)),10,10);
        player2.scale =0.06;
        player2.velocityX = -(6 + 2*distance/150);
        player2.addAnimation("cycling2",oppYellow1Img);
       // player2.addAnimation("fallen2",oppYellow2Img);
        player2.setLifetime=170;
        //player2.debug = true;
        player2.setCollider("rectangle",0,0,1000,1000);
        yellowCG.add(player2);
}

function redCyclists()
{
        player3 =createSprite(1200,Math.round(random(50, 250)),10,10);
        player3.scale =0.06;
        player3.velocityX = -(6 + 2*distance/150);
        player3.addAnimation("cycling3",oppRed1Img);
       // player3.addAnimation("fallen3",oppRed2Img);
        player3.setLifetime=170;
       // player3.debug = true;
        player3.setCollider("rectangle",0,0,1000,1000);
        redCG.add(player3);
}

//create reset function here

function resetGame()
{
  gameState = PLAY;
  mainCyclist.changeAnimation("cyclying", mainRacerImg1);
  restart.visible = false;
  gameOver.visible = false;
  distance = 0;
  pinkCG.destroyEach();
  yellowCG.destroyEach();
  redCG.destroyEach();
}




