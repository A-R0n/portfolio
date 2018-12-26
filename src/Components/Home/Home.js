import React, { Component } from 'react';
import './Home.scss';
import About from '../About/About';
import Projects from '../Projects/Projects';
import Quotes from '../Quotes/Quotes';

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
  render() {
    return (
      <div className="Home">
        <div className="Head">
          <div className="Avi" />
          <div className="Head_Column">
            <div id="aaron_estes">Aaron Estes</div>
            <div id="dallas_tx">Dallas, TX</div>
            <div>aestescc@gmail.com</div>
            <div className="skills">
              <img
                id="node"
                src="https://nodejs.org/static/images/logos/nodejs-new-pantone-black.png"
              />
              <img
                id="react"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2000px-React-icon.svg.png"
              />
              <img
                id="aws"
                src="https://pbs.twimg.com/profile_images/907652118688829440/FrshWMKt_400x400.jpg"
              />
              <img
                id="d3"
                src="https://avatars3.githubusercontent.com/u/1562726?s=400&v=4"
              />
              <img
                id="firebase"
                src="https://ih0.redbubble.net/image.489553250.2202/flat,550x550,075,f.jpg"
              />
              <img
                id="js"
                src="http://www.devacron.com/wp-content/uploads/2016/02/ES6-ecmascript6-logo.jpg"
              />
              <img id='py' src='https://www.andreabacciu.com/upload/2015/02/Python-Logo-PNG-Image.png'></img>
              <img id='sass' src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Sass_Logo_Color.svg/2000px-Sass_Logo_Color.svg.png'></img>
              <img id='css' src='https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/2000px-CSS3_logo_and_wordmark.svg.png'></img>
              <img id='html5' src='https://seravo.fi/wp-content/uploads/2013/12/HTML5logo.png'></img>
            </div>
          </div>
        </div>
        <h1 className="about_me">About Me</h1>
        <About />
        <h1 className="about_me">Projects</h1>
        <Projects />
      </div>
    );
  }
}

export default Home;
