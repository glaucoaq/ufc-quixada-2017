import React from 'react';
import PropTypes from 'prop-types';

import { Label, LinkButton } from '../components'

const propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
  }),
  onEditClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
};

const defaultProps = {
  item: {},
  onEditClick: Function.prototype,
  onDeleteClick: Function.prototype,
};

function AuthorListItem({ item, onEditClick, onDeleteClick }) {
  return (
    <div>
      <div>
        <Label type="title">
          {item.lastName}, {item.firstName}
        </Label>
        <Label color="#abc">{item.email}</Label>
      </div>
      <div className="author-actions">
        <LinkButton caption="Editar" onClick={() => onEditClick(item)} />
        <LinkButton caption="Excluir" onClick={() => onDeleteClick(item)} />
      </div>
    </div>
  );
}

AuthorListItem.propTypes = propTypes;
AuthorListItem.defaultProps = defaultProps;

export default AuthorListItem;
