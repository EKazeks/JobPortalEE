import { takeEvery } from 'redux-saga/effects';
import store from '../store';
import { LANGUAGE_CHANGE } from '../constants/index';
import i18n from '../utils/i18n';

function* changeLanguage() {
  try {
    const selectedLang = store.getState().language.lang;
    yield i18n.changeLanguage(selectedLang);
  } catch (error) {
    console.warn(error);
  }
}
export function* watchChangeLanguageSaga() {
  yield takeEvery(LANGUAGE_CHANGE, changeLanguage);
}
