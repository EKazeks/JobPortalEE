import {
  ADMIN_SEARCH_COMPANY,
  ADMIN_SEARCH_COMPANY_SUCCESS,
  ADMIN_SEARCH_APPLICANT,
  ADMIN_SEARCH_APPLICANT_SUCCESS,
  ADMIN_SEARCH_INVOICE_SUCCESS,
  ADMIN_SEARCH_ADS_MARKETING_SUCCESS,
  ADMIN_EXPAND_AD_ROW,
  EDIT_CONTACT_DETAILS,
  ADMIN_UPDATE_USER_PROFILE_SUCCESS,
  CANCEL_EDIT_CONTACT_DETAILS,
  GET_MARKETING_BUDGET_SUCCESS,
  ADMIN_CLOSE_AD_ROW,
  ADMIN_SEARCH_ADDITIONAL_SERVICE_SUCCESS,
  UPDATE_PAYMENT_STATUS,
} from '../constants';

const initialState = {
  companies: [],
  applicants: [],
  invoices: [],
  adsMarketing: [],
  expanded: 0,
  isEdit: false,
  contactDetails: {},
  isToEditId: 0,
  expandedRowMarketingStatus: {
    sm_marketing_status: false,
  },
  marketingBudget: [],
  additionalService: [],
  paymentToUpdateDetails: {},
};

export default function AdminReducer(state = initialState, action) {
  switch (action.type) {
    case ADMIN_SEARCH_COMPANY_SUCCESS:
      return {
        ...state,
        isEdit: false,
        companies: action.response,
      };

    case ADMIN_SEARCH_COMPANY:
      return {
        ...state,
        isEdit: false,
      };

    case ADMIN_SEARCH_APPLICANT_SUCCESS:
      return {
        ...state,
        isEdit: false,
        applicants: action.response,
      };

    case ADMIN_SEARCH_APPLICANT:
      return {
        ...state,
        isEdit: false,
      };

    case ADMIN_SEARCH_INVOICE_SUCCESS:
      return {
        ...state,
        invoices: action.response,
      };
    case ADMIN_SEARCH_ADS_MARKETING_SUCCESS:
      return {
        ...state,
        adsMarketing: action.response,
        expanded: !action.keepRowExpanded ? 0 : state.expanded,
        expandedRowMarketingStatus: {
          sm_marketing_status: false,
        },
        paymentToUpdateDetails: {},
      };
    case ADMIN_EXPAND_AD_ROW:
      return {
        ...state,
        expanded: action.post_id,
        expandedRowMarketingStatus: {
          sm_marketing_status: action.sm_marketing_status,
        },
      };

    case UPDATE_PAYMENT_STATUS:
      return {
        ...state,
        paymentToUpdateDetails: action.orderDetails,
      };

    case ADMIN_CLOSE_AD_ROW:
      return {
        ...state,
        expanded: 0,
        expandedRowMarketingStatus: {
          sm_marketing_status: false,
        },
      };

    case GET_MARKETING_BUDGET_SUCCESS:
      return {
        ...state,
        marketingBudget: action.details,
      };

    case EDIT_CONTACT_DETAILS:
      switch (action.user) {
        case 'company':
          return {
            ...state,
            isEdit: true,
            contactDetails: {
              ...action.details,
            },
            isToEditId: action.details.company_id,
          };

        case 'applicant':
          return {
            ...state,
            isEdit: true,
            contactDetails: {
              ...action.details,
            },
            isToEditId: action.details.applicant_id,
          };

        default:
          return state;
      }

    case CANCEL_EDIT_CONTACT_DETAILS:
      return {
        ...state,
        isEdit: false,
        isToEditId: 0,
      };

    case ADMIN_UPDATE_USER_PROFILE_SUCCESS:
      return {
        ...state,
        isEdit: false,
        isToEditId: 0,
        contactDetails: {},
      };

    case ADMIN_SEARCH_ADDITIONAL_SERVICE_SUCCESS:
      return {
        ...state,
        additionalService: action.response,
        paymentToUpdateDetails: {},
      };

    default:
      return state;
  }
}
