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
                src="data:image/png;base64,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"
              />
              <img
                id="react"
                src="https://mildaintrainings.com/wp-content/uploads/2017/11/react-logo.png"
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
              <img id='py' src='https://qph.fs.quoracdn.net/main-qimg-28cadbd02699c25a88e5c78d73c7babc'></img>
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
