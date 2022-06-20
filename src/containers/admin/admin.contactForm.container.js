import React from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import AdminContactFormComponent from '../../components/admin/admin.contactForm.component';
import { adminUpdateUserProfile, cancelEditContactDetails, searchCompanyDetails, loadSelectedCompany, closeCompanyLists } from '../../actions';
import { usersProfileValidate as validate } from '../validate';

class AdminContactFormContainer extends React.Component {
  componentDidMount() {
     this.props.getAllJobCategory();
  }

  render() {
    return <AdminContactFormComponent {...this.props} />;
  }
}
const AdminContactForm = reduxForm({
  form: 'adminContact',
  enableReinitialize: true, // When state value changes, we want to update the initial values
  destroyOnUnmount: false,
  validate,
})(AdminContactFormContainer);

const mapStateToProps = state => ({
  initialValues: state.admin.contactDetails, // When editIcon is clicked, contact details variable is updated with the existing details
  loading: state.asyncActions.showSpinner,
  companyLists: state.companyLists.companyLists,
  apiSuccess: state.companyLists.apiSuccess,
});

const mapDispatchToProps = {
  adminUpdateUserProfile,
  cancelEditContactDetails,
  searchCompanyDetails,
  loadSelectedCompany,
  closeCompanyLists,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminContactForm);
