import {
  SELECT_USER_TYPE,
  SIGNUP_FORM_SUBMIT,
  SIGNUP_FORM_SUBMIT_SUCCESS,
  SIGNUP_FORM_SUBMIT_FAILED,
  SIGNUP_FORM_SUBMIT_USER_EXIST_ERROR,
  CLOSE_SIGNUP_SNACKBAR,
  POPULATE_SIGNUP_FORM,
} from '../constants';

const intialState = {
  userType: null,
  showSnackbar: false,
  showFailSnackbar: false,
  showSpinner: false,
  errorMessage: '',
  applicantData: {},
};

const signUpReducer = (state = intialState, action) => {
  switch (action.type) {
    case SELECT_USER_TYPE:
      return {
        ...state,
        userType: action.userType,
      };

    case SIGNUP_FORM_SUBMIT:
      return {
        ...state,
        showSpinner: true,
      };
    case SIGNUP_FORM_SUBMIT_SUCCESS:
      return {
        ...state,
        showSpinner: false,
        showSnackbar: true,
        applicantData: {},
      };
    case SIGNUP_FORM_SUBMIT_FAILED:
      return {
        ...state,
        showSpinner: false,
        showFailSnackbar: true,
      };
    case SIGNUP_FORM_SUBMIT_USER_EXIST_ERROR:
      return {
        ...state,
        showSpinner: false,
        showFailSnackbar: true,
        errorMessage: action.error,
      };
    case CLOSE_SIGNUP_SNACKBAR:
      return {
        ...state,
        showSnackbar: false,
        showFailSnackbar: false,
      };

    case POPULATE_SIGNUP_FORM:
      return {
        ...state,
        applicantData: action.applicantData,
        userType: 'applicant',
      };

    default:
      return state;
  }
};

export default signUpReducer;
