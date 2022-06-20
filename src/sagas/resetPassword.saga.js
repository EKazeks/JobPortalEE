import { takeEvery, call, put } from 'redux-saga/effects';
import { getFormValues, reset } from 'redux-form';
import { API_SERVER, RESET_PASSWORD } from '../constants';
import store from '../store';
import { loginPost } from '../utils/request';
import { resetPasswordSubmitSuccess, resetPasswordSubmitFailed } from '../actions';

function* resetPassword() {
  try {
    const url = `${API_SERVER}/ResetPassword`;
    const { email } = getFormValues('resetPassword')(store.getState());
    const result = yield call(loginPost, url, JSON.stringify({ email }));
    if (result.data === 'User password reset successfully!') {
      yield put(resetPasswordSubmitSuccess());
    } else {
      yield put(resetPasswordSubmitFailed());
    }
    yield put(reset('resetPassword'));
  } catch (error) {
    console.log(error);
  }
}
export function* watchResetPassword() {
  yield takeEvery(RESET_PASSWORD, resetPassword);
}
