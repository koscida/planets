// module aliases
var Engine = Matter.Engine,
	Render = Matter.Render,
	Runner = Matter.Runner,
	Bodies = Matter.Bodies,
	Composite = Matter.Composite;

// create an engine variable
var engine;
var world;
var runner;
var boxA;
var boxB;
var ground;

function setup() {
	createCanvas(800, 800);

	// create an engine
	engine = Engine.create();

	// create the world
	world = engine.world;

	// create two boxes and a ground
	boxA = Bodies.rectangle(400, 200, 80, 80);
	boxB = Bodies.rectangle(450, 50, 80, 80);
	ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

	// add all of the bodies to the world
	Composite.add(world, [boxA, boxB, ground]);

	// create runner
	runner = Runner.create();

	// run the engine
	Runner.run(runner, engine);
}

function draw() {
	background(51);

	rect(boxA.position.x, boxA.position.y, 80, 80);
}
