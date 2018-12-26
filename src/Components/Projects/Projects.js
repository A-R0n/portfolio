import React, { Component } from 'react';
import './Projects.scss';

class Projects extends Component {
  render() {
    return (
      <div className="Display_Projects">
        <div className="header">
          <div className="Name_Of_Project_and_Website">
            <h1>Rock Cimbing Journal</h1>
            <a href="https://github.com/A-R0n/rrg">github.com/A-R0n/rrg</a>
          </div>
          <h2>November 2018 - Current</h2>
        </div>
        <div className="project_area">
          <img
            src="http://rrg-climbing-pics.s3-website-us-east-1.amazonaws.com/d90d1ab6-4570-407f-a2c8-c1f0049b5c35_ScreenShot2018-12-25at3.42.27PM.png"
            className="personal_project_pic"
          />
          <div className="project_info">
            <li>
              {' '}
              Rock climbers now have the ability to find routes at the Red River
              Gorge with ease as well as make detailed journal entries that they
              can share with others.
            </li>
            <li> Real-time weather data found on the home page.</li>
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
          </div>
        </div>
        <div className="spacing" />
        <div className="header">
          <div className="Name_Of_GroupProject_and_Website">
            <p id="harryp">Hogwarts Social Media</p>
            <a href="http://hogwarts-social.com">hogwarts-social.com</a>
          </div>
          <h2 id='group_project_due_date'>2 weeks in December 2018</h2>
        </div>
        <div className="project_area">
          <img
            src="http://rrg-climbing-pics.s3-website-us-east-1.amazonaws.com/4f070ab2-035a-4847-93d3-d96148ac441a_ScreenShot2018-12-25at7.33.00PM.png"
            className="personal_project_pic"
          />
          <div className="project_info">
            <li>
              {' '}
              Aspiring wizards are now able to attend Hogwarts School of
              Witchcraft and Wizardry.
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
              Click on the golden snitch as it flies across the screen to earn house points.
            </li>
            <li>
              {' '}
              Material UI implemented to make navigation more efficient.
            </li>
          </div>
        </div>
      </div>
    );
  }
}

export default Projects;
