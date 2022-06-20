import { reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { addCompanyProfile, getCompanyProfile, closeSnackbar, searchCompanyDetails, loadSelectedCompany, closeCompanyLists } from '../../actions';
import { profileValidate as validate } from '../validate';
import AddNewCompanyProfileComponent from '../../components/companies/addNewCompanyProfile.component';

const AddNewProfileContainerForm = reduxForm({
  form: 'newCompanyForm',
  enableReinitialize: true,
  validate,
})(AddNewCompanyProfileComponent);

const mapStateToProps = state => {
  return {
    logo: formValueSelector('newCompanyForm')(state, 'logo_document'),
    companyLists: state.companyLists.companyLists,
    apiSuccess: state.companyLists.apiSuccess,
  };
};
const mapDispatchToProps = {
  addCompanyProfile,
  getCompanyProfile,
  closeSnackbar,
  searchCompanyDetails,
  loadSelectedCompany,
  closeCompanyLists,
};
export default connect(mapStateToProps, mapDispatchToProps)(AddNewProfileContainerForm);
