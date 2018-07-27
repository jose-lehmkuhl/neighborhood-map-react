import React from 'react';

export default ({onPress, list, selected}) => 
    <aside >
        {list.map(item => {
            const classes = item.id === selected ? "list-item selected" : "list-item";
            return <button className={classes} key={item.id} onClick={() => onPress(item.id)}>
                {item.name}
            </button>
        })}
    </aside>;
