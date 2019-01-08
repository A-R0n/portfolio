import React, { Component } from 'react';
import './About.scss';

class About extends Component {
  render() {
    return (
      <div className="Display_About">
        <div id="p_one">
          Hello World! After graduating from Indiana University with majors in
          Economics
        </div>
        <div id="p_two">
          and Religious Studies, I decided to expand my skills further by getting into
          computer programming. My close friends encouraged me to read "Automate The Boring Stuff With Python" which lead me to attend
          DevMountain's full-stack web development bootcamp. Now, my
          goal is to apply these skills in the workplace and to continue getting better.
        </div>
      </div>
    );
  }
}

export default About;
