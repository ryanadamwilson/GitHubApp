import React from 'react';
import moment from 'moment';

import sortMap from '../util/sortMap';
import renderIf from '../util/renderIf';

export default class Repos extends React.Component {
  constructor (props) {
    super(props);
    this.handleSortChange = this.handleSortChange.bind(this);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  handleRefreshClick () {
    return this.props.getIssues(this.props.currentlySelectedRepo);
  }

  handleSortChange (e) {
    return this.props.setSortOption(e.target.value);
  }

  renderLastUpdated (updated_at) {
    let now = moment(new Date());
    let end = moment(updated_at);
    let diff = moment.duration(now.diff(end));
    let text;
    if (diff._data.days < 1) {
      text = 'hours';
      diff = diff.asHours();
    }
    else {
      text = 'days';
      diff = diff.asDays();
    }
    return (
      <div className="issue__updated"><span>Last Updated: </span><span>{Math.floor(diff)} {text} ago</span></div>
    );
  }

  renderIssues () {
    const { issues, repos, currentlySelectedRepo, sortOption } = this.props;
    const currentObj = repos.find(r => r.id === currentlySelectedRepo);
    const filter = currentObj.url;
    const filtered = issues.filter(i => i.repository_url === filter);
    return (
      <div className="issues-container">
        <div className="issues-title">
          <div className="section-title">Issues for {currentObj.name} repository</div>
          {renderIf(filtered.length, () =>
            <div className="issues-refresh" onClick={this.handleRefreshClick}>Refresh</div>
          )}
          {renderIf(filtered.length, () =>
            <div className="issues-sort">
              <select value={sortOption} onChange={this.handleSortChange}>
                <option name="created:asc" value="created:asc">Created: Oldest</option>
                <option name="created:desc" value="created:desc">Created: Newest</option>
                <option name="updated:asc" value="updated:asc">Updated: Oldest</option>
                <option name="updated:desc" value="updated:desc">Updated: Newest</option>
                <option name="comments:asc" value="comments:asc"># of Comments: Least</option>
                <option name="comments:desc" value="comments:desc"># of Comments: Most</option>
              </select>
            </div>
          )}
        </div>
        <div className="issues">
          {renderIf(filtered.length,
            () => filtered.sort((a, b) => sortMap(a, b, sortOption)).map(issue =>
              <div className="issue" key={issue.id}>
                <div className="issue__avatar"><img src={issue.user.avatar_url} /></div>
                <div className="issue__title">{issue.title}</div>
                <div className="issue__times">
                  <div className="issue__created"><span>Created: </span><span>{moment.utc(issue.created_at).format('L')}</span></div>
                  {this.renderLastUpdated(issue.updated_at)}
                </div>
              </div>
            ),
            () => <div className="no-issues-found">No issues were found for this repository</div>
          )}
        </div>
      </div>
    );
  }

  render () {
    if (this.props.repos.length && this.props.issues.length) return this.renderIssues();
    if (!this.props.currentlySelectedRepo) return <div className="repo-not-selected">Please select a repository to view associated issues</div>;
    return <div className="no-issues-found">No issues were found for this repository</div>;
  }
}
