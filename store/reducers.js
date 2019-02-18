import { combineReducers } from 'redux';

import { set, addToArray } from '../util/reducerGenerators';

import ACTIONS from './actions';

export default combineReducers({
  currentlySelectedRepo: set(ACTIONS.SET_SELECTED_REPO, parseInt(sessionStorage.currentlySelectedRepo, 10) || null),
  issues: addToArray(ACTIONS.UPDATE_ISSUES, sessionStorage.issues && JSON.parse(sessionStorage.issues) || []),
  repos: set(ACTIONS.SET_REPOS, sessionStorage.repos && JSON.parse(sessionStorage.repos) || []),
  sortOption: set(ACTIONS.SET_SORT_OPTION, sessionStorage.sortOption || "created:desc"),
  token: set(ACTIONS.SET_TOKEN, sessionStorage.token || ""),
  username: set(ACTIONS.SET_USERNAME, sessionStorage.username || ""),
});
