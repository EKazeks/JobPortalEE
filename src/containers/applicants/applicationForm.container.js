import React from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import ApplicationForm from "../../components/applicants/applicationForm.component";
import {
  getJobDetailsById,
  sendApplication,
  closeSnackbar,
  resetApplicationSent,
  fetchJobById,
} from "../../actions";
import { applicationFormValidate as validate } from "../validate";
import store from "../../store";

class ApplicationContainer extends React.Component {
  // componentDidMount() {
  //   this.props.getJobDetailsById(`${this.props.match.params.id.split('JP')[1]}$$${this.props.match.params.id.split('JP')[0]}`);
  // }

  componentWillUnmount() {
    if (this.props.isApplicationSent) {
      this.props.resetApplicationSent();
    }
  }

  render() {
    return <ApplicationForm {...this.props} />;
  }
}
const ApplicationFormContainer = reduxForm({
  form: "applicationForm",
  validate,
})(ApplicationContainer);

const mapStateToProps = (state) => {
  const populateApplicationForm = {
    firstname: state.jobseekerProfile.profile.firstName,
    lastname: state.jobseekerProfile.profile.lastName,
    email: state.jobseekerProfile.profile.email,
    contact_number: state.jobseekerProfile.profile.contactNumber,
    linkedin: state.jobseekerProfile.profile.linkedIn,
    portfolio: state.jobseekerProfile.profile.portfolio,
    application_description: state.jobseekerProfile.profile.profileDescription,
  };
  return {
    uploadedDocument:
      state.jobs.uploadedDocument && state.jobs.uploadedDocument[0]
        ? state.jobs.uploadedDocument[0]
        : "",
    showSpinner: state.asyncActions.showSpinner,
    isApplicationSent: state.asyncActions.applicantSent,
    showThankyouDialog: state.asyncActions.showThankyouDialog,
    showFailedSnackbar: state.asyncActions.showFailedSnackbar,
    isLoggedIn: state.client.user !== null,
    initialValues: populateApplicationForm,
    applicant_cv:
      state.jobseekerProfile.profile.cv_document &&
      state.jobseekerProfile.profile.cv_document[0].path,
    cv_filename:
      state.jobseekerProfile.profile.cv_document &&
      state.jobseekerProfile.profile.cv_document[0].filename,
    showErrorMsg:
      state?.form?.applicationForm?.syncErrors?.application_description
        ?.length > 0
        ? true
        : false,
    id: state.jobs.id,
    address: state.jobs.address,
  };
};

const mapDispatchToProps = {
  getJobDetailsById,
  sendApplication,
  closeSnackbar,
  resetApplicationSent,
  fetchJobById,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplicationFormContainer);
