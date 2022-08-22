import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Planets from "./planets/Planets";
import MatterPlanets from "./matter-planets/Comp";
import P5Example from "./p5-example/Comp";
import Matter from "./matter/Comp";
import Ball from "./ball/BounceBall";
import Spiral from "./spiral/SpiralApp";
import ParticleSandbox from "./Two/ParticleSandbox";

function App() {
	return (
		<Router>
			{/* <Navbar /> */}
			<Routes>
				<Route path="/planets" element={<Planets />} />
				<Route path="/matter-planets" element={<MatterPlanets />} />
				<Route path="/p5-example" element={<P5Example />} />
				<Route path="/matter" element={<Matter />} />
				<Route path="/ball" element={<Ball />} />
				<Route path="/spiral" element={<Spiral />} />
				<Route path="/two" element={<ParticleSandbox />} />
			</Routes>
		</Router>
	);
}

export default App;
