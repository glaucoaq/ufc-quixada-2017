import Actions from './actions';

const {
  FETCH_LIST_REQUEST,
  FETCH_LIST_SUCCESS,
  FETCH_LIST_FAILURE,
  EDITING_ITEM_CHANGE,
  EDITING_ITEM_CANCEL,
  EDITING_ITEM_SAVE_REQUEST,
  EDITING_ITEM_SAVE_SUCCESS,
  EDITING_ITEM_SAVE_FAILURE,
  EDITING_ITEM_DELETE_REQUEST,
  EDITING_ITEM_DELETE_SUCCESS,
  EDITING_ITEM_DELETE_FAILURE,
  CURRENT_ITEM_SELECT,
} = Actions;

const fetchList = () => (dispatch, getState) => {
  dispatch({ type: FETCH_LIST_REQUEST });

  fetch('http://localhost:8080/authors', {
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
    })
    .then(response => response.json())
    .then(({ _embedded }) => {
      const authors = _embedded.authors
        .map(a => ({ ...a, url: a._links.self.href }));
      dispatch({
        authors,
        type: FETCH_LIST_SUCCESS,
      });
    })
    .catch(() => dispatch({
      type: FETCH_LIST_FAILURE,
      error: 'Ocorreu um problema ao carregar os dados do servidor',
    }));
};

const changeEditingItem = item => ({
  item,
  type: EDITING_ITEM_CHANGE,
});

const cancelEditingItem = () => ({ type: EDITING_ITEM_CANCEL });

const saveEditingItemRequest = () => ({ type: EDITING_ITEM_SAVE_REQUEST });

const deleteEditingItemRequest = () => ({ type: EDITING_ITEM_DELETE_REQUEST });

const startEditing = item => ({
  item,
  type: CURRENT_ITEM_SELECT,
});

export {
  fetchList,
  startEditing,
};
