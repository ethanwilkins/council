import axios from 'axios';
import {
  GET_ACTOR,
  GET_WEB_FINGER
} from './actionTypes';

export const getActor = name => async (dispatch) => {
  const result = await axios.get(`/actors/${name}`);
  return dispatch({
    type: GET_ACTOR,
    payload: result.data
  });
};

export const getWebFinger = resource => async (dispatch) => {
  const result = await axios.get(`/actors/webfinger/${resource}`);
  return dispatch({
    type: GET_WEB_FINGER,
    payload: result.data
  });
};
