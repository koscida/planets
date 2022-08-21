import React, { Component } from "react";
import { render } from "react-dom";
import "./App.css";

// SOURCE: https://www.pluralsight.com/guides/how-to-use-requestanimationframe-with-react

export default class BounceBall extends Component {
	constructor() {
		super();

		this.state = {
			name: "Football Animation",
		};
	}

	// change the top position by 3 pixels of an element that has a “circle” class value.
	//
	// Example with setInterval
	// moveBall = () => {
	// 	let start = Date.now();

	// 	let football = document.querySelector(".circle");

	// 	let timer = setInterval(function () {
	// 		let interval = Date.now() - start;

	// 		football.style.top = interval / 3 + "px"; // move element down by 3px

	// 		if (interval > 1000) clearInterval(timer); // stop animation
	// 	}, 1000 / 60);
	// };
	//
	// Example with requestAnimationFrame
	moveBall = () => {
		let start = Date.now();

		let football = document.querySelector(".circle");

		// timestamp: time elapsed in milliseconds since the web page was loaded

		let timer = requestAnimationFrame(function animateBall(timestamp) {
			let interval = Date.now() - start;

			football.style.top = interval / 3 + "px"; // move element down

			if (interval < 1000) requestAnimationFrame(animateBall); // queue request for next frame
		});
	};

	render() {
		return (
			<div className="containter">
				<img className="circle" onClick={this.moveBall} />
			</div>
		);
	}
}
