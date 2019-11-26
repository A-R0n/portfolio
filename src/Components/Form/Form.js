import React, { Component } from 'react';
import './Form.css';
import * as d3 from 'd3';

export default class Form extends Component {
  constructor(){
    super();

    this.state = {
      value: 'small',
      selected: false,
      lowerBox: 0
    }
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value});
  };

  handleSubmit = (event) => {
    const {lowerBox, value} = this.state;
    var space = 0;
    event.preventDefault();
    var lPoints = [];
    var newLine = d3.select('.containerMount').node();
    var l = newLine.getTotalLength();

    for (var j = 0; j < l; j++) {
        lPoints.push(newLine.getPointAtLength(j));
    }

    var length = lPoints.length;
    var p = newLine.getPointAtLength([ 0 ]);
    var q = lPoints[length - 1];
    var path = d3.path();
    d3.select('#space').remove().exit();

    if (value === 'small') {
      path.moveTo(p.x, p.y);
      path.lineTo(p.x, p.y - 3 / 4 * l - 25 + lowerBox);
      path.rect(p.x - 15, p.y - 3 / 4 * l - 40 + lowerBox, 30, 15);
      path.moveTo(p.x, p.y - 3 / 4 * l - 40 + lowerBox);
      path.lineTo(p.x, q.y);
      d3.select('.containerMount').attr('d', path).style('stroke', '#49fb35');
      d3.select('g.mountGroup').append('text').attr('id', 'space').text(`${space}` + '%').attr('x', p.x - 12).attr('y', p.y - 3 / 4 * l - 28 + lowerBox);
        this.setState({ lowerBox: lowerBox + 30});
    } 

    else if (value === 'medium') {
      path.moveTo(p.x, p.y);
      path.lineTo(p.x, p.y - 1 / 3 * l + lowerBox);
      path.rect(p.x - 25, p.y - 1 / 3 * l - 50 + lowerBox, 50, 50);
      path.moveTo(p.x, p.y - 1 / 3 * l - 50 + lowerBox);
      path.lineTo(p.x, q.y);
      
      d3.select('.containerMount').attr('d', path).style('stroke', '#49fb35');
      d3.select('g.mountGroup').append('text').attr('id', 'space').text(`${space}` + '%').attr('x', p.x - 12.5).attr('y', p.y - 1 / 3 * l - 23 + lowerBox);
  
      this.setState({ lowerBox: lowerBox + 30});
    } 
    
    else {
      path.moveTo(p.x, p.y);
      path.lineTo(p.x, p.y - 2 / 7 * l + lowerBox);
      path.rect(p.x - 50, p.y - 2 / 7 * l - 40 + lowerBox, 100, 40);
      path.moveTo(p.x, p.y - 2 / 7 * l - 40 + lowerBox);
      path.lineTo(p.x, q.y);
      d3.select('.containerMount').attr('d', path).style('stroke', '#49fb35');
      d3.select('g.mountGroup').append('text').attr('id', 'space').text(`${space}` + '%').attr('x', p.x - 8).attr('y', p.y - 2 / 7 * l - 16 + lowerBox);
      
      this.setState({ lowerBox: lowerBox + 30});
    }
};

  render() {
 
    return (
        <form className='garageForm' onSubmit={this.handleSubmit}>
        <div className='firstTwoQuestions'>
        <div id='instruction1'>1) Create a mount on the wall by clicking with mouse, dragging, stopping, then releasing click.</div>
        <div id='instruction2'>2) Choose the container<select id='selectBox' onChange={(e) => this.handleChange(e)}>
            <option value="small">small</option>
            <option value="medium">medium</option>
            <option value="large">large</option>
        </select> you want to store your tool/tools in.<input id='submitBoxType' type="submit" value="Submit" /> </div>
        </div>
        
        <div id='instruction2Container'>

        
        </div>
        <div id='instruction3'>3) Click on tool with mouse; drag into container; release mouse.</div>
    </form>
    );
  }
}

