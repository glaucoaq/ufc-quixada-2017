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

const reducer = (state = {
  authors: [],
  isFetching: false,
  message: '',
  currentItem: {},
  editingItem: {
    firstName: '',
    lastName: '',
    email: '',
  },
  isSaving: false,
}, action) => {
  switch (action.type) {
    case FETCH_LIST_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_LIST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        authors: action.authors,
        message: '',
      };
    case FETCH_LIST_FAILURE:
      return {
        ...state,
        message: action.error,
        isFetching: false,
        authors: [],
      }
    case CURRENT_ITEM_SELECT:
      return {
        ...state,
        currentItem: action.item,
        editingItem: action.item,
      };
    default:
      return state;
  }
};

export default reducer;
