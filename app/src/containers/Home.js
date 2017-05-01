/**
 * Created by NB on 4/16/2017.
 */

import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import {
  PageHeader,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap';
import './Home.css';
import { invokeApiGateway } from '../libs/awsLib';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      entryList: [],
    };
  }

  async componentWillMount() {
    if (this.props.userToken === null) {
      return;
    }

    this.setState({ isLoading: true });

    try {
      const results = await this.entries();

      this.setState({ entryList: results });
    }
    catch(e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  entries() {
    const results =  invokeApiGateway({ path: '/entries'}, this.props.userToken);

    return results;
  }

  renderEntriesList(entries) {
    return [{}].concat(entries).map((entry, i) => (
      i !== 0
      ? (
          <ListGroupItem
            key={entry.entryId}
            href={`/entries/${entry.entryId}`}
            onClick={this.handleEntryClick}
            header={entry.content.trim().split('\n')[0]}
          >
            { "Created: " + (new Date(entry.createdAt)).toLocaleString()}
          </ListGroupItem>
        )
      : (
          <ListGroupItem
            key="new"
            href="/entries/new"
            onClick={this.handleEntryClick}
          >
            <h4><b>{'\uFF0B'}</b> Create a new entry</h4>
          </ListGroupItem>
        )
    ));
  }

  handleEntryClick = (event) => {
    event.preventDefault();

    this.props.history.push(event.currentTarget.getAttribute('href'));
  }

  renderLander() {
    return (
      <div className="lander">
        <h1>My Blog</h1>
        <p>A new blog of Son Luong Ngoc</p>
        <div>
          <Link to="/login" className="btn btn-success btn-lg">Login</Link>
          <Link to="/signup" className="btn btn-info btn-lg">Signup</Link>
        </div>
      </div>
    );
  }

  renderEntries() {
    return (
      <div>
        <PageHeader>Your Entries</PageHeader>
        <ListGroup>
          {
            ! this.state.isLoading
            && this.renderEntriesList(this.state.entryList)
          }
        </ListGroup>
      </div>
    );
  }

  render() {
    return (
      <div className="Home">
        {
          this.props.userToken === null
          ? this.renderLander()
          : this.renderEntries()
        }
      </div>
    )
  }
}

export default withRouter(Home);