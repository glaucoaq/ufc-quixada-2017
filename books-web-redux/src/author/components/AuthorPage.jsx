import React from 'react';
import PropTypes from 'prop-types';

import { List, Label, Form, TextBox, Button } from '../../components';
import AuthorListItem from './AuthorListItem';

import './AuthorPage.css';

const authorShape = PropTypes.shape({
  id: PropTypes.number,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
});

const propTypes = {
  authors: PropTypes.arrayOf(authorShape),
  selectedId: PropTypes.string,
  editingItem: authorShape,
  loading: PropTypes.bool,
  message: PropTypes.string,
  onEditingItemChange: PropTypes.func,
  onSaveEditing: PropTypes.func,
  onCancelEditing: PropTypes.func,
  onEditItemClick: PropTypes.func,
  onDeleteItemClick: PropTypes.func,
};

const defaultProps = {
  authors: [],
  selectedId: null,
  editingItem: {
    firstName: '',
    lastName: '',
    email: '',
  },
  loading: false,
  message: '',
  onEditingItemChange: Function.prototype,
  onSaveEditing: Function.prototype,
  onCancelEditing: Function.prototype,
  onEditItemClick: Function.prototype,
  onDeleteItemClick: Function.prototype,
};

function AuthorPage(props) {
  const handleEditingFieldChange = (value, field) => {
    const changed = {
      ...props.editingItem,
      [field]: value,
    };
    props.onEditingItemChange(changed);
  };

  return (
    <div className="author">
      <Form>
        <TextBox
          caption="Nome"
          name="firstName"
          value={props.editingItem.firstName}
          onChange={handleEditingFieldChange}
        />
        <TextBox
          caption="Sobrenome"
          name="lastName"
          value={props.editingItem.lastName}
          onChange={handleEditingFieldChange}
        />
        <TextBox
          caption="E-mail"
          name="email"
          value={props.editingItem.email}
          onChange={handleEditingFieldChange}
        />
        <div className="form-actions">
          <Button.Save onClick={props.onSaveEditing} />
          <Button.Cancel onClick={props.onCancelEditing} />
        </div>
      </Form>
      <List
        items={props.authors}
        keyProp="url"
        selectedKey={props.selectedId}
        loading={props.loading}
      >
        <AuthorListItem
          onEditClick={props.onEditItemClick}
          onDeleteClick={props.onDeleteItemClick}
        />
      </List>
      <Label>
        {props.message}
      </Label>
    </div>
  );
}

AuthorPage.propTypes = propTypes;
AuthorPage.defaultProps = defaultProps;

export default AuthorPage;
