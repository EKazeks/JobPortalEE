import { call, put, takeEvery } from 'redux-saga/effects';
import { getFormValues } from 'redux-form';
import CryptoJS from 'crypto-js';
import { ESTONIAN_USER_REGISTER, SIGNUP_FORM_SUBMIT } from '../constants';
import store from '../store';
import { registerPost } from '../utils/request';
import { signUpFormSubmitSuccess, signUpFormSubmitUserExistError, signUpFormSubmitFailed } from '../actions';

function* signUpSaga() {
  try {
    const url = `${ESTONIAN_USER_REGISTER}`;
    const formValues = getFormValues('signup')(store.getState());
    const hashedPassword = CryptoJS.SHA256(formValues.password).toString();
    console.log('SIGNUP formValues =>', formValues)
    const body = JSON.stringify({
      firstName: formValues.firstName,
      lastname: formValues.lastName,
      email: formValues.email,
      password: hashedPassword,
      userType: formValues.user_type,
      //SubjectId: formValues.email,
    });
    const result = yield call(registerPost, url, body);
    if (result.data) {
      yield put(signUpFormSubmitSuccess(result.data));
    } else if (result.data != result.data) {
      yield put(signUpFormSubmitUserExistError(result.data));
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
