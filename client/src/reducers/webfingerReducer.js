import {
  GET_WEB_FINGER
} from '../actions/actionTypes';

const initialState = {
  webFinger: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_WEB_FINGER:
      return {
        ...state,
        webFinger: action.payload
      };
    default:
      return state;
  }
}
