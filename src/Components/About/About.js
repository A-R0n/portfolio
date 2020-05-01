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

	async expandText(){
		await this.setState({ expanded: !this.state.expanded });
		TweenMax.staggerFrom('#p_one_display', 2, { scale: 0, opacity: 0, delay: 0, ease: Bounce.easeOut });
	}
	render() {
		return (
			<div className="About_Me">
				<h1 id="about_me" onClick={()=>this.expandText()}>
					About Me
				</h1>
				<div className="Display_About" >
					<p id={this.state.expanded === true ? 'p_one_display' : 'p_one'}>
						As a team player:
						"He will win whose army is animated by the same spirit throughout all its ranks (Sun Tzu)." To me, winning means nothing if you don't love what you are fighting for.
						<br></br>
						<br></br>
						As an individual:
						I like to challenge myself physically and mentally, learning from my mistakes and building. 
					</p>
				</div>
			</div>
		);
	}
}

export default About;
