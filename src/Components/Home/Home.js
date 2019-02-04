import React, { Component } from 'react';
import './Home.scss';
import About from '../About/About';
import Projects from '../Projects/Projects';
import Skills from '../Skills/Skills';
import { Link } from 'react-router-dom';

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
    let elem = document.getElementById("about_me");
    elem.scrollIntoView({block: "start", behavior: "smooth"});
  };

  toProjects = () => {
    let elem = document.getElementById("projects");
    elem.scrollIntoView({block: "start", behavior: "smooth"});
  };

  toSkills = () => {
    let elem = document.getElementById("skills_title");
    elem.scrollIntoView({block: "start", behavior: "smooth"});
  };
  render() {
    return (
      <div className="Home">
        <div className="Head">
          <div className="Avi" />
          <div className="Head_Column">
            <div className="nav_bar">
              <div id="aaron_estes">Aaron Estes</div>
            </div>
            <div id="dallas_tx">Dallas, TX</div>
            <a href='mailto:aestesc@gmail.com' id="email">aestesc@gmail.com</a>
            <a href='https://www.github.com/a-r0n' id="email">github.com/A-R0n</a>
            <a href='https://www.linkedin.com/in/a-r0n' id="email">linkedin.com/in/A-R0n</a>
          </div>
          <div className="navi">
            <button onClick={() => this.toAbout()}>About</button>
            <button onClick={() => this.toProjects()}>Projects</button>
            <button onClick={() => this.toSkills()}>Skills</button>
          </div>
        </div>

        <h1 id="about_me">About Me</h1>
        <div className="wrapper">
          <About />
        </div>
        {/* <div className="blue_space" /> */}
        <div id="projects">Projects</div>
        <div className="blue_space" />
        <Projects />
        <h1 id="skills_title">Skills</h1>
        <div className="skills_container">
          <Skills />
        </div>
      </div>
    );
  }
}

export default Home;

