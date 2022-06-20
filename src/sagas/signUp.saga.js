import { call, put, takeEvery } from 'redux-saga/effects';
import { getFormValues } from 'redux-form';
import CryptoJS from 'crypto-js';
import { SIGNUP_FORM_SUBMIT, VPT_IDENTITY_SERVER } from '../constants';
import store from '../store';
import { registerPost } from '../utils/request';
import { signUpFormSubmitSuccess, signUpFormSubmitUserExistError, signUpFormSubmitFailed } from '../actions';

function* signUpSaga() {
  try {
    const url = `${VPT_IDENTITY_SERVER}/RegisterUser`;
    const formValues = getFormValues('signup')(store.getState());
    const hashedPassword = CryptoJS.SHA256(formValues.password).toString();

    const body = JSON.stringify({
      FirstName: formValues.firstName,
      Lastname: formValues.lastName,
      email: formValues.email,
      password: hashedPassword,
      user_type: formValues.user_type,
      SubjectId: formValues.email,
    });
    const result = yield call(registerPost, url, body);
    if (result.data.Server === 'Success') {
      yield put(signUpFormSubmitSuccess(result.data.Server));
    } else if (result.data.Server === 'UserExist') {
      yield put(signUpFormSubmitUserExistError(result.data.Server));
    } else {
      yield put(signUpFormSubmitFailed(result.data.Server));
    }
  } catch (error) {
    yield put(signUpFormSubmitFailed(error));
  }
}

export function* watchSignUpSaga() {
  yield takeEvery(SIGNUP_FORM_SUBMIT, signUpSaga);
}
