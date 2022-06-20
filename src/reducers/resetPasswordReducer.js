import {
  RESET_PASSWORD_SUBMIT_SUCCESS,
  RESET_PASSWORD_SUBMIT_FAILED,
  CLOSE_SNACKBAR,
  // HIDE_RESET_PASSWORD_SNACKBAR
} from '../constants';

const initialState = {
  showSuccessSnackbar: false,
  showFailedSnackbar: false,
};

const resetPassword = (state = initialState, action) => {
  switch (action.type) {
    case RESET_PASSWORD_SUBMIT_SUCCESS:
      return {
        ...state,
        showSuccessSnackbar: true,
      };

    case RESET_PASSWORD_SUBMIT_FAILED:
      return {
        ...state,
        showFailedSnackbar: true,
      };

    case CLOSE_SNACKBAR:
      return {
        ...state,
        showFailedSnackbar: false,
        showSuccessSnackbar: false,
      };

    default:
      return state;
  }
};

export default resetPassword;
