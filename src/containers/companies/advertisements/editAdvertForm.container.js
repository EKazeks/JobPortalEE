import { reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import EditAdvertFormComponent from '../../../components/companies/advertisements/editAdvertForm.component';
import { saveAndPublishAdvertisement, updateAndPublishAdvertisement, closeSnackbar, clearImagesFromState, editOffer,editVacancyForm,populateVacancyForm } from '../../../actions';
import store from '../../../store';
import { jobPostFormValidate as validate } from '../../validate';

const EditAdvertFormContainer = reduxForm({
  form: 'editVacancy',
  validate,
})(EditAdvertFormComponent);

const mapStateToProps = state => ({
  // When backend sends back the data, image document is sent as company_image
  image: formValueSelector('editVacancy')(state, 'company_image')
    ? formValueSelector('editVacancy')(state, 'company_image')[0].path
    : formValueSelector('editVacancy')(state, 'image_document')
    ? formValueSelector('editVacancy')(state, 'image_document')
    : undefined,
  jobCategories: state.jobCategories.jobCategories.filter(jobs => jobs.type !== 'all'),
  apiSuccess: store.getState().advertisement.apiSuccess,
  apiFailed: store.getState().advertisement.apiFailed,
  showSpinner: store.getState().advertisement.showSpinner,
  synchronousError: state.form && state.form.editVacancy && state.form.editVacancy.syncErrors,
  idToCopy:store.getState().jobs.idToCopy,
  isOfferEdited:store.getState().jobs.isOfferEdited
});

const mapDispatchToProps = {
  saveAndPublishAdvertisement,
  closeSnackbar,
  updateAndPublishAdvertisement,
  clearImagesFromState,
  editOffer,
  editVacancyForm,
};
export default connect(mapStateToProps, mapDispatchToProps)(EditAdvertFormContainer);
