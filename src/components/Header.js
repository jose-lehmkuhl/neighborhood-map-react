import React from 'react';

export default ({onPress}) => 
    <header >
        <button onClick={onPress}><i className="fas fa-bars"></i></button>
        <h1>Neighborhood Map</h1>
    </header>;
