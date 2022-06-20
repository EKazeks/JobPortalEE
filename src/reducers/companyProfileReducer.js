import { RETRIEVE_LOGO_INFO, GET_COMPANY_PROFILE_SUCCESS, CLEAR_COMPANY_LOGO, ADD_NEW_COMPANY_START, ADD_NEW_COMPANY_END } from '../constants';

const initialState = {
  uploadedLogo: {},
  profile: {},
  isToAddNewProfile: false,
};

export default function companyProfileReducer(state = initialState, action) {
  switch (action.type) {
    case RETRIEVE_LOGO_INFO:
      return {
        ...state,
        uploadedLogo: action.image,
      };
    case CLEAR_COMPANY_LOGO:
      // if there has been a logo added in db, which we want to delete:
      if (state.profile.logo_document && !state.isToAddNewProfile) {
        return {
          ...state,

          profile: {
            ...state.profile,
            logo_document: {
              path: state.profile.logo_document && state.profile.logo_document[0].path,
            },
          },
          uploadedLogo: {},
        };
      }
      return {
        ...state,
        uploadedLogo: {},
      };

    case GET_COMPANY_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.response,
        isToAddNewProfile: false,
        uploadedLogo: {},
      };

    case ADD_NEW_COMPANY_START:
      return {
        ...state,
        isToAddNewProfile: true,
      };

    case ADD_NEW_COMPANY_END:
      return {
        ...state,
        isToAddNewProfile: false,
      };
    default:
      return state;
  }
}
