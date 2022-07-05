import { GET_ALL_JOB_CATEGORY_FROM_ESTONIA_SUCCESS, GET_ALL_JOB_CATEGORY_SUCCESS } from '../constants';

const initialState = {
  jobCategories: [],
  jobTags: [],
};

const jobCategoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_JOB_CATEGORY_SUCCESS:
      return {
        ...state,
        jobCategories: action.result,
      };
    case GET_ALL_JOB_CATEGORY_FROM_ESTONIA_SUCCESS:
      return {
        ...state,
        jobTags: action.jobTags
      }

    default:
      return state;
  }
};

export default jobCategoriesReducer;
