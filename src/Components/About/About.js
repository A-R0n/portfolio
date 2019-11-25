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
						I'm interested in utilizing my educational background in Economics and Full-Stack Web
						Developement within a productive group of individuals. The following quote contains Truth that I
						will always believe in: "He will win whose army is animated by the same spirit throughout all
						its ranks." - (3.17 The Art of War, Sun Tzu). To me, victory is nothing if you don't love what
						you are doing.
					</p>
				</div>
			</div>
		);
	}
}

export default About;
