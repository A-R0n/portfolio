import React, { Component } from 'react';
import './About.scss';

class About extends Component {
  render() {
    return (
      <div className='Display_About'>
        
        <p id="p_one">
          Hello World! After graduating from Indiana University with majors in
          Economics
        </p>
        <p id="p_two">
          and Religious Studies, I decided to expand my skills further by going
          through the rigorous Full Stack Web Development Program offered at
          DevMountain in Dallas, TX. My goal is to apply these skills in the
          workplace and bring value to a team in many ways.
        </p>
      </div>
    );
  }
}

export default About;
