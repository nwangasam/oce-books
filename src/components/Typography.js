import React from 'react';

const typography = (props) => {
    let type = null;

    switch (props.type) {
        case ('h1'):
            type = <h1 {...props.config}>{props.children}</h1>;
            break;
        case ('p'): 
            type = <p {...props.config}>{props.children}</p>;
            break;
        case ('h2'):
            type = <h2 {...props.config}>{props.children}</h2>;
            break;
        case ('h3'):
            type = <h3 {...props.config}>{props.children}</h3>;
            break;
        default:
            type = <p {...props.config}>{props.children}</p>
    }
    return type;
}

export default typography;