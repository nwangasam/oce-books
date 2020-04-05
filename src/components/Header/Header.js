import React from 'react';
import './Header.css';

const header = (props) => (
    <header className="Header" style={{ textAlign: 'center' }}>
        <h1>{props.children || "OCE BOOKS"}</h1>
    </header>
);

export default header;