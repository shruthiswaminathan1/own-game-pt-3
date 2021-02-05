

var girlimg,girl;
var road;
var gameState = "start";

var invisibleSprite
function preload(){
  roadimg = loadImage("images/road.jpg");
  girlimg =loadAnimation("images/running3.png","images/running1.png","images/running2.png");
  girlimg1 = loadAnimation("images/standing.png");
  car1 = loadImage("images/car1.png");
  car2 = loadImage("images/car2.png");
  car3 = loadImage("images/car3.png");
  car4 = loadImage("images/car4.png");
  car5 = loadImage("images/car5.png");
  car7 = loadImage("images/car7.png");
  car8 = loadImage("images/car8.png");
  car9 = loadImage("images/car9.png");
  car10 = loadImage("images/car10.png");
  car11 = loadImage("images/car11.png");
  girl1 = loadAnimation("images/girl1.png","images/girl2.png","images/girl3.png");

 
  
 }

function setup() {
  createCanvas(windowWidth,windowHeight);

  road = createSprite(windowWidth/2,windowHeight/2);
  road.scale = 1.5
  road.addImage("road",roadimg);
  girl = createSprite(300, windowHeight-100, 50, 50);
  girl.addAnimation("girl",girlimg1);
  girl.addAnimation("g",girlimg);
  invisibleSprite=createSprite(windowWidth/2,windowHeight/2+30,windowWidth,10);
  invisibleSprite.visible=false
// girl.addAnimation("g",girl1);
  girl.scale=0.5;

//girl.debug = true;
girl.setCollider("circle", 0,50,50);
  carGroup = new Group();
}

function draw() {
  background(255,255,255);  

  drawSprites();

if(gameState === "start"){

  textSize(20);
  fill(random(0,255),random(0,255),random(0,255));
  strokeWeight(2);


  text("1) Make sure the girl doesn't hit the cars." , 450,200);
  text("2) Navigate the girl with the help of arrow keys.",450,230);
  text("3) Safe walking!", 570,300 );

  text("PRESS SPACE TO START", 530,350);

  if(keyDown("space" ) ){
    gameState = "walk";
  }
  
}

if(gameState === "walk"){
  if(keyDown(UP_ARROW)){
    girl.y-=3;
    girl.changeAnimation("g",girlimg);
    //girl.x = girl.x-3
  }
  else if(keyDown(DOWN_ARROW)){
    girl.y+=3;
    girl.changeAnimation("g",girlimg);
  }
  else if(keyDown(LEFT_ARROW)){
    girl.x-=3;
    girl.changeAnimation("g",girlimg);
  }
  else if(keyDown(RIGHT_ARROW)){
    girl.x+=3;
    girl.changeAnimation("g",girlimg);
  }
  else{
  girl.changeAnimation("girl",girlimg1);
  }
  //call the function for car
  spawncars();

//  if(girl.x === car.x  ){
    if(carGroup.isTouching(girl)){
      gameState = "end";
    }
 // }
  
 
}

else if(gameState === "end"){
  textSize(30);
  fill("red");
  text("GAME OVER",windowWidth/2,windowHeight/2);
  carGroup.setVelocityEach(0);
  carGroup.setLifeTimeEach(-1);
  girl.addAnimation("girl",girlimg1);
}



  
  girl.collide(invisibleSprite)

  

      
}
function spawncars(){
  if(frameCount%80===0){
    position = Math.round(random(1,2));
    car=createSprite(400,200,20,20);
    //car.debug = true;
    car.setCollider("circle",0,0,100);
    console.log(position)
     //using random variable change the position of fruit, to make it more challenging
    
    if(position === 1)
    {
    car.x=0;
    car.velocityX= 7;
    car.scale = 0.5
    r=Math.round(random(1,5));
    if (r == 1) {
      car.addImage(car1);
    } else if (r == 2) {
      car.addImage(car2);
    } else if (r == 3) {
      car.addImage(car4);
    } else {
      car.addImage(car9);
    }

    }
    else
    {
      if(position==2){
      
      car.x=displayWidth-100;
      car.scale = 0.7
  //Increase the velocity of fruit after score 4 or 10
      car.velocityX= -7;
      p=Math.round(random(1,5));
    if (p == 1) {
      car.addImage(car3);
    } else if (p == 2) {
      car.addImage(car5);
    } else if (p == 3) {
      car.addImage(car8);
    } else  if(p == 4){
      car.addImage(car10);
    }
    else {
      car.addImage(car11);
    }
      } 
    }
    
    
   
     //fruit.debug=true;
    
    
    car.y= windowHeight/2 +100 
    car.depth= girl.depth;
    car.lifetime=300;
    //car.depth = girl.depth;
    carGroup.add(car);
  }
}

