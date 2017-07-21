import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';

import logo from './logo.svg';
import './App.css';

import authorReducer from './author/reducer';
import { fetchList } from './author/actionCreators';
import AuthorPageContainer from './author/containers/AuthorPage';

const store = createStore(
  authorReducer,
  undefined,
  applyMiddleware(thunkMiddleware, logger),
);

class App extends Component {
  componentDidMount() {
    const initialAction = fetchList();
    store.dispatch(initialAction);
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </div>
          <AuthorPageContainer />
        </div>
      </Provider>
    );
  }
}

export default App;
