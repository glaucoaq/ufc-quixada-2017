import { connect } from 'react-redux';

import AuthorPage from '../components/AuthorPage';
import { startEditing } from '../actionCreators';

const mapStateToProps = ({
  authors,
  isFetching,
  message,
  currentItem,
  editingItem,
  isSaving,
}) => ({
  message,
  authors,
  editingItem,
  selectedId: currentItem.url,
  loading: isFetching || isSaving,
});

const mapDispatchToProps = dispatch => ({
  onEditItemClick: item => dispatch(startEditing(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthorPage);
