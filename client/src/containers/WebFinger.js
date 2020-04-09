import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import queryString from 'query-string'

import { getWebFinger } from '../actions/actorActions';

export class WebFinger extends Component {

  state = {
    webFinger: null
  }

  componentDidMount = () => {
    const {
      getWebFinger
    } = this.props;

    const resource = queryString.parse(this.props.location.search)['resource'];

    return getWebFinger(resource)
      .then((res) => {
        this.setState({
          webFinger: JSON.stringify(res.payload)
        });
      })
      .catch((err) => {
        this.setState({
          webFinger: "Could not load WebFinger."
        });
      });
  };

  render() {
    return this.state.webFinger
  }
}

WebFinger.propTypes = {
  getWebFinger: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  webFinger: state.actorReducer
});

const mapDispatchToProps = dispatch => ({
  getWebFinger: resource => dispatch(getWebFinger(resource))
});

export default connect(mapStateToProps, mapDispatchToProps)(WebFinger);
