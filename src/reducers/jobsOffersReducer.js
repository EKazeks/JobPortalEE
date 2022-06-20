import { GET_JOBS_OFFERS_SUCCESS } from "../constants";

const initialState = {
  jobsList: [],
  jobPostNumber: 0,
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
}

export const jobsOffersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_JOBS_OFFERS_SUCCESS:
      return {
        ...state, 
        fetchedPosts: action 
      }
    default:
      return state;
  }
}

