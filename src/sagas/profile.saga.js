import { change, getFormValues } from "redux-form";
import { takeEvery, call, put } from "redux-saga/effects";
import {
  API_SERVER,
  ADD_COMPANY_PROFILE,
  GET_COMPANY_PROFILE,
  ADD_APPLICANT_PROFILE,
  GET_APPLICANT_PROFILE,
  ADD_NEW_COMPANY_START,
} from "../constants";
import store from "../store";
import { apiManualPost, apiManualRequest } from "../utils/request";
import {
  getCompanyProfileSuccess,
  showSuccessSnackbar,
  showFailedSnackbar,
  getCompanyProfile,
  getApplicantProfileSuccess,
  getApplicantProfile,
  // navigateAdsFromMainMenu,
  showCustomErrorMsg,
  getUserCompanyList,
} from "../actions";
import { filterObj } from "../utils/wrappers";
import i18next from "i18next";
import axios from "axios";

function* addCompanyProfile() {
  try {
    let url;
    let body;
    const { client, companyProfile } = store.getState();
    const { isToAddNewProfile } = companyProfile;
    const formName = isToAddNewProfile ? "newCompanyForm" : "companyProfile"; // Depending on if users are adding additional company
    const formValues = getFormValues(formName)(store.getState());
    const { uploadedLogo } = companyProfile;
    const uuid = client.user.data[2];
    const refinedFormValues = filterObj("logo_document", formValues);

    if (isToAddNewProfile || formValues.company_id === 0) {
      // For newly registered company users - getCompanyProfile gives company id 0.
      url = `${API_SERVER}/AddCompanyProfile`;
    } else {
      url = `${API_SERVER}/UpdateCompanyProfile`;
    }
    // Send companyUser as empty array if no additional users/ Back-end needs it
    if (!formValues.companyUser) {
      formValues.companyUser = [];
    }
    if (!refinedFormValues.companyUser) {
      refinedFormValues.companyUser = [];
    }

    if (Array.isArray(formValues.logo_document) === true) {
      body = JSON.stringify({
        ...refinedFormValues,
        uuid,
      });
    } else if (!uploadedLogo.name) {
      body = JSON.stringify({
        ...formValues,
        uuid,
      });
    } else {
      const base64 = formValues.logo_document;
      body = JSON.stringify({
        ...formValues,
        uuid,
        logo_document: {
          data: base64,
          filename: uploadedLogo.name.replace(/\s+\(\d+\)/g, "JP"), // If stored filename has (int), dropzone doesn't understand the path..so changing such names before sending to db.
          filetype: uploadedLogo.type,
          path: "logo",
        },
      });
    }
    const result = yield call(apiManualPost, url, body);
    if (
      result.data === "Company Profile updated successfully!" ||
      result.data === "Company Profile saved successfully!"
    ) {
      yield put(showSuccessSnackbar());
      if (isToAddNewProfile) {
        yield put(getUserCompanyList());
      } else {
        yield put(getCompanyProfile());
        yield put(getUserCompanyList(true));
        // yield put(navigateAdsFromMainMenu(1));
      }
      // console.log('calling addcompany API', result);
    } else if (result.data.includes("Employee error")) {
      const email = result.data.split("-")[1];
      yield put(
        showCustomErrorMsg(`${email}${i18next.t("profile:existingUser")}`)
      );
    } else if (result.data.includes("Same company already exists")) {
      const msg = i18next.t("profile:companyExists");
      yield put(showCustomErrorMsg(msg));
    } else {
      yield put(showFailedSnackbar());
    }
  } catch (e) {
    console.log(e);
    yield put(showFailedSnackbar());
  }
}

function* getCompanyProfileSaga() {
  const company_id_to_fetch = store.getState().client.user.data.company_id;
  try {
    const url = `https://localhost:7262/getCompanyById/${company_id_to_fetch}`;
    const { client, usersCompanyList } = store.getState();

    const uuid = client.user.data.id;
    const roleId = store.getState().client.user.data.id;
    const selectedCompanyId = usersCompanyList.selectedCompany.company_id;
    const assignedCompanyId = client.user.data.company_id;
    const company_id = roleId === 0 ? selectedCompanyId : assignedCompanyId; // For super user with more than 1 company, use selected id otherwise assigned id (e.g. added employee or super user with only 1 company)

    const result = yield call(apiManualRequest, url);
    yield put(getCompanyProfileSuccess(result.data));
  } catch (error) {
    console.warn(error);
  }
}

// JOBSEEKER PROFILE
function* getApplicantProfileSaga() {
  try {
    const { client } = store.getState();
    const url = `${API_SERVER}/GetApplicantProfile`;
    const uuid = client.user.data[2];
    const email = client.user.data[1];
    const body = JSON.stringify({
      email,
      uuid,
    });
    const result = yield call(apiManualPost, url, body);
    const resultParsed = JSON.parse(result.data)[0];
    yield put(getApplicantProfileSuccess(resultParsed));
  } catch (error) {
    console.warn(error);
  }
}

function* addApplicantProfile() {
  try {
    let url;
    let body;
    const { client, jobseekerProfile } = store.getState();
    const uuid = client.user.data[2];
    const formValues = getFormValues("jobseekerProfile")(store.getState());
    const { uploadedProfilePic } = jobseekerProfile;
    const uploadedCV =
      jobseekerProfile.uploadedDocument && jobseekerProfile.uploadedDocument[0];
    const cv_base64 = formValues && formValues.cv_document;

    if (!!uploadedCV && formValues.cv_document) {
      formValues.cv_document = {
        document_id: uploadedCV.id,
        path: "Jobportal",
        filename: uploadedCV.name,
        filetype: uploadedCV.type,
        data: cv_base64,
      };
    } else {
      delete formValues.cv_document;
    }

    const refinedFormValues = filterObj("photo_document", formValues);

    if (!formValues.applicant_id) {
      url = `${API_SERVER}/AddApplicantProfile`;
    } else {
      url = `${API_SERVER}/UpdateApplicantProfile`;
    }

    if (Array.isArray(formValues.photo_document) === true) {
      body = JSON.stringify({
        ...refinedFormValues,
        uuid,
      });
    } else if (!uploadedProfilePic.name) {
      body = JSON.stringify({
        ...formValues,
        uuid,
      });
    } else {
      const base64 = formValues.photo_document;
      body = JSON.stringify({
        ...formValues,
        uuid,
        photo_document: {
          data: base64,
          filename: uploadedProfilePic.name.replace(/\s+\(\d+\)/g, "JP"), // If stored filename has (int), dropzone doesn't understand the path..so changing such names before sending to db.
          filetype: uploadedProfilePic.type,
          path: "jobportal",
        },
      });
    }

    const result = yield call(apiManualPost, url, body);
    if (result.data === "Applicant Profile updated successfully!") {
      yield put(getApplicantProfile());
      yield put(showSuccessSnackbar());
    } else {
      yield put(showFailedSnackbar());
    }
  } catch (e) {
    console.log(e);
  }
}

function* addNewCompanySaga() {
  try {
    const {
      firstname,
      lastname,
      email,
    } = store.getState().companyProfile.profile; // Populate the new form with registered user's details
    yield put(change("newCompanyForm", "firstname", firstname));
    yield put(change("newCompanyForm", "lastname", lastname));
    yield put(change("newCompanyForm", "email", email));
  } catch (e) {
    console.log(e);
  }
}

export function* watchAddCompanyProfile() {
  yield takeEvery(ADD_COMPANY_PROFILE, addCompanyProfile);
}

export function* watchGetCompanyProfile() {
  yield takeEvery(GET_COMPANY_PROFILE, getCompanyProfileSaga);
}

export function* watchAddApplicantProfile() {
  yield takeEvery(ADD_APPLICANT_PROFILE, addApplicantProfile);
}

export function* watchGetApplicantProfile() {
  yield takeEvery(GET_APPLICANT_PROFILE, getApplicantProfileSaga);
}

export function* watchAddNewCompany() {
  yield takeEvery(ADD_NEW_COMPANY_START, addNewCompanySaga);
}
