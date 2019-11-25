import React, { Component } from 'react';
import './GDP.scss';
import { select, selectAll, scaleBand, scaleLinear, axisBottom, axisLeft } from 'd3';

export default class GDP extends Component {
	constructor() {
		super();

		this.state = {};
	}
	render() {
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
		const margin2 = 60,
			width2 = 1000 - 2 * margin2,
			height2 = 600 - 2 * margin2;
		const svg = select('#area_bar').classed('bar_bar', true).append('svg');
		const chart = svg.append('g').attr('transform', `translate(${margin2}, ${margin2})`);
		const xScale_2 = scaleBand().range([ 0, width2 ]).domain(growth.map((s) => s.year)).padding(0.2);
		const yScale_2 = scaleLinear().range([ height2, 0 ]).domain([ 14, 20 ]);
		const barGroups = chart.selectAll('svg').data(growth).enter().append('g');

		chart.append('g').call(axisLeft(yScale_2));
		chart.append('g').attr('transform', `translate(0, ${height2})`).call(axisBottom(xScale_2));

		barGroups
			.append('rect')
			.attr('class', 'bar')
			.attr('x', function(d) {
				return xScale_2(d.year);
			})
			.attr('y', function(d) {
				return yScale_2(d.gdp);
			})
			.attr('height', (s) => height2 - yScale_2(s.gdp))
			.attr('width', (s) => xScale_2.bandwidth(s))
			// ENTERING
			.on('mouseenter', function(actual, i) {
				select(this)
					.transition()
					.duration(300)
					.attr('opacity', 0.6)
					.attr('x', (a) => xScale_2(a.year) - 5)
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
					.attr('x', (a) => xScale_2(a.year) + xScale_2.bandwidth() / 2)
					.attr('y', (a) => yScale_2(a.gdp) + 30)
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
				selectAll('.value').attr('opacity', 1);

				select(this)
					.transition()
					.duration(300)
					.attr('opacity', 1)
					.attr('x', (a) => xScale_2(a.year))
					.attr('width', xScale_2.bandwidth());

				chart.selectAll('#limit').remove();
				chart.selectAll('.divergence').remove();
			});

		chart
			.append('g')
			.attr('class', 'grid')
			.attr('transform', `translate(0, ${height2})`)
			.call(axisBottom().scale(xScale_2).tickSize(-height2, 0, 0).tickFormat(''));

		chart.append('g').attr('class', 'grid').call(axisLeft().scale(yScale_2).tickSize(-width2, 0, 0).tickFormat(''));
		svg
			.append('text')
			.style('fill', 'white')
			.style('font-size', '2.0em')
			.attr('x', width2 / 2 + margin2)
			.attr('y', 40)
			.attr('text-anchor', 'middle')
			.text('USA Gross Domestic Product - 10 years');
		svg
			.append('text')
			.style('fill', 'white')
			.style('font-size', '1.5em')
			.attr('x', -(height2 / 2) - margin2)
			.attr('y', margin2 / 2.4)
			.attr('transform', 'rotate(-90)')
			.attr('text-anchor', 'middle')
			.text('GDP (in trillions)');

		svg
			.append('text')
			.style('fill', 'white')
			.style('font-size', '1.5em')
			.attr('x', width2 / 2 + margin2)
			.attr('y', 590)
			.attr('text-anchor', 'middle')
			.text('Year');

		return <svg id="area_bar" width={960} height={600} viewBox="0 0 960 600" />;
	}
}
