import React, { Component } from 'react';
import './Projects.scss';
import * as d3 from 'd3';
import { geoOrthographic, geoMercator, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';

class Projects extends Component {
  constructor() {
    super();

    this.state = {
      pop_: [],
      worlddata: [],
      cities: [
        {
          name: 'Tokyo',
          coordinates: [139.6917, 35.6895],
          population: 37843000
        },
        {
          name: 'Jakarta',
          coordinates: [106.865, -6.1751],
          population: 30539000
        },
        {
          name: 'Delhi',
          coordinates: [77.1025, 28.7041],
          population: 24998000
        },
        {
          name: 'Manila',
          coordinates: [120.9842, 14.5995],
          population: 24123000
        },
        {
          name: 'Seoul',
          coordinates: [126.978, 37.5665],
          population: 23480000
        },
        {
          name: 'Shanghai',
          coordinates: [121.4737, 31.2304],
          population: 23416000
        },
        {
          name: 'Karachi',
          coordinates: [67.0099, 24.8615],
          population: 22123000
        },
        {
          name: 'Beijing',
          coordinates: [116.4074, 39.9042],
          population: 21009000
        },
        {
          name: 'New York',
          coordinates: [-74.0059, 40.7128],
          population: 20630000
        },
        {
          name: 'Guangzhou',
          coordinates: [113.2644, 23.1291],
          population: 20597000
        },
        {
          name: 'Sao Paulo',
          coordinates: [-46.6333, -23.5505],
          population: 20365000
        },
        {
          name: 'Mexico City',
          coordinates: [-99.1332, 19.4326],
          population: 20063000
        },
        {
          name: 'Mumbai',
          coordinates: [72.8777, 19.076],
          population: 17712000
        },
        {
          name: 'Osaka',
          coordinates: [135.5022, 34.6937],
          population: 17444000
        },
        {
          name: 'Moscow',
          coordinates: [37.6173, 55.7558],
          population: 16170000
        },
        {
          name: 'Dhaka',
          coordinates: [90.4125, 23.8103],
          population: 15669000
        },
        {
          name: 'Greater Cairo',
          coordinates: [31.2357, 30.0444],
          population: 15600000
        },
        {
          name: 'Los Angeles',
          coordinates: [-118.2437, 34.0522],
          population: 15058000
        },
        {
          name: 'Bangkok',
          coordinates: [100.5018, 13.7563],
          population: 14998000
        },
        {
          name: 'Kolkata',
          coordinates: [88.3639, 22.5726],
          population: 14667000
        },
        {
          name: 'Buenos Aires',
          coordinates: [-58.3816, -34.6037],
          population: 14122000
        },
        {
          name: 'Tehran',
          coordinates: [51.389, 35.6892],
          population: 13532000
        },
        {
          name: 'Istanbul',
          coordinates: [28.9784, 41.0082],
          population: 13287000
        },
        { name: 'Lagos', coordinates: [3.3792, 6.5244], population: 13123000 },
        {
          name: 'Shenzhen',
          coordinates: [114.0579, 22.5431],
          population: 12084000
        },
        {
          name: 'Rio de Janeiro',
          coordinates: [-43.1729, -22.9068],
          population: 11727000
        },
        {
          name: 'Kinshasa',
          coordinates: [15.2663, -4.4419],
          population: 11587000
        },
        {
          name: 'Tianjin',
          coordinates: [117.3616, 39.3434],
          population: 10920000
        },
        { name: 'Paris', coordinates: [2.3522, 48.8566], population: 10858000 },
        {
          name: 'Lima',
          coordinates: [-77.0428, -12.0464],
          population: 10750000
        }
      ]
    };
  }

  componentDidMount() {
    fetch('https://unpkg.com/world-atlas@1/world/110m.json').then(response => {
      if (response.status !== 200) {
        console.log(`There was a problem: ${response.status}`);
        return;
      }
      response.json().then(worlddata => {
        this.setState({
          worlddata: feature(worlddata, worlddata.objects.countries).features
        });
      });
    });
    // axios.get(`http://api.census.gov/data/timeseries/poverty/histpov2?get=PCTPOV&time=2013&RACE=1&key=${CENSUS_API_KEY}`).then(response => {
    //   console.log(response);
    //   this.setState({
    //     response: this.state.pop_
    //   })
    // })
  }
  projection = () => {
    return geoMercator() // the type of map
      .scale(200) // how big or small it is
      .translate([800 / 2, 800 / 3.2]) //pixel (x, y) location of the projection center
      .rotate([10]); // rotated projection 10 degrees right
  };
  handleCountryClick = async countryIndex => {
    await console.log(
      'Clicked on country: ',
      this.state.worlddata[countryIndex]
    );
    await this.projection();
  };
  handleMarkerClick = async markerIndex => {
    console.log('Marker: ', this.state.cities[markerIndex]);
    await this.projection();
  };

  render() {
    const pop = this.state.pop_.map((elem, i) => {
      return <div key={i}>{elem.population}</div>;
    });
    const countries = this.state.worlddata.map((d, i) => {
      return (
        <path
          key={`path-${i}`}
          d={geoPath().projection(this.projection())(d)}
          className="country"
          fill={`rgba(38,50,56,${(1 / this.state.worlddata.length) * i})`}
          stroke="#FFFFFF"
          strokeWidth={0.5} // outline of the countries
          onClick={() => this.handleCountryClick(i)}
        />
      );
    });

    const markers = this.state.cities.map((city, i) => {
      return (
        <circle
          key={`marker-${i}`}
          cx={this.projection()(city.coordinates)[0]}
          cy={this.projection()(city.coordinates)[1]}
          r={city.population / 3000000}
          fill="#E91E63"
          stroke="#FFFFFF"
          className="marker"
          onClick={() => this.handleMarkerClick(i)}
        />
      );
    });
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

    var csv = d3
      .csv('yourcsv.csv')
      .then(function(data) {
        // data is now whole data set
        // draw chart in here!
      })
      .catch(function(error) {
        // handle error
      });

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
      .select('#area_scatter')
      .append('svg')
      .attr('width', w)
      .attr('height', h);

    // making the circles
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
    // values of the data points, text format
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

    // creatig the x-axis
    svg
      .append('g')
      .attr('class', 'axis') //Assign "axis" class
      .attr('transform', 'translate(0,' + (h - padding) + ')')
      .call(xAxis);

    // creating the y-axis
    svg
      .append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(' + padding + ',0)')
      .call(yAxis);

    // the line that goes through each point
    svg
      .append('path')
      .datum(dataset)
      .attr('d', line);

    // title
    svg
      .append('text')
      .attr('x', w / 2.2)
      .attr('y', 40)
      .attr('text-anchor', 'middle')
      .text(`USA Δ's in GDP - 10 year period`)
      .attr('fill', 'white');

    // y-axis y label
    svg
      .append('text')
      .attr('x', -150)
      .attr('y', 20)
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'middle')
      .text('%Δ in GDP')
      .attr('fill', 'white');

    // X-axis year label
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

    const svg = d3
      .select('#area_bar')
      .classed('bar_bar', true)
      .append('svg');
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
        <div className="header">
          <div className="Name_Of_Project_and_Website">
            <div className="smaller_div">
              <h1>D3 Economic Charts</h1>
              <a href="https://github.com/A-R0n/d3-gdp">Click Here for code</a>
              <h2>Jan 26, 2019 - Present</h2>
            </div>
          </div>
        </div>
        <div className='flex_d3'>
            <h6> Interactive Bar Graph of GDP <i>(D3.js)</i>
            </h6>
          </div>
        <div className="wrap_bar_graph">
          <svg id="area_bar" />
        </div>
        <div className='flex_d3'>
        <h6>
         Scatterplot of GDP <i>(D3.js)</i>
          </h6>
          </div>
        <div className="wrap_bar_graph">
          <div id="area_scatter" />
        </div>
        <div className='flex_d3'>
        <h6>
         Population Density in 20 major cities with a geoMercator map<i>(D3.js)</i>
          </h6>
          </div>
        <div className="wrap_bar_graph">
          <svg
            className="world"
            width={1600}
            height={1000}
            viewBox="0 0 800 400"
          >
            <g className="countries">{countries}</g>
            <g className="markers">{markers}</g>
          </svg>
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
          <div className='flex_comment'>
            <h6>Current Weather <i>(OpenWeatherMap API)</i></h6>
            <h6>Image Upload <i>(Amazon AWS S3)</i></h6>
            <h6>Post, Update, Delete, Get <i>(axios - PostgreSQL)</i></h6>
            <h6>Deployment <i>(nginx - Digital Ocean VSI)</i></h6>
            </div>
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
          <div className='flex_comment'>
            <h6>Private Chatroom <i>(Firebase)</i></h6>
            <h6>Public Chatroom <i>(Node.js - PostgreSQL)</i></h6>
            <h6>Golden Snitch Animation <i>(JS, HTML, SASS)</i></h6>
            <h6>Multiple Choice Quiz <i>(JS, CSS)</i></h6>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Projects;
