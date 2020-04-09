import React from 'react';
import './ToggleButton.css';

export const ToggleButton = (props) => (
    <div className="ToggleButton" 
        onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export const ToggleButtonCancel = (props) => (
    <div style={{ display: props.show ? 'block' : 'none' }} className="ToggleButtonCancel" 
    onClick={props.clicked}>&times;</div>
)
