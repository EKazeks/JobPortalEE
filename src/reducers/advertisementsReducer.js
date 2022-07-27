import {
  DELETE_ADVERTISEMENT,
  CHANGE_CAMPAIGN,
  POPULATE_VACANCY_FORM_SUCCESS,
  GET_AD_INFO_FROM_SIDE_MENU,
  CHOOSE_CAMPAIGN,
  SAVE_NEW_CAMPAIGN_SUCCESS,
  RETRIEVE_IMAGE_INFO,
  CLEAR_IMAGES,
  GET_ALL_CAMPAIGNS_SUCCESS,
  SAVE_AND_PUBLISH_ADVERTISEMENT_SUCCESS,
  SAVE_AND_PUBLISH_ADVERTISEMENT,
  UPDATE_AND_PUBLISH_ADVERTISEMENT,
  UPDATE_AND_PUBLISH_ADVERTISEMENT_SUCCESS,
  CLOSE_SNACKBAR,
  SAVE_AND_PUBLISH_ADVERTISEMENT_FAILED,
  GET_ALL_ADS_BY_STATUS_SUCCESS,
  NAVIGATE_ADS_FROM_MAIN_MENU,
  OPEN_AD_TO_SEE_AD_INFO,
  OPEN_AD_TO_SEE_AD_INFO_SUCCESS,
  SAVE_ADVERTISEMENT_AS_DRAFT,
  POST_ADVERTISEMENT,
  GET_APPLICATION_DETAILS_BY_ID_SUCCESS,
  GET_JOBPOST_VIEWS_BY_DATE_SUCCESS,
  //WARN_TO_DELETE,
  CLOSE_DIALOG,
  HIDE_SPINNER,
  EDIT_INTERVIEW_DETAILS,
  SAVE_MARKETING_DETAILS_SUCCESS,
  WARN_TO_DELETE_APPLICATION,
  DELETE_APPLICATION,
  ADD_EXTRA_SERVICE,
  SAVE_NEW_CAMPAIGN,
  AUTO_EMAIL_TO_APPLICANT,
} from '../constants';

const initialState = {
  postRequesSucces:false,
  postRequesFailure:false,
  showSpinner: false,
  isSaveAndPublishAdvertisement: false,
  isSaveAdvertisementAsDraft: false,
  apiSuccess: false,
  apiFailed: false,
  uploadedImage: {},
  campaigns: [],
  jobCategories: [],
  advertisements: { draftAds: [], activeAds: [], inActiveAds: [] },
  extraService: { help: false, sos: false },
  selectedAd: 0,
  viewSelectedAd: [],
  viewApplication: {},
  chartData: [],
  isToChangeCampaign: false,
  selectedSideMenu: 0,
  selectedMainMenu: '',
  selectedCampaign: {
    id: 2,
    type: 'lift',
    value: 10,
  },
  marketingDetails: {},
  isToEdit: false,
  warnToDelete: false,
  isToDeleteAdvertisementId: 0,
  warnToDeleteApplication: false,
  applicationDetailsToDelete: {},
  automaticEmailToggleBtn: false,
};

export default function advertisementsReducer(state = initialState, action) {
  switch (action.type) {
    // Dispatching actions related to job advertisements
    case POST_ADVERTISEMENT:
      return {
        ...state,
        selectedCampaign: {
          id: 2,
          type: 'lift',
          value: 10,
        },
        isToChangeCampaign: false,
        marketingDetails: {},
      };
    case SAVE_AND_PUBLISH_ADVERTISEMENT:
      return {
        ...state,
        showSpinner: false,
        apiSuccess: true,
      };
    case UPDATE_AND_PUBLISH_ADVERTISEMENT:
      return {
        ...state,
        showSpinner: true,
      };
    case UPDATE_AND_PUBLISH_ADVERTISEMENT_SUCCESS:
      return {
        ...state,
        showSpinner: false,
        apiSuccess: true,
      };

    case SAVE_ADVERTISEMENT_AS_DRAFT:
      return {
        ...state,
        showSpinner: true,
        isSaveAdvertisementAsDraft: true,
      };

    case ADD_EXTRA_SERVICE:
      if (action.serviceType === 'help') {
        return {
          ...state,
          extraService: {
            help: !state.extraService.help,
            sos: false,
          },
        };
      }
      if (action.serviceType === 'sos') {
        return {
          ...state,
          extraService: {
            help: false,
            sos: !state.extraService.sos,
          },
        };
      }
      break;

    case SAVE_AND_PUBLISH_ADVERTISEMENT_SUCCESS:
      return {
        ...state,
        selectedCampaign: {
          id: 2,
          name: 'lift',
          price: 10,
        },
        uploadedImage: {},
        showSpinner: false,
        apiSuccess: true,
        isSaveAdvertisementAsDraft: false,
        isToEdit: false,
        extraService: {
          help: false,
          sos: false,
        },
      };

    case SAVE_AND_PUBLISH_ADVERTISEMENT_FAILED:
      return {
        ...state,
        showSpinner: false,
        apiFailed: true,
        extraService: {
          help: false,
          sos: false,
        },
      };
    case CLOSE_SNACKBAR:
      return {
        ...state,
        apiSuccess: false,
        apiFailed: false,
      };
    case CHANGE_CAMPAIGN:
      return {
        ...state,
        selectedCampaign: {
          ...action.campaign,
        },
        isToChangeCampaign: true,
      };
    case POPULATE_VACANCY_FORM_SUCCESS:
      const { postCampaign, marketing_platform, more_budget, marketing_budget } = action.campaignDetails;
      return {
        ...state,
        selectedCampaign: {
          ...postCampaign,
        },
        marketingDetails: {
          marketing_platform,
          more_budget,
          marketing_budget,
        },
        isToChangeCampaign: false,
        isToEdit: action.isToEdit,
      };

    // case WARN_TO_DELETE:
    //   return {
    //     ...state,
    //     warnToDelete: true,
    //     isToDeleteAdvertisementId: action.id,
    //   };

    case DELETE_ADVERTISEMENT:
      return {
        ...state,
        warnToDelete: false,
      };

    case WARN_TO_DELETE_APPLICATION:
      return {
        ...state,
        warnToDeleteApplication: true,
        applicationDetailsToDelete: action.applicationDetails,
      };

    case DELETE_APPLICATION:
      return {
        ...state,
        warnToDeleteApplication: false,
      };

    case CLOSE_DIALOG:
      return {
        ...state,
        warnToDelete: false,
        warnToDeleteApplication: false,
        isToDeleteAdvertisementId: 0,
      };

    // Dispatching action when changing side menu

    case GET_AD_INFO_FROM_SIDE_MENU:
      return {
        ...state,
        selectedSideMenu: action.value,
      };

    case NAVIGATE_ADS_FROM_MAIN_MENU:
      return {
        ...state,
        selectedMainMenu: action.status,
        selectedSideMenu: 0,
        selectedAd: 0,
        viewSelectedAd: [],
        isToEdit: false,
        uploadedImage: {},
        automaticEmailToggleBtn: false,
      };

    case GET_ALL_ADS_BY_STATUS_SUCCESS:
      if (action.status === 0) {
        return {
          ...state,
          marketingDetails: {},
          isToChangeCampaign: false,
          advertisements: {
            ...state.advertisements,
            draftAds: action.result,
          },
          isToDeleteAdvertisementId: 0,
        };
      }
      if (action.status === 1) {
        return {
          ...state,
          marketingDetails: {},
          isToChangeCampaign: false,
          advertisements: {
            ...state.advertisements,
            activeAds: action.result,
          },
          isToDeleteAdvertisementId: 0,
        };
      }

      if (action.status === 2) {
        return {
          ...state,
          marketingDetails: {},
          isToChangeCampaign: false,
          advertisements: {
            ...state.advertisements,
            inActiveAds: action.result,
          },
          isToDeleteAdvertisementId: 0,
        };
      }
      break;
    case OPEN_AD_TO_SEE_AD_INFO:
      return {
        ...state,
        // selectedMainMenu: '',
        selectedAd: action.id,
        showSpinner: true,
      };

    case OPEN_AD_TO_SEE_AD_INFO_SUCCESS:
      return {
        ...state,
        viewSelectedAd: action.result,
        showSpinner: false,
        marketingDetails: {
          marketing_platform: action.result.marketing_platform,
          more_budget: action.result.more_budget,
          //marketing_budget: action.result.marketing_budget,
          isPlatformSaved: action.result.isPlatformSaved,
        },
      };

    case HIDE_SPINNER:
      return {
        ...state,
        showSpinner: false,
      };

    case GET_ALL_CAMPAIGNS_SUCCESS:
      return {
        ...state,
        campaigns: action.result,
      };

    case CHOOSE_CAMPAIGN:
      return {
        ...state,
        selectedCampaign: {
          ...action.campaign,
        },
      };
    case SAVE_MARKETING_DETAILS_SUCCESS:
      return {
        ...state,
        marketingDetails: action.details,
      };

    case SAVE_NEW_CAMPAIGN:
      return {
        ...state,
        showSpinner: true,
      };
    case SAVE_NEW_CAMPAIGN_SUCCESS:
      return {
        ...state,
        isToChangeCampaign: false,
        showSpinner: false,
      };

    case RETRIEVE_IMAGE_INFO:
      return {
        ...state,
        uploadedImage: action.image,
      };

    case CLEAR_IMAGES:
      return {
        ...state,
        uploadedImage: {},
      };

    case GET_APPLICATION_DETAILS_BY_ID_SUCCESS:
      return {
        ...state,
        viewApplication: action.response,
        isToEdit: false,
      };
    case GET_JOBPOST_VIEWS_BY_DATE_SUCCESS:
      return {
        ...state,
        chartData: action.response,
      };

    case EDIT_INTERVIEW_DETAILS:
      return {
        ...state,
        isToEdit: action.isToEdit,
      };

    case AUTO_EMAIL_TO_APPLICANT:
      return {
        ...state,
        automaticEmailToggleBtn: !state.automaticEmailToggleBtn,
      };

    default:
      return state;
  }
}
