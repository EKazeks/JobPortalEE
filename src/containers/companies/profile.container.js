import React from "react";
import { reduxForm, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import ProfileComponent from "../../components/companies/profile.component";
import {
  addCompanyProfile,
  getCompanyProfile,
  closeSnackbar,
  addNewCompanyStart,
  addNewCompanyEnd,
  searchCompanyDetails,
  loadSelectedCompany,
  closeCompanyLists,
} from "../../actions";
import { profileValidate as validate } from "../validate";

class ProfileContainer extends React.Component {
  componentDidMount() {
    this.props.getCompanyProfile();
  }

  render() {
    if (this.props.isUserType === "company") {
      return <ProfileComponent {...this.props} />;
    }
    return <Redirect to="/" />;
  }
}

const ProfileContainerForm = reduxForm({
  form: "companyProfile",
  enableReinitialize: true,
  destroyOnUnmount: true,
  validate,
})(ProfileContainer);

const mapStateToProps = (state) => {
  const { isToAddNewProfile } = state.companyProfile;
  return {
    logo: formValueSelector("companyProfile")(state, "logo_document"),
    showSuccessSnackbar: state.asyncActions.showSuccessSnackbar,
    showFailedSnackbar: state.asyncActions.showFailedSnackbar,
    showCustomError: state.asyncActions.showCustomError,
    errorMsg: state.asyncActions.errorMsg,
    synchronousError:
      state.form &&
      state.form.companyProfile &&
      state.form.companyProfile.syncErrors,
    initialValues: state.companyProfile.profile,
    showProfileWarning: state.companyProfile.profile.company_id === 0,
    isUserType: state.client.user && state.client.user.data.user_type,
    isToAddNewProfile,
    isCompanyCreated: state.companyProfile.profile.company_id !== 0, // Resembles newly registered users but profile not updated
    isSuperUser: state.client.user && state.client.user.data.user_role === 0, // Resembles only the registered user, not added employees
    uploadedLogo: state.companyProfile.uploadedLogo,
    companyLists: state.companyLists.companyLists,
    apiSuccess: state.companyLists.apiSuccess,
    clientUserEmail: state.client.user.data.email,
  };
};

const mapDispatchToProps = {
  addCompanyProfile,
  getCompanyProfile,
  closeSnackbar,
  addNewCompanyStart,
  addNewCompanyEnd,
  searchCompanyDetails,
  loadSelectedCompany,
  closeCompanyLists,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainerForm);
