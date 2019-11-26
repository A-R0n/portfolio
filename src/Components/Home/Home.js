import React, { Component } from 'react';
import './Home.scss';
import About from '../About/About';
import Projects from '../Projects/Projects';

class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			about: false,
			projects: false,
			quotes: false
		};
	}

	user_clicks_about = () => {
		this.setState({
			about: !this.state.about,
			projects: false,
			quotes: false
		});
	};

	user_clicks_projects = () => {
		this.setState({
			about: false,
			projects: !this.state.projects,
			quotes: false
		});
	};

	user_clicks_quotes = () => {
		this.setState({
			about: false,
			projects: false,
			quotes: !this.state.quotes
		});
	};

	toAbout = () => {
		let elem = document.getElementById('about_me');
		elem.scrollIntoView({ block: 'start', behavior: 'smooth' });
	};

	toProjects = () => {
		let elem = document.getElementById('projects');
		elem.scrollIntoView({ block: 'start', behavior: 'smooth' });
	};

	toSkills = () => {
		let elem = document.getElementById('skills_title');
		elem.scrollIntoView({ block: 'start', behavior: 'smooth' });
	};
	render() {
		return (
			<div className="Home">
				<div className="Head">
					<div className="Avi" />
					<div className="Head_Column">
						<div id="aaron_estes">Aaron Estes</div>
						<div id="dallas_tx">Dallas, TX</div>
						<a href="mailto:aestesc@gmail.com" target="_blank" id="email">
							aestesc@gmail.com
						</a>
						<a href="https://www.github.com/a-r0n" target="_blank" id="email">
							github.com/A-R0n
						</a>
						<a href="https://www.linkedin.com/in/a-r0n" target="_blank" id="email">
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
