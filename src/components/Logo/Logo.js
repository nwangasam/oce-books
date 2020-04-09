import React from 'react';

import './Logo.css';

const logo = (props) => {
    return (
        <div className="Logo">
            <a href="/" style={{ color: props.color }}><h1>OCE BOOKS</h1></a>
        </div>
    )
}

export default logo
