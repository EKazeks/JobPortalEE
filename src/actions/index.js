import { id } from "date-fns/locale";
import { actionChannel } from "redux-saga/effects";
import {
  SAVE_AND_PUBLISH_ADVERTISEMENT,
  UPDATE_AND_PUBLISH_ADVERTISEMENT,
  POPULATE_VACANCY_FORM,
  UPDATE_ADVERTISEMENT,
  CHANGE_CAMPAIGN,
  SAVE_NEW_CAMPAIGN,
  SAVE_NEW_CAMPAIGN_SUCCESS,
  DELETE_ADVERTISEMENT,
  FILTER_JOBS,
  FILTER_JOBS_SUCCESS,
  GET_JOB_DETAILS_BY_ID,
  FETCH_JOB_BY_ID,
  GET_JOB_DETAILS_BY_ID_SUCCESS,
  GET_AD_INFO_FROM_SIDE_MENU,
  GET_ALL_ADS_BY_STATUS,
  OPEN_AD_TO_SEE_AD_INFO,
  OPEN_APPLICANT_TO_SEE_APPLICATION,
  CHOOSE_CAMPAIGN,
  SIGNUP_FORM_SUBMIT,
  SIGNUP_FORM_SUBMIT_SUCCESS,
  SIGNUP_FORM_SUBMIT_USER_EXIST_ERROR,
  SIGNUP_FORM_SUBMIT_FAILED,
  CLOSE_SIGNUP_SNACKBAR,
  SIGNIN_FORM_SUBMIT,
  SIGNIN_FORM_SUBMIT_SUCCESS,
  SIGNIN_FORM_SUBMIT_FAILED,
  CLOSE_SIGNIN_SNACKBAR,
  CLIENT_SET,
  CLIENT_UNSET,
  LOGOUT,
  RETRIEVE_IMAGE_INFO,
  RETRIEVE_LOGO_INFO,
  RETRIEVE_DOCUMENT_INFO,
  CLEAR_COMPANY_LOGO,
  CLEAR_IMAGES,
  GET_ALL_CAMPAIGNS,
  GET_ALL_CAMPAIGNS_SUCCESS,
  SAVE_AND_PUBLISH_ADVERTISEMENT_SUCCESS,
  GET_ALL_JOB_CATEGORY,
  GET_ALL_JOB_CATEGORY_SUCCESS,
  CHOOSE_JOB_CATEGORY,
  CLOSE_SNACKBAR,
  SAVE_AND_PUBLISH_ADVERTISEMENT_FAILED,
  GET_ALL_ADS_BY_STATUS_SUCCESS,
  NAVIGATE_ADS_FROM_MAIN_MENU,
  OPEN_AD_TO_SEE_AD_INFO_SUCCESS,
  SAVE_ADVERTISEMENT_AS_DRAFT,
  ADD_COMPANY_PROFILE,
  GET_COMPANY_PROFILE,
  RETRIEVE_PROFILE_PIC_INFO,
  CHANGE_ADVERT_PAGE,
  GET_COMPANY_PROFILE_SUCCESS,
  GET_COMPANY_PROFILE_FAILED,
  SHOW_SUCCESS_SNACKBAR,
  SHOW_FAILED_SNACKBAR,
  RESET_PASSWORD,
  RESET_PASSWORD_SUBMIT_SUCCESS,
  RESET_PASSWORD_SUBMIT_FAILED,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUBMIT_SUCCESS,
  CHANGE_PASSWORD_SUBMIT_FAILED,
  SEND_APPLICATION,
  POPULATE_VACANCY_FORM_SUCCESS,
  POST_ADVERTISEMENT,
  SEND_APPLICATION_SUCCESS,
  UPDATE_AND_PUBLISH_ADVERTISEMENT_SUCCESS,
  ADD_APPLICANT_PROFILE,
  TOGGLE_FAVORITE_JOBS,
  GET_APPLICANT_PROFILE,
  GET_APPLICANT_PROFILE_SUCCESS,
  GET_FAVORITE_JOBS,
  GET_APPLIED_JOBS,
  GET_APPLIED_JOBS_SUCCESS,
  GET_FAVORITE_JOBS_SUCCESS,
  ADMIN_SEARCH_COMPANY,
  ADMIN_SEARCH_COMPANY_SUCCESS,
  ADMIN_SEARCH_APPLICANT,
  ADMIN_SEARCH_APPLICANT_SUCCESS,
  ADMIN_SEARCH_ADS_MARKETING,
  ADMIN_SEARCH_ADS_MARKETING_SUCCESS,
  ADMIN_SEARCH_INVOICE,
  ADMIN_SEARCH_INVOICE_SUCCESS,
  CLEAR_JOBSEEKER_PROFILE_PIC,
  CHANGE_ACTIVE_POST_TO_INACTIVE,
  ADMIN_UPDATE_MARKETING_STATUS,
  ADMIN_EXPAND_AD_ROW,
  GET_APPLICATION_DETAILS_BY_ID,
  GET_APPLICATION_DETAILS_BY_ID_SUCCESS,
  UPDATE_APPLICANT_STATUS,
  SHOW_DIALOG,
  CLOSE_DIALOG,
  GET_APPLICANT_DASHBOARD_INFO,
  GET_APPLICANT_DASHBOARD_INFO_SUCCESS,
  TOGGLE_EMAIL_NOTIFICATION,
  UPDATE_EMAIL_NOTIFICATION,
  GET_JOBPOST_VIEWS_BY_DATE,
  GET_JOBPOST_VIEWS_BY_DATE_SUCCESS,
  DELETE_FAVORITE_JOBS,
  WARN_TO_DELETE,
  EDIT_CONTACT_DETAILS,
  ADMIN_UPDATE_USER_PROFILE,
  ADMIN_UPDATE_USER_PROFILE_SUCCESS,
  ADMIN_UPDATE_USER_PROFILE_FAIL,
  CANCEL_EDIT_CONTACT_DETAILS,
  SELECT_COMPANY,
  SELECT_COMPANY_SUCCESS,
  GET_USER_COMPANIES_LIST,
  GET_USER_COMPANIES_LIST_SUCCESS,
  ADD_NEW_COMPANY_START,
  ADD_NEW_COMPANY_END,
  SHOW_CUSTOM_ERROR_MESSAGE,
  UPDATE_JOB_APPLICATION_DETAILS,
  LANGUAGE_CHANGE,
  SEARCH_COMPANY_DETAILS,
  SEARCH_COMPANY_DETAILS_SUCCESS,
  LOAD_SELECTED_COMPANY,
  CLOSE_COMPANY_LISTS,
  HIDE_SPINNER,
  EDIT_INTERVIEW_DETAILS,
  SAVE_MARKETING_DETAILS,
  SAVE_MARKETING_DETAILS_SUCCESS,
  GET_MARKETING_BUDGET_SUCCESS,
  SELECT_USER_TYPE,
  ADMIN_CLOSE_AD_ROW,
  WARN_TO_DELETE_APPLICATION,
  DELETE_APPLICATION,
  POPULATE_SIGNUP_FORM,
  CHANGE_ROWS_PER_PAGE,
  RESET_SEARCH_CRITERIA_FORM,
  CHANGE_PAGINATION,
  RESET_APPLICATION_SENT,
  CHOOSE_PAYMENT_METHOD,
  REGISTER_PAYMENT,
  PROCESS_ONLINE_PAYMENT,
  DISPLAY_PAYMENT_STATUS_MESSAGE,
  SEND_INVOICE_TO_TALOUS,
  ADD_EXTRA_SERVICE,
  ADMIN_SEARCH_ADDITIONAL_SERVICE,
  ADMIN_SEARCH_ADDITIONAL_SERVICE_SUCCESS,
  CHANGE_ROUTE,
  ADMIN_GET_USER_PROFILE,
  UPDATE_PAYMENT_STATUS,
  GET_WORK_START_SUCCESS,
  AUTO_EMAIL_TO_APPLICANT,
  POPULATE_EMAIL_MESSAGE,
  GET_JOBS_OFFERS,
  GET_JOBS_OFFERS_SUCCESS,
  GET_ALL_JOB_CATEGORY_FROM_ESTONIA_SUCCESS,
  SAVE_AND_PUBLISH_ADVERTISEMENT_TO_EE,
  SAVE_AND_PUBLISH_ADVERTISEMENT_TO_EE_SUCCESS,
  EDIT_OFFER,
  EDIT_VACANCY_FORM,
  DELETE_JOB_OFFER,
  GET_JOB_APPLICANTS,
  FETCH_JOB_INFO,
  SET_ID_TO_APPLY,
  DELETE_SUCCESS,
} from "../constants";

// get jobs offers
export const getJobsOffers = () => ({
  type: GET_JOBS_OFFERS_SUCCESS,
});

export const fetchJobById = (id,jobPostId) => ({
  type: FETCH_JOB_BY_ID,
  id,
  jobPostId
});

export const setIdToApply = (id) => ({
  type: SET_ID_TO_APPLY,
  id,
});
export const fetchJobInfo = (
  companyName,
  companyBusinessId,
  jobName,
  jobPostNumber,
  dateOfApplication,
  url
) => ({
  type: FETCH_JOB_INFO,
  companyName,
  companyBusinessId,
  jobName,
  jobPostNumber,
  dateOfApplication
});

export const editOffer = (id) => ({
  type: EDIT_OFFER,
  id,
});

export const fetchJobApplicants = (id, payload) => ({
  type: GET_JOB_APPLICANTS,
  id,
  //payload
});

// export const getJobsOffersSuccess = () => ({
//   type: GET_JOBS_OFFERS_SUCCESS,
// });

//search companies details action
export const searchCompanyDetails = (companyName) => ({
  type: SEARCH_COMPANY_DETAILS,
  companyName: companyName,
});

// search companies details success
export const searchCompanyDetailsSuccess = (companyLists) => ({
  type: SEARCH_COMPANY_DETAILS_SUCCESS,
  companyLists,
});

// fetch company addresses
export const loadSelectedCompany = (selectedCompany, formName) => ({
  type: LOAD_SELECTED_COMPANY,
  selectedCompany,
  formName,
});

// Close dialog-box
export const closeCompanyLists = () => ({
  type: CLOSE_COMPANY_LISTS,
});

// OPEN JOBS COMPONENT

export const filterJobs = (isToRetainSelectedPage) => ({
  type: FILTER_JOBS,
  isToRetainSelectedPage,
});
export const filterJobsSuccess = (result) => ({
  type: FILTER_JOBS_SUCCESS,
  result,
});
export const getJobDetailsById = (id) => ({ type: GET_JOB_DETAILS_BY_ID, id });
export const getJobDetailsByIdSuccess = (data) => ({
  type: GET_JOB_DETAILS_BY_ID_SUCCESS,
  data,
});

export const getWorkStartSuccess = (result) => ({
  type: GET_WORK_START_SUCCESS,
  result,
});

// LAYOUT COMPONENT
export const getAdInfoFromSideMenu = (value) => ({
  type: GET_AD_INFO_FROM_SIDE_MENU,
  value,
});

export const navigateAdsFromMainMenu = (status) => ({
  type: NAVIGATE_ADS_FROM_MAIN_MENU,
  status,
});

export const getAllAdsByStatus = (status) => ({
  type: GET_ALL_ADS_BY_STATUS,
  status,
});
export const getAllAdsByStatusSuccess = (result) => ({
  type: GET_ALL_ADS_BY_STATUS_SUCCESS,
  result,
});

export const openAdToSeeAdInfo = (id) => ({
  type: OPEN_AD_TO_SEE_AD_INFO,
  id,
});

export const openAdToSeeAdInfoSuccess = (resultParsed) => ({
  type: OPEN_AD_TO_SEE_AD_INFO_SUCCESS,
  resultParsed,
});

export const hideSpinner = () => ({
  type: HIDE_SPINNER,
});

export const openApplicantToSeeApplication = {
  type: OPEN_APPLICANT_TO_SEE_APPLICATION,
};

export const changeAdvertPage = (selected) => ({
  type: CHANGE_ADVERT_PAGE,
  selected,
});

// LANGUAGE TRANSLATION
export const handleChangeLang = (lang) => ({ type: LANGUAGE_CHANGE, lang });

// REGISTER USER
export const signUpFormSubmit = () => ({ type: SIGNUP_FORM_SUBMIT });
export const signUpFormSubmitSuccess = (result) => ({
  type: SIGNUP_FORM_SUBMIT_SUCCESS,
  result,
});
export const signUpFormSubmitUserExistError = (error) => ({
  type: SIGNUP_FORM_SUBMIT_USER_EXIST_ERROR,
  error,
});
export const signUpFormSubmitFailed = (error) => ({
  type: SIGNUP_FORM_SUBMIT_FAILED,
  error,
});
export const closeRegisterSnackbar = () => ({
  type: CLOSE_SIGNUP_SNACKBAR,
});

// USER SELECTION
export const selectUserType = (userType) => ({
  type: SELECT_USER_TYPE,
  userType,
});

// SIGNIN USER
export const signInFormSubmit = () => ({ type: SIGNIN_FORM_SUBMIT });
export const signInFormSubmitSuccess = (result) => ({
  type: SIGNIN_FORM_SUBMIT_SUCCESS,
  result,
});
export const signInFormSubmitFailed = (error) => ({
  type: SIGNIN_FORM_SUBMIT_FAILED,
  error,
});
export const closeSignInSnackBar = () => ({ type: CLOSE_SIGNIN_SNACKBAR });
export const setClient = (token) => ({ type: CLIENT_SET, token });
export const unsetClient = () => ({ type: CLIENT_UNSET });
export const logout = () => ({ type: LOGOUT });

// RESET PASSWORD
export const resetPassword = () => ({ type: RESET_PASSWORD });
export const resetPasswordSubmitSuccess = () => ({
  type: RESET_PASSWORD_SUBMIT_SUCCESS,
});
export const resetPasswordSubmitFailed = () => ({
  type: RESET_PASSWORD_SUBMIT_FAILED,
});

// CHANGE PASSWORD
export const changePassword = () => ({ type: CHANGE_PASSWORD });
export const changePasswordSubmitSuccess = () => ({
  type: CHANGE_PASSWORD_SUBMIT_SUCCESS,
});
export const changePasswordSubmitFailed = () => ({
  type: CHANGE_PASSWORD_SUBMIT_FAILED,
});

// POST JOB ADVERTISEMENT
export const postAdvertisement = () => ({
  type: POST_ADVERTISEMENT,
});
export const saveAndPublishAdvertisement = () => ({
  type: SAVE_AND_PUBLISH_ADVERTISEMENT,
});
export const saveAndPublishAdvertisementToEe = () => ({
  type: SAVE_AND_PUBLISH_ADVERTISEMENT_TO_EE,
});
export const updateAndPublishAdvertisement = () => ({
  type: UPDATE_AND_PUBLISH_ADVERTISEMENT,
});
export const updateAndPublishAdvertisementSuccess = () => ({
  type: UPDATE_AND_PUBLISH_ADVERTISEMENT_SUCCESS,
});

export const saveAndPublishAdvertisementSuccess = (payload) => ({
  type: SAVE_AND_PUBLISH_ADVERTISEMENT_SUCCESS,
  payload: payload,
});

export const saveAdvertisementAsDraft = () => ({
  type: SAVE_ADVERTISEMENT_AS_DRAFT,
});

export const addExtraService = (serviceType) => ({
  type: ADD_EXTRA_SERVICE,
  serviceType,
});

export const changeRoute = () => ({
  type: CHANGE_ROUTE,
});

export const saveAndPublishAdvertisementFailed = () => ({
  type: SAVE_AND_PUBLISH_ADVERTISEMENT_FAILED,
});

export const retrieveImageInfo = (image) => ({
  type: RETRIEVE_IMAGE_INFO,
  image: {
    name: image.name,
    type: image.type,
    id: 0,
  },
});
export const retrieveLogoInfo = (image) => ({
  type: RETRIEVE_LOGO_INFO,
  image: {
    name: image.name,
    type: image.type,
    id: 0,
  },
});
export const retrieveProfilePicInfo = (image) => ({
  type: RETRIEVE_PROFILE_PIC_INFO,
  image: {
    name: image.name,
    type: image.type,
    id: 0,
  },
});
export const retrieveDocumentInfo = (document) => ({
  type: RETRIEVE_DOCUMENT_INFO,
  document: {
    name: document.name,
    type: document.type,
    id: 0,
  },
});
export const clearCompanyLogo = () => ({ type: CLEAR_COMPANY_LOGO });
export const clearImagesFromState = () => ({ type: CLEAR_IMAGES });
export const clearJobseekerProfilePic = () => ({
  type: CLEAR_JOBSEEKER_PROFILE_PIC,
});
export const getJobPostViewsByDate = () => ({
  type: GET_JOBPOST_VIEWS_BY_DATE,
});
export const getJobPostViewsByDateSuccess = (response) => ({
  type: GET_JOBPOST_VIEWS_BY_DATE_SUCCESS,
  response,
});
export const choosePaymentMethod = () => ({
  type: CHOOSE_PAYMENT_METHOD,
});

export const sendInvoiceToTalous = (detail) => ({
  type: SEND_INVOICE_TO_TALOUS,
  detail,
});

export const registerPayment = (jobpostOrderDetails) => ({
  type: REGISTER_PAYMENT,
  jobpostOrderDetails,
});

export const processOnlinePayment = () => ({
  type: PROCESS_ONLINE_PAYMENT,
});

export const displayPaymentStatusMessage = (responseText) => ({
  type: DISPLAY_PAYMENT_STATUS_MESSAGE,
  responseText,
});

export const autoEmailToApplicant = () => ({
  type: AUTO_EMAIL_TO_APPLICANT,
});

export const populateEmailMessage = (languages) => ({
  type: POPULATE_EMAIL_MESSAGE,
  languages,
});

// POPULATE FORM

export const populateVacancyForm = (id, isToEdit) => ({
  type: POPULATE_VACANCY_FORM,
  id,
  isToEdit,
});
export const populateVacancyFormSuccess = (campaignDetails, isToEdit) => ({
  type: POPULATE_VACANCY_FORM_SUCCESS,
  campaignDetails,
  isToEdit,
});

export const editVacancyForm = (id, isToEdit) => ({
  type: EDIT_VACANCY_FORM,
  id,
  isToEdit,
});

// POPULATE SIGNUP FORM
export const populateSignupForm = (applicantData) => ({
  type: POPULATE_SIGNUP_FORM,
  applicantData,
});

// UPDATE ADVERTISEMENT

export const updateAdvertisement = (id, isToEdit) => ({
  type: UPDATE_ADVERTISEMENT,
  id,
  isToEdit,
});
export const changeCampaign = (campaign) => ({
  type: CHANGE_CAMPAIGN,
  campaign,
});
export const saveNewCampaign = (id) => ({
  type: SAVE_NEW_CAMPAIGN,
  id,
});
export const saveNewCampaignSuccess = () => ({
  type: SAVE_NEW_CAMPAIGN_SUCCESS,
});
export const changeActivePostToInactive = (id) => ({
  type: CHANGE_ACTIVE_POST_TO_INACTIVE,
  id,
});

// DELETE ADVERTISEMENT
export const deleteJobOffer = (id) => ({
  type: DELETE_JOB_OFFER,
  id,
});

export const deleteAdvertisement = (id) => ({
  type: DELETE_ADVERTISEMENT,
  id,
});
export const warnToDelete = (id) => ({
  type: WARN_TO_DELETE,
  id,
});

export const deleteSuccess = () => ({
  type: DELETE_SUCCESS,
});

// GET ALL CAMAPIGNS
export const chooseCampaign = (campaign) => ({
  type: CHOOSE_CAMPAIGN,
  campaign,
});
export const getAllCampaigns = () => ({ type: GET_ALL_CAMPAIGNS });
export const getAllCampaignsSuccess = (result) => ({
  type: GET_ALL_CAMPAIGNS_SUCCESS,
  result,
});
export const saveMarketingDetails = () => ({
  type: SAVE_MARKETING_DETAILS,
});
export const saveMarketingDetailsSuccess = (details) => ({
  type: SAVE_MARKETING_DETAILS_SUCCESS,
  details,
});

// GET ALL JOB CATEGORIES
export const chooseJobCategory = (name) => ({
  type: CHOOSE_JOB_CATEGORY,
  name,
});

export const getAllJobCategory = () => ({ type: GET_ALL_JOB_CATEGORY });
export const getAllJobCategorySuccess = (result) => ({
  type: GET_ALL_JOB_CATEGORY_SUCCESS,
  result,
});
/* export const getAllJobCategoryFromEstoniaSuccess = (jobTags) => ({
  type: GET_ALL_JOB_CATEGORY_FROM_ESTONIA_SUCCESS,
  jobTags,
}); */

// COMPANY PROFILE
export const addCompanyProfile = () => ({
  type: ADD_COMPANY_PROFILE,
});
export const getCompanyProfile = () => ({
  type: GET_COMPANY_PROFILE,
});
export const getCompanyProfileSuccess = (response) => ({
  type: GET_COMPANY_PROFILE_SUCCESS,
  response,
});
export const getCompanyProfileFailed = (response) => ({
  type: GET_COMPANY_PROFILE_FAILED,
  response,
});
export const addNewCompanyStart = () => ({
  type: ADD_NEW_COMPANY_START,
});

export const addNewCompanyEnd = () => ({
  type: ADD_NEW_COMPANY_END,
});

export const adminGetUserCompanyProfile = (id) => ({
  type: ADMIN_GET_USER_PROFILE,
  id,
});

// GET USER'S ALL COMPANIES
export const getUserCompanyList = (isProfileUpdated) => ({
  type: GET_USER_COMPANIES_LIST,
  isProfileUpdated,
});
export const getUserCompanyListSuccess = (parsedResult) => ({
  type: GET_USER_COMPANIES_LIST_SUCCESS,
  parsedResult,
});

// SELECT COMPANY
export const selectCompany = (data) => ({ type: SELECT_COMPANY, data });
export const selectCompanySuccess = (data) => ({
  type: SELECT_COMPANY_SUCCESS,
  data,
});

// APPLICANT PROFILE
export const addApplicantProfile = () => ({
  type: ADD_APPLICANT_PROFILE,
});
export const getApplicantProfile = () => ({
  type: GET_APPLICANT_PROFILE,
});
export const getApplicantProfileSuccess = (response) => ({
  type: GET_APPLICANT_PROFILE_SUCCESS,
  response,
});

export const getFavoriteJobs = () => ({
  type: GET_FAVORITE_JOBS,
});
export const getFavoriteJobsSuccess = (favoriteJobs) => ({
  type: GET_FAVORITE_JOBS_SUCCESS,
  favoriteJobs,
});

export const getAppliedJobs = () => ({
  type: GET_APPLIED_JOBS,
});
export const getAppliedJobsSuccess = (response) => ({
  type: GET_APPLIED_JOBS_SUCCESS,
  response,
});

export const getApplicantDashboardInfo = () => ({
  type: GET_APPLICANT_DASHBOARD_INFO,
});
export const getApplicantDashboardInfoSuccess = (response) => ({
  type: GET_APPLICANT_DASHBOARD_INFO_SUCCESS,
  response,
});
export const toggleEmailNotification = () => ({
  type: TOGGLE_EMAIL_NOTIFICATION,
});
export const updateEmailNotification = () => ({
  type: UPDATE_EMAIL_NOTIFICATION,
});

// FAVORITE JOBS
export const toggleFavoriteJobs = (id,jobName,dateOfApplication) => ({
  type: TOGGLE_FAVORITE_JOBS,
  id,
  jobName,
  dateOfApplication,

});
export const deleteFavoriteJobs = (id) => ({
  type: DELETE_FAVORITE_JOBS,
  id,
});

// ADMINS
export const adminSearchCompany = (isToRetainSelectedPage) => ({
  type: ADMIN_SEARCH_COMPANY,
  isToRetainSelectedPage,
});
export const adminSearchCompanySuccess = (response) => ({
  type: ADMIN_SEARCH_COMPANY_SUCCESS,
  response,
});
export const adminSearchApplicant = (isToRetainSelectedPage) => ({
  type: ADMIN_SEARCH_APPLICANT,
  isToRetainSelectedPage,
});
export const adminSearchApplicantSuccess = (response) => ({
  type: ADMIN_SEARCH_APPLICANT_SUCCESS,
  response,
});
export const adminSearchInvoice = () => ({
  type: ADMIN_SEARCH_INVOICE,
});
export const adminSearchInvoiceSuccess = (response) => ({
  type: ADMIN_SEARCH_INVOICE_SUCCESS,
  response,
});
export const adminSearchAdsMarketing = (keepRowExpanded) => ({
  type: ADMIN_SEARCH_ADS_MARKETING,
  keepRowExpanded,
});
export const adminSearchAdsMarketingSuccess = (response, keepRowExpanded) => ({
  type: ADMIN_SEARCH_ADS_MARKETING_SUCCESS,
  response,
  keepRowExpanded,
});
export const adminUpdateMarketingStatus = (
  company_id,
  post_id,
  campaign_id
) => ({
  type: ADMIN_UPDATE_MARKETING_STATUS,
  company_id,
  post_id,
  campaign_id,
});

// Admin additional service for activated help and sos feature

export const adminSearchAdditionalService = (isToRetainSelectedPage) => ({
  type: ADMIN_SEARCH_ADDITIONAL_SERVICE,
  isToRetainSelectedPage,
});

export const adminSearchAdditionalServiceSuccess = (response) => ({
  type: ADMIN_SEARCH_ADDITIONAL_SERVICE_SUCCESS,
  response,
});

export const updatePaymentStatus = (orderDetails) => ({
  type: UPDATE_PAYMENT_STATUS,
  orderDetails,
});

export const adminExpandAdRow = (post_id, sm_marketing_status) => ({
  type: ADMIN_EXPAND_AD_ROW,
  post_id,
  sm_marketing_status,
});

export const adminCloseAdRow = () => ({
  type: ADMIN_CLOSE_AD_ROW,
});
export const getMarketingBudgetSuccess = (details) => ({
  type: GET_MARKETING_BUDGET_SUCCESS,
  details,
});

export const editContactDetails = (details, user) => ({
  type: EDIT_CONTACT_DETAILS,
  details,
  user,
});

export const cancelEditContactDetails = () => ({
  type: CANCEL_EDIT_CONTACT_DETAILS,
});
export const adminUpdateUserProfile = (user) => ({
  type: ADMIN_UPDATE_USER_PROFILE,
  user,
});

export const adminUpdateUserProfileSuccess = () => ({
  type: ADMIN_UPDATE_USER_PROFILE_SUCCESS,
});
export const adminUpdateUserProfileFail = () => ({
  type: ADMIN_UPDATE_USER_PROFILE_FAIL,
});
// ASYNC ACTIONS SNACKBAR
export const showSuccessSnackbar = () => ({
  type: SHOW_SUCCESS_SNACKBAR,
});
export const showFailedSnackbar = () => ({
  type: SHOW_FAILED_SNACKBAR,
});
export const showCustomErrorMsg = (msg) => ({
  type: SHOW_CUSTOM_ERROR_MESSAGE,
  msg,
});
export const closeSnackbar = () => ({
  type: CLOSE_SNACKBAR,
});
export const showDialog = () => ({
  type: SHOW_DIALOG,
});
export const closeDialog = () => ({
  type: CLOSE_DIALOG,
});

// SEND APPLICATION
export const sendApplication = (id) => ({
  type: SEND_APPLICATION,
  id,
});
export const sendApplicationSuccess = () => ({
  type: SEND_APPLICATION_SUCCESS,
});

export const resetApplicationSent = () => ({
  type: RESET_APPLICATION_SENT,
});

// GET APPLICATION
export const getApplicationDetailsById = (
  instanceId,
  //company_id,
  jobpostId,
  email
) => ({
  type: GET_APPLICATION_DETAILS_BY_ID,
  instanceId,
  //company_id,
  jobpostId,
  email,
});
export const getApplicationDetailsByIdSuccess = (response) => ({
  type: GET_APPLICATION_DETAILS_BY_ID_SUCCESS,
  response,
});

export const updateApplicantStatus = (
  application_id,
  company_id,
  post_id,
  email,
  status
) => ({
  type: UPDATE_APPLICANT_STATUS,
  application_id,
  company_id,
  post_id,
  email,
  status,
});

export const updateJobApplicationDetails = (
  id,
  //company_id,
  //post_id,
  //email,
  update
) => ({
  type: UPDATE_JOB_APPLICATION_DETAILS,
  id,
  //company_id,
  //post_id,
  //email,
  update,
});

export const editInterviewDetails = (isToEdit, id) => ({
  type: EDIT_INTERVIEW_DETAILS,
  isToEdit,
  id,
});

export const warnToDeleteApplication = (id) => ({
  type: WARN_TO_DELETE_APPLICATION,
  id,
});

export const deleteApplication = () => ({
  type: DELETE_APPLICATION,
});

// SHOW APPLICATIONS PER PAGE OPTIONS
export const changeRowsPerPage = (rows) => ({
  type: CHANGE_ROWS_PER_PAGE,
  rows,
});

// RESET SEARCH CRITERIA FORM
export const resetSearchCriteriaForm = () => ({
  type: RESET_SEARCH_CRITERIA_FORM,
});

// CHANGE_PAGINATION to the same page

export const changePagination = (changePage) => ({
  type: CHANGE_PAGINATION,
  changePage,
});
