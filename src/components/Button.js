import React from 'react';

const Button = (props) => {
    return (
        <button 
            type={props.submit && 'submit'}
            className={props.className}
            disabled={props.disabled}
            onClick={props.clicked}>{props.children}</button>
    )
}

export default Button;