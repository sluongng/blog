/**
 * Created by NB on 4/19/2017.
 */

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  FormGroup,
  FormControl,
  ControlLabel
} from 'react-bootstrap';
import LoaderButton from '../components/LoaderButton';
import config from '../config';
import './NewEntry.css'
import {
  invokeApiGateway,
  s3Upload
} from '../libs/awsLib';

class NewEntry extends Component {
  constructor(props) {
    super(props);

    this.file = null;

    this.state = {
      isLoading: null,
      content: ''
    };
  }

  validateForm() {
    return (this.state.content.length > 0) && (this.state.content.length < 256);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleFileChange = (event) => {
    this.file = event.target.files[0]
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const maxSize = config.MAX_ATTACHMENT_SIZE;

    if(this.file && this.file.size > maxSize) {
      alert('Please pick a file smaller than ' + (maxSize/1000000) + 'MB');
      return;
    }

    this.setState({ isLoading: true });

    try {
      const uploadFilename = (this.file)
        ? await s3Upload(this.file, this.props.userToken)
        : null;

      await this.createEntry({
        content: this.state.content,
        attachment: uploadFilename,
      });

      this.props.history.push('/');
    }
    catch(e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }

  createEntry(entry) {
    return invokeApiGateway({
      path: '/entries',
      method: 'POST',
      body: entry
    }, this.props.userToken);
  }

  render() {
    return (
      <div className="NewEntry">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="content">
            <FormControl
              onChange={this.handleChange}
              value={this.state.content}
              componentClass="textarea"
            />
          </FormGroup>

          <FormGroup controlId="file">
            <ControlLabel>Attachment</ControlLabel>
            <FormControl
              onChange={this.handleFileChange}
              type="file"
            />
          </FormGroup>

          <LoaderButton
            block
            bsStyle="primary"
            bsSize="large"
            disabled={ ! this.validateForm() }
            type="submit"
            isLoading={ this.state.isLoading }
            text="Create"
            loadingText="Creating..."
          />
        </form>
      </div>
    );
  }
}

export default withRouter(NewEntry);