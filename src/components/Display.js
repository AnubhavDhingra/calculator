import React from 'react';

const display = (props) => {
    return (
        <div>
            <input readOnly value={props.result || 0}/>
        </div>
    )
}

export default display;