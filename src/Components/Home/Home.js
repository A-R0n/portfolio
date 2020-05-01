import React, { Component } from 'react';
import './Home.scss';
import About from '../About/About';
import Projects from '../Projects/Projects';

class Home extends Component {
	render() {
		return (
			<div className="Home">
				<div className="Head">
					<div className="Avi" />
					<div className="Head_Column">
						<div id="aaron_estes">Aaron Estes</div>
						<div id="dallas_tx">Dallas, TX</div>
						<a href="mailto:aestesc@gmail.com" id="email">
							aestesc@gmail.com
						</a>
						<a href="https://www.github.com/a-r0n" id="email">
							github.com/A-R0n
						</a>
						<a href="https://www.linkedin.com/in/a-r0n" id="email">
							linkedin.com/in/A-R0n
						</a>
					</div>
				</div>
				<p id="disclaimer">
					{' '}
					--- Functionality of graphs are limited with mobile devices. -----------------
				</p>
				<div className="wrapper">
					<About />
				</div>
				<div className="wrapper">
					<Projects />
				</div>
			</div>
		);
	}
}

export default Home;
