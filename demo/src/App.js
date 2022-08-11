import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import ParticleSandbox from "./Two/ParticleSandbox";
import Planets from "./planets/Planets";
import Spiral from "./spiral/SpiralApp";

function App() {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path="/two" element={<ParticleSandbox />} />
				<Route path="/planets" element={<Planets />} />
				<Route path="/spiral" element={<Spiral />} />
			</Routes>
		</Router>
	);
}

export default App;
