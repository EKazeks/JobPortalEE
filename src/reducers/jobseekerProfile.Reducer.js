import { RETRIEVE_PROFILE_PIC_INFO, CLEAR_JOBSEEKER_PROFILE_PIC, GET_APPLICANT_PROFILE_SUCCESS, RETRIEVE_DOCUMENT_INFO } from '../constants';

const initialState = {
  profile: {},
  uploadedProfilePic: {},
  uploadedDocument: [],
};

export default function jobseekerProfileReducer(state = initialState, action) {
  switch (action.type) {
    case GET_APPLICANT_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.response,
        uploadedProfilePic: {},
        uploadedDocument: [],
      };

    case RETRIEVE_PROFILE_PIC_INFO:
      return {
        ...state,
        uploadedProfilePic: action.image,
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

    case CLEAR_JOBSEEKER_PROFILE_PIC:
      // if there has been a photo added in db, which we want to delete:
      if (state.profile.applicantPhoto) {
        return {
          ...state,

          profile: {
            ...state.profile,
            applicantPhoto: {
              path: state.profile.applicantPhoto && state.profile.applicantPhoto.content[0].path,
            },
          },
          uploadedProfilePic: {},
        };
      }
      return {
        ...state,
        uploadedProfilePic: {},
      };

    default:
      return state;
  }
}
