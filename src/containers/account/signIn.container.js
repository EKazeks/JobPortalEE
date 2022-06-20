import React from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SignInComponent from '../../components/account/signIn.component';
import { signInFormSubmit, closeSignInSnackBar } from '../../actions';
import { signInValidate as validate } from '../validate';

class SignInContainer extends React.Component {
  render() {
    // to avoid displaying the sign in component if the user is already logged in
    if (this.props.isLoggedIn) {
      return <Redirect to="/" />;
    }
    return <SignInComponent {...this.props} />;
  }
}
const SignInContainerForm = reduxForm({
  form: 'signin',
  validate,
})(SignInContainer);

const mapStateToProps = state => ({
  state,
  errorMessage: state.signIn.errorMessage,
  showFailedSnackbar: state.signIn.showFailedSnackbar,
  showSpinner: state.signIn.showSpinner,
  isLoggedIn: state.client.user,
});
const mapDispatchToProps = {
  signInFormSubmit,
  closeSignInSnackBar,
};
export default connect(mapStateToProps, mapDispatchToProps)(SignInContainerForm);
