import { all } from 'redux-saga/effects';
import {
  watchFilterJobs,
  watchGetJobDetailsById,
  watchtoggleFavoriteJobs,
  watchdeleteFavoriteJobsSaga,
  watchgetAppliedJobsSaga,
  watchgetFavoriteJobsSaga,
  watchgetApplicantDashboardInfoSaga,
  watchtoggleEmailNotificationSaga,
  watchupdateEmailNotificationSaga,
  watchresetSearchCriteriaFormSaga,
} from './jobs.saga';
import { watchSignUpSaga } from './signUp.saga';
import { watchSignInSaga, watchLogoutSaga } from './signIn.saga';
import {
  watchgetAllCampaignsSaga,
  watchsaveAndPublishAdvertisementSaga,
  watchgetJobPostByPostIdSaga,
  watchupdateJobPostSaga,
  watchpopulateVacancyFormSaga,
  watchdeleteJobPostSaga,
  watchgetAllJobCategorysSaga,
  watchgetAllAdsByStatusSaga,
  watchSaveAdvertisementAsDraft,
  watchupdateCampaignSaga,
  watchupdateAndPublishAdvertisementSaga,
  watchchangeJobPostStatusSaga,
  watchgetApplicationDetailsByIdSaga,
  watchEditInterviewDetailsSaga,
  watchupdateApplicantStatusSaga,
  watchupdateJobApplicationDetailsSaga,
  watchgetJobPostViewsByDateSaga,
  watchchangePaginationSaga,
  watchSaveMarketingDetailsSaga,
  watchdeleteApplicationSaga,
  watchChangeRouteSaga,
  watchAdminGetUserCompanyProfileSaga,
  watchPopulateEmailMessageSaga,
} from './advertisements.saga';
import { watchAddCompanyProfile, watchGetCompanyProfile, watchAddApplicantProfile, watchGetApplicantProfile, watchAddNewCompany } from './profile.saga';
import { watchChangeLanguageSaga } from './lang.saga';
import { watchResetPassword } from './resetPassword.saga';
import { watchChangePasswordSaga } from './changePassword.saga';
import { watchSendApplication, watchCloseDialogSaga } from './application.saga';
import {
  watchAdminSearchCompany,
  watchAdminSearchApplicant,
  watchAdminSearchInvoice,
  watchAdminSearchAdsMarketing,
  watchadminUpdateMarketingStatusSaga,
  watchAdminUpdateUserProfileSaga,
  watchGetMarketingBudgetSaga,
  watchAdminSearchAdditionalServiceSaga,
  watchUpdatePaymentStatusSaga,
} from './admin.saga';
import { watchGetCompaniesList, watchSelectCompanySaga } from './companyUser.saga';
import { watchCompanyDetailsSearch, watchLoadSelectedCompanySaga } from './searchCompanyDetailsSaga';
import { watchRegisterPaymentSaga, watchProcessOnlinePaymentSaga } from './onlinePayment.saga';
import { watchSendInvoiceToTalousSaga } from './invoice.saga';

// Single entry point to start all sagas at once

export default function* rootSaga() {
  yield all([
    watchFilterJobs(),
    watchtoggleFavoriteJobs(),
    watchgetAppliedJobsSaga(),
    watchgetFavoriteJobsSaga(),
    watchdeleteFavoriteJobsSaga(),
    //watchGetJobDetailsById(),
    watchgetApplicantDashboardInfoSaga(),
    watchtoggleEmailNotificationSaga(),
    watchupdateEmailNotificationSaga(),
    watchSignUpSaga(),
    watchSignInSaga(),
    watchResetPassword(),
    watchChangePasswordSaga(),
    watchLogoutSaga(),
    watchsaveAndPublishAdvertisementSaga(),
    watchupdateAndPublishAdvertisementSaga(),
    watchSaveAdvertisementAsDraft(),
    watchgetAllCampaignsSaga(),
    //watchgetAllAdsByStatusSaga(),
    watchgetApplicationDetailsByIdSaga(),
    watchEditInterviewDetailsSaga(),
    watchupdateApplicantStatusSaga(),
    watchupdateJobApplicationDetailsSaga(),
    watchgetJobPostViewsByDateSaga(),
    watchchangePaginationSaga(),
    watchSaveMarketingDetailsSaga(),
    watchdeleteApplicationSaga(),
    watchgetJobPostByPostIdSaga(),
    watchupdateJobPostSaga(),
    watchpopulateVacancyFormSaga(),
    watchdeleteJobPostSaga(),
    watchupdateCampaignSaga(),
    watchgetAllJobCategorysSaga(),
    watchAddCompanyProfile(),
    watchGetCompanyProfile(),
    watchchangeJobPostStatusSaga(),
    watchAddNewCompany(),
    watchPopulateEmailMessageSaga(),

    watchChangeLanguageSaga(),
    watchGetApplicantProfile(),
    watchAddApplicantProfile(),
    watchSendApplication(),

    watchAdminSearchCompany(),
    watchAdminSearchApplicant(),
    watchAdminSearchInvoice(),
    watchAdminSearchAdsMarketing(),
    watchadminUpdateMarketingStatusSaga(),
    watchAdminUpdateUserProfileSaga(),
    watchGetMarketingBudgetSaga(),
    watchAdminSearchAdditionalServiceSaga(),
    watchUpdatePaymentStatusSaga(),
    watchGetCompaniesList(),
    watchSelectCompanySaga(),

    watchCompanyDetailsSearch(),
    watchLoadSelectedCompanySaga(),

    watchresetSearchCriteriaFormSaga(),
    watchCloseDialogSaga(),
    watchRegisterPaymentSaga(),
    watchProcessOnlinePaymentSaga(),
    watchSendInvoiceToTalousSaga(),
    watchChangeRouteSaga(),
    watchAdminGetUserCompanyProfileSaga(),
   // watchGetJobsOffersSaga,
  ]);
}
