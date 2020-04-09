import React from 'react'

import './BackDrop.css';

const backDrop = (props) => {
    return <div className={props.show ? "BackDrop" : null} onClick={props.clicked}></div>
}

export default backDrop
