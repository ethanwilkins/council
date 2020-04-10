import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getActorFollowers } from '../actions/actorActions';

export class ActorFollowersPage extends Component {

  state = {
    actorFollowers: null
  }

  componentDidMount = () => {
    const {
      getActorFollowers,
      match
    } = this.props;

    const name = match.params.name;

    return getActorFollowers(name)
      .then((res) => {
        this.setState({
          actorFollowers: JSON.stringify(res.payload)
        });
      })
      .catch((err) => {
        this.setState({
          actorFollowers: "Could not load actor followers."
        });
      });
  };

  render() {
    return this.state.actorFollowers
  }
}

ActorFollowersPage.propTypes = {
  getActorFollowers: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  actorFollowers: state.actorReducer
});

const mapDispatchToProps = dispatch => ({
  getActorFollowers: name => dispatch(getActorFollowers(name))
});

export default connect(mapStateToProps, mapDispatchToProps)(ActorFollowersPage);
