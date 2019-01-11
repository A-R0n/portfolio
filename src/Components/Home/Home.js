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
    window.scrollBy(0,400);
  }

  toProjects = () => {
    window.scrollBy(0,1050);
  }

  toSkills = () => {
    window.scrollBy(0,5000);
  }
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
            <div id="email">aestescc@gmail.com</div>
            <div id="email">github.com/A-R0n</div>
            <div id="email">linkedin.com/in/A-R0n</div>
          </div>
          <div className="navi">
          <div onClick={() => this.toAbout()}>About</div>
          <div onClick={() => this.toProjects()}>Projects</div>
          <div onClick={() => this.toSkills()}>Skills</div>
        </div>
        </div>
       
        <h1 className="about_me">About Me</h1>
        <div className="wrapper">
          <About />
        </div>
        <div className="blue_space" />
        <div className="projects">Projects</div>
        <div className="blue_space" />
        <Projects />
        <h1 className="skills_title">Skills</h1>
        <div className="skills_container">
          <Skills />
        </div>
      </div>
    );
  }
}

export default Home;
