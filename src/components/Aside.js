import React from 'react';

export default ({onPress, list, filter, filtering}) =>
    <aside >
        <input className="filter-input" type="text" placeholder="Filter Restaurants" value={filtering} onChange={e => filter(e.target.value)}></input>
            {list.map(item => {
            if (item.name.toUpperCase().includes(filtering.toUpperCase())) {
                return <button tabIndex='0'id={item.id} className="list-item" key={item.id} onClick={() => onPress(item.id)}>
                    {item.name}
                </button>
            }
        })}
        <button className="list-item close-list-button" onClick={() => {onPress(); document.querySelector('.filter-button').focus()}}> Close 
        List</button>
    </aside>
;
