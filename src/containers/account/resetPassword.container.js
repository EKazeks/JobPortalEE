import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import ResetPasswordComponent from '../../components/account/resetPassword.component';
import { resetPassword, closeSnackbar } from '../../actions/index';
import { registerValidate as validate } from '../validate';

const ResetPasswordContainer = reduxForm({
  // a unique name for the form
  form: 'resetPassword',

  validate,
})(ResetPasswordComponent);

const mapStateToProps = state => ({
  showSuccessSnackbar: state.resetPassword.showSuccessSnackbar,
  showFailedSnackbar: state.resetPassword.showFailedSnackbar,
});

const mapDispatchToProps = {
  resetPassword,
  closeSnackbar,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordContainer);
