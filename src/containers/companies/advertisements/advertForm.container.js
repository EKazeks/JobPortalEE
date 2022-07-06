import { reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import AdvertFormComponent from '../../../components/companies/advertisements/advertForm.component';
import {
  saveAndPublishAdvertisement,
  saveAdvertisementAsDraft,
  closeSnackbar,
  clearImagesFromState,
  choosePaymentMethod,
  addExtraService,
  changeRoute,
  getAllJobCategoryFromEstoniaSuccess
} from '../../../actions';
import store from '../../../store';
import { jobPostFormValidate as validate } from '../../validate';

const AdvertFormContainer = reduxForm({
  form: 'vacancy',

  validate,
})(AdvertFormComponent);

const mapStateToProps = state => {
  //let companyName = store.getState().usersCompanyList.selectedCompany?.company_name;
  // let language = formValueSelector('vacancy')(store.getState(), 'email_language');
  // let emailMessage = messageTemplate(companyName, language);

  return {
    image: formValueSelector('vacancy')(state, 'image_document'),
    jobCategories: state.jobCategories.jobCategories.filter(jobs => jobs.type !== 'all'),
    selectedCampaign: store.getState().advertisement.selectedCampaign && store.getState().advertisement.selectedCampaign,
    apiSuccess: store.getState().advertisement.apiSuccess,
    apiFailed: store.getState().advertisement.apiFailed,
    showSpinner: store.getState().advertisement.showSpinner,
    isToEdit: state.advertisement.isToEdit,
    synchronousError: state.form && state.form.vacancy && state.form.vacancy.syncErrors,
    showPaymentDialog: state.asyncActions.showPaymentDialog,
    extraService: state.advertisement.extraService,

    // initialValues: {
    //   notice_frequency: '7',
    //   email_language: [
    //     {
    //       type: 'finnish',
    //       label: 'Finnish',
    //     },
    //   ],
    //   //email_message: emailMessage,
    //   email_subject: `Kiitos hakemuksesta ${companyName}`,
    // },
  };
};

const mapDispatchToProps = {
  saveAndPublishAdvertisement,
  saveAdvertisementAsDraft,
  closeSnackbar,
  clearImagesFromState,
  choosePaymentMethod,
  addExtraService,
  changeRoute,
  getAllJobCategoryFromEstoniaSuccess,
};
export default connect(mapStateToProps, mapDispatchToProps)(AdvertFormContainer);
