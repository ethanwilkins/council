import React, { Component } from 'react';
import queryString from 'query-string'
import axios from 'axios';

export class WebFinger extends Component {

  callWebFinger = async () => {
    const resource = queryString.parse(this.props.location.search)['resource'];
    const response = await axios.get('/.well-known/webfinger', { params: { resource: resource } });
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
          .catch(err => { console.log(err) });
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

export default WebFinger;
