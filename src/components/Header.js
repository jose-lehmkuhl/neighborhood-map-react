import React from 'react';

export default ({onPress}) => 
    <header >
        <h1 tabIndex="0">Neighborhood Map</h1>
        <div className="send-right">
        <span className="filter-text">Filter Markers</span>
        <button className="filter-button" aria-label="Filter Markers" onClick={onPress}><i className="fas fa-bars"></i></button>
        </div>
    </header>;
