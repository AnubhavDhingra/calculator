import React from 'react';

const display = (props) => {
    return (
        <div>
            <input type="number" value={props.result} onKeyPress={props.keyPress} onChange={props.handleChange} onPaste={(e)=> e.preventDefault()}/>
        </div>
    )
}

export default display;