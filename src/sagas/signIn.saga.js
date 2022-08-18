import { takeEvery, call, put, cancelled } from "redux-saga/effects";
import { getFormValues } from "redux-form";
import CryptoJS from "crypto-js";
import {
  SIGNIN_FORM_SUBMIT,
  VPT_IDENTITY_SERVER,
  LOGOUT,
  ESTONIAN_USER_VALIDATE,
} from "../constants";
import store from "../store";
import { loginPost } from "../utils/request";
import {
  signInFormSubmitFailed,
  signInFormSubmitSuccess,
  setClient,
  unsetClient,
  getAllJobCategory,
  getAllCampaigns,
  getApplicantProfile,
  closeDialog,
  getUserCompanyList,
  getCompanyProfile,
  navigateAdsFromMainMenu,
} from "../actions";
import browserHistory from "../history";

function* signInSaga() {
  let result;
  try {
    const url = `${ESTONIAN_USER_VALIDATE}`;
    const formValues = getFormValues("signin")(store.getState());
    const hashedPassword = CryptoJS.SHA256(formValues.password).toString();
    // Checking the following flag to decide where to route users after logging in.

    const body = JSON.stringify({
      email: formValues.email,
      password: hashedPassword,
      SubjectId: formValues.email,
    });
    result = yield call(loginPost, url, body);
    yield put(setClient(result));
    localStorage.setItem("user", JSON.stringify(result));

    if (result.data.access_token) {
      yield put(signInFormSubmitSuccess());
      yield put(closeDialog()); // If users login to add job posts as favorites!
      const companyId = store.getState().client.user.data.company_id;
      const userType = store.getState().client.user.data.user_type;
      const userRole =
        store.getState().client.user.data.user_role === 0
          ? "superUser"
          : "normalUser";
      // Do the following For companies

      if (userType === "company") {
        yield put(getAllCampaigns());
        yield put(getAllJobCategory());
        /*  if (companyId !== null) {
          // To take companies to active jobs page after signin if they have updated their profile
          yield put(navigateAdsFromMainMenu(1));
        } */

        // Initially, if companies haven't added their full profile checkUser API gives companyId as null.
        if (companyId === null) {
          browserHistory.push("/omat-tiedot");
        } else {
          if (userRole === "superUser") {
            yield put(getUserCompanyList());
          }
          yield put(getCompanyProfile());
          yield put(navigateAdsFromMainMenu(1));
          browserHistory.push("/omat-ilmoitukseni");
        }
      }
      // Do the following For applicants

      if (userType === "applicant") {
        yield put(getApplicantProfile());
        yield put(getAllJobCategory());

        browserHistory.push("/etusivu");
      }

      // Do the following For admin

      if (userType === "admin") {
        yield put(getAllCampaigns());
        browserHistory.push("/yritysasiakkaat");
      }
    } else {
      yield put(signInFormSubmitFailed(result.data[0].error_description));
      yield put(unsetClient());
      localStorage.removeItem("user");
      browserHistory.push("/login");
    }
  } catch (error) {
    console.log(error);
    yield put(signInFormSubmitFailed(error));
    yield put(unsetClient());
    localStorage.removeItem("user");
    browserHistory.push("/login");
  } finally {
    if (yield cancelled()) {
      browserHistory.push("/login");
    }
    return result;
  }
}

function* logout() {
  yield put(unsetClient());
  localStorage.removeItem("user");
  browserHistory.push("/login");
}
export function* watchSignInSaga() {
  yield takeEvery(SIGNIN_FORM_SUBMIT, signInSaga);
}

export function* watchLogoutSaga() {
  yield takeEvery(LOGOUT, logout);
}
