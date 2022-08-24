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
  SAVE_AND_PUBLISH_ADVERTISEMENT_TO_EE,
  SAVE_AND_PUBLISH_ADVERTISEMENT_TO_EE_SUCCESS,
  EDIT_OFFER,
  WARN_TO_DELETE,
  DELETE_JOB_OFFER,
  GET_JOB_APPLICANTS,
  FETCH_JOB_NAME_BY_ID,
  FETCH_JOB_INFO,
  SET_ID_TO_APPLY,
  DELETE_SUCCESS,
} from "../constants";

const initialState = {
  jobsList: [],
  apiSuccess: false,
  apiFailed: false,
  isToEdit: false,
  id: 0,
  idToApply: 0,
  jobName: "",
  idToCopy: 0,
  isOfferCopied: false,
  isOfferEdited: false,
  jobPostNumber: 0,
  companyName: "",
  companyBusinessId: 0,
  address: 0,
  jobDetails: [],
  jobApplicantsId: 0,
  selectedPage: {
    selected: 0,
  },
  showSpinner: false,
  uploadedDocument: [],
  favoriteJobs: [],
  appliedJobs: [],
  dashboard: [],
  dateOfApplication: '',
  notificationToggleBtn: false,
  workStart: null,
  // warnToDelete: false,
  // isToDeleteAdvertisementId: 0,
};

const jobsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_AND_PUBLISH_ADVERTISEMENT_TO_EE:
      return {
        ...state,
        showSpinner: true,
      };
    // case DELETE_JOB_OFFER:
    //   return {
    //     ...state,
    //     warnToDelete: false,
    //   };
    // case WARN_TO_DELETE:
    //   return {
    //     ...state,
    //     warnToDelete: true,
    //     isToDeleteAdvertisementId: action.id,
    //   };

    case EDIT_OFFER:
      return {
        ...state,
        idToCopy: action.id,
        isOfferCopied: true,
        isOfferEdited: true,
      };
    case SAVE_AND_PUBLISH_ADVERTISEMENT_TO_EE_SUCCESS:
      return {
        ...state,
        showSpinner: false,
        apiSuccess: true,
      };
    case FETCH_JOB_BY_ID:
      return {
        ...state,
        id: action.id,
      };

    case SET_ID_TO_APPLY:
      return {
        ...state,
        idToApply: action.id,
      };
    case FETCH_JOB_INFO:
      return {
        ...state,
        companyName: action.companyName,
        companyBusinessId: action.companyBusinessId,
        jobName: action.jobName,
        jobPostNumber: action.jobPostNumber,
        address: action.address,
        dateOfApplication: action.dateOfApplication
      };
    case GET_JOB_APPLICANTS:
      return {
        ...state,
        jobApplicantsId: action.id,
        //payload: action.payload
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
        jobDetails: action.data,
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
        id: action.id,  
        dateOfApplication: action.dateOfApplication,
        jobName: action.jobName
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
        //notificationToggleBtn: action.response.emailNotificationActive,
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
