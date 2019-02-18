import { connect } from 'react-redux';

import Repos from '../components/Repos';

import { selectRepoGetIssues, setSelectedRepo } from '../store/actions.js';

function mapStateToProps (state) {
  return {
    currentlySelectedRepo: state.currentlySelectedRepo,
    repos: state.repos,
    issues: state.issues,
  };
}

function mapDispatchToProps (dispatch) {
  return {
    selectRepo: (repoId) => dispatch(setSelectedRepo(repoId)),
    selectRepoGetIssues: (repoId) => dispatch(selectRepoGetIssues(repoId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Repos);
