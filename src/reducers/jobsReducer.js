import {
  FILTER_JOBS,
  FETCH_JOB_BY_ID,
  FILTER_JOBS_SUCCESS,
  GET_JOB_DETAILS_BY_ID,
  GET_JOB_DETAILS_BY_ID_SUCCESS,
  RETRIEVE_DOCUMENT_INFO,
  TOGGLE_FAVORITE_JOBS,
  GET_APPLIED_JOBS_SUCCESS,
  GET_FAVORITE_JOBS_SUCCESS,
  SEND_APPLICATION_SUCCESS,
  GET_APPLICANT_DASHBOARD_INFO_SUCCESS,
  TOGGLE_EMAIL_NOTIFICATION,
  GET_WORK_START_SUCCESS,
} from "../constants";

const initialState = {
  jobsList: [],
  id: 0,
  jobPostNumber:[],
  jobDetails: [],
  selectedPage: {
    selected: 0,
  },
  showSpinner: false,
  uploadedDocument: [],
  favoriteJobs: [],
  appliedJobs: [],
  dashboard: [],
  notificationToggleBtn: false,
  workStart: null,
};

const jobsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_JOB_BY_ID:
      return {
        ...state,
        jobPostNumber: action.id,
      };

    case FILTER_JOBS:
      return {
        ...state,
        jobsList: [],
        showSpinner: true,
      };

    case FILTER_JOBS_SUCCESS:
      return {
        ...state,
        jobsList: action.result,
        id: 0,
        jobDetails: [],
        showSpinner: false,
      };
    case GET_JOB_DETAILS_BY_ID:
      return {
        ...state,
        id: action.id,
        showSpinner: true,
      };
    case GET_JOB_DETAILS_BY_ID_SUCCESS:
      return {
        ...state,
        jobDetails: action.result,
        uploadedDocument: [],
        showSpinner: false,
      };
    case GET_WORK_START_SUCCESS:
      return {
        ...state,
        workStart: action.result.tyoAlkaaTekstiYhdistetty,
      };
    case RETRIEVE_DOCUMENT_INFO:
      return {
        ...state,
        uploadedDocument: [
          {
            ...action.document,
          },
        ],
      };
    case TOGGLE_FAVORITE_JOBS:
      return {
        ...state,
      };
    case GET_APPLIED_JOBS_SUCCESS:
      return {
        ...state,
        appliedJobs: action.response,
        jobDetails: [],
      };
    case GET_FAVORITE_JOBS_SUCCESS:
      return {
        ...state,
        favoriteJobs: action.response,
        //jobDetails: []
      };
    case SEND_APPLICATION_SUCCESS:
      return {
        ...state,
        uploadedDocument: [],
      };
    case GET_APPLICANT_DASHBOARD_INFO_SUCCESS:
      return {
        ...state,
        dashboard: action.response,
        notificationToggleBtn: action.response[0].email_notice_active,
      };
    case TOGGLE_EMAIL_NOTIFICATION:
      return {
        ...state,
        notificationToggleBtn: !state.notificationToggleBtn,
      };

    default:
      return state;
  }
};

export default jobsReducer;
