import * as api from '../api';

const ACTIONS = {
  SET_REPOS: 'SET_REPOS',
  SET_SELECTED_REPO: 'SET_SELECTED_REPO',
  SET_SORT_DIRECTION: 'SET_SORT_DIRECTION',
  SET_SORT_OPTION: 'SET_SORT_OPTION',
  SET_TOKEN: 'SET_TOKEN',
  SET_USERNAME: 'SET_USERNAME',
  UPDATE_ISSUES: 'UPDATE_ISSUES',
};

export default ACTIONS;

export function sendAccessToken (token) {
  return dispatch => {
    dispatch(setToken(token));
    return api.genericGetUrl(`https://api.github.com/user?access_token=${token}`)
      .then(res => {
        dispatch(setUsername(res.login));
        return dispatch(getRepos(res.repos_url + `?access_token=${token}`));
      })
      .catch({});
  };
}

function setToken (token) {
  return dispatch => {
    sessionStorage.token = token;
    return dispatch({ data: token, type: ACTIONS.SET_TOKEN });
  };
}

function setUsername (username) {
  return dispatch => {
    sessionStorage.username = username;
    return dispatch({ data: username, type: ACTIONS.SET_USERNAME });
  };
}

function getRepos (url) {
  return dispatch => {
    return api.genericGetUrl(url)
      .then(repos => {
        return dispatch(setRepos(repos));
      })
      .catch({});
  };
}

function setRepos (repos) {
  return dispatch => {
    sessionStorage.repos = JSON.stringify(repos);
    return dispatch({ data: repos, type: ACTIONS.SET_REPOS });
  };
}

export function getIssues (id) {
  return (dispatch, getState) => {
    const selected = getState().repos.find(r => r.id === id);
    return api.genericGetUrl(`${selected.url}/issues?access_token=${getState().token}`)
      .then(issues => {
        return dispatch(updateIssues(issues));
      })
      .catch({});
  };
}

export function selectRepoGetIssues (id) {
  return (dispatch) => {
    dispatch(setSelectedRepo(id));
    return dispatch(getIssues(id));
  };
}

export function setSelectedRepo (id) {
  return dispatch => {
    sessionStorage.currentlySelectedRepo = id;
    return dispatch({ data: id, type: ACTIONS.SET_SELECTED_REPO });
  };
}

function updateIssues (issues) {
  return dispatch => {
    sessionStorage.issues = JSON.stringify(issues);
    return dispatch({ data: issues, type: ACTIONS.UPDATE_ISSUES });
  };
}

export function setSortOption (option) {
  return dispatch => {
    sessionStorage.sortOption = option;
    return dispatch({ data: option, type: ACTIONS.SET_SORT_OPTION });
  };
}
