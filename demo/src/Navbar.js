import React from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";

const Navbar = () => {
	return (
		<>
			<Nav>
				<NavMenu>
					<NavLink to="/two" activeStyle>
						Particle Sandbox
					</NavLink>
					<NavLink to="/planets" activeStyle>
						Planets
					</NavLink>
					<NavLink to="/spiral" activeStyle>
						Spiral
					</NavLink>
				</NavMenu>
			</Nav>
		</>
	);
};

export default Navbar;
