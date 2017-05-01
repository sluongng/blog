/**
 * Created by NB on 5/1/2017.
 */

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  PageHeader,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap';
import './Github.css';
import { invokeGithubApi } from '../libs/externalWebservice';

class Github extends Component {
  constructor(props) {
    super(props);

    this.file = null;

    this.state = {
      isLoading: false,
      repositoriesList: [],
    };
  }

  async componentWillMount() {
    this.setState({ isLoading: true });

    try {
      const results = await this.repositories();

      console.log("DEBUG This is premount results: " + results);

      this.setState({ repositoriesList: results });
    }
    catch(e) {
      alert(e);
    }

    console.log("DEBUG This is list after mount: " + this.state.repositoriesList);

    this.setState({ isLoading: false });

  }

  repositories() {
    var results = invokeGithubApi({
      path: 'search/repositories',
      queries: {
        q: 'stars:>=600',
        sort: 'stars',
        order: 'desc',
      },
    }, this.props.userToken);

    return results;
  }

  handleRepoClick = (event) => {
    event.preventDefault();

    var win = window.open(event.currentTarget.getAttribute('href'));
    win.focus();
  }

  renderRepositoriesList(repositories) {
    return [{}].concat(repositories).map( (repo, i) => (
      i !== 0
      ? (
          <ListGroupItem
            key={repo.id}
            href={repo.html_url}
            onClick={this.handleRepoClick}
            header={repo.full_name}
          >
            { "Created by: " + repo.owner.login }
          </ListGroupItem>
        )
      : (
          <ListGroupItem
            key="null"
          >
            <h4><b>{'🤢'}</b>This shit was hard yo</h4>
          </ListGroupItem>
        )
    ));
  }

  renderRepositories() {
    return (
      <div>
        <PageHeader>Github Repositories</PageHeader>
        <ListGroup>
          {
            ! this.state.isLoading
            && this.renderRepositoriesList(this.state.repositoriesList)
          }
        </ListGroup>
      </div>
    );
  }

  render() {
    return (
      <div className="Github">
        {this.renderRepositories()}
      </div>
    )
  }

}

export default withRouter(Github);