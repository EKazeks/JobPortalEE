import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import SignUpComponent from '../../components/account/signUp.component';
import { signUpFormSubmit, closeRegisterSnackbar, selectUserType } from '../../actions/index';
import { registerValidate as validate } from '../validate';

const SignUpContainer = reduxForm({
  // a unique name for the form
  form: 'signup',
  enableReinitialize: true,
  validate,
})(SignUpComponent);

const mapStateToProps = state => {
  const { userType, applicantData } = state.signUp;
  return {
    initialValues: {
      RoleID: '1',
      user_type: userType,
      ...applicantData,
    },
    showSnackbar: state.signUp.showSnackbar,
    showFailSnackbar: state.signUp.showFailSnackbar,
    showSpinner: state.signUp.showSpinner,
    errorMessage: state.signUp.errorMessage,
    userType: userType,
  };
};

const mapDispatchToProps = {
  signUpFormSubmit,
  closeRegisterSnackbar,
  selectUserType,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpContainer);
