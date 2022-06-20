import { takeEvery, put, call } from 'redux-saga/effects';
import { SEARCH_COMPANY_DETAILS, LOAD_SELECTED_COMPANY } from '../constants';
import { searchCompanyDetailsSuccess } from '../actions';
import { change } from 'redux-form';

function* companyDetailsSearch({ companyName }) {
  try {
    const api = 'https://avoindata.prh.fi/bis/v1/?name=';
    const url = `${api}${companyName}`;

    const response = yield call(fetch, url);
    const data = yield call([response, response.json]);
    const companyDetails = data.results;

    yield put(searchCompanyDetailsSuccess(companyDetails));
  } catch (err) {
    console.warn(err);
  }
}

// fetch company address

function* loadSelectedCompanySaga({ selectedCompany, formName }) {
  try {
    const response = yield call(fetch, selectedCompany);
    const data = yield call([response, response.json]);
    const selectedCompanyDetails = data.results;

    const compName = selectedCompanyDetails[0].name;

    yield put(change(formName, 'company_name', compName));

    const compBusinessId = selectedCompanyDetails[0].businessId;

    yield put(change(formName, 'business_id', compBusinessId));

    const compStreet = selectedCompanyDetails[0].addresses[0] && selectedCompanyDetails[0].addresses[0].street;

    yield put(change(formName, 'address', compStreet));

    const compCity = selectedCompanyDetails[0].addresses[0] && selectedCompanyDetails[0].addresses[0].city;
    yield put(change(formName, 'city', compCity));

    const phone = selectedCompanyDetails[0].contactDetails[0] && selectedCompanyDetails[0].contactDetails[0].value;

    const formattedPhone = !!phone && phone.replace(/\s/g, '').replace('+358', 0);

    if (formattedPhone) {
      yield put(change(formName, 'contact_number', formattedPhone));
    }

    const compPostCode = selectedCompanyDetails[0].addresses[0] && selectedCompanyDetails[0].addresses[0].postCode;

    yield put(change(formName, 'zip_code', compPostCode));
  } catch (e) {
    console.warn(e);
  }
}

// fetch company
export function* watchCompanyDetailsSearch() {
  yield takeEvery(SEARCH_COMPANY_DETAILS, companyDetailsSearch);
}

//fetch company address
export function* watchLoadSelectedCompanySaga() {
  yield takeEvery(LOAD_SELECTED_COMPANY, loadSelectedCompanySaga);
}
