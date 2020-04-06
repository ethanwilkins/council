import axios from 'axios';
import {
  GET_WEB_FINGER
} from './actionTypes';

export const getWebFinger = resource => async (dispatch) => {
  const result = await axios.get(`/.well-known/webfinger?resource=${resource}`);
  return dispatch({
    type: GET_WEB_FINGER,
    payload: result.data
  });
};
