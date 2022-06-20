import {
  SHOW_SUCCESS_SNACKBAR,
  SHOW_FAILED_SNACKBAR,
  CLOSE_SNACKBAR,
  SHOW_DIALOG,
  SEND_APPLICATION,
  SEND_APPLICATION_SUCCESS,
  CLOSE_DIALOG,
  ADMIN_UPDATE_USER_PROFILE,
  ADMIN_UPDATE_USER_PROFILE_SUCCESS,
  ADMIN_UPDATE_USER_PROFILE_FAIL,
  SHOW_CUSTOM_ERROR_MESSAGE,
  UPDATE_JOB_APPLICATION_DETAILS,
  CHOOSE_CAMPAIGN,
  RESET_APPLICATION_SENT,
  CHOOSE_PAYMENT_METHOD,
  // HIDE_RESET_PASSWORD_SNACKBAR
} from '../constants';

const initialState = {
  showSuccessSnackbar: false,
  showFailedSnackbar: false,
  showSpinner: false,
  showThankyouDialog: false,
  showDialog: false,
  showMktDialog: false,
  showPaymentDialog: false,
  applicantSent: false,
  showCustomError: false,
  errorMsg: '',
  isToSendEmail: false,
};

const asyncActionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_SUCCESS_SNACKBAR:
      return {
        ...state,
        showSuccessSnackbar: true,
        showSpinner: false,
      };

    case SHOW_FAILED_SNACKBAR:
      return {
        ...state,
        showFailedSnackbar: true,
        showSpinner: false,
        showDialog: false,
      };

    case SHOW_CUSTOM_ERROR_MESSAGE:
      return {
        ...state,
        showFailedSnackbar: true,
        showCustomError: true,
        errorMsg: action.msg,
      };
    case SHOW_DIALOG:
      return {
        ...state,
        showDialog: true,
      };

    case CLOSE_DIALOG:
      return {
        ...state,
        showDialog: false,
        showThankyouDialog: false,
        //applicantSent: false,
        showMktDialog: false,
        showPaymentDialog: false,
      };

    case RESET_APPLICATION_SENT:
      return {
        ...state,
        applicantSent: false,
      };

    case CLOSE_SNACKBAR:
      return {
        ...state,
        showFailedSnackbar: false,
        showSuccessSnackbar: false,
        showThankyouDialog: false,
        showDialog: false,
        errorMsg: '',
        showCustomError: false,
        //isToSendEmail: false
      };

    case UPDATE_JOB_APPLICATION_DETAILS:
      return {
        ...state,
        showSpinner: true,
        isToSendEmail: action.update === 'interview' ? true : false,
      };

    case SEND_APPLICATION:
      return {
        ...state,
        showSpinner: true,
      };
    case SEND_APPLICATION_SUCCESS:
      return {
        ...state,
        showSpinner: false,
        showThankyouDialog: true,
        applicantSent: true,
      };

    case ADMIN_UPDATE_USER_PROFILE:
      return {
        ...state,
        showSpinner: true,
      };

    case ADMIN_UPDATE_USER_PROFILE_SUCCESS:
      return {
        ...state,
        showSpinner: false,
      };

    case ADMIN_UPDATE_USER_PROFILE_FAIL:
      return {
        ...state,
        showSpinner: false,
      };

    case CHOOSE_CAMPAIGN:
      if (action.campaign.includes_mktbudget)
        return {
          ...state,
          showMktDialog: true,
        };
      else {
        return {
          ...state,
        };
      }

    case CHOOSE_PAYMENT_METHOD:
      return {
        ...state,
        showPaymentDialog: true,
      };

    default:
      return state;
  }
};

export default asyncActionsReducer;
