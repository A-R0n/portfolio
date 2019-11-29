import React, { Component } from 'react';
import './About.scss';
import { TweenMax, Bounce } from 'gsap';

class About extends Component {
	constructor() {
		super();
		this.state = {
			expanded: false
		};
	}

	async expandText() {
		await this.setState({ expanded: !this.state.expanded });
		TweenMax.staggerFrom('#p_one_display', 2, { scale: 0, opacity: 0, delay: 0, ease: Bounce.easeOut });
	}
	render() {
		return (
			<div className="About_Me">
				<h1 id="about_me" onClick={() => this.expandText()}>
					About Me
				</h1>
				<div className="Display_About">
					<p id={this.state.expanded === true ? 'p_one_display' : 'p_one'}>
						I am currently in the process of finishing out an internship where I have spent six
						months writing test suites in the JUnit (Java) Framework. My goal is to continue on this path and
						become a software engineer.
						The following quote contains truth that I will always believe in:
						"He will win whose army is animated by the same spirit throughout all its ranks." - (3.17 The
						Art of War, Sun Tzu). To me, winning means nothing if you don't love what you are fighting for.
					</p>
				</div>
			</div>
		);
	}
}

export default About;
