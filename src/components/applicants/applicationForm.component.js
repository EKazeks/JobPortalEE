import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent, Grid, Divider, Snackbar } from '@material-ui/core';
import { Field } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import { useTranslation, Trans } from 'react-i18next';
import { Link } from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { renderDenseTextField, renderCheckbox } from '../../utils/wrappers';
import { MySnackbarContentWrapper } from '../../utils/snackbar.utils';
import renderDropzoneField from '../../utils/dropzone';
import CustomizedDialogs from '../../utils/customizedDialog';
import { customURL } from '../../utils/helperFunctions';
import Loader from '../../utils/loader';
import store from '../../store';
import { PrivacyTermPage, ServiceTermPage } from '../../constants/wordpressRoutes';
import TextEditor from '../../utils/textEditor';
import { useSelector } from 'react-redux';
import axios from 'axios';

const styles = theme => ({
  header: {
    textAlign: 'center',
    margin: '30px auto',
  },
  button: {
    margin: 6,
  },

  form: {
    width: '100%',
  },
  formBtn: {
    marginTop: '30px',
    textAlign: 'center',
  },
  card: {
    margin: '70px auto',
  },
  layout: {
    [theme.breakpoints.up('md')]: {
      padding: '10px 50px',
    },
  },
  ctaBtn: {
    margin: '-10px auto auto 40px',
  },
  title: {
    margin: '50px 0',
    color: theme.palette.primary.main,
  },
  fieldLabel: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
  },
  backBtnContainer: {
    margin: '40px auto',
  },
  backBtnText: {
    color: theme.palette.secondary.main,
    '&:hover': {
      textDecoration: 'none',
      color: theme.palette.primary.main,
    },
  },
  serviceLink: {
    color: theme.palette.secondary.main,
  },
  errorMsg: {
    color: 'red',
    fontSize: 12,
  },
});
const _onFormSubmit = () => {
  return false;
};
const ApplicationForm = ({
  classes,
  jobDetails,
  uploadedDocument,
  sendApplication,
  showSpinner,
  showErrorMsg,
  showThankyouDialog,
  isLoggedIn,
  showFailedSnackbar,
  closeSnackbar,
  handleSubmit,
  applicant_cv,
  cv_filename,
  valid,
  ...props
}) => {
  const cv_document = (
    <a href={applicant_cv} target="_blank" rel="noopener noreferrer">
      {cv_filename}
    </a>
  );
  const { t } = useTranslation('applicant', 'common', 'jobDetails');
  const { lang } = store.getState().language;
  const { id } = useSelector((state) => state.jobs);
  const { url } = useSelector((state) => state.jobs);
  const { address } = useSelector((state) => state.jobs);
  const { companyName } = useSelector((state) => state.jobs);
  const { jobName } = useSelector((state) => state.jobs);

  return (
    <div className="container">
      <div className={classes.backBtnContainer}>
        <Link to="/tyopaikat" className={classes.backBtnText}>
          <ArrowBackIosIcon /> {t('jobDetails:backToJobList')}
        </Link>
      </div>
      <div>
        <form onSubmit={handleSubmit(_onFormSubmit)}>
          <Card className={classes.card}>
            <CardContent className={classes.layout}>
              <header className={classes.header}>
                <h1>{t('jobApplication')}</h1>
                <Divider />
              </header>

              <Grid container spacing={5}>
                <Grid item sm={5} xs={12}>
                  <div>
                    <h3>{jobName}</h3>
                    <p>{companyName}</p>
                    <p>{address}</p>
                    <Link className="btnLink" to={customURL({url}, 'external')} target="_noblank">
                      <Button variant="contained" color="secondary">
                        {t('openAd')}
                      </Button>
                    </Link>
                  </div>
                </Grid>
                <Grid item sm={7} xs={12} className={classes.form}>
                  <div>
                    <Grid container alignItems="center">
                      <Grid item sm={4}>
                        <label htmlFor="firstName" className={classes.fieldLabel}>
                          {t('common:firstName')}*:
                        </label>
                      </Grid>
                      <Grid item sm={8} xs={12}>
                        <Field component={renderDenseTextField} name="firstname" id="firstname" disabled={isLoggedIn} required />
                      </Grid>
                    </Grid>
                    <Grid container alignItems="center">
                      <Grid item sm={4}>
                        <label htmlFor="lastname" className={classes.fieldLabel}>
                          {t('common:lastName')}*:
                        </label>
                      </Grid>
                      <Grid item sm={8} xs={12}>
                        <Field component={renderDenseTextField} name="lastname" id="lastname" disabled={isLoggedIn} required />
                      </Grid>
                    </Grid>

                    <Grid container alignItems="center">
                      <Grid item sm={4}>
                        <label htmlFor="applicantEmail" className={classes.fieldLabel}>
                          {t('common:email')}*:
                        </label>
                      </Grid>
                      <Grid item sm={8} xs={12}>
                        <Field component={renderDenseTextField} name="email" id="applicantEmail" disabled={isLoggedIn} required />
                      </Grid>
                    </Grid>
                    <Grid container alignItems="center">
                      <Grid item sm={4}>
                        <label htmlFor="applicantPhone" className={classes.fieldLabel}>
                          {t('common:phone')}:
                        </label>
                      </Grid>
                      <Grid item sm={8} xs={12}>
                        <Field component={renderDenseTextField} name="contact_number" id="applicantPhone" />
                      </Grid>
                    </Grid>
                    <Grid container alignItems="center">
                      <Grid item sm={4}>
                        <label htmlFor="applicantLinkedIn" className={classes.fieldLabel}>
                          {t('common:LinkedIn')}:
                        </label>
                      </Grid>
                      <Grid item sm={8} xs={12}>
                        <Field component={renderDenseTextField} name="linkedin" id="applicantLinkedIn" />
                      </Grid>
                    </Grid>
                    <Grid container alignItems="center">
                      <Grid item sm={4}>
                        <label htmlFor="applicantPortfolio" className={classes.fieldLabel}>
                          {t('common:portfolio')}:
                        </label>
                      </Grid>
                      <Grid item sm={8} xs={12}>
                        <Field component={renderDenseTextField} name="portfolio" id="applicantPortfolio" />
                      </Grid>
                    </Grid>
                    <Grid container alignItems="center" style={{ marginTop: 8 }}>
                      <Grid item sm={4}>
                        <label htmlFor="applicantCV" className={classes.fieldLabel}>
                          {t('cvTitle')}:
                        </label>
                      </Grid>
                      <Grid item sm={8} xs={12}>
                        <Field component={renderDropzoneField} name="cv_document" isCV uploadedDocument={uploadedDocument} cvBtnLabel={t('cvLabel')} />
                        {!uploadedDocument && cv_document}
                      </Grid>
                    </Grid>
                  </div>
                  <div>
                    <label className={classes.fieldLabel} htmlFor="applicantMsg">
                      {t('applicationMsg')}:
                    </label>
                  </div>
                  <Field
                    component={TextEditor}
                    name="application_description"
                    id="applicantMsg"
                    multiline
                    rows="17"
                    // maxLength="3000"
                    placeholder={t('descPlaceholder')}
                  />
                  {showErrorMsg && <p className={classes.errorMsg}>{t('validation:maxLengthApplicationDesc')}</p>}

                  <Field
                    component={renderCheckbox}
                    name="agreement_terms"
                    id="agreement_terms"
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
                    margin="30px auto auto 0px"
                  />
                </Grid>
              </Grid>
              <div className={classes.formBtn}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className="fullWidthBtn"
                  onClick={valid ? () => sendApplication(props.match.params.id) : null}
                >
                  {t('sendApplication')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
        <CustomizedDialogs showDialog={showThankyouDialog} dialogText={t('thankyouText')} isLoggedIn={isLoggedIn} applicationModal />
        {/* If application is not sent successfully, show failed snackbar */}
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={showFailedSnackbar}
          autoHideDuration={3000}
          onClose={() => {
            closeSnackbar();
          }}
        >
          <MySnackbarContentWrapper
            variant="error"
            message={t('applicationSentfailedMsg')}
            onClose={() => {
              closeSnackbar();
            }}
          />
        </Snackbar>
      </div>
      <Loader showSpinner={showSpinner} />
    </div>
  );
};

export default withStyles(styles)(ApplicationForm);
