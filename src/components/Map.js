import React from 'react';
import BlankMap from './Blank_US_Map_(states_only)';

export default class Map extends React.Component {

    render(){
        return <div className='viewHolder'><BlankMap/></div>
    }
}