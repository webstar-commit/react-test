import * as types from '../actions/action_types';

const initialState = {
  list: [],
  total: 0,
};

/**
 * Define reducer for list
 * @param {state} state The state of redux store
 * @param {action} action The action value from dispatch
 * @return {object} updated state
 */
export default function contacts(state, action) {
  if(typeof state === 'undefined') {
    state = initialState;
  }
  switch(action.type) {
    case types.SET_CONTACTS:
      return {
        list: action.payload[0],
        total: action.payload[2],
      };
    default:
      return state;
  }
}
