import React from 'react';

export default class Repos extends React.Component {
  constructor (props) {
    super(props);
    this.handleRepoSelect = this.handleRepoSelect.bind(this);
  }

  handleRepoSelect (e) {
    const id = parseInt(e.target.id, 10);
    return this.props.selectRepoGetIssues(id);
  }

  render () {
    const { repos, currentlySelectedRepo } = this.props;
    return (
      <div className="repos">
        {repos.map(repo =>
          <div className={`repo repo--is_${repo.id === currentlySelectedRepo ? "selected" : "inactive"}`} key={repo.id}>
            <div className="repo__name a-tag" id={repo.id} onClick={this.handleRepoSelect}>{repo.name}</div>
          </div>
        )}
      </div>
    );
  }
}
