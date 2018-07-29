import React from 'react';

export default ({onPress, list, selected}) => 
    <aside >
        {list.map(item => {
            const classes = item.id === selected ? "list-item selected" : "list-item";
            return <button tabIndex='0'id={item.id} className={classes} key={item.id} onClick={() => onPress(item.id)}>
                {item.name}
            </button>
        })}
        <button className="list-item close-list-button" onClick={() => {onPress(); document.querySelector('.filter-button').focus()}}> Close 
        List</button>
    </aside>;
