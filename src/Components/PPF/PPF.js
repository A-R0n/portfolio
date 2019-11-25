import React, { Component } from 'react';
import './PPF.scss';
import * as d3 from 'd3';
import { TweenMax } from 'gsap';
import { mouse } from 'd3-selection';

class PPF extends Component {
	constructor() {
		super();

		this.state = {
			data: [
				{ consumptionGoods: 720, capitalGoods: 0 },
				{ consumptionGoods: 650, capitalGoods: 300 },
				{ consumptionGoods: 520, capitalGoods: 540 },
				{ consumptionGoods: 270, capitalGoods: 740 },
				{ consumptionGoods: 0, capitalGoods: 800 }
			],
			showMC: false,
			count: 0
		};
	}

	componentDidMount() {
		this.tweenTitle();
		this.drawPPF();
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.data !== this.state.data) {
			console.log('success');
		}
	}

	async tweenTitle() {
		await TweenMax.to('#header-title0', 1, { x: 0, scaleX: 1, opacity: 1, delay: 0.66 });
		await TweenMax.to('#header-title1', 1, { x: 0, scaleX: 1, opacity: 1, delay: 0.85 });
		await TweenMax.to('#header-title2', 1, { x: 0, scaleX: 1, opacity: 1, delay: 0.9 });
		await TweenMax.to('#logo', 1, { opacity: 1, y: 10, delay: 2 });
	}

	drawPPF = (s) => {
		var i = 0;
		const margin = { top: 10, right: 20, bottom: 50, left: 50 };
		const width = 400 - margin.left - margin.right;
		const height = 350 - margin.top - margin.bottom;
		const x = d3.scaleLinear().range([ 0, width ]).domain([
			0,
			d3.max(this.state.data, function(d) {
				return d.consumptionGoods + 200;
			})
		]);
		const y = d3.scaleLinear().range([ height, 0 ]).domain([
			0,
			d3.max(this.state.data, function(d) {
				return d.capitalGoods + 200;
			})
		]);
		const yScale = d3.scaleLinear().range([height, 0]).domain([70, 320]);
		const xScale = d3.scaleLinear().range([0, width]).domain([70, d3.max(this.state.data, function(d) {
			return d.capitalGoods + 220;
		})]);

		var svg = d3.select('#ppf').classed('ppf_graph', true).append('g');

		var chart = svg
			.attr('width', width + margin.left + margin.right)
			.attr('height', height + margin.top + margin.bottom)
			.append('g')
			.attr('transform', `translate(${margin.left}, ${margin.top})`)
			.attr('id', 'secret');

		var valueline = d3
			.line()
			.x(function(d) {
				return x(d.consumptionGoods);
			})
			.y(function(d) {
				return y(d.capitalGoods);
			})
			.curve(d3.curveCardinal);

		var area = d3
			.area()
			.x(function(d) {
				return x(d.consumptionGoods);
			})
			.y0(height)
			.y1(function(d) {
				return y(d.capitalGoods);
			})
			.curve(d3.curveCardinal);
		var line = chart.append('path').data([ this.state.data ]).attr('class', 'line').attr('d', valueline);
		const xAxis = chart.append('g').attr('transform', 'translate(0,' + height + ')').call(d3.axisBottom(x));
		const yAxis = chart.append('g').call(d3.axisLeft(y));
		const yAxis_grid = chart
			.append('g')
			.attr('class', 'grid')
			.attr('transform', `translate(0, ${height})`)
			.call(d3.axisBottom().scale(x).tickSize(-height, 0, 0).tickFormat(''));
		const xAxis_grid = chart
			.append('g')
			.attr('class', 'grid')
			.call(d3.axisLeft().scale(y).tickSize(-width, 0, 0).tickFormat(''));
		const pareto_innefficient_area = chart
			.append('path')
			.data([ this.state.data ])
			.attr('class', 'inefficient')
			.attr('d', area);

		var click = chart.on('click', function() {
			if (d3.event.defaultPrevented) return;
			i++;
			// Extract the click location\
			var point = mouse(this),
				p = { x: point[0], y: point[1] };

			// Append a new point
			var newCircle = svg
				.append('circle')
				.attr('cx', p.x + 50)
				.attr('cy', p.y + 8)
				.attr('r', 5)
				.attr('id', i)
				.on('click', function() {
					d3.event.stopPropagation();
					alert('new circle clicked w/ ID: ' + d3.select(this).attr('id'));
				});
			//   .call(drag);
		});

		// var allocative_efficiency = svg
		// .append('circle').attr('class', '.dot')
		// 		.attr('cx', xScale(520))
		// 		.attr('cy', yScale(225))
		// 		.attr('r', 5)

		var drag = d3.drag().on('start', onStart).on('drag', onDrag).on('end', onEnd);

		function onStart() {
			d3.select(this).raise().classed('active', true);
		}

		function onDrag() {
			var newX = d3.event.x;
			var newY = d3.event.y;
			var newDot = d3.select(this).attr('cx', newX).attr('cy', newY).attr('id', 'hehe');
		}

		function onEnd() {
			d3.select(this).classed('active', false);
		}
		svg
			.append('text')
			.attr('class', 'labels')
			.attr('x', -20)
			.attr('y', 10)
			.attr('transform', 'rotate(-90)')
			.attr('text-anchor', 'end')
			.text('Capital Investment')
			.attr('fill', 'black');

		svg
			.append('text')
			.attr('class', 'labels')
			.attr('x', 340)
			.attr('y', 340)
			.attr('text-anchor', 'middle')
			.text('Consumption Goods')
			.attr('fill', 'black');

		chart
			.append('text')
			.attr('class', 'labels')
			.attr('id', 'explained')
			.attr('x', 120)
			.attr('y', 200)
			.attr('text-anchor', 'middle')
			.text('Pareto Inefficient')
			.attr('fill', 'black');

		var dots = chart
			.selectAll('.dot')
			.data(this.state.data)
			.enter()
			.append('circle')
			.attr('class', 'dot')
			.attr('cx', function(d, i) {
				return x(d.consumptionGoods);
			})
			.attr('cy', function(d, i) {
				return y(d.capitalGoods);
			})
			.attr('r', 5)
			.call(drag);
		// .on("mouseover", function(d,i) { alert("mouseover"); })
	};

	async showMC() {
		await this.setState({ showMC: !this.state.showMC });
		const margin = { top: 10, right: 20, bottom: 50, left: 50 };
		const width = 400 - margin.left - margin.right;
		const height = 350 - margin.top - margin.bottom;
		const x = d3.scaleLinear().range([ 0, width ]).domain([
			0,
			d3.max(this.state.data, function(d) {
				return d.consumptionGoods + 200;
			})
		]);
		const y = d3.scaleLinear().range([ height, 0 ]).domain([
			0,
			d3.max(this.state.data, function(d) {
				return d.capitalGoods + 200;
			})
		]);

		var area_rect = d3
			.area()
			.x((d) => x(d.consumptionGoods))
			.y0((d, i) => y(d.capitalGoods))
			.y1((d) => y(d.capitalGoods))
			.curve(d3.curveStepBefore);

		var area_rect_reverse = d3
			.area()
			.x((d) => x(d.consumptionGoods))
			.y0((d, i) => y(d.capitalGoods))
			.y1((d) => y(d.capitalGoods))
			.curve(d3.curveStepAfter);

		d3
			.select('#secret')
			.selectAll('.rectangle')
			.data(this.state.data)
			.enter()
			.append('rect')
			.attr('class', 'rectangle');
		d3
			.select('#secret')
			.append('path')
			.data([ this.state.data ])
			.attr('class', 'rectangle')
			.attr('d', area_rect)
			.attr('fill', 'greenyellow')
			.transition()
			.duration(700)
			.style('opacity', 0.5);
		d3
			.select('#secret')
			.append('path')
			.data([ this.state.data ])
			.attr('class', 'rectangle')
			.attr('d', area_rect_reverse)
			.transition()
			.duration(700)
			.style('opacity', 0.5);
	}

	hideRectangles = () => {
		TweenMax.to('.rectangle', 0.5, { opacity: 0 });
	};

	showTechShift = () => {
		this.hideRectangles();
		const margin = { top: 10, right: 20, bottom: 50, left: 50 };
		const width = 400 - margin.left - margin.right;
		const height = 350 - margin.top - margin.bottom;
		const x = d3.scaleLinear().range([ 0, width ]).domain([
			0,
			d3.max(this.state.data, function(d) {
				return d.consumptionGoods + 200;
			})
		]);
		const y = d3.scaleLinear().range([ height, 0 ]).domain([
			0,
			d3.max(this.state.data, function(d) {
				return d.capitalGoods + 200;
			})
		]);
		var valueline2 = d3
			.line()
			.x(function(d, i) {
				return x(d.consumptionGoods) + 55 - i * (i + 2);
			})
			.y(function(d, i) {
				return y(d.capitalGoods) + i * 0.95;
			})
			.curve(d3.curveCardinal);
		const shift = d3
			.select('#secret')
			.transition()
			.duration(1000)
			.selectAll('.dot')
			.attr('cx', function(d, i) {
				return x(d.consumptionGoods) + 55 - i * (i + 2);
			})
			.attr('cy', function(d, i) {
				return y(d.capitalGoods) + i * 0.95;
			})
			.attr('id', 'shift');
		d3.select('#secret').transition().duration(1000).select('.line').attr('d', valueline2);
	};

	render() {
		var title = [ [ 'Econ' ], [ 'Study' ], [ 'Tools' ] ];
		return (
			<div className="PPF">
				<svg id="ppf" className="ppf_graph" width={400} height={350} viewBox="0 0 400 350" />
				<div className="boxer">
					<span id="ppf_question">
						What is the opportunity cost of producing one good over another?
					</span>
                    <button className="showMC" onClick={() => this.showMC()}>
							Hint
						</button>
					<span id="ppf_question">
						What happens when a new oven is invented that improves the quality of pizza?
					</span>
                    <button className="showTechShift" onClick={() => this.showTechShift()}>
							Hint
						</button>
				</div>
			</div>
		);
	}
}

export default PPF;
