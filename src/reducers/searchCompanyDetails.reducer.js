import { SEARCH_COMPANY_DETAILS_SUCCESS, LOAD_SELECTED_COMPANY, CLOSE_COMPANY_LISTS } from '../constants';

const initialState = {
  companyLists: [],
  apiSuccess: false,
};

const companyLists = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_COMPANY_DETAILS_SUCCESS:
      return {
        ...state,
        companyLists: action.companyLists,
        apiSuccess: true,
      };
    case LOAD_SELECTED_COMPANY:
      return {
        ...state,
        apiSuccess: false,
      };
    case CLOSE_COMPANY_LISTS:
      return {
        ...state,
        apiSuccess: false,
      };
    default:
      return state;
  }
};

export default companyLists;
