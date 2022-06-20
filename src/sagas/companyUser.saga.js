import { takeEvery, call, put } from 'redux-saga/effects';
import { getUserCompanyListSuccess, getCompanyProfile, navigateAdsFromMainMenu, getAllAdsByStatus, addNewCompanyEnd, selectCompany } from '../actions';
import { API_SERVER, GET_USER_COMPANIES_LIST, SELECT_COMPANY } from '../constants';

import store from '../store';
import { apiManualPost } from '../utils/request';

function* getCompaniesList({ isProfileUpdated }) {
  try {
    const email = store.getState().client.user.data[1];

    if (email) {
      const url = `${API_SERVER}/GetUserCompaniesList`;

      const data = {
        email,
      };

      const body = JSON.stringify(data);
      const result = yield call(apiManualPost, url, body);
      const parsedResult = JSON.parse(result.data);

      if (result.data) {
        yield put(getUserCompanyListSuccess(parsedResult));
        if (!isProfileUpdated) {
          // New company is added from add new company btn.
          yield put(addNewCompanyEnd());
          const newCompany = parsedResult[parsedResult.length - 1];
          yield put(selectCompany(newCompany));
        } else {
          //console.log('Existing profile updated');
        }
      } else {
        //console.log('no companies loaded');
      }
    }
  } catch (e) {
    console.log(e);
  }
}

function* selectCompanySaga() {
  try {
    yield put(getCompanyProfile());
    yield put(navigateAdsFromMainMenu(1));
    yield put(getAllAdsByStatus(0));
    yield put(getAllAdsByStatus(1));
    yield put(getAllAdsByStatus(2));
    //browserHistory.push('/omat-ilmoitukseni');
  } catch (error) {
    console.log(error);
  }
}

export function* watchGetCompaniesList() {
  yield takeEvery(GET_USER_COMPANIES_LIST, getCompaniesList);
}

export function* watchSelectCompanySaga() {
  yield takeEvery(SELECT_COMPANY, selectCompanySaga);
}
