import { call, put, takeEvery } from 'redux-saga/effects';
import { getFormValues } from 'redux-form';
import { API_SERVER, CLOSE_DIALOG, SEND_APPLICATION } from '../constants';
import { apiOpenPost } from '../utils/request';
import store from '../store';
import {
  sendApplicationSuccess,
  showFailedSnackbar,
  populateSignupForm,
  // closeDialog
} from '../actions';
import browserHistory from '../history';

function* sendApplicationSaga({ id }) {
  try {
    const company_id = id.split('JP')[0];
    const post_id = id.split('JP')[1];
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

    // Back end needs in the following format
    const url = `${API_SERVER}/ApplyJobPost`;
    const body = JSON.stringify({
      ...formValues,
      company_id,
      post_id,
      cv_id,
    });
    const result = yield call(apiOpenPost, url, body);

    const data = {
      firstName: formValues.firstname,
      lastName: formValues.lastname,
      email: formValues.email,
    };

    if (result.data === 'Application to Job Post saved successfully!') {
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
