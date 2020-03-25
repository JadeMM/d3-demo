import React from 'react';
import * as d3 from 'd3';

export default class Clock extends React.Component {
    constructor() {
        super();
        this.state = {
            canvasHeight : 400,
            canvasWidth : 600,
            data : [
                {
                    unit: 'sec',
                    value: 25
                },
                {
                    unit: 'min',
                    value: 30
                },
                {
                    unit: 'hour',
                    value: 12
                }
            ]
        }
    }

    //get time and execute d3 code
    componentDidMount = () => {
        let canvas = this.draw();
        this.drawClockFace(canvas);
        this.drawClockTicks(canvas);
        const clockHands = canvas.append("g")
            .attr("transform", `translate(${this.state.canvasWidth/2},${this.state.canvasHeight/2})`)

        setInterval(() => {
            this.getTime();
            this.drawClockHands(clockHands);
        }, 1000)
    }

    getTime = () => {
        let currentTime = new Date();
        this.setState({
            data: [
                {
                    unit: 'sec',
                    value: currentTime.getSeconds()
                },
                {
                    unit: 'min',
                    value: currentTime.getMinutes()
                },
                {
                    unit: 'hour',
                    value: currentTime.getHours() + currentTime.getMinutes()/60
                }
            ]
        })
        
    }

    drawClockFace = (canvas) => {
        const {canvasHeight, canvasWidth} = this.state;

        //create clock border
        canvas.append("circle")
        .attr("r", canvasHeight/2)
        .attr("cx", canvasWidth/2)
        .attr("cy", canvasHeight/2)

        //create clock face
        canvas.append("circle")
        .attr("r", canvasHeight/2-5)
        .attr("fill", "white")
        .attr("cx", canvasWidth/2)
        .attr("cy", canvasHeight/2)

        //clock inner dot
        canvas.append("circle")
            .attr("r", 5)
            .attr("cx", canvasWidth/2)
            .attr("cy", canvasHeight/2)

    }

    drawClockTicks = (canvas) => {
        const {canvasHeight, canvasWidth} = this.state;
        const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

        const pi = Math.PI;
        const scale = d3.scaleLinear().domain([1, 13]).range([0, 2 * pi]);

        const clockNumbers = canvas.append("g")
            .attr("transform", `translate(${canvasWidth/2},${canvasHeight/2})`)

        const arc = d3.arc()
            .innerRadius(canvasHeight/2 - 30)
            .outerRadius(canvasHeight/2-2)
            .startAngle(data => scale(data))
            .endAngle(data => scale(data))

        //draw ticks
        clockNumbers.selectAll("path")
            .data(data)
            .enter()
                .append("path")
                .attr("d", d => arc(d))
                .attr("stroke", "black")
                .attr("stroke-width", "4")
                .attr("fill", "none")
        
    }

    drawClockHands = (canvas) => {
        const {data, canvasHeight} = this.state;

        const pi = Math.PI;
        const scaleSecs = d3.scaleLinear().domain([0, 59 + 999/1000]).range([0, 2 * pi]);
        const scaleMins = d3.scaleLinear().domain([0, 59 + 59/60]).range([0, 2 * pi]);
        const scaleHours = d3.scaleLinear().domain([0, 11 + 59/60]).range([0, 2 * pi]);

        //clear previous hands
        canvas.selectAll("path").remove();

        //create arcs for hands
        const secondArc = d3.arc()
            .innerRadius(0)
            .outerRadius(canvasHeight/2 - 20)
            .startAngle(d => scaleSecs(d.value))
            .endAngle(d => scaleSecs(d.value))

        const minuteArc = d3.arc()
            .innerRadius(0)
            .outerRadius(canvasHeight/2 - 20)
            .startAngle(d => scaleMins(d.value))
            .endAngle(d => scaleMins(d.value))

        const hourArc = d3.arc()
            .innerRadius(0)
            .outerRadius(canvasHeight/3)
            .startAngle(d => scaleHours(d.value))
            .endAngle(d => scaleHours(d.value))
       
        //attch hands to canvas
        canvas.append("path")
            .attr("d", secondArc(data[0]))
            .attr("stroke", "black")
            .attr("stroke-width", "2")
            .attr("fill", "none")

        canvas.append("path")
            .attr("d", minuteArc(data[1]))
            .attr("stroke", "black")
            .attr("stroke-width", "4")
            .attr("fill", "none")
        
        canvas.append("path")
            .attr("d", hourArc(data[2]))
            .attr("stroke", "black")
            .attr("stroke-width", "4")
            .attr("fill", "none")

    }

    //draw
    draw = () => {
        const {canvasHeight, canvasWidth} = this.state;

        //create canvas
        const canvas = d3.select(this.refs.canvas)
            .append("svg")
            .attr("width", canvasWidth)
            .attr("height", canvasHeight)
        
        return canvas;
    }

    render(){
        return <div className='viewHolder' ref='canvas'/>
    } 
}