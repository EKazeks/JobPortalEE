import { GET_USER_COMPANIES_LIST_SUCCESS, SELECT_COMPANY } from '../constants';

const companyUserReducer = (
  state = {
    companiesList: [],
    selectedCompany: {},
  },

  action,
) => {
  switch (action.type) {
    case GET_USER_COMPANIES_LIST_SUCCESS:
      return { ...state, companiesList: action.data };

    case SELECT_COMPANY:
      return { ...state, selectedCompany: action.data };

    default:
      return state;
  }
};

export default companyUserReducer;
