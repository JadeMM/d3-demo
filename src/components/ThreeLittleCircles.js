import React from 'react';
import * as d3 from 'd3';

export default class ThreeLittleCircles extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [20, 30 , 40, 50],
            canvasHeight : 400,
            canvasWidth : 600
        }
    }

    //execute d3 code
    componentDidMount = () => {
        this.drawCircles();
    }

    //draw chart
    drawCircles = () => {
        const {data, canvasHeight, canvasWidth} = this.state;

        //create canvas
        const svgCanvas = d3.select(this.refs.canvas)
            .append("svg")
            .attr("width", canvasWidth)
            .attr("height", canvasHeight)
            .style("border", "1px solid black")
        
        svgCanvas.selectAll("circle")
            .data(data)
            .enter()
                .append("circle")
                .attr("fill", "steelblue")
                .attr("r", (datapoint) => datapoint)
                .attr("cx", (datapoint, i) => i * 100 + 50)
                .attr("cy", 90)

        svgCanvas.selectAll("circle")
        .data([1, 2])
        .exit()
            .transition()
            .duration(2000)
            .attr("fill", "white")
            .transition()
            .duration(3000)
            .remove()
    }
    render(){
        return <div className='viewHolder' ref='canvas'/>
    } 
}