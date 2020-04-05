import React from 'react';
import './Button.css';

const button = (props) => (
    <button onClick={props.clicked} className="Button" disabled={!props.send}>
        { props.hasLink ? 
            <a href={props.link()}>{props.children}</a> : props.children }
    </button>
)

export default button;