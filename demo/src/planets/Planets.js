import React, { useState, useEffect } from "react";
import * as d3 from "d3";

const system = {
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
		circle: [],
		square: [],
	},
};

const _width = window.innerWidth;
const _midX = Math.floor(_width / 2);
const _height = window.innerHeight;
const _midY = Math.floor(_height / 2);

const PrimaryCelestialObject = ({ primaryObject: { name, radius, color } }) => {
	return (
		<DrawCelestialObject x={_midX} y={_midY} r={radius} fillColor={color} />
	);
};

const SecondaryCelestialObject = ({
	secondaryObject: { name, radius, distance, rotations, color, subObjects },
	centeringObjectRaduis,
	centeringX,
	centeringY,
	daysPerSecond,
}) => {
	const radiusDistance = centeringObjectRaduis + distance + radius;
	const [angle, setAngle] = useState(0);

	function tickAnimation() {
		console.log(daysPerSecond);
		setAngle(
			(angle) => (angle + 360 * (1 / rotations) * (daysPerSecond / 60)) % 360
		);
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
			<DrawCelestialObject x={x} y={y} r={radius} fillColor={color} />
			{subObjects &&
				subObjects.map((subObject) => (
					<SecondaryCelestialObject
						key={subObject.name}
						secondaryObject={subObject}
						centeringObjectRaduis={radius}
						centeringX={x}
						centeringY={y}
						daysPerSecond={daysPerSecond}
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
	return (
		<div className="App">
			<h1>Planets</h1>
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
			<svg width={_width} height={_height}>
				<PrimaryCelestialObject primaryObject={system.primaryObject} />
				{system.secondaryObjects.map((secondaryObject) => {
					return (
						<SecondaryCelestialObject
							key={secondaryObject.name}
							secondaryObject={secondaryObject}
							centeringObjectRaduis={system.primaryObject.radius}
							centeringX={_midX}
							centeringY={_midY}
							daysPerSecond={daysPerSecond}
						/>
					);
				})}
			</svg>
		</div>
	);
}
