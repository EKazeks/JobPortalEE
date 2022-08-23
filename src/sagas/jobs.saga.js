import { call, put, takeEvery } from "redux-saga/effects";
import { getFormValues, reset } from "redux-form";
import {
  API_SERVER,
  API_SERVER_EST,
  FILTER_JOBS,
  GET_JOB_DETAILS_BY_ID,
  TOGGLE_FAVORITE_JOBS,
  GET_APPLIED_JOBS,
  GET_FAVORITE_JOBS,
  GET_APPLICANT_DASHBOARD_INFO,
  TOGGLE_EMAIL_NOTIFICATION,
  UPDATE_EMAIL_NOTIFICATION,
  DELETE_FAVORITE_JOBS,
  RESET_SEARCH_CRITERIA_FORM,
  JOBPOST_COUNT_PER_PAGE,
  mol_page_url,
} from "../constants";
import {
  filterJobsSuccess,
  getJobDetailsByIdSuccess,
  getAppliedJobsSuccess,
  getFavoriteJobs,
  getFavoriteJobsSuccess,
  showFailedSnackbar,
  showSuccessSnackbar,
  showDialog,
  getJobDetailsById,
  getApplicantDashboardInfo,
  getApplicantDashboardInfoSuccess,
  changeAdvertPage,
  changePagination,
  getWorkStartSuccess,
} from "../actions";
import {
  apiOpenPost,
  apiManualPost,
  apiOpenRequest,
  apiManualRequest,
} from "../utils/request";
import store from "../store";
import axios from "axios";

function* filterJobsSaga({ isToRetainSelectedPage }) {
  try {
    let start = 0;
    const { pagination } = store.getState();
    const changePage = pagination.isToChangePage;
    const currentPage = pagination.selectedPage?.selected;

    const searchFormValues = getFormValues("searchCriteria")(store.getState());
    // The foloowing conditions for not sending the keys to backend incase no inputs!
    const body = JSON.stringify({
      search_phrase: searchFormValues.search_phrase
        ? searchFormValues.search_phrase
        : undefined,
      job_location: searchFormValues.job_location
        ? searchFormValues.job_location
        : undefined,
      portal_category_id:
        searchFormValues.portal_category_id.length > 0
          ? searchFormValues.portal_category_id.map((category) =>
              category.id.toString()
            )
          : undefined,
      job_type:
        searchFormValues.job_type.length > 0
          ? searchFormValues.job_type.map((jobType) => jobType.value.toString())
          : undefined,
      job_hours:
        searchFormValues.job_hours.length > 0
          ? searchFormValues.job_hours.map((jobHours) =>
              jobHours.value.toString()
            )
          : undefined,
      published:
        searchFormValues.published !== ""
          ? parseInt(searchFormValues.published)
          : undefined,
    });

    if (isToRetainSelectedPage) {
      start = Math.ceil(currentPage * JOBPOST_COUNT_PER_PAGE);
    }

    const portal_url = `${API_SERVER}/SearchPortalAds/?offset=${start}&rows=${JOBPOST_COUNT_PER_PAGE}`;

    const portal_result = yield call(apiOpenPost, portal_url, body);
    const portal_data = JSON.parse(portal_result.data);
    yield put(filterJobsSuccess(portal_data));

    // When users come back from jobdetails page, stick to the current page

    if (changePage && !isToRetainSelectedPage) {
      // If not fetching new results based on pagination ..start from page 0. E.g. when component mounts or when hae button is clicked after inputting filters.
      yield put(
        changeAdvertPage({
          selected: 0,
        })
      );
    }

    yield put(changePagination(true)); // Back to default
  } catch (e) {
    console.warn(e);
  }
}

function* getJobDetailsByIdSaga(props) {
  const { jobs } = store.getState();
  const { id } = jobs;
  try {
    const url = `${API_SERVER_EST}/${id}`;

    let body;
    let result;
    let resultParsed;
    let jobDetailResult;
    let jobUrl;
    let ilmoId;

    const job_detail = props.id.split("$$");

    const { user } = store.getState().client;

    const email = user && user.data && user.data[1];

    const userUrl = window.location.href;

    const isApplyPage = userUrl.includes("hae") ? true : false;

    // if (email) {
    //   body = JSON.stringify({
    //     id: parseInt(job_detail[0]),
    //     companyBusinessId: parseInt(job_detail[1]),
    //     email,
    //     isApplyPage,
    //   });
    // } else {
    //   body = JSON.stringify({
    //     id: parseInt(job_detail[0]),
    //     companyBusinessId: parseInt(job_detail[1]),
    //     isApplyPage,
    //   });
    // }

    result = axios.get(url).then((res) => res.data);
    const data = result.data;
    if (data === data) {
      //resultParsed = result.data[0];
      //ilmoId = resultParsed.ilmoitusnumero;
      //jobUrl = `${mol_page_url}-api/v1/tyopaikat/${ilmoId}?kieli=fi`;
      yield put(getJobDetailsByIdSuccess(data));
    }
    // } else {
    //   //ilmoId = result.data.ilmoitusnumero;

    //   yield put(getJobDetailsByIdSuccess(data));
    // }
    //jobDetailResult = yield call(apiOpenRequest, url);
    // if (jobDetailResult.data) {
    //   jobDetailResult = jobDetailResult.data.response?.docs[0];

    //   yield put(getWorkStartSuccess(jobDetailResult));
    // }
  } catch (e) {
    console.warn(e);
  }
}

function* toggleFavoriteJobsSaga({id}) {
  try {
    const url = `https://localhost:7262/setOfferFavourite`;
    const {jobName, dateOfApplication} = store.getState().jobs
    const  instanceId  = store.getState().client.user.data.company_id

    const body = JSON.stringify({
      id,
      jobTitle: jobName,
      closingDate: dateOfApplication,
      instanceId,
      jobPostId:id
    })

    const result = yield call(apiManualPost, url, body);
    const data = result.data;

    if (data === data) {
      yield put(showSuccessSnackbar());
      yield put(getJobDetailsById(id));
      yield put(getFavoriteJobs());
    } else {
      yield put(showFailedSnackbar());
    }
  } catch (e) {
    console.warn(e);
    // Jobs can be added to Favorite only by logged in users!

    yield put(showDialog());
  }
}
function* deleteFavoriteJobsSaga({ id }) {
  try {
    const url = `https://localhost:7262/deleteOfferFromFavourite/${id}`;

    const result = axios.delete(url).then((res) => res.data)
    const data = result.data;
    if (data === data) {
      yield put(getFavoriteJobs());
    }
  } catch (e) {
    console.warn(e);
  }
}

function* getAppliedJobsSaga() {
  try {
    const url = `${API_SERVER}/GetAppliedJobPostByEmail`;
    const email = store.getState().client.user.data.email;
    const body = JSON.stringify({
      email,
    });
    const result = yield call(apiManualPost, url, body);
    const resultParsed = JSON.parse(result.data);
    if (resultParsed) {
      yield put(getAppliedJobsSuccess(resultParsed));
    }
  } catch (e) {
    console.log(e);
  }
}
function* getFavoriteJobsSaga() {
  try {
    const url = `https://localhost:7262/getAllApplicants`;

    const result = yield call(apiManualRequest, url);
    const data = result.data
    const {favoriteJobs} = data[0]

    if (favoriteJobs === favoriteJobs) {
      yield put(getFavoriteJobsSuccess(favoriteJobs));
    } else {
      //yield put(getFavoriteJobsSuccess([]));
    }
  } catch (e) {
    console.log(e);
  }
}

function* getApplicantDashboardInfoSaga() {
  try {
    const  id  = store.getState().client.user.data.company_id
    const url = `https://localhost:7262/getAllApplicants/${id}`;
    //const email = store.getState().client.user.data.email;
    //const firstname = store.getState().client.user.data.email;
    //const lastname = store.getState().client.user.data.email;
    // const body = JSON.stringify({
    //   email,
    //   firstname,
    //   lastname,
    // });
    const result = yield call(apiManualRequest, url);
    const resultParsed = result.data;
    yield put(getApplicantDashboardInfoSuccess(resultParsed));
  } catch (e) {
    console.log(e);
  }
  // try {
  //   const url = `${API_SERVER}/GetApplicantDashboardInfo`;
  //   const email = store.getState().client.user.data.email;
  //   const firstname = store.getState().client.user.data.email;
  //   const lastname = store.getState().client.user.data.email;
  //   const body = JSON.stringify({
  //     email,
  //     firstname,
  //     lastname,
  //   });
  //   const result = yield call(apiManualPost, url, body);
  //   const resultParsed = JSON.parse(result.data);
  //   yield put(getApplicantDashboardInfoSuccess(resultParsed));
  // } catch (e) {
  //   console.log(e);
  // }
}

function* toggleEmailNotificationSaga() {
  try {
    const url = `${API_SERVER}/UpdateApplicantEmailNotification`;
    const email = store.getState().client.user.data.email;
    const isToggleOn = store.getState().jobs.notificationToggleBtn;
    const formValues = getFormValues("jobPreference")(store.getState());

    const body = JSON.stringify({
      ...formValues,
      email_notice_active: isToggleOn,
      email,
      job_category:
        formValues.job_category.length > 0
          ? formValues.job_category.map((category) => category.id.toString())
          : undefined,
      job_type:
        formValues.job_type.length > 0
          ? formValues.job_type.map((el) => el.type.toString())
          : undefined,
      job_hours:
        formValues.job_hours.length > 0
          ? formValues.job_hours.map((el) => el.type.toString())
          : undefined,
    });

    const result = yield call(apiManualPost, url, body);
    if (
      result.data === "Applicant's email notification updated successfully!"
    ) {
      yield put(showSuccessSnackbar());
      yield put(getApplicantDashboardInfo());
    } else {
      yield put(showFailedSnackbar());
    }
  } catch (e) {
    console.log(e);
  }
}
function* updateEmailNotificationSaga() {
  try {
    const url = `${API_SERVER}/UpdateApplicantEmailNotification`;
    const email = store.getState().client.user.data.email;
    const isToggleOn = 1;
    const formValues = getFormValues("jobPreference")(store.getState());
    const body = JSON.stringify({
      ...formValues,
      email_notice_active: isToggleOn,
      email,
      job_category:
        formValues.job_category.length > 0
          ? formValues.job_category.map((category) => category.id.toString())
          : undefined,
      job_type:
        formValues.job_type.length > 0
          ? formValues.job_type.map((el) => el.type.toString())
          : undefined,
      job_hours:
        formValues.job_hours.length > 0
          ? formValues.job_hours.map((el) => el.type.toString())
          : undefined,
    });
    const result = yield call(apiManualPost, url, body);
    if (
      result.data === "Applicant's email notification updated successfully!"
    ) {
      yield put(showSuccessSnackbar());
      yield put(getApplicantDashboardInfo());
    } else {
      yield put(showFailedSnackbar());
    }
  } catch (e) {
    console.log(e);
  }
}

// RESET SEARCH CRITERIA FORM

function* resetSearchCriteriaFormSaga() {
  try {
    yield put(reset("searchCriteria"));
  } catch (error) {
    console.log(error);
  }
}

export function* watchFilterJobs() {
  yield takeEvery(FILTER_JOBS, filterJobsSaga);
}

export function* watchGetJobDetailsById() {
  yield takeEvery(GET_JOB_DETAILS_BY_ID, getJobDetailsByIdSaga);
}

export function* watchtoggleFavoriteJobs() {
  yield takeEvery(TOGGLE_FAVORITE_JOBS, toggleFavoriteJobsSaga);
}

export function* watchgetAppliedJobsSaga() {
  yield takeEvery(GET_APPLIED_JOBS, getAppliedJobsSaga);
}
export function* watchgetFavoriteJobsSaga() {
  yield takeEvery(GET_FAVORITE_JOBS, getFavoriteJobsSaga);
}

export function* watchgetApplicantDashboardInfoSaga() {
  yield takeEvery(GET_APPLICANT_DASHBOARD_INFO, getApplicantDashboardInfoSaga);
}
export function* watchtoggleEmailNotificationSaga() {
  yield takeEvery(TOGGLE_EMAIL_NOTIFICATION, toggleEmailNotificationSaga);
}
export function* watchupdateEmailNotificationSaga() {
  yield takeEvery(UPDATE_EMAIL_NOTIFICATION, updateEmailNotificationSaga);
}
export function* watchdeleteFavoriteJobsSaga() {
  yield takeEvery(DELETE_FAVORITE_JOBS, deleteFavoriteJobsSaga);
}

export function* watchresetSearchCriteriaFormSaga() {
  yield takeEvery(RESET_SEARCH_CRITERIA_FORM, resetSearchCriteriaFormSaga);
}
