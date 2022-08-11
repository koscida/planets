import React, { useState, useEffect } from "react";
import * as d3 from "d3";

const Planet = ({ cx, cy, maxR, fillColor }) => {
	// using R and V for radius helps us invert the spiral at 0
	const [radius, setRadius] = useState({ r: maxR, v: -(maxR / 360) });
	const [angle, setAngle] = useState(0);

	function tickAnimation() {
		// run angle in a circle
		// adjust +2 to speed up and fit entire animation in a certain time
		setAngle((angle) => (angle + 2) % 360);
		setRadius((radius) => {
			let { r, v } = radius;
			r += v;

			// invert movement direction at 0 and maxR
			if (r < 0) {
				v = +(maxR / 360);
			} else if (r > maxR) {
				v = -(maxR / 360);
			}

			return { r, v };
		});
	}

	// start game loop timer on mount
	useEffect(() => {
		const t = d3.timer(tickAnimation);
		return () => t.stop();
	}, []);

	const x = Math.cos((angle * Math.PI) / 180) * radius.r;
	const y = Math.sin((angle * Math.PI) / 180) * radius.r;
	const borderColor = d3.interpolateRdBu((360 - angle) / 360);

	return (
		<g transform={`translate(${cx}, ${cy})`}>
			<circle
				cx={x}
				cy={y}
				r={10}
				fill={fillColor}
				stroke={borderColor}
				strokeWidth={2}
			/>
		</g>
	);
};

export default function App() {
	return (
		<div className="App">
			<h1>Animated spiral with React Hooks</h1>
			<svg width="400" height="400">
				<Planet cx={0} cy={0} maxR={50} fillColor={"yellow"} />
			</svg>
		</div>
	);
}
