import React from 'react';
import PropTypes from 'prop-types';

import './TextBox.css';

const propTypes = {
  caption: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  value: PropTypes.any,
  onChange: PropTypes.func,
};

const defaultProps = {
  size: 'medium',
  onChange: Function.prototype,
};

function TextBox(props) {
  /** @param e {Event} */
  const handleChange = e => {
    e.preventDefault();
    e.stopPropagation();
    const value = e.target.value;
    props.onChange(value, props.name);
  };
  return (
    <div
      className={`form-field text-box field-${props.size}`}
    >
      <label>{props.caption}</label>
      <input
        type="text"
        value={props.value}
        onChange={handleChange}
      />
    </div>
  );
}

TextBox.propTypes = propTypes;
TextBox.defaultProps = defaultProps;

export default TextBox;
