import { render } from '@testing-library/react';
import React from 'react';

const Button = (props) => (
    <div className="calculator-buttons-flexitems">
        <button onClick={props.buttonClicked} value={props.value}>{props.value}</button>
    </div>
)

export default Button;