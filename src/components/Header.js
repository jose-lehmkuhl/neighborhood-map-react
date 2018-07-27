import React from 'react';

export default ({onPress}) => 
    <header >
        <h1>Neighborhood Map</h1>
        <div class="send-right">
        <span className="filter-text">Filter Markers</span>
        <button onClick={onPress}><i className="fas fa-bars"></i></button>
        </div>
    </header>;
