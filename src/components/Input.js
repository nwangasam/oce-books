import React from 'react';
import { ReactComponent as CaretIcon } from '../assets/icons/caret.svg';
import { CSSTransition } from 'react-transition-group';

const input = (props) => {
  let inputElement = null;

  inputElement = (
    
      <input
        onChange={props.onChange}
        type={props.type}
        {...props.elementConfig}
        value={props.value}
      />
  );

  if (props.type === 'select') {
      inputElement = (
          <div className="SelectBox">
            <CaretIcon />
            <select className={props.elementConfig.className} id={props.elementConfig.id} value={props.value} onChange={props.onChange}>
                {props.elementConfig.options.map((option, i) => (
                    <option value={option.value} key={option + i}>{option.displayValue}</option>
                ))}
            </select>
          </div>
      )
  }

  let label = (
    <label className='Label' htmlFor={props.elementConfig.id}>
      {props.label}
    </label>
  );

  return (
      <div className='Input'>
        {label}
        {inputElement}
      </div>
  );
};

export default input;
