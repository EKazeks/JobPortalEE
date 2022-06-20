import { PROCESS_ONLINE_PAYMENT, DISPLAY_PAYMENT_STATUS_MESSAGE } from '../constants';

const initialState = {
  isLoading: false,
  responseText: '',
};

export default function payment(state = initialState, action) {
  switch (action.type) {
    case PROCESS_ONLINE_PAYMENT:
      return {
        ...state,
        isLoading: true,
      };
    case DISPLAY_PAYMENT_STATUS_MESSAGE:
      return {
        ...state,
        responseText: action.responseText,
        isLoading: false,
      };
    default:
      return state;
  }
}
