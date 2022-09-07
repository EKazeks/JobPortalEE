import { call, put, takeEvery } from 'redux-saga/effects';
import { getFormValues, initialize } from 'redux-form';
import {
  API_SERVER,
  ADMIN_UPDATE_MARKETING_STATUS,
  ADMIN_SEARCH_ADS_MARKETING,
  ADMIN_SEARCH_INVOICE,
  ADMIN_SEARCH_APPLICANT,
  ADMIN_SEARCH_COMPANY,
  ADMIN_UPDATE_USER_PROFILE,
  ADMIN_EXPAND_AD_ROW,
  ADMIN_VIEW_COUNT_PER_PAGE,
  ADMIN_SEARCH_ADDITIONAL_SERVICE,
  UPDATE_PAYMENT_STATUS,
} from '../constants';
import { apiManualPost, apiManualRequest } from '../utils/request';
import store from '../store';
import {
  adminSearchCompanySuccess,
  adminSearchApplicantSuccess,
  adminSearchInvoiceSuccess,
  adminSearchAdsMarketingSuccess,
  changeAdvertPage,
  showSuccessSnackbar,
  showFailedSnackbar,
  adminSearchAdsMarketing,
  adminUpdateUserProfileSuccess,
  adminUpdateUserProfileFail,
  adminSearchCompany,
  adminSearchApplicant,
  getMarketingBudgetSuccess,
  // adminSearchAdditionalService,
  adminSearchAdditionalServiceSuccess,
  adminSearchAdditionalService,
  adminExpandAdRow,
} from '../actions';
import browserHistory from '../history';

function trimObjValues(obj) {
  return Object.keys(obj).reduce((acc, curr) => {
    if (typeof obj[curr] === 'string') {
      acc[curr] = obj[curr].trim();
    } else {
      acc[curr] = obj[curr];
    }
    return acc;
  }, {});
}

function changeBoolean(obj) {
  return Object.keys(obj).reduce((acc, curr) => {
    acc[curr] = obj[curr] === true ? 1 : 0;
    return acc;
  }, {});
}

function* adminSearchCompanySaga({ isToRetainSelectedPage }) {
  try {
    let start = 0;
    const currentPage = store.getState().pagination.selectedPage?.selected;

    if (isToRetainSelectedPage) {
      start = Math.ceil(currentPage * ADMIN_VIEW_COUNT_PER_PAGE);
    }

    const url = `https://localhost:7262/getAllCompanies`;
    let formValues = getFormValues('adminSearch')(store.getState());
    if (formValues) {
      formValues = trimObjValues(formValues);
    }
  
    const result = yield call(apiManualRequest, url);

    if (result.data === 'company details not existed' || result.data.length === 0) {
      yield put(adminSearchCompanySuccess([]));
    } else {
      const resultParsed = result.data;
      yield put(adminSearchCompanySuccess(resultParsed));

      if (!isToRetainSelectedPage) {
        yield put(changeAdvertPage({ selected: 0 }));
      }
    }
  } catch (e) {
    console.log(e);
  }
}
function* adminSearchApplicantSaga({ isToRetainSelectedPage }) {
  try {
    let start = 0;
    const currentPage = store.getState().pagination.selectedPage?.selected;

    if (isToRetainSelectedPage) {
      start = Math.ceil(currentPage * ADMIN_VIEW_COUNT_PER_PAGE);
    }

    const url = `${API_SERVER}/SearchApplicants?offset=${start}&rows=${ADMIN_VIEW_COUNT_PER_PAGE}`;
    let formValues = getFormValues('adminSearch')(store.getState());
    if (formValues) {
      formValues = trimObjValues(formValues);
    }
    const body = JSON.stringify({
      ...formValues,
    });

    const result = yield call(apiManualPost, url, body);
    if (result.data === 'Application details does not exist') {
      yield put(adminSearchApplicantSuccess([]));
    } else {
      const resultParsed = JSON.parse(result.data);
      yield put(adminSearchApplicantSuccess(resultParsed));

      if (!isToRetainSelectedPage) {
        yield put(changeAdvertPage({ selected: 0 }));
      }
    }
  } catch (e) {
    console.log(e);
  }
}

function* adminSearchAdditionalServiceSaga({ isToRetainSelectedPage }) {
  try {
    let start = 0;
    const currentPage = store.getState().pagination.selectedPage?.selected;

    if (isToRetainSelectedPage) {
      start = Math.ceil(currentPage * ADMIN_VIEW_COUNT_PER_PAGE);
    }

    const url = `${API_SERVER}/SearchAdditionalServicePosts?offset=${start}&rows=${ADMIN_VIEW_COUNT_PER_PAGE}`;
    let formValues = getFormValues('adminSearch')(store.getState());
    if (formValues) {
      formValues = trimObjValues(formValues);
    }
    const body = JSON.stringify({
      ...formValues,
    });

    const result = yield call(apiManualPost, url, body);
    if (result.data === 'Additional service as help or sos do not exist') {
      yield put(adminSearchAdditionalServiceSuccess([]));
    } else {
      const resultParsed = JSON.parse(result.data);
      yield put(adminSearchAdditionalServiceSuccess(resultParsed));

      if (!isToRetainSelectedPage) {
        yield put(changeAdvertPage({ selected: 0 }));
      }
    }
  } catch (e) {
    console.log(e);
  }
}

function* adminExpandRowSaga({ post_id }) {
  try {
    const initialValues = store.getState().admin.expandedRowMarketingStatus;
    yield put(initialize('marketing', initialValues));

    // Get marketing details to display table
    const url = `${API_SERVER}/GetMarketingBudgetByPostId`;
    const companyId = parseInt(post_id.split('JP')[0]);
    const postId = parseInt(post_id.split('JP')[1]);
    const body = JSON.stringify({
      post_id: postId,
      company_id: companyId,
    });

    const result = yield call(apiManualPost, url, body);
    if (result.data === 'Budget does not exist') {
      yield put(getMarketingBudgetSuccess([]));
    } else {
      const resultParsed = JSON.parse(result.data);
      yield put(getMarketingBudgetSuccess(resultParsed));
    }
  } catch (e) {
    console.log(e);
  }
}

function* adminSearchAdsMarketingtSaga({ keepRowExpanded }) {
  const { expanded } = store.getState().admin;

  try {
    const url = `${API_SERVER}/SearchAdsMarketing`;
    let formValues = getFormValues('adminSearch')(store.getState());
    if (formValues && formValues.status) {
      formValues.status = parseInt(formValues.status);
    }
    if (formValues) {
      formValues = trimObjValues(formValues);
      if (formValues.marketing_status)
        // change datatype of checkbox
        formValues.marketing_status = parseInt(formValues.marketing_status);
      if (formValues.more_budget) {
        formValues.more_budget = 'yes';
      } else if (!formValues.more_budget) {
        delete formValues.more_budget;
      }
    }
    const body = JSON.stringify({
      ...formValues,
    });

    const result = yield call(apiManualPost, url, body);
    if (result === 'No job posts for marketing found') {
      yield put(adminSearchAdsMarketingSuccess([]));
    } else {
      const resultParsed = JSON.parse(result.data);
      yield put(adminSearchAdsMarketingSuccess(resultParsed, typeof keepRowExpanded === 'boolean' ? keepRowExpanded : false));
      // I want to change page number after searching ads, so the results are shown in 1st page.
      // However, when calling SearchAdsMarketing after updating marketing status (code below), I don't want to change the page.
      if (expanded === 0) {
        yield put(changeAdvertPage({ selected: 0 }));
      }
    }
  } catch (e) {
    console.log(e);
  }
}
function* adminSearchInvoiceSaga() {
  try {
    const url = `${API_SERVER}/SearchInvoices`;
    let formValues = getFormValues('adminSearch')(store.getState());

    // If expired checkbox is checked, send it to the server with a value 'overdue' else don't send overdue_inv key in body
    if (formValues && formValues.overdue_inv) {
      formValues.overdue_inv = 'overdue';
    } else {
      delete formValues.overdue_inv;
    }
    if (formValues) {
      formValues = trimObjValues(formValues);
    }
    const body = JSON.stringify({
      ...formValues,
    });

    const result = yield call(apiManualPost, url, body);
    if (result === 'Application details does not exist') {
      yield put(adminSearchInvoiceSuccess([]));
    } else {
      const resultParsed = JSON.parse(result.data);
      yield put(adminSearchInvoiceSuccess(resultParsed));
      yield put(changeAdvertPage({ selected: 0 }));
    }
  } catch (e) {
    console.log(e);
  }
}

function* adminUpdateUserProfileSaga({ user }) {
  try {
    const url = user === 'company' ? `${API_SERVER}/UpdateCompanyProfileByAdmin` : `${API_SERVER}/UpdateApplicantProfileByAdmin`;
    const formValues = getFormValues('adminContact')(store.getState());

    const body = JSON.stringify({
      ...formValues,
    });

    const result = yield call(apiManualPost, url, body);

    if (result.data === 'User contact information updated successfully!') {
      yield put(adminUpdateUserProfileSuccess());
      if (user === 'company') {
        yield put(adminSearchCompany(true));
      }
      if (user === 'applicant') {
        yield put(adminSearchApplicant(true));
      }
    } else {
      yield put(adminUpdateUserProfileFail());
    }
  } catch (e) {
    console.log(e);
  }
}

function* updatePaymentStatusSaga({ orderDetails }) {
  try {
    const { company_id, post_id, payment_reference, fetch } = orderDetails;
    const url = `${API_SERVER}/UpdatePaymentStatus`;
    const body = JSON.stringify({
      company_id,
      post_id,
      jobPost_order: [
        {
          payment_reference,
        },
      ],
    });
    const result = yield call(apiManualPost, url, body);

    if (result.data === 'Jobpost payment status updated successfully!') {
      //alert('Payment status is updated!');
    } else {
      alert('Payment status could not be updated. Please try again later');
    }

    if (fetch === 'marketing') {
      yield put(adminSearchAdsMarketing());
    }
    if (fetch === 'additionalService') {
      yield put(adminSearchAdditionalService(true));
    }
    if (fetch === 'marketingBudget') {
      yield put(adminSearchAdsMarketing(true));
      yield put(adminExpandAdRow(`${company_id}JP${post_id}`));
    }
  } catch (e) {
    console.log(e);
  }
}

function* adminUpdateMarketingStatusSaga({ company_id, post_id, campaign_id }) {
  try {
    const url = `${API_SERVER}/UpdateAdsMarketingStatus`;
    let formValues = getFormValues('marketing')(store.getState());

    // Allowed marketing_status are :: 0(Red)Not started, 2(Green)Completed
    let marketing_status = 0;
    if (formValues && campaign_id === 5) {
      if (formValues.sm_marketing_status) {
        marketing_status = 2;
      } else if (!formValues.sm_marketing_status) {
        marketing_status = 0;
      }
    }

    // Changing boolean values of checkbox to 0 or 1, as required in Backend
    if (formValues) {
      formValues = changeBoolean(formValues);
    }
    const body = JSON.stringify({
      ...formValues,
      company_id,
      post_id,
      marketing_status,
    });
    const result = yield call(apiManualPost, url, body);
    if (result.data === 'Job post marketing status updated Successfully!') {
      yield put(adminSearchAdsMarketing());
      yield put(showSuccessSnackbar());
      browserHistory.push('/markkinoinnit');
    } else {
      yield put(showFailedSnackbar());
    }
  } catch (e) {
    console.log(e);
  }
}
export function* watchAdminSearchCompany() {
  yield takeEvery(ADMIN_SEARCH_COMPANY, adminSearchCompanySaga);
}
export function* watchAdminSearchApplicant() {
  yield takeEvery(ADMIN_SEARCH_APPLICANT, adminSearchApplicantSaga);
}
export function* watchAdminSearchInvoice() {
  yield takeEvery(ADMIN_SEARCH_INVOICE, adminSearchInvoiceSaga);
}
export function* watchAdminSearchAdsMarketing() {
  yield takeEvery(ADMIN_SEARCH_ADS_MARKETING, adminSearchAdsMarketingtSaga);
}
export function* watchadminUpdateMarketingStatusSaga() {
  yield takeEvery(ADMIN_UPDATE_MARKETING_STATUS, adminUpdateMarketingStatusSaga);
}
export function* watchAdminUpdateUserProfileSaga() {
  yield takeEvery(ADMIN_UPDATE_USER_PROFILE, adminUpdateUserProfileSaga);
}
export function* watchGetMarketingBudgetSaga() {
  yield takeEvery(ADMIN_EXPAND_AD_ROW, adminExpandRowSaga);
}

export function* watchAdminSearchAdditionalServiceSaga() {
  yield takeEvery(ADMIN_SEARCH_ADDITIONAL_SERVICE, adminSearchAdditionalServiceSaga);
  // yield takeEvery(POPULATE_VACANCY_FORM, populateVacancyFormSaga)
}

export function* watchUpdatePaymentStatusSaga() {
  yield takeEvery(UPDATE_PAYMENT_STATUS, updatePaymentStatusSaga);
}
