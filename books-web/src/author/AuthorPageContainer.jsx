import React from 'react';

import AuthorPage from './AuthorPage';

const blankItem = {
  firstName: '',
  lastName: '',
  email: '',
};

class AuthorPageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authors: [],
      selected: null,
      editingItem: blankItem,
      loading: true,
      message: '',
    };
    this.onEditingItemChange = this.onEditingItemChange.bind(this);
    this.onSaveEditing = this.onSaveEditing.bind(this);
    this.onCancelEditing = this.onCancelEditing.bind(this);
    this.onEditItemClick = this.onEditItemClick.bind(this);
    this.onDeleteItemClick = this.onDeleteItemClick.bind(this);
  }

  componentWillMount() {
    this.loadAuthors();
  }

  onEditingItemChange(editingItem) {
    this.setState({ editingItem });
  }

  onSaveEditing() {
    const editingItem = this.state.editingItem;
    this.setState({ message: 'Aguarde enquanto está salvando...' });

    const url = editingItem.url || 'http://localhost:8080/authors';
    const method = editingItem.url ? 'PUT' : 'POST';

    fetch(url, {
      method,
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify(editingItem),
    })
    .then(response => {
      if (response.ok) {
        this.setState({ message: 'Salvou com sucesso!' });
        this.loadAuthors();
      } else {
        this.setState({ message: 'Não é possível incluir!' })
      }
    })
  }

  onCancelEditing() {
    this.setState({
      editingItem: blankItem,
      message: 'Novo item',
    });
  }

  onEditItemClick(author) {
    this.setState({
      selected: author,
      editingItem: author,
    });
  }

  onDeleteItemClick(item) {
    fetch(item.url, { method: 'DELETE' })
    .then(response => {
      if (response.status === 204) {
        const authors = this.state.authors.filter(a => a.url !== item.url);
        this.setState({
          authors,
          message: `${item.lastName}, ${item.firstName} apagado com sucesso.`
        });
      } else {
        this.setState({ message: 'Não é possível apagar!' });
      }
    });
  }

  loadAuthors() {
    this.setState({ loading: true });
    fetch('http://localhost:8080/authors', {
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
    })
    .then(response => response.json())
    .then(({ _embedded }) => {
      const authors = _embedded.authors;
      this.setState({
        authors: authors.map(a => ({ ...a, url: a._links.self.href })),
        loading: false,
      });
    });
  }

  render() {
    const { authors, selected, loading, message, editingItem } = this.state;
    return (
      <AuthorPage
        authors={authors}
        loading={loading}
        message={message}
        editingItem={editingItem}
        selectedId={selected ? selected.url : null}
        onEditingItemChange={this.onEditingItemChange}
        onSaveEditing={this.onSaveEditing}
        onCancelEditing={this.onCancelEditing}
        onEditItemClick={this.onEditItemClick}
        onDeleteItemClick={this.onDeleteItemClick}
      />
    );
  }
}

export default AuthorPageContainer;
