import { GET_ALL_JOB_CATEGORY_SUCCESS } from '../constants';

const initialState = {
  jobCategories: [],
};

const jobCategoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_JOB_CATEGORY_SUCCESS:
      return {
        ...state,
        jobCategories: action.result,
      };

    default:
      return state;
  }
};

export default jobCategoriesReducer;
