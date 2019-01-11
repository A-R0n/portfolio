import React, { Component } from 'react';
import './About.scss';

class About extends Component {
  render() {
    return (
      <div className="Display_About">
        <div id="p_one">
          Hello World! After graduating from Indiana University with majors in
          Economics and Religious Studies, I decided to expand my skills further by
          getting into computer programming. After two of my closest friends
          encouraged me to read "Automate The Boring Stuff With Python", I
          decided to attend DevMountain's full-stack web development bootcamp. Now,
          my goal is to join a creative group of people in the workplace and
          improve my skills as a developer.
        </div>
      </div>
    );
  }
}

export default About;
