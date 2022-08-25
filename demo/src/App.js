import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Nav, NavLink, NavMenu } from "./NavbarElements";
import Planets from "./svg-planets/Planets";
import MatterPlanets from "./matter-planets/Comp";
import P5Planets from "./p5-planets/Planets";
import P5Example from "./p5-example/Comp";
import Matter from "./matter/Comp";
import Ball from "./ball-animation-frame/BounceBall";
import Spiral from "./spiral/SpiralApp";
import ParticleSandbox from "./Two/ParticleSandbox";

const Home = () => {
	return (
		<div>
			<NavLink to="/planets" activeStyle>
				Planets - SVG Planets using d3 tickAnimation and requestAnimationFrame
			</NavLink>
			<NavLink to="/p5-example" activeStyle>
				P5 example
			</NavLink>
			<NavLink to="/p5-planets" activeStyle>
				P5 Planets
			</NavLink>
			<NavLink to="/matter-planets" activeStyle>
				Matter Planets - Planets using matter.js
			</NavLink>
			<NavLink to="/matter" activeStyle>
				Drop balls - matter.js
			</NavLink>
			<NavLink to="/ball" activeStyle>
				Ball falling - requestAnimationFrame
			</NavLink>
			<NavLink to="/spiral" activeStyle>
				Ball spiral - d3.js tickAnimation
			</NavLink>
			<NavLink to="/two" activeStyle>
				Particle Sandbox - Two.js
			</NavLink>
		</div>
	);
};

function App() {
	return (
		<Router>
			{/* <Navbar /> */}
			<Routes>
				<Route path="/" index element={<Home />} />
				<Route path="/planets" element={<Planets />} />
				<Route path="/p5-example" element={<P5Example />} />
				<Route path="/p5-planets" element={<P5Planets />} />
				<Route path="/matter-planets" element={<MatterPlanets />} />
				<Route path="/matter" element={<Matter />} />
				<Route path="/ball" element={<Ball />} />
				<Route path="/spiral" element={<Spiral />} />
				<Route path="/two" element={<ParticleSandbox />} />
			</Routes>
		</Router>
	);
}

export default App;
