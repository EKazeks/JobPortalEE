import { SIGNIN_FORM_SUBMIT, SIGNIN_FORM_SUBMIT_SUCCESS, SIGNIN_FORM_SUBMIT_FAILED, CLOSE_SIGNIN_SNACKBAR } from '../constants';

const initialState = {
  showSpinner: false,
  showFailedSnackbar: false,
  errorMessage: '',
};
const signInReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN_FORM_SUBMIT:
      return {
        ...state,
        showSpinner: true,
      };
    case SIGNIN_FORM_SUBMIT_SUCCESS:
      return {
        ...state,
        showSpinner: false,
      };
    case SIGNIN_FORM_SUBMIT_FAILED:
      return {
        ...state,
        showSpinner: false,
        showFailedSnackbar: true,
        errorMessage: action.error,
      };
    case CLOSE_SIGNIN_SNACKBAR:
      return {
        ...state,
        showFailedSnackbar: false,
      };

    default:
      return state;
  }
};

export default signInReducer;
