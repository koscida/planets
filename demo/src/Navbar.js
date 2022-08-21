import React from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";

const Navbar = () => {
	return (
		<>
			<Nav>
				<NavMenu>
					<NavLink to="/planets" activeStyle>
						Planets
					</NavLink>
					<NavLink to="/ball" activeStyle>
						Ball
					</NavLink>
					<NavLink to="/spiral" activeStyle>
						Spiral
					</NavLink>
					<NavLink to="/two" activeStyle>
						Particle Sandbox
					</NavLink>
				</NavMenu>
			</Nav>
		</>
	);
};

export default Navbar;
