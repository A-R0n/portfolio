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
        <div className='Head'>
          <div className="Avi" />
          <div className='Head_Column'>
            <div id='aaron_estes'>Aaron Estes</div>
            <div id='dallas_tx'>Dallas, TX</div>
            <div>317 - 439 -9813</div>
            <div></div>
          </div>
        </div>
        <h1 className='about_me'>About Me</h1>
       <About />
       <Projects />
      </div>
    );
  }
}

export default Home;
