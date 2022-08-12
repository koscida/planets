import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import "./main.css";

const system1 = {
	primaryObject: {
		name: "Sun",
		radius: 50,
		color: "yellow",
	},
	secondaryObjects: [
		{
			name: "Sun 2",
			radius: 10,
			distance: 10,
			rotations: 137,
			color: "orange",
		},
		{
			name: "Planet",
			radius: 10,
			distance: 200,
			rotations: 548,
			color: "blue",
			subObjects: [
				{
					name: "Moon",
					radius: 5,
					distance: 10,
					rotations: 36,
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
const system2 = {
	primaryObject: {
		name: "Sun",
		radius: 100,
		color: "yellow",
	},
	secondaryObjects: [
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
const system = system2;

const _width = window.innerWidth;
const _midX = Math.floor(_width / 2);
const _height = window.innerHeight;
const _midY = Math.floor(_height / 2);

const PrimaryCelestialObject = ({
	primaryObject: { name, radius, color },
	zoom,
	scale,
}) => {
	return (
		<DrawCelestialObject
			x={_midX}
			y={_midY}
			r={radius * (scale / 10) * (zoom / 100)}
			fillColor={color}
		/>
	);
};

const SecondaryCelestialObject = ({
	secondaryObject: { name, radius, distance, rotations, color, subObjects },
	centeringObjectRaduis,
	centeringX,
	centeringY,
	daysPerSecond,
	paused,
	showOrbit,
	zoom,
	scale,
}) => {
	const radiusDistance =
		(centeringObjectRaduis + distance + radius) * (zoom / 100);
	const radiusScaled = radius * (scale / 10) * (zoom / 100);
	const [angle, setAngle] = useState(0);

	function tickAnimation() {
		if (!paused) {
			//console.log(daysPerSecond);
			setAngle(
				(angle) => (angle + 360 * (1 / rotations) * (daysPerSecond / 60)) % 360
			);
		}
	}

	// start game loop timer on mount
	useEffect(() => {
		//const t = d3.timer(tickAnimation);
		const t = d3.interval(tickAnimation, 1000 * (1 / 60));
		return () => t.stop();
	}, []);

	const x = centeringX - Math.cos((angle * Math.PI) / 180) * radiusDistance;
	const y = centeringY - Math.sin((angle * Math.PI) / 180) * radiusDistance;

	return (
		<>
			<DrawCelestialObject x={x} y={y} r={radiusScaled} fillColor={color} />
			{showOrbit && (
				<circle
					cx={centeringX}
					cy={centeringY}
					r={radiusDistance}
					stroke={color}
					stroke-width={radiusScaled / 10}
					fillOpacity="0"
				/>
			)}
			{subObjects &&
				subObjects.map((subObject) => (
					<SecondaryCelestialObject
						key={subObject.name}
						secondaryObject={subObject}
						centeringObjectRaduis={radiusScaled}
						centeringX={x}
						centeringY={y}
						daysPerSecond={daysPerSecond}
						showOrbit={showOrbit}
						zoom={zoom}
						scale={scale}
					/>
				))}
		</>
	);
};

const DrawCelestialObject = ({ x, y, r, fillColor }) => {
	return <circle cx={x} cy={y} r={r} fill={fillColor} />;
};

export default function App() {
	const [daysPerSecond, setDaysPerSecond] = useState(50);
	const [paused, setPaused] = useState(false);
	const [showOrbit, setShowOrbit] = useState(true);
	const [zoom, setZoom] = useState(100);
	const [scale, setScale] = useState(7);

	const handleCheckClick = (setFunc) => setFunc((x) => !x);

	return (
		<div className="App">
			<h1>Planets</h1>
			<div>
				<label>Zoom: </label>
				<span>{zoom}</span>
				<input
					type="button"
					value="-"
					onClick={(e) => setZoom((x) => (x > 1 ? x - 1 : x))}
				/>
				<input
					type="range"
					min="1"
					max="200"
					value={zoom}
					onChange={(e) => {
						setZoom(e.target.value);
					}}
				/>
				<input
					type="button"
					value="+"
					onClick={(e) => setZoom((x) => (x < 200 ? x + 1 : x))}
				/>
			</div>
			<div>
				<label>Scale: </label>
				<span>{scale}</span>
				<input
					type="button"
					value="-"
					onClick={(e) => setScale((x) => (x > 1 ? x - 1 : x))}
				/>
				<input
					type="range"
					min="1"
					max="10"
					value={scale}
					onChange={(e) => {
						setScale(e.target.value);
					}}
				/>
				<input
					type="button"
					value="+"
					onClick={(e) => setScale((x) => (x < 10 ? x + 1 : x))}
				/>
			</div>
			<div>
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
			</div>
			<div>
				<button onClick={(e) => handleCheckClick(setPaused)}>
					{paused ? "Play" : "Pause"}
				</button>
			</div>
			<div>
				<input
					type="checkbox"
					id="showOrbit"
					checked={showOrbit}
					onClick={(e) => handleCheckClick(setShowOrbit)}
				/>
				<label htmlFor="showOrbit">Show Orbit</label>
			</div>
			<svg width={_width} height={_height}>
				<PrimaryCelestialObject
					primaryObject={system.primaryObject}
					zoom={zoom}
					scale={scale}
				/>
				{system.secondaryObjects.map((secondaryObject) => {
					return (
						<SecondaryCelestialObject
							key={secondaryObject.name}
							secondaryObject={secondaryObject}
							centeringObjectRaduis={system.primaryObject.radius}
							centeringX={_midX}
							centeringY={_midY}
							daysPerSecond={daysPerSecond}
							paused={paused}
							showOrbit={showOrbit}
							zoom={zoom}
							scale={scale}
						/>
					);
				})}
			</svg>
		</div>
	);
}
