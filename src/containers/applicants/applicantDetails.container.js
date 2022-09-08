import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import ApplicantDetails from '../../components/applicants/applicantDetails.component';
import { updateApplicantStatus, updateJobApplicationDetails, editInterviewDetails, closeSnackbar } from '../../actions';
import { interviewDetailsValidate as validate } from '../validate';
import store from '../../store';

const ApplicantDetailsContainer = reduxForm({
  form: 'applicantDetails',
  enableReinitialize: true,
  validate,
})(ApplicantDetails);

const mapStateToProps = (state) => ({
  viewSelectedAd: state.advertisement.viewSelectedAd,
  initialValues: state.advertisement.viewApplication,
  viewApplication: state.advertisement.viewApplication,
  showSuccessSnackbar: state.asyncActions.showSuccessSnackbar,
  isToSendEmail: state.asyncActions.isToSendEmail,
  showFailedSnackbar: state.asyncActions.showFailedSnackbar,
  loading: state.asyncActions.showSpinner,
  isToEdit: state.advertisement.isToEdit,
  hasInterviewData: !!state.advertisement.viewApplication.interview_date ? true : false,
});

const mapDispatchToProps = {
  updateApplicantStatus,
  closeSnackbar,
  updateJobApplicationDetails,
  editInterviewDetails,
};
export default connect(mapStateToProps, mapDispatchToProps)(ApplicantDetailsContainer);
