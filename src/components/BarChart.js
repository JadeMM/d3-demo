import React from 'react';
import * as d3 from 'd3';

export default class BarChart extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [ 2, 4, 2, 6, 8 ],
            canvasHeight : 400,
            canvasWidth : 600,
            scale : 20
        }
    }

    //execute d3 code
    componentDidMount = () => {
        this.drawBarChart();
    }

    //draw bar chart
    drawBarChart = () => {
        const {data, canvasHeight, canvasWidth, scale} = this.state;

        //create canvas
        const svgCanvas = d3.select(this.refs.canvas)
            .append("svg")
            .attr("width", canvasWidth)
            .attr("height", canvasHeight)
            .style("border", "1px solid black")
        
        //for each rectangle in canvas, attach data
        //for each data, we append a rect of 40 x data*20 and give it a x,y point
        svgCanvas.selectAll("rect")
            .data(data)
            .enter()
                .append("rect")
                .attr("width", 40)
                .attr("height", (datapoint) => datapoint * scale)
                .attr("fill", "steelBlue")
                .attr("x", (datapoint, iteration) => iteration * 45)
                .attr("y", (datapoint) => canvasHeight - (datapoint * scale))

        svgCanvas.selectAll("text")
            .data(data)
            .enter()
                .append("text")
                .style("fill", "white")
                .attr("x", (datapoint, i) => i * 45 + 14)
                .attr("y", (datapoint) => canvasHeight - (datapoint * scale) + 20)
                .text(datapoint => datapoint)

    }
    render(){
        return <div className='viewHolder' ref='canvas'/>
    } 
}