import React from 'react';
import * as d3 from 'd3';

export default class TempDisplay extends React.Component {
    constructor() {
        super();
        this.state = {
            temperatureData: [ 8, 5, 13, 9, 12 ]
        }
    }
    
    componentDidMount = () => {
        d3.select(this.refs.temperatures)
            .selectAll("h2")
            .data(this.state.temperatureData)
            .enter()
                .append("h2")
                .text((datapoint) => `${datapoint} `)
                .transition()
                .duration(5000)
                .style("color", (datapoint) => {
                    return datapoint > 10 ?  "red" :  "blue"
                })
          
        d3.select(this.refs.temperatures)
            .selectAll("h2")
            .append("span")
            .text('datapoint')
            .style("color", "black")
    }

    render() {
        return <div className='viewHolder' ref="temperatures"/>
    }
}