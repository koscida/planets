import React, { useEffect, useState, useRef } from "react";
import Matter from "matter-js";
import Sketch from "react-p5";
import MatterAttractors from "matter-attractors";
Matter.use(MatterAttractors);

const STATIC_DENSITY = 15;
const PARTICLE_SIZE = 15;
const PARTICLE_BOUNCYNESS = 0.9;

export default function MatterStepThree() {
	const boxRef = useRef(null);
	const canvasRef = useRef(null);

	const [constraints, setContraints] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});
	const [scene, setScene] = useState();

	const [addStateValue, setAddStateValue] = useState(false);
	const [deleteStateValue, setDeleteStateValue] = useState(false);

	// handle click - add
	const handleAddClick = () => {
		setAddStateValue(!addStateValue);
	};
	useEffect(() => {
		// Add a new "ball" everytime `someStateValue` changes
		if (scene) {
			let { width, height } = constraints;
			[...Array(10).keys()].forEach(() => {
				let randomX = Math.floor(Math.random() * -width) + width;
				let randomY = Math.floor(Math.random() * -height) + height;
				Matter.World.add(
					scene.engine.world,
					Matter.Bodies.circle(randomX, randomY, PARTICLE_SIZE, {
						restitution: PARTICLE_BOUNCYNESS,
						plugin: {
							attractors: [
								function (bodyA, bodyB) {
									var force = {
										x: (bodyA.position.x - bodyB.position.x) * 1e-7,
										y: (bodyA.position.y - bodyB.position.y) * 1e-7,
									};

									// apply force to both bodies
									Matter.Body.applyForce(
										bodyA,
										bodyA.position,
										Matter.Vector.neg(force)
									);
									Matter.Body.applyForce(bodyB, bodyB.position, force);
								},
							],
						},
					})
				);
			});
		}
	}, [addStateValue]);

	// handle click - delete
	const handleDeleteClick = () => {
		setDeleteStateValue(!deleteStateValue);
	};
	useEffect(() => {
		if (scene) {
			Matter.World.remove(
				scene.engine.world,
				scene.engine.world.bodies[scene.engine.world.bodies.length - 1]
			);
		}
	}, [deleteStateValue]);

	// handle window resize
	const handleResize = () => {
		setContraints(boxRef.current.getBoundingClientRect());
		console.log("handleResize", constraints);
	};

	useEffect(() => {
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	useEffect(() => {
		if (constraints && scene) {
			let { width, height } = constraints;

			// Dynamically update canvas and bounds
			scene.bounds.max.x = width;
			scene.bounds.max.y = height;
			scene.options.width = width;
			scene.options.height = height;
			scene.canvas.width = width;
			scene.canvas.height = height;

			// Dynamically update floor
			const floor = scene.engine.world.bodies[0];

			Matter.Body.setPosition(floor, {
				x: width / 2,
				y: height + STATIC_DENSITY / 2,
			});

			Matter.Body.setVertices(floor, [
				{ x: 0, y: height },
				{ x: width, y: height },
				{ x: width, y: height + STATIC_DENSITY },
				{ x: 0, y: height + STATIC_DENSITY },
			]);
		}
	}, [scene, constraints]);

	// setup
	useEffect(() => {
		let Engine = Matter.Engine,
			Render = Matter.Render,
			Runner = Matter.Runner,
			Bodies = Matter.Bodies,
			Composite = Matter.Composite,
			Axes = Matter.Axes;

		// create an engine
		let engine = Engine.create({});

		engine.gravity.y = 0;

		// create a renderer
		let render = Render.create({
			element: boxRef.current,
			engine: engine,
			canvas: canvasRef.current,
			options: {
				width: constraints.width,
				height: constraints.height,
				background: "transparent",
				hasBounds: true,
				wireframes: false,
				showBounds: true,
			},
		});

		// create a ground
		const floor = Bodies.rectangle(0, 0, 0, STATIC_DENSITY, {
			isStatic: true,
			render: {
				fillStyle: "blue",
			},
		});

		// add all of the bodies to the world
		Composite.add(engine.world, [floor]);

		if (constraints && scene) {
			let { width, height } = constraints;

			// Dynamically update canvas and bounds
			scene.bounds.max.x = width;
			scene.bounds.max.y = height;
			scene.options.width = width;
			scene.options.height = height;
			scene.canvas.width = width;
			scene.canvas.height = height;
		}

		// axes
		// const axes = Axes.fromVertices([
		// 	{ x: 0, y: 0 },
		// 	{ x: 25, y: 50 },
		// 	{ x: 50, y: 0 },
		// ]);
		// Axes.rotate(axes, 40);

		// run the renderer
		Render.run(render);

		// create runner
		var runner = Runner.create();

		// run the engine
		Runner.run(runner, engine);

		setContraints(boxRef.current.getBoundingClientRect());
		setScene(render);
		console.log("setup", constraints);

		window.addEventListener("resize", handleResize);
	}, []);

	return (
		<div
			style={{
				position: "absolute",
				border: "1px solid pink",
				height: "100%",
				width: "100%",
				padding: 0,
			}}
		>
			<button
				style={{
					cursor: "pointer",
					display: "block",
					textAlign: "center",
				}}
				onClick={() => handleAddClick()}
			>
				Add
			</button>
			<button
				style={{
					cursor: "pointer",
					display: "block",
					textAlign: "center",
				}}
				onClick={() => handleDeleteClick()}
			>
				Delete
			</button>
			<div
				ref={boxRef}
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					width: "100%",
					height: "100%",
					pointerEvents: "none",
					border: "1px solid red",
				}}
			>
				<canvas ref={canvasRef} style={{ border: "1px solid blue" }} />
			</div>
		</div>
	);
}
