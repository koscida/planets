import React, { useState, useEffect } from "react";
import Sketch from "react-p5";
import {
	Box,
	Grid,
	FormControlLabel,
	TextField,
	Checkbox,
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InputSlider from "./components/InputSlider";

const dwarfSystem = {
	solarObjects: [
		{
			name: "Sun 1",
			radius: 50,
			distanceX: -40,
			distanceY: -40,
			rotations: 1112,
			offSet: 0,
			color: "yellow",
		},
		{
			name: "Sun 2",
			radius: 10,
			distanceX: 50 + 5,
			distanceY: 50 + 5,
			rotations: 1112,
			offSet: 556,
			color: "orange",
		},
	],
	celestialObjects: [
		{
			name: "Planet",
			radius: 10,
			distanceX: 200,
			distanceY: 200,
			rotations: 556,
			offSet: 278,
			color: "blue",
			subObjects: [
				{
					name: "Moon",
					radius: 5,
					distanceX: 10,
					distanceY: 10,
					rotations: 139,
					offSet: 0,
					color: "grey",
				},
			],
		},
		{
			name: "Planet 1",
			radius: 20,
			distanceX: 400,
			distanceY: 400,
			rotations: 2000,
			offSet: 278,
			color: "blue",
			subObjects: [
				{
					name: "Moon",
					radius: 5,
					distanceX: 50 + 10,
					distanceY: 50 + 10,
					rotations: 139,
					offSet: 0,
					color: "grey",
				},
				{
					name: "Moon",
					radius: 5,
					distanceX: 50 + 10,
					distanceY: 50 + 10,
					rotations: 139,
					offSet: 0,
					color: "grey",
				},
				{
					name: "Moon",
					radius: 5,
					distanceX: 50 + 10,
					distanceY: 50 + 10,
					rotations: 139,
					offSet: 0,
					color: "grey",
				},
				{
					name: "Moon",
					radius: 5,
					distanceX: 50 + 10,
					distanceY: 50 + 10,
					rotations: 139,
					offSet: 0,
					color: "grey",
				},
				{
					name: "Moon",
					radius: 5,
					distanceX: 50 + 10,
					distanceY: 50 + 10,
					rotations: 139,
					offSet: 0,
					color: "grey",
				},
				{
					name: "Moon",
					radius: 5,
					distanceX: 50 + 10,
					distanceY: 50 + 10,
					rotations: 139,
					offSet: 0,
					color: "grey",
				},
				{
					name: "Moon",
					radius: 5,
					distanceX: 50 + 10,
					distanceY: 50 + 10,
					rotations: 139,
					offSet: 0,
					color: "grey",
				},
				{
					name: "Moon",
					radius: 5,
					distanceX: 50 + 10,
					distanceY: 50 + 10,
					rotations: 139,
					offSet: 0,
					color: "grey",
				},
				{
					name: "Moon",
					radius: 5,
					distanceX: 50 + 10,
					distanceY: 50 + 10,
					rotations: 139,
					offSet: 0,
					color: "grey",
				},
			],
		},

		{
			name: "Planet 2",
			radius: 25,
			distanceX: 500,
			distanceY: 500,
			rotations: 5000,
			offSet: 555,
			color: "blue",
			subObjects: [
				{
					name: "Moon",
					radius: 5,
					distanceX: 10,
					distanceY: 10,
					rotations: 139,
					offSet: 0,
					color: "grey",
				},
				{
					name: "Moon",
					radius: 5,
					distanceX: 10,
					distanceY: 10,
					rotations: 139,
					offSet: 0,
					color: "grey",
				},
				{
					name: "Moon",
					radius: 5,
					distanceX: 10,
					distanceY: 10,
					rotations: 139,
					offSet: 0,
					color: "grey",
				},
				{
					name: "Moon",
					radius: 5,
					distanceX: 50 + 10,
					distanceY: 50 + 10,
					rotations: 139,
					offSet: 0,
					color: "grey",
				},
				{
					name: "Moon",
					radius: 5,
					distanceX: 50 + 10,
					distanceY: 50 + 10,
					rotations: 139,
					offSet: 0,
					color: "grey",
				},
			],
		},
		{
			name: "Planet 3",
			radius: 30,
			distanceX: 600,
			distanceY: 600,
			rotations: 3333,
			offSet: 333,
			color: "blue",
			subObjects: [
				{
					name: "Moon",
					radius: 5,
					distanceX: 50 + 10,
					distanceY: 50 + 10,
					rotations: 139,
					offSet: 0,
					color: "grey",
				},
			],
		},
	],
	boundaries: {
		circles: [
			{ strokeColor: "black", strokeWidth: 1, radiusX: 150, radiusY: 150 },
		],
		squares: [],
	},
};
const earthSystem = {
	solarObjects: [
		{
			name: "Sun",
			radius: 100,
			distance: 0,
			rotations: 0,
			color: "yellow",
		},
	],
	celestialObjects: [
		{
			name: "Planet 1",
			radius: 10,
			distance: 100,
			rotations: 137,
			color: "green",
		},
		{
			name: "Planet 2",
			radius: 15,
			distance: 115,
			rotations: 350,
			color: "blue",
		},
		{
			name: "Planet 3",
			radius: 10,
			distance: 140,
			rotations: 400,
			color: "purple",
		},
		{
			name: "Planet 4",
			radius: 40,
			distance: 400,
			rotations: 548,
			color: "orange",
			subObjects: [
				{
					name: "Moon 1",
					radius: 5,
					distance: 10,
					rotations: 15,
					color: "grey",
				},
				{
					name: "Moon 2",
					radius: 6,
					distance: 13,
					rotations: 40,
					color: "grey",
				},
				{
					name: "Moon 3",
					radius: 10,
					distance: 17,
					rotations: 10,
					color: "grey",
				},
			],
		},
	],
	boundaries: {
		circles: [],
		squares: [],
	},
};

const _width = window.innerWidth * 0.8;
const _midX = Math.floor(_width / 2);
const _height = window.innerHeight - 20;
// console.log("_height", _height);
const _midY = Math.floor(_height / 2);

const CelestialObject = ({
	celestialObject: {
		radius,
		distanceX,
		distanceY,
		rotations,
		offSet,
		color,
		subObjects,
	},
	centeringX,
	centeringY,
	showOrbit,
	zoom,
	scale,
	tick,
}) => {
	const radiusDistanceX = (distanceX + radius) * (zoom / 100);
	const radiusDistanceY = (distanceY + radius) * (zoom / 100);
	const radiusScaled = radius * (scale / 10) * (zoom / 100);

	// (angle + 360 * (1 / rotations) * (daysPerSecond / 60)) % 360
	//const angle = (360 * (1 / rotations) * ((tick % 60) / 60)) % 360;
	// const angle = tick % 360
	const angle = (360 * (tick % (360 * rotations)) * (1 / rotations)) % 360;

	const x = centeringX - Math.cos((angle * Math.PI) / 180) * radiusDistanceX;
	const y = centeringY - Math.sin((angle * Math.PI) / 180) * radiusDistanceY;

	return (
		<>
			<circle cx={x} cy={y} r={radiusScaled} fill={color} />
			{showOrbit && (
				<ellipse
					cx={centeringX}
					cy={centeringY}
					rx={radiusDistanceX}
					ry={radiusDistanceY}
					stroke={color}
					strokeWidth={Math.min(Math.max(radiusScaled / 10, 0.4), 3)}
					fillOpacity="0"
				/>
			)}
			{subObjects &&
				subObjects.map((subObject, i) => (
					<CelestialObject
						key={i}
						celestialObject={subObject}
						centeringX={x}
						centeringY={y}
						showOrbit={showOrbit}
						zoom={zoom}
						scale={scale}
						tick={tick}
					/>
				))}
		</>
	);
};

const CelestialObjectInputs = ({
	name,
	objects,
	setSystemPlanets,
	setPaused,
}) => {
	const [expanded, setExpanded] = useState();
	const setCelestialObject = (newCelestialObject, i) => {
		setSystemPlanets((oldSystem) => {
			oldSystem[i] = newCelestialObject;
			return oldSystem;
		});
	};
	const handleChange = (i) => {
		setExpanded(i);
		i >= 0 ? setPaused(true) : setPaused(false);
	};
	return (
		<>
			<Box sx={{ display: "flex", justifyContent: "space-between" }}>
				<p>{name}</p>
				<p>Add</p>
			</Box>
			{objects.map((celestialObject, i) => (
				<CelestialObjectInput
					key={i}
					celestialObject={celestialObject}
					expanded={expanded === i}
					handleChange={() => handleChange(i)}
					setCelestialObject={(newCelestialObject) =>
						setCelestialObject(newCelestialObject, i)
					}
				/>
			))}
		</>
	);
};
const CelestialObjectInput = ({
	celestialObject,
	expanded,
	handleChange,
	setCelestialObject,
}) => {
	const handleTextChange = ({ target: { name, value } }) => {
		setCelestialObject((oldObject) => {
			oldObject[name] = value;
			return oldObject;
		});
	};
	const handleNumberChange = ({ target: { name, value } }) => {
		setCelestialObject((oldObject) => {
			oldObject[name] = +value;
			return oldObject;
		});
	};
	return (
		<Accordion expanded={expanded} onChange={handleChange}>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls="panel1bh-content"
				id="panel1bh-header"
			>
				<Typography>{celestialObject.name}</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<TextField
					id={`${celestialObject.name}-name`}
					label={"Name"}
					name={"name"}
					variant="filled"
					value={celestialObject.name}
					onChange={handleTextChange}
				/>
				<TextField
					id={`${celestialObject.name}-radius`}
					label={"Radius"}
					name={"radius"}
					variant="filled"
					value={celestialObject.radius}
					onChange={handleNumberChange}
				/>
				<TextField
					id={`${celestialObject.name}-distanceX`}
					label={"DistanceX"}
					name={"distanceX"}
					variant="filled"
					value={celestialObject.distanceX}
					onChange={handleNumberChange}
				/>
				<TextField
					id={`${celestialObject.name}-distanceY`}
					label={"DistanceY"}
					name={"distanceY"}
					variant="filled"
					value={celestialObject.distanceY}
					onChange={handleNumberChange}
				/>
				<TextField
					id={`${celestialObject.name}-color`}
					label={"Color"}
					name={"color"}
					variant="filled"
					value={celestialObject.color}
					onChange={handleTextChange}
				/>
				<TextField
					id={`${celestialObject.name}-rotations`}
					label={"Rotations"}
					name={"rotations"}
					variant="filled"
					value={celestialObject.rotations}
					onChange={handleNumberChange}
				/>
				<TextField
					id={`${celestialObject.name}-offset`}
					label={"Offset"}
					name={"offSet"}
					variant="filled"
					value={celestialObject.offSet}
					onChange={handleNumberChange}
				/>
			</AccordionDetails>
		</Accordion>
	);
};

const CircularBoundary = ({
	circleBoundary: { strokeColor, strokeWidth, radiusX, radiusY },
	centeringX,
	centeringY,
	zoom,
	scale,
}) => {
	const radiusScaledX = radiusX * (scale / 10) * (zoom / 100);
	const radiusScaledY = radiusY * (scale / 10) * (zoom / 100);
	return (
		<ellipse
			cx={centeringX}
			cy={centeringY}
			rx={radiusScaledX}
			ry={radiusScaledY}
			stroke={strokeColor}
			strokeWidth={strokeWidth}
			fillOpacity="0"
		/>
	);
};

export default function Planets() {
	const [tick, setTick] = useState(0);
	const [paused, setPaused] = useState(false);
	const [zoom, setZoom] = useState(50);
	const [scale, setScale] = useState(7);

	const [daysPerSecond, setDaysPerSecond] = useState(50);
	const [showOrbit, setShowOrbit] = useState(true);
	const [showBoundaries, setShowBoundaries] = useState(true);

	const [systemSuns, setSystemSuns] = useState(dwarfSystem.solarObjects);
	const [systemPlanets, setSystemPlanets] = useState(
		dwarfSystem.celestialObjects
	);
	const [systemBoundaries, setSystemBoundaries] = useState(
		dwarfSystem.boundaries
	);

	const handleCheckClick = (setFunc) => setFunc((x) => !x);
	// const handleScroll = (e) => {
	// 	const porportion = Math.floor(
	// 		(e.target.scrollingElement.scrollTop / (_height - 20)) * 100
	// 	);
	// 	setZoom(porportion);
	// };
	// useEffect(() => {
	// 	function watchScroll() {
	// 		window.addEventListener("scroll", handleScroll);
	// 	}
	// 	watchScroll();
	const setup = (p5, canvasParentRef) => {
		p5.createCanvas(500, 400).parent(canvasParentRef);
	};

	const draw = (p5) => {
		p5.background(255, 130, 20);
		p5.ellipse(100, 100, 100);
		p5.ellipse(300, 100, 100);
	};

	return (
		<div className="App">
			<Grid container>
				<Grid item md={2}>
					<div
						style={{
							height: _height,
							width: "calc(2 * 100% / 12)",
							position: "fixed",
							overflow: "scroll",
						}}
					>
						<h1>Planets</h1>
						<div>
							<p>Tick: {tick}</p>
							<p>Paused: {paused ? "True" : "False"}</p>
						</div>
						<hr />
						<div>
							<InputSlider
								label={"Zoom"}
								value={zoom}
								setValue={setZoom}
								min={1}
								max={100}
								defaultValue={1}
							/>
						</div>
						<div>
							<InputSlider
								label={"Scale"}
								value={scale}
								setValue={setScale}
								min={1}
								max={10}
								defaultValue={7}
							/>
						</div>
						<hr />
						{/* <div>
							<label>Days Per Second</label>
							<span>{daysPerSecond}</span>
							<input
								type="range"
								min="1"
								max="100"
								value={daysPerSecond}
								onChange={(e) => {
									setDaysPerSecond(e.target.value);
								}}
							/>
							<button onClick={(e) => handleCheckClick(setPaused)}>
								{paused ? "Play" : "Pause"}
							</button>
						</div> */}
						<div>
							<FormControlLabel
								label="Show Orbit"
								control={
									<Checkbox
										inputProps={{ "aria-label": "controlled" }}
										checked={showOrbit}
										onChange={(e) => handleCheckClick(setShowOrbit)}
									/>
								}
							/>
							<FormControlLabel
								label="Show Boundaries"
								control={
									<Checkbox
										inputProps={{ "aria-label": "controlled" }}
										checked={showBoundaries}
										onChange={(e) => handleCheckClick(setShowBoundaries)}
									/>
								}
							/>
						</div>
						<hr />
						<div>
							<button onClick={() => handleCheckClick(setPaused)}>
								{paused ? "Unpause" : "Pause"}
							</button>
							{paused && (
								<>
									<div>
										<CelestialObjectInputs
											name={"Suns"}
											objects={systemSuns}
											setSystemPlanets={setSystemSuns}
											setPaused={setPaused}
										/>
									</div>
									<div>
										<CelestialObjectInputs
											name={"Planets"}
											objects={systemPlanets}
											setSystemPlanets={setSystemPlanets}
											setPaused={setPaused}
										/>
									</div>
								</>
							)}
						</div>
					</div>
				</Grid>
				<Grid item md={10}>
					<div style={{ height: _height * 2, position: "relative" }}>
						<div style={{ position: "fixed" }}>
							<Sketch setup={setup} draw={draw} />;
						</div>
					</div>
				</Grid>
			</Grid>
		</div>
	);
}
