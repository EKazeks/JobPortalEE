import React from 'react';
import { reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import JobSeekerProfileComponent from '../../components/jobseekers/jobseekerProfile.component';
import { clearJobseekerProfilePic, addApplicantProfile, getApplicantProfile, closeSnackbar } from '../../actions';
import { jobseekerProfileValidate as validate } from '../validate';

class JobseekerProfile extends React.Component {
  componentDidMount() {
    this.props.getApplicantProfile();
  }

  render() {
    if (this.props.isUserType === 'applicant') {
      return <JobSeekerProfileComponent {...this.props} />;
    }
    return <Redirect to="/" />;
  }
}
const mapStateToProps = state => ({
  profilePic: formValueSelector('jobseekerProfile')(state, 'photo_document'),
  initialValues: state.jobseekerProfile.profile && state.jobseekerProfile.profile,
  applicant_cv: state.jobseekerProfile.profile.cv_document && state.jobseekerProfile.profile.cv_document[0].path,
  cv_filename: state.jobseekerProfile.profile.cv_document && state.jobseekerProfile.profile.cv_document[0].filename,
  showSuccessSnackbar: state.asyncActions.showSuccessSnackbar,
  showFailedSnackbar: state.asyncActions.showFailedSnackbar,
  isUserType: state.client.user && state.client.user.data[6].user_type,
  uploadedDocument: state.jobseekerProfile.uploadedDocument && state.jobseekerProfile.uploadedDocument[0] ? state.jobseekerProfile.uploadedDocument[0] : '',
});

const mapDispatchToProps = {
  clearJobseekerProfilePic,
  addApplicantProfile,
  getApplicantProfile,
  closeSnackbar,
};

const JobseekerProfileContainer = reduxForm({
  form: 'jobseekerProfile',
  enableReinitialize: true,
  validate,
})(JobseekerProfile);

export default connect(mapStateToProps, mapDispatchToProps)(JobseekerProfileContainer);
