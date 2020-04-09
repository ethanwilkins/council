import {
  GET_ACTOR,
  GET_WEB_FINGER
} from '../actions/actionTypes';

const initialState = {
  actor: {},
  webFinger: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ACTOR:
      return {
        ...state,
        actor: action.payload
      };
      case GET_WEB_FINGER:
        return {
          ...state,
          webFinger: action.payload
        };
    default:
      return state;
  }
}
