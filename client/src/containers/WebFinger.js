import React, { Component } from 'react';
import queryString from 'query-string'
import axios from 'axios';

export class WebFinger extends Component {

  callWebFinger = async () => {
    console.log("Got here 1");
    const resource = queryString.parse(this.props.location.search)['resource'];
    console.log("Got here 2");
    const response = await axios.get('/.well-known/webfinger', { params: { resource: resource } });
    console.log("Got here 3");
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
          console.log("Got here 4");
      }
  };

  render() {
    return (
      <div>
        { this.state.data ?  this.state.data : "Loading..."}
      </div>
    );
  }
}

export default WebFinger;
