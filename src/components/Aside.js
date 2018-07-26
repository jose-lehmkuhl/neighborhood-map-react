import React from 'react';

export default ({onPress, list}) => 
    <aside >
        {list.map(item => {
            return <button className="list-item" key={item.id} onClick={() => onPress(item.id)}>
                {item.name}
            </button>
        })}
    </aside>;
