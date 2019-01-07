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
          and Religious Studies, I decided to expand my skills further studying
          computer programming. After discovering that computer science was a
          unique struggle that I was passionate about, I decided to attend
          DevMountain's full-stack web development bootcamp. Now, my
          goal is to apply these skills in the workplace and increase the productivity of a team.
        </div>
      </div>
    );
  }
}

export default About;
