
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;

var boyImg

function preload()
{
	boyImg= loadImage("images/boy.png");
}

function setup() {
	createCanvas(1600, 1600);


	engine = Engine.create();
	world = engine.world;

	//Create the Bodies Here.
	ground = new Ground(400,550,800,10);
	stone = new Stone(140,450,60,60);
	launcher = new Launch(stone.body,{x:140,y:450});
	tree = new Tree(600,350,10,10);
	mango1 = new Mango(580,300,40);
	mango2 = new Mango(650,300,40);
	mango3 = new Mango(700,250,40);
	mango4 = new Mango(520,270,40);
	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  background(0);
  ground.display();
  launcher.display();
  imageMode(CENTER);
  image(boyImg,200,500,180,200);
  tree.display();
  stone.display();
  mango1.display();
  mango2.display();
  mango3.display();
  mango4.display();
  detectCollision(stone,mango1);
  detectCollision(stone,mango2);
  detectCollision(stone,mango3);
  detectCollision(stone,mango4);
}

function mouseDragged(){
    Matter.Body.setPosition(stone.body,{x:mouseX,y:mouseY})
}

function mouseReleased(){
	launcher.fly();
}

function detectCollision(lstone,lmango){
	mangoBodyPosition= lstone.body.position;
	stoneBodyPosition= lmango.body.position;
	
	var distance=dist(stoneBodyPosition.x,stoneBodyPosition.y,mangoBodyPosition.x,mangoBodyPosition.y);
	if(distance<=lmango.radius+lstone.width){
		Matter.Body.setStatic(lmango.body,false);
	}
}

function keyPressed(){
	if(keyCode === 32){
		Matter.Body.setPosition(stone.body,{x:140,y:450});
		launcher.attach(stone.body);
	}
}