import React, { Component } from 'react';
import './Projects.scss';
import * as d3 from 'd3';

class Projects extends Component {
  render() {
    var dataset = [
      [2008, -0.3],
      [2009, -2.8],
      [2010, 3.0],
      [2011, 1.7],
      [2012, 2.2],
      [2013, 1.7],
      [2014, 2.6],
      [2015, 2.9],
      [2016, 1.5],
      [2017, 2.3]
    ];
    var growth = [
      { year: 2007, gdp: 14.452 },
      { year: 2008, gdp: 14.713 },
      { year: 2009, gdp: 14.449 },
      { year: 2010, gdp: 14.992 },
      { year: 2011, gdp: 15.543 },
      { year: 2012, gdp: 16.197 },
      { year: 2013, gdp: 16.785 },
      { year: 2014, gdp: 17.522 },
      { year: 2015, gdp: 18.219 },
      { year: 2016, gdp: 18.707 },
      { year: 2017, gdp: 19.485 }
    ];
    var padding = 60;
    var barPadding = 2;
    var w = 500;
    var h = 300;

    // SCATTERPLOT

    var xScale = d3
      .scaleLinear()
      .domain([
        d3.min(dataset, function(d) {
          return d[0];
        }),
        d3.max(dataset, function(d) {
          return d[0];
        })
      ])
      .range([padding, w - padding * 2]);

    var yScale = d3
      .scaleLinear()
      .domain([
        d3.min(dataset, function(d) {
          return d[1] - 1;
        }),
        d3.max(dataset, function(d) {
          return d[1] + 1;
        })
      ])
      .range([h - padding, padding]);

    var line = d3
      .line()
      .x(function(d) {
        return xScale(d[0]);
      })
      .y(function(d) {
        return yScale(d[1]);
      })
      .curve(d3.curveLinear);

    var rScale = d3
      .scaleLinear()
      .domain([
        -6,
        d3.max(dataset, function(d) {
          return d[1];
        })
      ])
      .range([2, 5]);

    var xAxis = d3
      .axisBottom(xScale)
      .tickValues([2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017])
      .ticks(d3.timeYear())
      .tickFormat(function(n) {
        return n;
      });
    var yAxis = d3
      .axisLeft(yScale)
      .tickValues([-3, -2, -1, 0, 1, 2, 3, 4])
      .tickFormat(function(n) {
        return n + '%';
      });

    var svg = d3
      .select('#area1')
      .append('svg')
      .attr('width', w)
      .attr('height', h);
    svg
      .selectAll('circle')
      .data(dataset)
      .enter()
      .append('circle')
      .attr('fill', function(d) {
        return 'rgb(0, 0, ' + d * 10 + ')';
      })
      .attr('cx', function(d) {
        return xScale(d[0]);
      })
      .attr('cy', function(d) {
        return yScale(d[1]);
      })
      .attr('r', function(d) {
        return rScale(d[1]);
      })
      .attr('width', w / dataset.length - barPadding)
      .attr('height', function(d) {
        return d; // <-- Times four!
      });
    svg
      .selectAll('text')
      .data(dataset)
      .enter()
      .append('text')
      .text(function(d) {
        return d[0] + ',' + d[1];
      })
      .attr('x', function(d) {
        return xScale(d[0]);
      })
      .attr('y', function(d) {
        return yScale(d[1]);
      })
      .attr('font-family', 'sans-serif')
      .attr('font-size', '11px')
      .attr('fill', 'rgb(136, 2, 2)');

    svg
      .append('g')
      .attr('class', 'axis') //Assign "axis" class
      .attr('transform', 'translate(0,' + (h - padding) + ')')
      .call(xAxis);

    svg
      .append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(' + padding + ',0)')
      .call(yAxis);

    svg
      .append('path')
      .datum(dataset)
      .attr('d', line);

    svg
      .append('text')
      .attr('x', w / 2.2)
      .attr('y', 40)
      .attr('text-anchor', 'middle')
      .text(`USA Δ's in GDP - 10 year period`)
      .attr('fill', 'white');

    svg
      .append('text')
      .attr('x', -150)
      .attr('y', 20)
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'middle')
      .text('%Δ in GDP')
      .attr('fill', 'white');

    svg
      .append('text')
      .attr('x', w / 1.2)
      .attr('y', 285)
      .attr('text-anchor', 'middle')
      .text('Year')
      .attr('fill', 'white');

    // BAR GRAPH

    const margin2 = 60;
    const width2 = 1000 - 2 * margin2;
    const height2 = 600 - 2 * margin2;

    const svg = d3.select('#area2').append('svg');
    const chart = svg
      .append('g')
      .attr('transform', `translate(${margin2}, ${margin2})`);

    const xScale_2 = d3
      .scaleBand()
      .range([0, width2])
      .domain(growth.map(s => s.year))
      .padding(0.2);

    const yScale_2 = d3
      .scaleLinear()
      .range([height2, 0])
      .domain([14, 20]);

    chart.append('g').call(d3.axisLeft(yScale_2));
    chart
      .append('g')
      .attr('transform', `translate(0, ${height2})`)
      .call(d3.axisBottom(xScale_2));

    const barGroups = chart
      .selectAll('svg')
      .data(growth)
      .enter()
      .append('g');
    barGroups
      .append('rect')
      .attr('class', 'bar')
      .attr('x', function(d) {
        return xScale_2(d.year);
      })
      .attr('y', function(d) {
        return yScale_2(d.gdp);
      })
      .attr('height', s => height2 - yScale_2(s.gdp))
      .attr('width', xScale_2.bandwidth())

      // ENTERING
      .on('mouseenter', function(actual, i) {
        d3.select(this)
          .transition()
          .duration(300)
          .attr('opacity', 0.6)
          .attr('x', a => xScale_2(a.year) - 5)
          .attr('width', xScale_2.bandwidth() + 10);

        const y = yScale_2(actual.gdp);
        var line = chart
          .append('line')
          .attr('id', 'limit')
          .attr('x1', 0)
          .attr('y1', y)
          .attr('x2', width2)
          .attr('y2', y);

        barGroups
          .append('text')
          .attr('class', 'divergence')
          .attr('x', a => xScale_2(a.year) + xScale_2.bandwidth() / 2)
          .attr('y', a => yScale_2(a.gdp) + 30)
          .attr('fill', 'white')
          .attr('text-anchor', 'middle')
          .text((a, idx) => {
            const divergence = (a.gdp - actual.gdp).toFixed(1);

            let text = '';
            if (divergence > 0) text += '+';
            text += `${divergence}%`;

            return idx !== i ? text : '';
          });
      })

      // LEAVING
      .on('mouseleave', function() {
        d3.selectAll('.value').attr('opacity', 1);

        d3.select(this)
          .transition()
          .duration(300)
          .attr('opacity', 1)
          .attr('x', a => xScale_2(a.year))
          .attr('width', xScale_2.bandwidth());

        chart.selectAll('#limit').remove();
        chart.selectAll('.divergence').remove();
      });

    chart
      .append('g')
      .attr('class', 'grid')
      .attr('transform', `translate(0, ${height2})`)
      .call(
        d3
          .axisBottom()
          .scale(xScale_2)
          .tickSize(-height2, 0, 0)
          .tickFormat('')
      );

    chart
      .append('g')
      .attr('class', 'grid')
      .call(
        d3
          .axisLeft()
          .scale(yScale_2)
          .tickSize(-width2, 0, 0)
          .tickFormat('')
      );

    svg
      .append('text')
      .attr('x', -(height2 / 2) - margin2)
      .attr('y', margin2 / 2.4)
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'middle')
      .text('GDP (in trillions)')
      .attr('fill', 'white');

    svg
      .append('text')
      .attr('x', width2 / 2 + margin2)
      .attr('y', 40)
      .attr('text-anchor', 'middle')
      .text('USA Gross Domestic Product - 10 years')
      .attr('fill', 'white');

    svg
      .append('text')
      .attr('x', width2 / 2 + margin2)
      .attr('y', 580)
      .attr('text-anchor', 'middle')
      .text('Year')
      .attr('fill', 'white');
    return (
      <div className="Display_Projects">
<<<<<<< HEAD
      <div className="header">
=======
        {/* <div className="header">
>>>>>>> a88f8cd75eb6b7a89429af2685683151a164ac01
          <div className="Name_Of_Project_and_Website">
            <div className="smaller_div">
              <h1>D3 Economic Charts</h1>
              <a href="https://github.com/A-R0n/d3-gdp">Click Here for code</a>
              <h2>Jan 26, 2019 - Present</h2>
            </div>
          </div>
        </div>
<<<<<<< HEAD
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
=======
        
>>>>>>> a88f8cd75eb6b7a89429af2685683151a164ac01
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
<<<<<<< HEAD
              World Map (bottom) is a geoMercator projection that generates an SVG path data string. Map displays the population density in 21 major cities with circles that range in size depending on the population value.
=======
              World Map (bottom) is a geoMercator projection that generates an SVG path data string. The displays the population density in 21 major cities with circles that range in size depending on the population value.
>>>>>>> a88f8cd75eb6b7a89429af2685683151a164ac01
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
        </div> */}
      </div>
    );
  }
}

export default Projects;
