import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import ChangePasswordComponent from '../../components/account/changePassword.component';
import { changePassword, closeSnackbar } from '../../actions/index';
import { passwordValidate as validate } from '../validate';

const ChangePasswordContainer = reduxForm({
  // a unique name for the form
  form: 'changePassword',
  validate,
})(ChangePasswordComponent);

const mapStateToProps = state => ({
  showSuccessSnackbar: state.asyncActions.showSuccessSnackbar,
  showFailedSnackbar: state.asyncActions.showFailedSnackbar,
});

const mapDispatchToProps = {
  changePassword,
  closeSnackbar,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordContainer);
