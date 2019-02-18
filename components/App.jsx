import React from 'react';

import Repos from '../containers/Repos';
import Issues from '../containers/Issues';

import '../scss/main.scss';

export default class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = { value: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleTokenSubmission = this.handleTokenSubmission.bind(this);
  }

  handleChange (e) {
    this.setState({ value: e.target.value });
  }

  handleTokenSubmission (e) {
    e.preventDefault();
    this.props.sendAccessToken(this.state.value);
  }

  render () {
    if (this.props.repos.length) {
      return (
        <div id="GitHubApp">
          <Repos />
          <Issues />
        </div>
      );
    }
    return (
      <form id="GitHubApp" className="token" onSubmit={this.handleTokenSubmission}>
        <div className="form-label">Please provide your GitHub API token: </div>
        <input type="text" name="token" onChange={this.handleChange} value={this.state.value} />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
