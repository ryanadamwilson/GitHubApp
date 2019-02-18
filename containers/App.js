import { connect } from 'react-redux';

import App from '../components/App';

import { sendAccessToken } from '../store/actions.js';

function mapStateToProps (state) {
  return {
    repos: state.repos,
    token: state.token,
  };
}

function mapDispatchToProps (dispatch) {
  return {
    sendAccessToken: (token) => dispatch(sendAccessToken(token)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
