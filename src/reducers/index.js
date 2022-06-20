import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import advertisements from './advertisementsReducer';
import jobsReducer from './jobsReducer';
import signUpReducer from './signUpReducer';
import signInReducer from './signInReducer';
import clientReducer from './clientReducer';
import 'bootstrap/dist/css/bootstrap.min.css';
import companyProfileReducer from './companyProfileReducer';
import jobseekerProfileReducer from './jobseekerProfile.Reducer';
import resetPassword from './resetPasswordReducer';
import changePassword from './changePasswordReducer';
import asyncActionsReducer from './asyncActionsReducer';
import jobCategoriesReducer from './jobCategoriesReducer';
import paginationReducer from './paginationReducer';
import AdminReducer from './adminReducer';
import companyUserReducer from './companyUserReducer';
import language from './lang.reducer';
import companyLists from './searchCompanyDetails.reducer';
import paymentReducer from './paymentReducer';
import {jobsOffersReducer} from './jobsOffersReducer';

const appReducer = combineReducers({
  advertisement: advertisements,
  form: formReducer,
  jobs: jobsReducer,
  offers: jobsOffersReducer,
  signUp: signUpReducer,
  signIn: signInReducer,
  client: clientReducer,
  resetPassword,
  changePassword,
  companyProfile: companyProfileReducer,
  jobseekerProfile: jobseekerProfileReducer,
  asyncActions: asyncActionsReducer,
  jobCategories: jobCategoriesReducer,
  pagination: paginationReducer,
  admin: AdminReducer,
  usersCompanyList: companyUserReducer,
  language: language,
  companyLists,
  payment: paymentReducer,
});

// To initialize the app with initial state instead of the persisted state once the user logs out.
// When passing the first argument/state as undefined, reducers will return the initial state.

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    localStorage.removeItem('persist:root');
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
