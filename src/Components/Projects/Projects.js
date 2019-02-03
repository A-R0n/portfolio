import React, { Component } from 'react';
import './Projects.scss';

class Projects extends Component {
  render() {
    return (
      <div className="Display_Projects">
      <div className="header">
          <div className="Name_Of_Project_and_Website">
            <div className="smaller_div">
              <h1>D3 Economic Charts</h1>
              <a href="https://github.com/A-R0n/d3-gdp">Click Here for code</a>
              <h2>Jan 26, 2019 - Present</h2>
            </div>
          </div>
        </div>
        <div className='inside'>
        <div className="project_area">
          <img
            src="http://rrg-climbing-pics.s3-website-us-east-1.amazonaws.com/1f0a6de8-7176-4287-af1c-8226606aa874_ScreenShot2019-02-02at7.55.07PM.png"
            className="personal_project_pic2"
            alt="rrgclimb"
          />
          <img
            src="http://rrg-climbing-pics.s3-website-us-east-1.amazonaws.com/28d6c634-ca8d-4a1b-b863-9d561df1c8d4_image1.jpeg"
            className="personal_project_pic3"
            alt="rrgclimb"
          />
        </div>
        </div>
        <div className="project_area">
          <img
            src='http://rrg-climbing-pics.s3-website-us-east-1.amazonaws.com/0cf9ea03-e4d2-4be0-acfc-9aa81ef477c7_ScreenShot2019-01-25at10.48.54AM.png'
            className="personal_project_pic4"
            alt="rrgclimb"
          />
      
        </div>
        <div className="outer_div">
          <div className="project_info_personal">
            <li>
              {' '}
              Scatterplot (top left) displays changes in GDP in the USA over a 10 year period. Interactive Bar Graph (right) displays total GDP over the same period.
            </li>
            <li>
              {' '}
              Axes are scaled using D3's scaleLinear() and scaleBand() functions and displayed using axisLeft(), for the y-axis, and axisBottom(), for the x-axis.
             </li>
            <li>
              {' '}
              D3's select() method allows user to visualize differences in gdp (as percentages) with a horizontal line equal to the height of the appended 'rect' (CSS).
            </li>
            <li>
              {' '}
              World Map (bottom) is a geoMercator projection that generates an SVG path data string. The displays the population density in 21 major cities with circles that range in size depending on the population value.
            </li>
          </div>
        </div>
        <div className="header">
          <div className="Name_Of_Project_and_Website">
            <div className="smaller_div">
              <h1>Rock Cimbing Journal</h1>
              <a href="http://www.rrgclimb.com">rrgclimb.com</a>
              <h2>November 2018 - Current</h2>
            </div>
          </div>
        </div>
        <div className="project_area">
          <img
            src="http://rrg-climbing-pics.s3-website-us-east-1.amazonaws.com/a1e36d2b-68b2-40c5-a743-8aacec7d4b5e_ScreenShot2019-01-07at11.55.24AM.png"
            className="personal_project_pic"
            alt="rrgclimb"
          />
          <img
            id="iphoneX"
            src="http://rrg-climbing-pics.s3-website-us-east-1.amazonaws.com/025f7a29-286c-4cb0-b45f-8a003bd48797_ScreenShot2019-01-14at9.42.08PM.png"
            alt="iphoneX"
          />
        </div>
        <div className="outer_div">
          <div className="project_info_personal">
            <li>
              {' '}
              Rock climbers now have the ability to find routes at the Red River
              Gorge with ease as well as make detailed journal entries that they
              can share with others.
            </li>
            <li>
              {' '}
              The search feature allows climber to access route information by
              typing in the name, location, type, or difficulty.
            </li>
            <li>
              {' '}
              Routes can be added to a cart so that the climber can upload a
              picture, write a description, and leave a review for each one.
            </li>
            <li>
              {' '}
              The profile page is used to display these journal entries in a
              chronological order.
            </li>
            <li>Responsive design for an iPhoneX.</li>
          </div>
        </div>
        <div className="spacing" />
        <div className="header_group">
          <div className="smaller_div" />
          <div id="harryp">Hogwarts Social Media</div>
          <a href="http://hogwarts-social.com">hogwarts-social.com</a>
          <h2 id="group_project_due_date">2 weeks in December 2018</h2>
        </div>
        <div className="smaller_div" />
        <div className="project_area">
          <img
            src="http://rrg-climbing-pics.s3-website-us-east-1.amazonaws.com/f6562a2a-5e62-4780-9d5e-d9e26e4eaeb7_ScreenShot2019-01-11at11.08.47AM.png"
            className="group_project_pic"
            alt="harrypsocial"
          />
          <img
            id="iphoneX"
            src="http://rrg-climbing-pics.s3-website-us-east-1.amazonaws.com/1d192504-8574-4dbd-8dfb-0d1a55159272_ScreenShot2019-01-11at11.15.33AM.png"
          />
        </div>
        <div className="outer_div">
          <div className="project_info_personal">
            <li>
              {' '}
              Aspiring wizards are now able to attend Hogwarts School of
              Witchcraft and Wizardry after signing up and taking the Sorting
              Hat Quiz.
            </li>
            <li>
              {' '}
              Wizards can engage in dialogue in both private and public forums
              by making axios calls to a SQL database.
            </li>
            <li>
              {' '}
              The chat room displays real-time data and is supported through
              Firebase.
            </li>
            <li>
              {' '}
              Click on the golden snitch, animated with CSS, as it flies across
              the screen to earn house points.
            </li>
            <li> Material UI implemented to make navigation more efficient.</li>
          </div>
        </div>
      </div>
    );
  }
}

export default Projects;
