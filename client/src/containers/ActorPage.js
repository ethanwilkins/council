import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getActor } from '../actions/actorActions';

export class ActorPage extends Component {

  state = {
    actor: null
  }

  componentDidMount = () => {
    const {
      getActor,
      match
    } = this.props;

    const name = match.params.name;

    return getActor(name)
      .then((res) => {
        this.setState({
          actor: JSON.stringify(res.payload)
        });
      })
      .catch((err) => {
        this.setState({
          actor: "Could not load actor."
        });
      });
  };

  render() {
    return this.state.actor
  }
}

ActorPage.propTypes = {
  getActor: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  actor: state.actorReducer
});

const mapDispatchToProps = dispatch => ({
  getActor: name => dispatch(getActor(name))
});

export default connect(mapStateToProps, mapDispatchToProps)(ActorPage);
