import React from 'react';
import { ReactComponent as CaretIcon } from '../assets/icons/caret.svg';

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
            <select className="Select" value={props.value}>
                {props.elementConfig.options.map(option => (
                    <option value={option.value}>{option.displayValue}</option>
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
