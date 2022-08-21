import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Planets from "./planets/Planets";
import Ball from "./ball/BounceBall";
import Spiral from "./spiral/SpiralApp";
import ParticleSandbox from "./Two/ParticleSandbox";

function App() {
	return (
		<Router>
			{/* <Navbar /> */}
			<Routes>
				<Route path="/planets" element={<Planets />} />
				<Route path="/ball" element={<Ball />} />
				<Route path="/spiral" element={<Spiral />} />
				<Route path="/two" element={<ParticleSandbox />} />
			</Routes>
		</Router>
	);
}

export default App;
