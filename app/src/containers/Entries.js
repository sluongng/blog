/**
 * Created by NB on 4/21/2017.
 */

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  FormGroup,
  FormControl,
  ControlLabel,
} from 'react-bootstrap'

import LoaderButton from '../components/LoaderButton';
import config from '../config';
import { invokeApiGateway, s3Upload } from '../libs/awsLib';

import './Entries.css';

class Entries extends Component {
  constructor(props) {
    super(props);

    this.file = null;

    this.state = {
      isLoading: null,
      isDeleting: null,
      entry: null,
      content: '',
    };
  }

  async componentWillMount() {
    try {
      const results = await this.getEntry();

      this.setState({
        entry: results,
        content: results.content,
      });
    }
    catch(e) {
      alert(e);
    }
  }

  getEntry() {
    return invokeApiGateway({ path: `/entries/${this.props.match.params.id}` }, this.props.userToken)
  }

  validateForm() {
    return this.state.content.length > 0;
  }

  formatFilename(str) {
    return (str.length < 50)
      ? str
      : str.substr(0, 20) + '...' + str.substr(str.length - 20, str.length);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleFileChange = (event) => {
    this.file = event.target.files[0]
  }

  saveEntry(entry) {
    return invokeApiGateway({
      path: `/entries/${this.props.match.params.id}`,
      method: 'PUT',
      body: entry,
    }, this.props.userToken);
  }

  handleSubmit = async (event) => {
    let uploadedFilename;

    event.preventDefault();

    const maxSize = config.MAX_ATTACHMENT_SIZE;

    if (this.file && this.file.size > maxSize) {
      alert('Please pick a file smaller than ' + (maxSize/1000000) + 'MB');
      return;
    }

    this.setState({ isLoading: true });

    try {
      if(this.file) {
        uploadedFilename = await s3Upload(this.file, this.props.userToken);
      }

      await this.saveEntry({
        ...this.state.entry,
        content: this.state.content,
        attachment: uploadedFilename || this.state.entry.attachment,
      });

      this.props.history.push('/');
    }
    catch(e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }

  deleteEntry() {
    return invokeApiGateway({
      path: `/entries/${this.props.match.params.id}`,
      method: 'DELETE',
    }, this.props.userToken);
  }

  handleDelete = async (event) => {
    event.preventDefault();

    const confirmed = confirm('Are you sure you want to delete this entry?');

    if (! confirmed ) {
      return;
    }

    this.setState({ isDeleting: true });

    try {
      await this.deleteEntry();
      this.props.history.push('/');
    }
    catch(e) {
      alert(e);
      this.setState({ isDeleting: false });
    }
  }

  render() {
    return (
      <div className="Entries">
        {
          this.state.entry &&
          (<form onSubmit={this.handleSubmit}>
            <FormGroup controlId="content">
              <FormControl
                onChange={this.handleChange}
                value={this.state.content}
                componentClass="textarea"
              />
            </FormGroup>
            {
              this.state.entry.attachment &&
              (<FormGroup>
                <ControlLabel>Attachment</ControlLabel>
                <FormControl.Static>
                  <a target="_blank" href={ this.state.entry.attachment }>
                    { this.formatFilename(this.state.entry.attachment) }
                  </a>
                </FormControl.Static>
              </FormGroup>)
            }
            <FormGroup controlId="file">
              { ! this.state.entry.attachment && <ControlLabel>Attachment</ControlLabel>}
              <FormControl onChange={this.handleFileChange} type="file" />
            </FormGroup>
            <LoaderButton
              block
              bsStyle="primary"
              bsSize="large"
              disabled={ ! this.validateForm() }
              type="submit"
              isLoading={ this.state.isLoading }
              text="Save"
              loadingText="Saving..."
            />
            <LoaderButton
              block
              bsStyle="danger"
              bsSize="large"
              isLoading={ this.state.isDeleting }
              onClick={ this.handleDelete }
              text="Delete"
              loadingText="Deleting..."
            />
          </form>)
        }
      </div>
    );
  }
}

export default withRouter(Entries);