import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import queryString from 'query-string'

export class WebFinger extends Component {

  callWebFinger = async () => {
    const resource = queryString.parse(this.props.location.search)['resource'];
    console.log("Got here 1");
    const response = await axios.get('/.well-known/webfinger', { params: { resource: resource } });
    console.log("Got here 2");
    return await JSON.stringify(response.data);
  };

  constructor(props) {
    super(props)
    this.state = {
      data: null
    }
  }

  componentDidMount = () => {
    this.callWebFinger()
      if (!this.state.data) {
        this.callWebFinger().then(data => this.setState({data}))
          .catch(err => { console.log("Could not load WebFinger.") });
      }
  };

  render() {
    return (
      <div>
        { this.state.data ?  this.state.data : null}
      </div>
    );
  }
}

WebFinger.propTypes = {
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.authReducer
});

export default connect(mapStateToProps)(WebFinger);
