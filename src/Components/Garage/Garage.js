import React, { Component } from 'react';
import * as d3 from 'd3';
import './Garage.css';
import Form from '../Form/Form';

export default class Garage extends Component {
	constructor() {
		super();

		this.state = {
			width: 700,
			height: 440,
			margin: { top: 5.714, right: 10, bottom: 5.714, left: 10 },
			ceilingPoints: [ [ 0, 0 ], [ 90, 50 ], [ 630, 50 ], [ 700, 0 ] ],
			floorPoints: [ [ 0, 440 ], [ 90, 340 ], [ 630, 340 ], [ 700, 440 ] ],
			doorEdgePoints: [ [ 612, 113 ], [ 615, 114 ], [ 615, 322 ], [ 612, 326.1 ] ],
			doorFacePoints: [ [ 612, 327 ], [ 540, 310 ], [ 540, 116.5 ], [ 612, 113 ], [ 612, 327 ] ],
			line: d3.line()
		};
	}

	componentDidMount() {
		this.defineTheGarage();
	}

	defineTheGarage = () => {
		const { width, height } = this.state;
		const garage = d3.select('.garage').attr('width', width).attr('height', height);
		this.defineInnerGarage(garage);
	};

	defineInnerGarage = (selection) => {
		const { width, height, margin } = this.state;
		selection.append('rect').attr('class', 'innerGarage');
		d3
			.select('.innerGarage')
			.attr('x', margin.left)
			.attr('y', margin.top)
			.attr('width', width - margin.left - margin.right)
			.attr('height', height - margin.top - margin.bottom);
		this.createSpacialAwareness(selection);
	};

	createSpacialAwareness = (selection) => {
		this.createMainWall(selection);
		this.createCeiling(selection);
		this.createFloor(selection);
		this.createDoorway(selection);
		this.createDraggability(selection);
	};

	createMainWall = (selection) => {
		selection.append('g').append('rect').attr('class', 'mainWall');
		const wallFacing = d3.select('.mainWall').attr('x', 90).attr('y', 50).attr('width', 540).attr('height', 290);
		this.createMountGroup(wallFacing);
	};

	createMountGroup = (selection) => {
		d3.select('.garage').append('g').attr('class', 'mountGroup');
		selection.call(this.allowMountDesign);
	};

	createCeiling = (selection) => {
		const { ceilingPoints, line } = this.state;
		var pathMountData = line(ceilingPoints);
		selection.append('path').attr('class', 'ceiling').attr('d', pathMountData);
	};

	createFloor = (selection) => {
		const { floorPoints, line } = this.state;
		var pathMountData = line(floorPoints);
		selection.append('path').attr('class', 'floor').attr('d', pathMountData);
		selection.append('g').attr('class', 'tools');
	};

	createDoorway = (selection) => {
		selection
			.append('rect')
			.attr('class', 'doorWay')
			.attr('x', 520)
			.attr('y', 110)
			.attr('width', 100)
			.attr('height', 225);
		this.createDoor(selection);
	};

	createDoor = (selection) => {
		this.doorEdge(selection);
		this.doorFace(selection);
		this.doorHandle(selection);
	};

	doorEdge = (selection) => {
		const { doorEdgePoints, line } = this.state;
		const doorEdge = line(doorEdgePoints);
		selection.append('path').attr('class', 'doorEdge').attr('d', doorEdge);
	};

	doorFace = (selection) => {
		const { doorFacePoints, line } = this.state;
		const doorFace = line(doorFacePoints);
		selection.append('path').attr('class', 'doorFace').attr('d', doorFace);
	};

	doorHandle = (selection) => {
		selection.append('circle').attr('class', 'doorHandle').attr('cx', 550).attr('cy', 230).attr('r', 4.5);
	};

	allowMountDesign = (selection) => {
		var mouseCoords,
			circle,
			pathMount,
			keepMount = false,
			lineMount = d3.line().x((d) => d[0]).y((d) => d[1]);

		selection
			.on('mousedown', function() {
				keepMount = true;
				mouseCoords = d3.mouse(this);

				pathMount = d3
					.select('g.mountGroup')
					.append('path')
					.attr('class', 'containerMount')
					.attr('d', lineMount([ mouseCoords, mouseCoords ]));
				makeCircle(mouseCoords);
			})
			.on('mousemove', function() {
				if (keepMount) {
					var Line = lineMount([
						mouseCoords,
						d3.mouse(this).map(function(x) {
							return x - 1;
						})
					]);
					pathMount.attr('d', Line);
				}
			})
			.on('mouseup', function() {
				keepMount = false;
			});
		function makeCircle(mouseCoords) {
			d3
				.select('.garage')
				.append('circle')
				.attr('id', 'startingPoint')
				.attr('cx', mouseCoords[0])
				.attr('cy', mouseCoords[1])
				.attr('r', 5);
		}
	};

	createDraggability = () => {
		function started() {
			d3.select(this).classed('dragging', true);
			d3.event.on('drag', dragged).on('end', ended);
		}
		function dragged() {
			d3.select(this).attr('x', d3.event.x).attr('y', d3.event.y);
		}
		function ended(volumeTool) {
			var spaceUsed = 0;
			var textInContainer = d3.select('#space').data([ volumeTool ]).enter();
			d3.select('#space').exit().remove();
			d3.select('#space').text((volumeTool) => {
				return `${volumeTool + spaceUsed}` + `%`;
			});
			if (volumeTool + spaceUsed > 100) {
				alert('Container has exceeded its limit!');
				d3.select('#space').attr('fill', 'red');
			}
			d3.select(this).style('opacity', 0);
			spaceUsed += volumeTool;
			d3.select(this).classed('dragging', false);
		}
		this.createDraggableTools(started, dragged, ended);
	};

	createDraggableTools = (started, dragged, ended) => {
		this.createHammer(started, dragged, ended);
		this.createSaw(started, dragged, ended);
		this.createChainSaw(started, dragged, ended);
		this.createScrews(started, dragged, ended);
		this.createTapeMeasure(started, dragged, ended);
	};

	createHammer = (started, dragged, ended) => {
		var hammerVolume = [ 12 ];
		d3
			.select('.tools')
			.append('image')
			.attr('href', 'https://image.flaticon.com/icons/svg/1538/1538118.svg')
			.attr('id', 'hammer')
			.attr('x', 100)
			.attr('y', 370);
		d3.select('#hammer').data(hammerVolume).enter();
		d3
			.select('#hammer')
			.call(d3.drag().subject({ x: 100, y: 370 }).on('start', started).on('drag', dragged).on('end', ended));
	};

	createSaw = (started, dragged, ended) => {
		var sawVolume = [ 30 ];
		d3
			.select('.tools')
			.append('image')
			.attr('href', 'https://image.flaticon.com/icons/svg/1538/1538124.svg')
			.attr('id', 'saw')
			.attr('x', 200)
			.attr('y', 355);
		d3.select('#saw').data(sawVolume).enter();
		d3
			.select('#saw')
			.call(
				d3
					.drag()
					.subject({ x: 200, y: 355 })
					.on('start', started)
					.on('drag', (d) => dragged(d))
					.on('end', ended)
			);
	};

	createChainSaw = (started, dragged, ended) => {
		var chainsawVolume = [ 70 ];
		d3
			.select('.tools')
			.append('image')
			.attr('href', 'https://image.flaticon.com/icons/svg/123/123935.svg')
			.attr('id', 'chainsaw')
			.attr('x', 260)
			.attr('y', 350);
		d3.select('#chainsaw').data(chainsawVolume).enter();
		d3
			.select('#chainsaw')
			.call(
				d3
					.drag()
					.subject({ x: 260, y: 350 })
					.on('start', started)
					.on('drag', (d) => dragged(d))
					.on('end', ended)
			);
	};

	createScrews = (started, dragged, ended) => {
		var screwsVolume = [ 1.05 ];
		d3
			.select('.tools')
			.append('image')
			.attr('href', 'https://image.flaticon.com/icons/svg/289/289690.svg')
			.attr('id', 'screws')
			.attr('x', 420)
			.attr('y', 360);
		d3.select('#screws').data(screwsVolume).enter();
		d3
			.select('#screws')
			.call(
				d3
					.drag()
					.subject({ x: 420, y: 360 })
					.on('start', started)
					.on('drag', (d) => dragged(d))
					.on('end', ended)
			);
	};

	createTapeMeasure = (started, dragged, ended) => {
		var tmVolume = [ 8 ];
		d3
			.select('.tools')
			.append('image')
			.attr('href', 'https://image.flaticon.com/icons/svg/1589/1589247.svg')
			.attr('id', 'tapemeasure')
			.attr('x', 520)
			.attr('y', 370);
		d3.select('#tapemeasure').data(tmVolume).enter();
		d3
			.select('#tapemeasure')
			.call(
				d3
					.drag()
					.subject({ x: 520, y: 370 })
					.on('start', started)
					.on('drag', (d) => dragged(d))
					.on('end', ended)
			);
	};

	render() {
		return (
			<div className="Garage">
				<Form handleChange={this.props.handleChange} handleSubmit={this.props.handleSubmit} />
				<svg className="garage" />
			</div>
		);
	}
}
