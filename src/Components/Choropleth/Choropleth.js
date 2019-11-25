import React, { Component } from 'react';
import d3Tip from 'd3-tip';
import * as topojson from 'topojson-client';
import './Choropleth.scss';
import { select, geoPath, map, scaleLinear, scaleThreshold, schemeGreens, format, axisBottom, json, csv } from 'd3';

export default class Choropleth extends Component {
	render() {
		var svg = select('#choropleth');
		var defs = svg.select('defs');
		var path = geoPath();
		var state = map(),
			county = map(),
			poverty = map(),
			population = map();
		var income_per_cap = map();
		var x = scaleLinear().domain([ 0, 18 ]).rangeRound([ 600, 860 ]);
		var color = scaleThreshold().domain([ 2, 4, 6, 8, 10, 12, 14, 16, 18 ]).range(schemeGreens[9]);
		var g = svg.append('g').attr('class', 'key').attr('transform', 'translate(0,40)');

		var tip = d3Tip().attr('class', 'd3-tip').offset([ -10, 0 ]).html(function(d) {
			return (
				"<strong>State:</strong> <span class='details'>" +
				state.get(d.id) +
				"</span><br><strong>County:</strong> <span class='details'>" +
				county.get(d.id) +
				"</span><br><strong>Poverty Rate:</strong> <span class='details'>" +
				poverty.get(d.id) +
				'%' +
				"</span><br><strong>Total Population:</strong> <span class='details'>" +
				format(',')(population.get(+d.id)) +
				"</span><br><strong>Income per capita: </strong> <span class='details'>" +
				format("$,")(income_per_cap.get(d.id)) +
				'</span><br>'
			);
		});
		g
			.selectAll('rect')
			.data(
				color.range().map(function(d) {
					d = color.invertExtent(d);
					if (d[0] == null) d[0] = x.domain()[0];
					if (d[1] == null) d[1] = x.domain()[1];
					return d;
				})
			)
			.enter()
			.append('rect')
			.attr('height', 20)
			.attr('x', function(d) {
				return x(d[0]);
			})
			.attr('width', function(d) {
				return x(d[1]) - x(d[0]);
			})
			.attr('fill', function(d) {
				return color(d[0]);
			});

		g
			.append('text')
			.attr('class', 'caption')
			.attr('x', x.range()[0])
			.attr('y', -6)
			.attr('fill', '#000')
			.attr('text-anchor', 'start')
			.attr('font-weight', 'bold')
			.text('Poverty Rate');

		g
			.call(
				axisBottom(x)
					.tickSize(23)
					.tickFormat(function(x) {
						return x + '%';
					})
					.tickValues(color.domain())
			)
			.attr('font-weight', 'bold')
			.attr('fill', 'black')
			.select('.domain')
			.remove();

		var promises = [
			json('https://d3js.org/us-10m.v1.json'),
			csv('county_detail.csv').then(function(data) {
				data.forEach(function(d) {
					population.set(+d.CensusId, +d.TotalPop);
					income_per_cap.set(+d.CensusId, +d.IncomePerCap);
				});
			}),
			csv('county_poverty.csv').then(function(data) {
				data.forEach(function(d) {
					poverty.set(d.CensusId, +d.Poverty);
					state.set(d.CensusId, d.State);
					county.set(d.CensusId, d.County);
				});
			})
		];

		Promise.all(promises).then(ready);
		function ready([ us ]) {
			defs.append('path').attr('id', 'nation').attr('d', path(topojson.feature(us, us.objects.nation)));

			svg.append('use').attr('href', '#nation').attr('fill-opacity', 0.2).attr('filter', 'url(#blur)');
			svg
				.append('g')
				.attr('class', 'counties')
				.selectAll('path')
				.data(topojson.feature(us, us.objects.counties).features)
				.enter()
				.append('path')
				.attr('d', path)
				.attr('fill', function(d) {
					return color(poverty.get(d.id));
				})
				.attr('stroke', '#777')
				.attr('stroke-width', 0.35)
				.call(tip)
				.on('mouseover', tip.show)
				.on('mouseout', tip.hide);

			svg
				.append('path')
				.datum(
					topojson.mesh(us, us.objects.states, function(a, b) {
						return a !== b;
					})
				)
				.attr('class', 'states')
				.attr('stroke', '#777')
				.attr('stroke-width', 0.7)
				.attr('d', path);
		}
		return <svg id="choropleth" max-width={960} height={600} viewBox="0 0 960 600" />;
	}
}
