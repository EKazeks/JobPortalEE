import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { Button, CssBaseline, Link, Typography, Container, Snackbar, IconButton, InputAdornment } from '@material-ui/core';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import { Field } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { renderTextField } from '../../utils/wrappers';
import { MySnackbarContentWrapper } from '../../utils/snackbar.utils';
import ResetPasswordContainer from '../../containers/account/resetPassword.container';
import Loader from '../../utils/loader';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import loginBgImg from '../../images/loginBgImg.jpg';

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },

  container: {
    [theme.breakpoints.up('md')]: {
      background: `url(${loginBgImg}) no-repeat`,
      backgroundPosition: 'top',
      backgroundSize: 'cover',
      height: '100vh',
      margin: 0,
    },
  },
  paper: {
    paddingTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  inputField: {
    backgroundColor: theme.palette.custom.white,
    borderRadius: 4,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    textTransform: 'uppercase',
  },
});

const _onFormSubmit = () => {
  return false;
};

const SignInComponent = ({ classes, signInFormSubmit, handleSubmit, errorMessage, showFailedSnackbar, closeSignInSnackBar, showSpinner, invalid }) => {
  const { t } = useTranslation('login');
  return (
    <div className={classes.container}>
      <SignInForm classes={classes} t={t} invalid={invalid} handleSubmit={handleSubmit} signInFormSubmit={signInFormSubmit} />
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={showFailedSnackbar}
        autoHideDuration={4000}
        onClose={() => {
          closeSignInSnackBar();
        }}
      >
        <MySnackbarContentWrapper
          variant="error"
          message={errorMessage === 'invalid_username_or_password' ? t('invalidMsg') : t('tryAgain')}
          onClose={() => {
            closeSignInSnackBar();
          }}
        />
      </Snackbar>
      <Loader showSpinner={showSpinner} />
    </div>
  );
};

const SignInForm = ({ classes, t, invalid, handleSubmit, signInFormSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOpenOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t('login')}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(_onFormSubmit)}>
          <Field
            className={classes.inputField}
            component={renderTextField}
            variant="outlined"
            name="email"
            margin="normal"
            fullWidth
            id="email"
            label={t('email')}
            required
          />
          <Field
            className={classes.inputField}
            component={renderTextField}
            name="password"
            variant="outlined"
            margin="normal"
            id="password"
            fullWidth
            label={t('password')}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword} color="primary" aria-label="toggle password visibility">
                  {!showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            }
            required
            autoComplete="password"
          />
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} onClick={!invalid ? signInFormSubmit : null}>
            {t('login')}
          </Button>
          <Link href="/register" variant="body2">
            {t('msgToRegister')}
          </Link>
        </form>
        <ResetPasswordContainer />
      </div>
    </Container>
  );
};

export default withStyles(styles)(SignInComponent);
