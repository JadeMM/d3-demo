import React from 'react';
import './App.css';

import BarChart from './components/BarChart';
import TempDisplay from './components/TempDisplay';
import ThreeLittleCircles from './components/ThreeLittleCircles';
import Clock from './components/Clock';
import Map from './components/Map';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      view: 0
    }
  }

  showView = () => {
    switch(this.state.view) {
      case 1:
        return <TempDisplay/>
      case 2:
        return <BarChart/>
      case 3:
        return <ThreeLittleCircles/>
      case 4:
        return <Clock/>
      case 5:
        return <Map/>
      default:
        return <Clock/>
    }
  }

  render() {
    return (
      <div className='container'>
        <button onClick={() => this.setState({view: 1})}>Temperature Display</button>
        <button onClick={() => this.setState({view: 2})}>Bar Chart</button>
        <button onClick={() => this.setState({view: 3})}>Circles</button>
        <button onClick={() => this.setState({view: 4})}>Clock</button>
        <button onClick={() => this.setState({view: 5})}>Map</button>
        {this.showView()}
      </div>
    )
  }
  
}

export default App;
