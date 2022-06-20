import { CLIENT_SET, CLIENT_UNSET } from '../constants';

const initialState = {
  user: null,
};

const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLIENT_SET:
      return {
        ...state,
        user: action.token,
      };
    case CLIENT_UNSET:
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
};

export default clientReducer;
