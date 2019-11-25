import React, { Component } from 'react';
import { range, forceSimulation, forceManyBody, forceLink, select, drag, event } from 'd3';
import './ForceDirected.scss';

export default class ForceDirected extends Component {
	constructor() {
		super();
	}
	render() {
		var n = 12;

		var nodes = range(n * n).map(function(i) {
			return {
				index: i
			};
		});

		var links = [];

		for (var y = 0; y < n; ++y) {
			for (var x = 0; x < n; ++x) {
				if (y > 0) links.push({ source: (y - 1) * n + x, target: y * n + x });
				if (x > 0) links.push({ source: y * n + (x - 1), target: y * n + x });
			}
		}

		var simulation = forceSimulation(nodes)
			.force('charge', forceManyBody().strength(-30))
			.force('link', forceLink(links).strength(1).distance(20).iterations(10))
			.on('tick', ticked);

		var canvas = document.querySelector('canvas'),
			context = canvas.getContext('2d'),
			width = canvas.width,
			height = canvas.height;

		select(canvas).call(
			drag()
				.container(canvas)
				.subject(dragsubject)
				.on('start', dragstarted)
				.on('drag', dragged)
				.on('end', dragended)
		);

		function ticked() {
			context.clearRect(0, 0, width, height);
			context.save();
			context.translate(width / 2, height / 2);

			context.beginPath();
			links.forEach(drawLink);
			context.strokeStyle = 'black';
			context.stroke();

			context.beginPath();
			nodes.forEach(drawNode);
			context.fill();
			context.strokeStyle = 'black';
			context.stroke();

			context.restore();
		}

		function dragsubject() {
			return simulation.find(event.x - width / 2, event.y - height / 2);
		}

		function dragstarted() {
			if (!event.active) simulation.alphaTarget(0.3).restart();
			event.subject.fx = event.subject.x;
			event.subject.fy = event.subject.y;
		}

		function dragged() {
			event.subject.fx = event.x;
			event.subject.fy = event.y;
		}

		function dragended() {
			if (!event.active) simulation.alphaTarget(0);
			event.subject.fx = null;
			event.subject.fy = null;
		}

		function drawLink(d) {
			context.moveTo(d.source.x, d.source.y);
			context.lineTo(d.target.x, d.target.y);
		}

		function drawNode(d) {
			context.moveTo(d.x + 3, d.y);
			context.arc(d.x, d.y, 3, 0, 2 * Math.PI);
		}

		return <canvas id="force" width={960} height={600} />;
	}
}
