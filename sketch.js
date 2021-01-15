var player, playerImg
var edges= []
var gMiddle
var coin
var obstacle
var rand
var score = 0
var gameState = "info"
var coinGroup
var obGroup
var coinImg
var bgImg
var comet
var comGroup
var invPowerUp
var rand1
var invPowerGroup
var fcount
var playButton
var playImg
var cometImg
var invpotionImg
var trackImg
var count
var bg
function preload(){
playerImg = loadImage("images/creature.png")
coinImg = loadImage("images/coin.png")
bgImg = loadImage("images/bg.jpg")
playImg = loadImage("images/playy.png")
cometImg = loadImage("images/COMET.png")
invpotionImg = loadImage("images/invpotion.png")
trackImg = loadImage("images/track.png.png")
}

function setup() {
  createCanvas(800,600);
  bg = createSprite(400,200,20,20)
  bg.addImage(bgImg)
  bg.scale = 2
  bg.velocityX = -5;
  player = createSprite(100, 100, 50, 50);
  player.addImage(playerImg)
  player.scale = 0.1
  player.setCollider("circle",0,0,300)
  edges = createEdgeSprites()

  gTop = createSprite(400,180,800,10)
  gTop2 = createSprite(200,180,800,10)
  gTop3 = createSprite(600,180,800,10)
  gMiddle = createSprite(400,400,800,10)
  gMiddle2 = createSprite(200,400,800,10)
  gMiddle3 = createSprite(600,400,800,10)
  playButton = createSprite(400,300,20,20)
 
  gTop.addImage(trackImg)
  gTop.scale  = 0.1
  gTop2.addImage(trackImg)
  gTop2.scale  = 0.1
  gTop3.addImage(trackImg)
  gTop3.scale  = 0.1

  gMiddle.addImage(trackImg)
  gMiddle.scale  = 0.1
  gMiddle2.addImage(trackImg)
  gMiddle2.scale  = 0.1
  gMiddle3.addImage(trackImg)
  gMiddle3.scale  = 0.1


  gTop2.setCollider("rectangle",0,0,gTop2.width,400)
  gMiddle2.setCollider("rectangle",0,0,gMiddle2.width,400)
  coinGroup = new Group()
  obGroup = new Group()
  comGroup = new Group();
  invPowerGroup = new Group();
}

function draw() {
  background(0); 
 
  drawSprites();
if (gameState === "info") {
playButton.addImage(playImg)
playButton.scale = 0.2
bg.velocityX = 0;
if (mousePressedOver(playButton)) {
  gameState = "play"
  playButton.visible = false;
  bg.velocityX = -5;
}
gMiddle.visible = false;
gTop.visible = false;
player.visible = false;
gTop2.visible = false;
gTop3.visible = false;
gMiddle2.visible = false;
gMiddle3.visible = false;


}

console.log(gameState)

if (gameState === "play"||gameState === "invincible") {

  if (keyDown("space")&&(player.collide(gTop2)||player.collide(gMiddle2)||player.collide(edges[3]))) {
    player.velocityY = -12;
  }
  player.velocityY =  player.velocityY+0.8;

  if (keyDown(DOWN_ARROW)&&player.y < 400) {
    player.y = player.y+180;
  }

  if (keyDown(UP_ARROW)&&player.y > 160) {
    player.y = player.y-190;
  }

  if (invPowerGroup.isTouching(player)) {
    //change image
    gameState = "invincible"
    invPowerGroup.destroyEach();
 count = frameCount
  }
  if (count+100 === frameCount) {
    //change image
  gameState = "play"
  count = 0;
  }
  if (bg.x < 0) {
    bg.x = bg.width/2
  }
  if (player.collide(gMiddle)) {
    player.velocityY = 0;
  }
  gMiddle.visible = true;
gTop.visible = true;
player.visible = true;
playButton.visible = false;
gTop2.visible = true;
gTop3.visible = true;
gMiddle2.visible = true;
gMiddle3.visible = true;

spawnCoins();
spawnOb();
spawnComet();
spawnInvPowerUp();
for (var i =0; i < coinGroup.length; i++) {
  if (coinGroup.get(i)!= null&&coinGroup.get(i).isTouching(player)) {
  coinGroup.get(i).destroy();
  score++
  }
  }
  if ((obGroup.isTouching(player)||comGroup.isTouching(player))&&gameState != "invincible") {
    gameState = "end"
  }
} else if (gameState === "end") {
  bg.velocityX = 0;
coinGroup.setVelocityXEach(0)
obGroup.setVelocityXEach(0)
player.velocityY = 0;
coinGroup.setLifetimeEach(-1)
obGroup.setLifetimeEach(-1)
comGroup.setLifetimeEach(-1)
comGroup.setVelocityXEach(0)
}
  player.collide(gTop)
  player.collide(gMiddle)
  player.collide(gTop2)
  player.collide(gTop3)
  player.collide(gMiddle2)
  player.collide(gMiddle3)
  player.collide(edges[3])
  player.collide(edges[2])
  if (gameState != "info") {
textSize(20)
fill("white")
text("Score: "+score,660,50)
  }

}

function spawnCoins() {
  rand = Math.round(random(1,3))
  if (frameCount % 80 == 0) {
coin = createSprite(820,300,10,10)
coin.addImage(coinImg)
coin.scale = 0.1
coin.velocityX = -7;
coin.lifetime = 164;
if (rand == 1) {
  coin.y = 575;
} else if (rand == 2) {
  coin.y = 370
} else if(rand == 3) {
  coin.y = 150;
}
coinGroup.add(coin)
  } 
}

function spawnOb() {
  rand = Math.round(random(1,3))
  if (frameCount % 63 == 0) {
    obstacle = createSprite(820,300,10,20)
    obstacle.velocityX = -7;
    obstacle.lifetime = 164;
    obstacle.shapeColor = "red"
    
    if (rand == 1) {
      obstacle.y = 575;
    } else if (rand == 2) {
      obstacle.y = 370
    } else if(rand == 3) {
      obstacle.y = 150;
    }
    obGroup.add(obstacle)
  }
}

function spawnComet() {
if (frameCount % 150 ===  0) {
comet = createSprite(800,random(0,600),20,20)
comet.addImage(cometImg)
comet.scale = 0.2
comet.lifetime = 300;
comet.shapeColor = "yellow"
comet.velocityX = random(-10,-5)
comet.velocityY = random(-10,10)
comet.pointTo(player)
comGroup.add(comet)
}
}

function spawnInvPowerUp() {
  rand1 = Math.round(random(1,3))
  if (frameCount % 250 === 0) {
  invPowerUp = createSprite(820,300,10,10)
  invPowerUp.addImage(invpotionImg)
  invPowerUp.scale = 0.1
    invPowerUp.lifetime = 164;
    invPowerUp.velocityX = -7;

    if (rand1 == 1) {
      invPowerUp.y = 575;
    } else if (rand1 == 2) {
      invPowerUp.y = 370
    } else if(rand == 3) {
      invPowerUp.y = 150;
    }
    invPowerGroup.add(invPowerUp)
  }
}

