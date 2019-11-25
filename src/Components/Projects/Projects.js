import React, { Component } from 'react';
import './Projects.scss';
import PPF from '../../Components/PPF/PPF'
import ForceDirected from '../../Components/ForceDirected/ForceDirected';
import Choropleth from '../Choropleth/Choropleth';
import GDP from '../../Components/GDP/GDP';
import Garage from '../../Components/Garage/Garage';

class Projects extends Component {
	constructor() {
		super();

		this.state = {
			expanded: false,
			loaded: false,
			pop_: []
		};
	}

	loadProjects = () => {
		this.setState({ expanded: !this.state.expanded });
	};

	render() {
		return (
			<div className="Display_Projects">
				<div onClick={() => this.loadProjects()} id="projects">
					Projects
				</div>
				<div className={this.state.expanded === true ? 'display_my_projects' : 'dont_display_projects'}>
				<div className="header">
						<div className="Name_Of_Project_and_Website">
							<div className="smaller_div">
								<h1>
									Spatial Constraints <i>(D3.js)</i>
								</h1>
								<a id="the_code" href="https://github.com/A-R0n/">
									The Code
								</a>
								<h2>March 24th, 2019</h2>
							</div>
						</div>
					</div>
					<p id="project_description">
						How do I maximize the use of space in my garage given the following constraints...
					</p>
					<Garage />
					<div className="header">
						<div className="Name_Of_Project_and_Website">
							<div className="smaller_div">
								<h1>
									Production Possibilities <i>(D3.js)</i>
								</h1>
								<a id="the_code" href="https://github.com/A-R0n/">
									The Code
								</a>
								<h2>April 4th, 2019</h2>
							</div>
						</div>
					</div>
					<p id="project_description">
						The Production Possibilities Frontier represents the tradeoff between two goods that society can
						produce in a given amount of time. An efficient allocation of resources suggests that society
						can not produce more of one good without giving up another.
					</p>
					<PPF />
					<div className="header">
						<div className="Name_Of_Project_and_Website">
							<div className="smaller_div">
								<h1>
									Choropleth Map - <i>(D3.js)</i>
								</h1>
								<a id="the_code" href="https://github.com/A-R0n/d3-choropleth">
									The Code
								</a>
								<h2>Feb 25th, 2019</h2>
							</div>
						</div>
					</div>
					<p id="project_description">
						GeoAlbers projection from a TopoJSON file. Hover over counties for details. County data was obtained from the Census Bureau.</p>
					<div className="wrap_bar_graph">
						<Choropleth />
					</div>
					<div className="header">
						<div className="Name_Of_Project_and_Website">
							<div className="smaller_div">
								<h1>
									Force-Directed Graph - <i>(D3.js)</i>
								</h1>
								<a id="the_code" href="https://github.com/A-R0n/d3-force-directed-graph">
									The Code
								</a>
								<h2>Feb 12th, 2019</h2>
							</div>
						</div>
					</div>
					<p id="project_description">To start the simulation, press on a particle and drag it across the canvas. It assumes a constant unit time step Δt = 1 for each step, and a constant unit mass m = 1 for the cloth.</p>
					<ForceDirected />
					<div className="header">
						<div className="Name_Of_Project_and_Website">
							<div className="smaller_div">
								<h1>Bar Graph - (D3.js)</h1>
								<a id="the_code" href="https://github.com/A-R0n/d3-gdp">
									The Code
								</a>
								<h2>Jan 26, 2019</h2>
							</div>
						</div>
					</div>
					<p id="project_description">Hover over bars to see relative differences in GDP. Text is added and removed from the DOM based on mouse events.</p>
					<div className="wrap_bar_graph">
						<GDP />
					</div>
					<div className="header">
						<div className="Name_Of_Project_and_Website">
							<div className="smaller_div">
								<h1>TopoJson Map - (D3.js)</h1>
								<a id="the_code" href="https://github.com/A-R0n/d3-world">
									The Code
								</a>
								<h2>Dec 5th, 2018</h2>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Projects;
