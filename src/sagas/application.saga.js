import { call, put, takeEvery } from 'redux-saga/effects';
import { getFormValues } from 'redux-form';
import { API_SERVER, API_SERVER_EST, CLOSE_DIALOG, SEND_APPLICATION } from '../constants';
import { apiManualPost, apiOpenPost } from '../utils/request';
import store from '../store';
import {
  sendApplicationSuccess,
  showFailedSnackbar,
  populateSignupForm,
  // closeDialog
} from '../actions';
import browserHistory from '../history';

function* sendApplicationSaga() {
  try {
    const {idToApply} = store.getState().jobs;
    const id = idToApply;
    const company_id = idToApply.split('JP')[0];
    const post_id = idToApply.split('JP')[1];
    const {jobPostNumber} = store.getState().jobs;
    const uploadedCV = store.getState().jobs.uploadedDocument && store.getState().jobs.uploadedDocument[0];
    const cv_id_value = store.getState().jobseekerProfile.profile.cv_id;
    const cv_id = cv_id_value?.toString(); // optional chaining ?.
    const formValues = getFormValues('applicationForm')(store.getState());
    const cv_base64 = formValues && formValues.cv_document;

    if (!!uploadedCV && formValues.cv_document) {
      formValues.cv_document = {
        document_id: uploadedCV.id,
        path: '',
        filename: uploadedCV.name,
        filetype: uploadedCV.type,
        data: cv_base64,
      };
    } else {
      delete formValues.cv_document;
    }

    // Backend needs in the following format
    const url = `https://localhost:7262/addApplicationToOffer/`;
    const body = ({
      id:idToApply,
      firstName:formValues.firstname,
      lastName:formValues.lastname,
      email:formValues.email,
      phone:formValues.contact_number,
      linkedIn:formValues.linkedin,
      description:formValues.description,
      favouriteCandidate:0,
      note:formValues.application_description,
      jobpostId:idToApply,
    });
    const result = yield call(apiManualPost,url,JSON.stringify(body));

    const data = {
      firstName: formValues.firstname,
      lastName: formValues.lastname,
      email: formValues.email,
    };

    if (result.data.status != 400) {
      yield put(sendApplicationSuccess());
      yield put(populateSignupForm(data));
    } else {
      yield put(showFailedSnackbar());
    }
  } catch (e) {
    console.warn(e);
  }
}

function* closeDialogSaga() {
  try {
    const applicantSent = store.getState().asyncActions.applicantSent;
    if (applicantSent === true) {
      //browserHistory.push('/tyopaikat');
      yield put(browserHistory.push('/tyopaikat')); //Yield statement for generator function
    }
    //yield put(null); //Yield statement for generator function
  } catch (e) {
    console.warn(e);
  }
}

export function* watchSendApplication() {
  yield takeEvery(SEND_APPLICATION, sendApplicationSaga);
}

export function* watchCloseDialogSaga() {
  yield takeEvery(CLOSE_DIALOG, closeDialogSaga);
}
