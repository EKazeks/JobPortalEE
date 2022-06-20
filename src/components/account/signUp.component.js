import React from 'react';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { Field } from 'redux-form';
import { useTranslation, Trans } from 'react-i18next';
import { Snackbar, Grow } from '@material-ui/core';
import { renderTextField, renderCheckbox } from '../../utils/wrappers';
import { MySnackbarContentWrapper } from '../../utils/snackbar.utils';
import browserHistory from '../../history';
import Loader from '../../utils/loader';
import UserSelection from './userSelection.component';
import store from '../../store';
import { ServiceTermPage, PrivacyTermPage } from '../../constants/wordpressRoutes';

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  /* item: {
    margin: 'auto auto'
  }, */
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    margin: '40px auto',
    width: '60%',
    [theme.breakpoints.down('md')]: {
      width: '95%',
      margin: 10,
    },
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    textTransform: 'uppercase',
  },
  serviceLink: {
    color: theme.palette.secondary.main,
  },
  companyTitle: {
    fontWeight: 600,
    color: theme.palette.primary.main,
    marginBottom: 30,
  },
  jobseekerTitle: {
    fontWeight: 600,
    color: theme.palette.secondary.main,
    marginBottom: 30,
  },
});

const _onFormSubmit = () => {
  return false;
};

const SignUpComponent = ({
  classes,
  signUpFormSubmit,
  showSnackbar,
  showFailSnackbar,
  closeRegisterSnackbar,
  errorMessage,
  showSpinner,
  handleSubmit,
  selectUserType,
  userType,
  invalid,
}) => {
  const { t } = useTranslation('register');

  return (
    <div>
      <div>
        <Grid container>
          <Grid item sm={6} xs={12} className={classes.item}>
            {userType === null || userType === 'applicant' ? (
              <UserSelection selectUserType={selectUserType} label="companyOption" userType="company" />
            ) : (
              <SignUpForm userType={userType} classes={classes} t={t} invalid={invalid} handleSubmit={handleSubmit} signUpFormSubmit={signUpFormSubmit} />
            )}
          </Grid>
          <Grid item sm={6} xs={12} className={classes.item}>
            {userType === null || userType === 'company' ? (
              <UserSelection selectUserType={selectUserType} label="jobseekerOption" userType="applicant" />
            ) : (
              <SignUpForm userType={userType} classes={classes} t={t} invalid={invalid} handleSubmit={handleSubmit} signUpFormSubmit={signUpFormSubmit} />
            )}
          </Grid>
        </Grid>

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={showSnackbar}
          autoHideDuration={3000}
          onClose={() => {
            closeRegisterSnackbar();
            browserHistory.push('/login');
          }}
        >
          <MySnackbarContentWrapper
            variant="success"
            message={t('successMsg')}
            onClose={() => {
              closeRegisterSnackbar();
              browserHistory.push('/login');
            }}
          />
        </Snackbar>
        {errorMessage === 'UserExist' ? (
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            open={showFailSnackbar}
            autoHideDuration={3000}
            onClose={() => {
              closeRegisterSnackbar();
            }}
          >
            <MySnackbarContentWrapper
              variant="error"
              message={t('userExistMsg')}
              onClose={() => {
                closeRegisterSnackbar();
              }}
            />
          </Snackbar>
        ) : (
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            open={showFailSnackbar}
            autoHideDuration={3000}
            onClose={() => {
              closeRegisterSnackbar();
            }}
          >
            <MySnackbarContentWrapper
              onClose={() => {
                closeRegisterSnackbar();
              }}
              variant="error"
              message={t('errorMsg')}
            />
          </Snackbar>
        )}
        <Loader showSpinner={showSpinner} />
      </div>
    </div>
  );
};

const SignUpForm = ({ classes, t, invalid, handleSubmit, signUpFormSubmit, userType }) => {
  const { lang } = store.getState().language;

  return (
    <div id="signUpForm">
      <Grow in={true} style={{ transformOrigin: '0 0 0' }} {...{ timeout: 1000 }}>
        <form className={classes.form} onSubmit={handleSubmit(_onFormSubmit)}>
          <h2 className={userType === 'company' ? classes.companyTitle : classes.jobseekerTitle}>
            {' '}
            {userType !== null && (userType === 'company' ? t('registerOptionCompany') : t('registerOptionApplicant'))}
          </h2>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Field component={renderTextField} name="firstName" variant="outlined" fullWidth id="firstName" label={t('firstName')} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field component={renderTextField} name="lastName" variant="outlined" fullWidth label={t('lastName')} required />
            </Grid>
            <Grid item xs={12}>
              <Field component={renderTextField} name="email" variant="outlined" fullWidth id="email" label={t('email')} required />
            </Grid>
            <Grid item xs={12}>
              <Field
                component={renderTextField}
                name="password"
                variant="outlined"
                fullWidth
                id="password"
                label={t('password')}
                type="password"
                required
                autoComplete="password"
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                component={renderTextField}
                name="passwordConfirmation"
                variant="outlined"
                fullWidth
                id="passwordConfirmation"
                label={t('confirmPassword')}
                type="password"
                required
                autoComplete="password"
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                component={renderCheckbox}
                name="agreement_terms"
                id="agreement_terms"
                //label={t('acceptTerms')}
                label={
                  <Trans>
                    {t('common:acceptTerms')}
                    <a href={ServiceTermPage(lang)} target="_blank" rel="noopener noreferrer" className={classes.serviceLink}>
                      {' '}
                    </a>
                    <a href={PrivacyTermPage(lang)} target="_blank" rel="noopener noreferrer" className={classes.serviceLink}>
                      {' '}
                    </a>
                  </Trans>
                }
                margin={0}
              />
            </Grid>
          </Grid>

          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} onClick={!invalid ? signUpFormSubmit : null}>
            {t('registerBtn')}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                {t('msgToSignIn')}
              </Link>
            </Grid>
          </Grid>
        </form>
      </Grow>
    </div>
  );
};

export default withStyles(styles)(SignUpComponent);
