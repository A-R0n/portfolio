import React, { Component } from 'react';
import './Projects.scss';

class Projects extends Component {
  render() {
    return (
      <div className="Display_Projects">
        <div className="header">
          <div className="Name_Of_Project_and_Website">
            <h1>Rock Cimbing Journal</h1>
            <a href="http://www.rrgclimb.com">www.rrgclimb.com</a>
          </div>
          <h2>November 2018 - Current</h2>
        </div>
        <div className="project_area">
          <img
            src="http://rrg-climbing-pics.s3-website-us-east-1.amazonaws.com/a1e36d2b-68b2-40c5-a743-8aacec7d4b5e_ScreenShot2019-01-07at11.55.24AM.png"
            className="personal_project_pic"
            alt="rrgclimb"
          />
          <img
            id='iphoneX'
            src="http://rrg-climbing-pics.s3-website-us-east-1.amazonaws.com/fe917e2d-76ad-4661-bb1a-a029d2656b9f_ScreenShot2019-01-07at2.09.29PM.png"
            alt="iphoneX"
          />
          <div className="project_info">
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
        <div className="header">
          <div className="Name_Of_GroupProject_and_Website">
            <p id="harryp">Hogwarts Social Media</p>
            <a href="http://hogwarts-social.com">hogwarts-social.com</a>
          </div>
          <h2 id="group_project_due_date">2 weeks in December 2018</h2>
        </div>
        <div className="project_area">
          <img
            src="http://rrg-climbing-pics.s3-website-us-east-1.amazonaws.com/4f070ab2-035a-4847-93d3-d96148ac441a_ScreenShot2018-12-25at7.33.00PM.png"
            className="personal_project_pic"
            alt="harrypsocial"
          />
          <div className="project_info">
            <li>
              {' '}
              Aspiring wizards are now able to attend Hogwarts School of
              Witchcraft and Wizardry after signing up and taking Sorting Hat Quiz.
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
              Click on the golden snitch as it flies across the screen to earn
              house points.
            </li>
            <li> Material UI implemented to make navigation more efficient.</li>
          </div>
        </div>
      </div>
    );
  }
}

export default Projects;
