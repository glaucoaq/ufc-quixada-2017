import React from 'react';

import './Form.css';

function Form({ children }) {
  /** @param e {Event} */
  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <form
      onSubmit={handleSubmit}
    >
      {children}
    </form>
  );
}

export default Form;
