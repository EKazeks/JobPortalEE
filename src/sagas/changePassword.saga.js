import { call, put, takeEvery } from 'redux-saga/effects';
import { getFormValues, reset } from 'redux-form';
import CryptoJS from 'crypto-js';
import { API_SERVER, CHANGE_PASSWORD } from '../constants';
import store from '../store';
import { apiManualPost } from '../utils/request';
import { showSuccessSnackbar, showFailedSnackbar } from '../actions';

function* changePasswordSaga() {
  try {
    const formValues = getFormValues('changePassword')(store.getState());
    const hashedOldPassword = CryptoJS.SHA256(formValues.current_password).toString();
    const hashedPassword = CryptoJS.SHA256(formValues.new_password).toString();
    const uuid = store.getState().client.user.data.id;
    const body = JSON.stringify({
      oldpassword: hashedOldPassword,
      password: hashedPassword,
      uuid,
    });
    const url = `${API_SERVER}/UpdateUserCredentials`;
    const result = yield call(apiManualPost, url, body);
    yield put(reset('password'));
    if (result.data === 'User password updated successfully!') {
      yield put(showSuccessSnackbar());
      yield put(reset('changePassword'));
    } else {
      yield put(showFailedSnackbar());
    }
  } catch (e) {
    // passwordUpdateFailed(e)
  }
}

export function* watchChangePasswordSaga() {
  yield takeEvery(CHANGE_PASSWORD, changePasswordSaga);
}
