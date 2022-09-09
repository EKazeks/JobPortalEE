import { change, getFormValues } from "redux-form";
import { takeEvery, call, put, all } from "redux-saga/effects";
import {
  API_SERVER,
  ADD_COMPANY_PROFILE,
  GET_COMPANY_PROFILE,
  ADD_APPLICANT_PROFILE,
  GET_APPLICANT_PROFILE,
  ADD_NEW_COMPANY_START,
  API_SERVER_UPDATE_COMPANY_INFO,
  ESTONIAN_GET_APPLICANT_PROFILE,
} from "../constants";
import store from "../store";
import { apiManualPatch, apiManualPost, apiManualRequest } from "../utils/request";
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
    const id = companyProfile.profile.id;
    const companyId = companyProfile.profile.user.companyId;
    const refinedFormValues = filterObj("logo_document", formValues);

    console.log("refinedFormValues =>", refinedFormValues);
    console.log("formValues =>", formValues);

    if (isToAddNewProfile || formValues.companyBusinessId === null) {
      // For newly registered company users - getCompanyProfile gives company id 0.
      url = `https://localhost:7262/addAditionalCompany`;
    } else {
      url = `${API_SERVER_UPDATE_COMPANY_INFO}`;
    }
    // Send companyUser as empty array if no additional users/ Back-end needs it
    if (!formValues.companyAdditionalUsers) {
      formValues.companyAdditionalUsers = [];
    }
    if (!refinedFormValues.companyAdditionalUsers) {
      refinedFormValues.companyAdditionalUsers = [];
    }

    if (Array.isArray(formValues.logo_document) === true) {
      const base64 = formValues.logo_document;
      body = JSON.stringify({
        id: refinedFormValues.id,
        companyName: refinedFormValues.companyName,
        firstName: refinedFormValues.firstName,
        lastName: refinedFormValues.lastName,
        email: refinedFormValues.email,
        telephone: refinedFormValues.telephone,
        businessId: refinedFormValues.companyBusinessId,
        address: refinedFormValues.address,
        city: refinedFormValues.city,
        postalCode: refinedFormValues.zipCode,
        companyUrl: refinedFormValues.companyUrl,
        companyInformation: refinedFormValues.profileDescription,
        companyLogo: base64,
        companyAdditionalUsers: refinedFormValues.companyAdditionalUsers
      });
    } else if (!uploadedLogo.name) {
      const base64 = formValues.logo_document;
      body = JSON.stringify({
        id: refinedFormValues.id,
        companyName: refinedFormValues.companyName,
        firstName: refinedFormValues.firstName,
        lastName: refinedFormValues.lastName,
        email: refinedFormValues.email,
        telephone: refinedFormValues.telephone,
        businessId: refinedFormValues.companyBusinessId,
        address: refinedFormValues.address,
        city: refinedFormValues.city,
        postalCode: refinedFormValues.zipCode,
        companyUrl: refinedFormValues.companyUrl,
        companyInformation: refinedFormValues.profileDescription,
        companyLogo: base64,
        companyAdditionalUsers: refinedFormValues.companyUser
      });
    } else {
      const base64 = formValues.logo_document;
      body = JSON.stringify({
        id: refinedFormValues.id,
        companyName: refinedFormValues.companyName,
        firstName: refinedFormValues.firstName,
        lastName: refinedFormValues.lastName,
        email: refinedFormValues.email,
        telephone: refinedFormValues.telephone,
        businessId: refinedFormValues.companyBusinessId,
        address: refinedFormValues.address,
        city: refinedFormValues.city,
        postalCode: refinedFormValues.zipCode,
        companyUrl: refinedFormValues.companyUrl,
        companyInformation: refinedFormValues.profileDescription,
        companyLogo: base64,
        companyAdditionalUsers: refinedFormValues.companyUser
      });
    } 

    const base64 = formValues.logo_document;
   const bodyForAddCompany = JSON.stringify({
      id: id,
      companyName: refinedFormValues.company_name,
      firstName: refinedFormValues.firstName,
      lastName: refinedFormValues.lastName,
      email: refinedFormValues.email,
      telephone: refinedFormValues.contact_number,
      businessId: refinedFormValues.business_id,
      address: refinedFormValues.address,
      city: refinedFormValues.city,
      postalCode: refinedFormValues.zip_code,
      companyUrl: refinedFormValues.company_url,
      profileDescription: refinedFormValues.profile_description,
      //companyLogo: base64,
      additionalCompaniesAdditionalUsers: refinedFormValues.companyAdditionalUsers,
      companyId: companyId
    });
  //   const result = yield call(apiManualPost, url, body);
  //   if (result.data && isToAddNewProfile === true) {
  //     yield put(showSuccessSnackbar());
  //     if (result.data && isToAddNewProfile === false) {
  //       yield call(apiManualPatch, url, body);
  //       yield put(getCompanyProfile());
  //       yield put(getUserCompanyList(true));
  //     } else {
  //       yield put(getUserCompanyList());
  //       // yield put(navigateAdsFromMainMenu(1));
  //     }
  //   } else if (result.data != result.data) {
  //     //const email = result.data.split("-")[1];
  //     yield put(
  //       // showCustomErrorMsg(`${email}${i18next.t("profile:existingUser")}`)
  //       showCustomErrorMsg(`${i18next.t("profile:existingUser")}`)
  //     );
  //   } else if (result.data.includes("Same company already exists")) {
  //     const msg = i18next.t("profile:companyExists");
  //     yield put(showCustomErrorMsg(msg));
  //   } else {
  //     yield put(showFailedSnackbar());
  //   }
  // } catch (e) {
  //   console.log(e);
  //   yield put(showFailedSnackbar());
  // }
    

    const resultForUpdateCompany = yield call(apiManualPatch, url, body);
    const resultForAddCompany = yield call(apiManualPost, url, bodyForAddCompany)

    if (resultForUpdateCompany.data || resultForAddCompany.data) {
      yield put(showSuccessSnackbar());
      if (resultForAddCompany.data && isToAddNewProfile === true) {
        //yield call(apiManualPost, url, body)
        yield put(getUserCompanyList());
      } else {
        yield put(getCompanyProfile());
        yield put(getUserCompanyList(true));
        // yield put(navigateAdsFromMainMenu(1));
      }
      // console.log('calling addcompany API', result);
    } else if (resultForUpdateCompany.data != resultForUpdateCompany.data) {
      //const email = result.data.split("-")[1];
      yield put(
        // showCustomErrorMsg(`${email}${i18next.t("profile:existingUser")}`)
        showCustomErrorMsg(`${i18next.t("profile:existingUser")}`)
      );
    } else if (resultForUpdateCompany.data.includes("Same company already exists")) {
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
    const selectedCompanyId = usersCompanyList.companiesList.user.companyId;
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
     const url = `${ESTONIAN_GET_APPLICANT_PROFILE}/${client.user.data.company_id}`;
    //const url = `${ESTONIAN_GET_APPLICANT_PROFILE}/${id}`;

    const result = yield call(apiManualRequest, url);

    yield put(getApplicantProfileSuccess(result.data));
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
    const cv_base64 = formValues && formValues.cv_document

    if (!!uploadedCV && formValues.cv_document) {
      formValues.CV = {
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
      url = `https://localhost:7262/fullFillApplicant`;
    } else {
      url = `https://localhost:7262/fullFillApplicant`;
    }
    console.log('FORMVALUES ===>>', formValues);
    if (Array.isArray(formValues.photo_document) === true) {
      const base64 = formValues.photo_document;
      body = {
        id: formValues.id,
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        email: formValues.email,
        contactNumber: formValues.contactNumber,
        linkedIn: formValues.linkedIn,
        portfolio: formValues.portfolio,
        description: formValues.profileDescription,
        applicantPhoto: base64.toString(),
        applicantCv: cv_base64,
        applicantCvFileName: uploadedCV.name
      };
    } else if (!uploadedProfilePic.name) {
      const base64 = formValues.photo_document;
      body = {
        id: formValues.id,
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        email: formValues.email,
        contactNumber: formValues.contactNumber,
        linkedIn: formValues.linkedIn,
        portfolio: formValues.portfolio,
        description: formValues.profileDescription,
        applicantPhoto: base64.toString(),
        applicantCv: cv_base64,
        applicantCvFileName: uploadedCV.name
      };
    } else {
      const base64 = formValues.photo_document;
      body = {
        id: formValues.id,
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        email: formValues.email,
        contactNumber: formValues.contactNumber,
        linkedIn: formValues.linkedIn,
        portfolio: formValues.portfolio,
        description: formValues.profileDescription,
        applicantPhoto: base64.toString(),
        applicantCv: cv_base64,
        applicantCvFileName: uploadedCV.name
      };
    }

    const result = yield call(axios.patch(url, body).then((res) => res.data));
    if (result.data) {
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
      firstName,
      lastName,
      email,
    } = store.getState().companyProfile.profile; // Populate the new form with registered user's details
    yield put(change("newCompanyForm", "firstName", firstName));
    yield put(change("newCompanyForm", "lastName", lastName));
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
