import React from "react";
import { reduxForm, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import JobSeekerProfileComponent from "../../components/jobseekers/jobseekerProfile.component";
import {
  clearJobseekerProfilePic,
  addApplicantProfile,
  getApplicantProfile,
  closeSnackbar,
} from "../../actions";
import { jobseekerProfileValidate as validate } from "../validate";

class JobseekerProfile extends React.Component {
  componentDidMount() {
    this.props.getApplicantProfile();
  }

  render() {
    if (this.props.isUserType === "applicant") {
      return <JobSeekerProfileComponent {...this.props} />;
    }
    return <Redirect to="/" />;
  }
}
const mapStateToProps = (state) => ({
  profilePic:  state.jobseekerProfile.profile.applicantPhoto.content,
  initialValues:
    state.jobseekerProfile.profile && state.jobseekerProfile.profile,
  applicant_cv: state.jobseekerProfile.profile.applicantDocument.content,
  cv_filename: state.jobseekerProfile.profile.applicantDocument.fileName,
  showSuccessSnackbar: state.asyncActions.showSuccessSnackbar,
  showFailedSnackbar: state.asyncActions.showFailedSnackbar,
  isUserType: state.client.user && state.client.user.data.user_type,
  uploadedDocument: state.jobseekerProfile.uploadedDocument && state.jobseekerProfile.uploadedDocument[0] ? state.jobseekerProfile.uploadedDocument[0] : '',
});

const mapDispatchToProps = {
  clearJobseekerProfilePic,
  addApplicantProfile,
  getApplicantProfile,
  closeSnackbar,
};

const JobseekerProfileContainer = reduxForm({
  form: "jobseekerProfile",
  enableReinitialize: true,
  validate,
})(JobseekerProfile);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JobseekerProfileContainer);
