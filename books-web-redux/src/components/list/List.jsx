import React from 'react';
import PropTypes from 'prop-types';

import './List.css';

const propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  keyProp: PropTypes.string.isRequired,
  selectedKey: PropTypes.any,
  loading: PropTypes.bool,
};

const defaultProps = {
  items: [],
  loading: false,
};

/**
 * <List items={...} keyProp="..." selectedKey="...">
 *  <MyListItemTemplate />
 * </List>
 * @param props {{items: [], keyProp: string, selectedKey: string}}
 */
function List(props) {
  if (props.loading) {
    return (
      <span className="list-message">Aguarde enquanto os itens são carregados...</span>
    );
  }

  if (!props.items || props.items.length === 0) {
    return (
      <span className="list-message">Nenhum item foi encontrado</span>
    );
  }

  const template = React.Children.only(props.children);
  return (
    <ul className="list">
      {props.items.map(item => (
        <li
          key={item[props.keyProp]}
          className={props.selectedKey === item[props.keyProp] ? 'list-item-selected' : ''}
        >
          {React.cloneElement(template, { item })}
        </li>
      ))}
    </ul>
  );
}

List.propTypes = propTypes;
List.defaultProps = defaultProps;

export default List;
