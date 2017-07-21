import React from 'react';
import PropTypes from 'prop-types';

import './Button.css';

const propTypes = {
  caption: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['info', 'danger', 'success']),
  onClick: PropTypes.func,
};

const defaultProps = {
  type: 'info',
  onClick: Function.prototype,
};

function Button(props) {
  const buttonClass = `button button-${props.type}`;

  /** @param e {Event} */
  const handleClick = e => {
    e.preventDefault();
    e.stopPropagation();
    props.onClick();
  };

  return (
    <button
      className={buttonClass}
      onClick={handleClick}
    >
      {props.caption}
    </button>
  );
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

Button.Save = props => (
  <Button
    {...props}
    caption="Salvar"
    type="success"
  />
);

Button.Cancel = props => (
  <Button
    {...props}
    caption="Cancelar"
    type="info"
  />
);

Button.Ok = props => (
  <Button
    {...props}
    caption="Ok"
    type="success"
  />
);

export default Button;
