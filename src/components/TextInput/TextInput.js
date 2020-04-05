import React from 'react';
import './TextInput.css';

const input = (props) => {
    return (
        <div className="TextInput">
            <label htmlFor="">{props.label}</label>
            <input 
                data-index={props.index}
                onKeyUp={props.getInput} 
                type="text" 
                placeholder={props.placeholder} 
                name={props.name} />
        </div>
    );
}

export default input;