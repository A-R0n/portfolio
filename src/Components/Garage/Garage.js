import React, { Component} from 'react';
import {select} from 'd3';
import './Garage.scss';

export default class Garage extends Component{
    constructor(){
        super();
        this.state = {
        }
    }


    render(){
        const margin = { top: 20, right: 20, bottom: 20, left: 20 };
		const width = 580 - margin.left - margin.right;
		const height = 460 - margin.top - margin.bottom;
        var svg = select('.containerStore').append('svg').attr('class', 'house').attr('width', width).attr('height', height);
        
        svg.append('rect').attr('class', 'garage').attr('x', 20).attr('y', 20).attr('width', 500).attr('height', 380);

        svg.append('rect').attr('class', 'squareSpace').attr('x', 65).attr('y', 40).attr('width', 420).attr('height', 270);
        svg.append('rect').attr('class', 'groundTrim').attr('x', 65).attr('y', 305).attr('width', 420).attr('height', 5);
        svg.append('rect').attr('class', 'door').attr('x', 370).attr('y', 80).attr('width', 100).attr('height', 225);
        svg.append('circle').attr('class', 'doorHandle').attr('cx', 380).attr('cy', 200).attr('r', 5);

        svg.append('line').attr('class', 'topLeft').attr('x1', 20).attr('y1', 20).attr('x2', 65).attr('y2', 40);
        svg.append('line').attr('class', 'bottomLeft').attr('x1', 20).attr('y1', 400).attr('x2', 65).attr('y2', 310);
        svg.append('line').attr('class', 'bottomRight').attr('x1', 520).attr('y1', 400).attr('x2', 485).attr('y2', 310);
        svg.append('line').attr('class', 'topRight').attr('x1', 520).attr('y1', 20).attr('x2', 485).attr('y2', 40);


        return(<div className='containerStore'></div>)
    }
}