import { connect } from 'react-redux';

import Issues from '../components/Issues';

import { setSortOption, getIssues } from '../store/actions.js';

function mapStateToProps (state) {
  return {
    currentlySelectedRepo: state.currentlySelectedRepo,
    issues: state.issues,
    repos: state.repos,
    sortOption: state.sortOption,
  };
}

function mapDispatchToProps (dispatch) {
  return {
    setSortOption: (val) => dispatch(setSortOption(val)),
    getIssues: (id) => dispatch(getIssues(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Issues);
