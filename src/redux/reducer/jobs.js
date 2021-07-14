import types from '../actions/types';

export default (state = {}, action) => {
  if (action.type === types.SET_JOBS) {
    return action.payload;
  }
  return state;
};
