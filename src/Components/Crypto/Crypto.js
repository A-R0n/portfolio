import React, { Component } from 'react';
import './Crypto.css';
import * as d3 from 'd3';

class Crypto extends Component {
    constructor(){
        super();

        this.state = {
            init_data: []

        }
    }

    componentDidMount(){
        this.readData();
    }

    async readData(){
        await d3.csv("bitcoin_historical_data.csv").then(data=>{
            this.sf(data);
            this.sortData(data);
            this.setPath();
            this.setAxes();
            this.setText();
            this.setFocus()
            this.checkInput();
        }).catch(e=>{
            console.log(e);
        });

    };
    
    sf = (d) => {
        if(d3.timeParse('%d/%m/%Y')(d.Date) !== null){
            d.Date = d3.timeParse('%d/%m/%Y')(d.Date).getTime();
            d.Close = +d.Close;
            return d;
        }
    };

    sortData = (data) => {
        this.setState({
            init_data: data.sort((a, b) => a.Date - b.Date)
        }, ()=>console.log(this.state.data));
    }
    
    
    checkInput = (e) => {
        d3.selectAll("#start_date").on("input", function() {
            this.updateStartTime(e.target.val);
        });
        d3.selectAll("#end_date").on("input", function() {
            this.updateEndTime(e.target.val);
        });
    };
    
    setAxes = () => {
         this.setAxisX();
         this.setAxisY();
    };
    
    setAxisX = () => {
        let x = d3.scaleTime().range([ 0, 600 ]);
        
        let xAxis = d3.axisBottom(x);
        let xAxisForm = xAxis.ticks(10).tickFormat(d3.timeFormat("%Y-%b"));
         x.domain(d3.extent(this.state.init_data, function(d) { return d.Date; }));
         d3.select(".g_class").append("g").attr("class", "x_axis").attr("transform", "translate(0," + 340 + ")")
            .call(xAxisForm);
    };
    
    setAxisY = () => {
        let y = d3.scaleLinear().range([ 340, 0 ]);
         y.domain([0, d3.max(this.state.init_data, function(d) { return +d.Close; })])
    
         d3.select(".g_class").append("g").attr("class", "y_axis").call(d3.axisLeft(y));
    };
    
    setFocus = () => {
         d3.select(".g_class").select(".focus").append('circle').attr('r', 4.5);
         d3.select(".g_class").select(".focus").append('line').classed('x', true);
         d3.select(".g_class").select(".focus").append('line').classed('y', true);
         d3.select(".g_class").select(".focus").append('text').attr('x', 9).attr('dy', '.35em');
    
         this.setFocusRectangle();
    };
    
    setFocusRectangle = () => {
        d3.select(".g_class").append('rect')
            .attr('class', 'overlay')
            .attr('width', 600)
            .attr('height', 340)
            .on('mouseover', () => d3.select(".g_class").select(".focus").style('display', null))
            .on('mouseout', () => d3.select(".g_class").select(".focus").style('display', 'none'))
            .on('mousemove', this.mousemove);
    };
    
    mousemove = () => {
        let x = d3.scaleTime().range([ 0, 600 ]);
         const x0 = x.invert(d3.mouse(this)[0]);
         const i = d3.bisector(d => d.Date).right(this.state.init_data, x0, 1);
         const d0 = this.state.init_data[i - 1];
         const d1 = this.state.init_data[i];
         const d = x0 - d0.Date > d1.Date - x0 ? d1 : d0;
    
         this.setCanvas(d);
    };
    
    setCanvas = (d) => {
        let x = d3.scaleTime().range([ 0, 600 ]);
        let y = d3.scaleLinear().range([ 340, 0 ]);
         d3.select(".g_class").select(".focus").attr('transform', `translate(${x(d.Date)}, ${y(d.Close)})`);
         this.setCanvasXLine(d);
         this.setCanvasYLine(d);
         this.setCurrFormat(d);
    };
    
    setCanvasXLine = (d) => {
        let x = d3.scaleTime().range([ 0, 600 ]);
         d3.select(".g_class").select(".focus").select('line.x').attr('x1', 0).attr('x2', -x(d.Date)).attr('y1', 0).attr('y2', 0);
    };;
    
    setCanvasYLine = (d) => {
        let y = d3.scaleLinear().range([ 340, 0 ]);
         d3.select(".g_class").select(".focus").select('line.y').attr('x1', 0).attr('x2', 0).attr('y1', 0).attr('y2', 340 - y(d.Close));
    };
    
    setCurrFormat = (d) => {
        const formatValue = d3.format(".4n");
        const formatCurrency = d => `$${formatValue(d)}`;
         d3.select(".g_class").select(".focus").select('text').text(formatCurrency(d.Close));
    };
    
    setPath = () => {
        let y = d3.scaleLinear().range([ 340, 0 ]);
        let x = d3.scaleTime().range([ 0, 600 ]);
        let valueline = d3.line().x(function(d) { return x(d.Date); }).y(function(d) { return y(d.Close); });


        d3.select(".g_class").append("path")
            .datum(this.state.init_data)
            .attr("class", "line")
            .attr("d", valueline(this.state.init_data));
    };
    
    setText = () => {
    
        d3.select(".g_class").select("#x_axis_text").attr("x", 600 - 60).attr("y", 340 + 50).text("Time");
    
        d3.select(".g_class").select("#y_axis_text").attr("x" -340/1.75).attr("y", -45).text("Price (USD)").attr("transform", "rotate("+(-90)+")");
    
        d3.select(".g_class").select("#title_text").attr("x", 600/2).attr("y", 10).text("Bitcoin Values (2013 to 2017)").attr("text-anchor", "middle");
    
    };
    
    updateStartTime = (val) => {
        let xAxis = d3.axisBottom(x);
        let valueline = d3.line().x(function(d) { return x(d.Date); }).y(function(d) { return y(d.Close); });
        let y = d3.scaleLinear().range([ 340, 0 ]);
        let x = d3.scaleTime().range([ 0, 600 ]);
            let index = 0;
            var higherVals = [];
            var el = new Date(this.parseDash(val)).getTime();
    
                    for(let i = 0; i <= this.state.init_data.length; i++) {
                        if(this.state.init_data[i].Date === el) {
                            index = i;
                            break;
                        }
                        else {
                            continue;
                         }
                    };
                    // add the values b/t start date and end to added array
                    higherVals = this.state.init_data.slice(index, this.state.init_data.length - 1);
    
    
    
            d3.select(".x_axis").domain([this.state.init_data[index].Date, this.state.init_data[this.state.init_data.length - 1].Date]);
    
            var t = d3.select("svg").transition().duration(1000).ease(d3.easeSin);
            t.select(".x_axis").call(xAxis);
            t.select(".line").attr("d", valueline(higherVals));
    };
    
    updateEndTime = (val) => {
        const parseDash = d3.timeParse("%Y-%m-%d");
        let xAxis = d3.axisBottom(x);
        let valueline = d3.line().x(function(d) { return x(d.Date); }).y(function(d) { return y(d.Close); });
        let y = d3.scaleLinear().range([ 340, 0 ]);
        let x = d3.scaleTime().range([ 0, 600 ]);
            let index = 0;
            var lesserVals = [];
            var el = new Date(parseDash(val)).getTime();
    
                    for(let i = 0; i <= this.state.init_data.length; i++) {
                        if(this.state.init_data[i].Date === el) {
                            index = i;
                            break;
                        }
                        else {
                            continue;
                         }
                    };
                    // add the values b/t start date and end to added array
                    lesserVals = this.state.init_data.slice(0, index);
    
    
    
            d3.select(".x_axis").domain([this.state.init_data[0].Date, this.state.init_data[index].Date]);
    
            var t = d3.select("svg").transition().duration(1000).ease(d3.easeLinear);
            t.select(".x_axis").call(xAxis);
            t.select(".line").attr("d", valueline(lesserVals));
    }

    render() {
        if(this.state.data){
            let data_map = this.state.data.map((e, i)=> {
                e.Date = d3.timeParse('%d/%m/%Y')(e.Date).getTime();
                e.Close = +e.Close;
                return <div>{e}</div>
            });
            console.log(data_map);
        }
      const margin = {top: 10, right: 60, bottom: 50, left: 60},
          width = 720 - margin.left - margin.right,
          height = 400 - margin.top - margin.bottom
      
      
      const bisectDate = d3.bisector(d => d.Date).right;
      
      const parseTime = d3.timeParse('%d/%m/%Y');
      
      const svg = d3.select("#my_dataviz").select("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")").attr("class", "g_class");
      
      const focus = svg.append('g').attr('class', 'focus').style('display', 'none');
      
      const text_x = d3.select(".g_class").append("text").attr("id", "x_axis_text");
      const text_y = d3.select(".g_class").append("text").attr("id", "y_axis_text");;
      const text_title = d3.select(".g_class").append("text").attr("id", "title_text");;
      

        return (
            <div id="my_dataviz">
            <svg>
                <foreignObject  >
                    <div xmlns="http://www.w3.org/1999/xhtml" className="dates">
                        <p id="from_date">From:
                            <input
                                onChange={(e)=>this.checkInput(e)}
                                   type = "date"
                                   id="start_date"
                                   name="graph-start"
                                   value="2013-04-28"
                                   min = "2013-04-28"
                                   max="2017-11-22"
                                   required pattern="\d{4}-\d{2}-\d{2}">
                            </input>
                        </p>
                        <p id="to_date">To:
                            <input type = "date"
                            onChange={(e)=>this.checkInput(e)}
                                   id="end_date"
                                   name="graph-end"
                                   value="2017-11-22"
                                   min = "2013-04-28"
                                   max="2017-11-22"
                                   required pattern="\d{2}-\d{2}-\d{4}">
        
                            </input>
                        </p>
                    </div>
                </foreignObject>
            </svg>
        </div>
        );
    }
}

export default Crypto;