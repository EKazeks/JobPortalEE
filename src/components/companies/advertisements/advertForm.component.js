import React from 'react';
import { Field, change, formValueSelector } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Button, Snackbar } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { useTranslation, Trans } from 'react-i18next';
import { renderTextField, renderCheckbox, renderDatePicker, renderSelectField, renderDenseTextField } from '../../../utils/wrappers';

import CampaignsContainer from '../../../containers/companies/ads/campaigns.container';
import renderDropzoneField from '../../../utils/dropzone';
import { MySnackbarContentWrapper } from '../../../utils/snackbar.utils';
import ExtraServiceButtonContainer from '../../../containers/companies/advertisements/extraServiceButton.container';
import { JobTypeComponent, JobHoursComponent, JobCategoriesComponent } from '../../../utils/customSelectField';
import store from '../../../store';
import AutoCompleteLocationInput from '../../../utils/autoCompleteLocation';
import Loader from '../../../utils/loader';
import { PrivacyTermPage, ServiceTermPage } from '../../../constants/wordpressRoutes';
import CustomizedDialog from '../../../utils/customizedDialog';
//import AutomaticEmailAnswersContainer from '../../../containers/companies/advertisements/automaticEmailAnswers.container';
import i18n from '../../../utils/i18n';
import TextEditor from '../../../utils/textEditor';
import { Link } from 'react-router-dom';
import { saveAndPublishAdvertisementToEe } from '../../../actions';

const styles = theme => ({
  header: {
    // display: 'flex',
    color: theme.palette.primary.main,
    alignItems: 'center',
    //maxWidth: '80%',
    margin: '60px 0 20px 0',
    [theme.breakpoints.down('xs')]: {
      margin: '20px 0 20px 0',
    },
    width: '95%',
    //marginLeft: '-3px',
  },
  headerForEE: {
    color: theme.palette.primary.main,
    alignItems: 'center',
    width: '94%',
    maxWidth: '92%',
    margin: '60px 0 -3px 0',
    [theme.breakpoints.down('xs')]: {
      margin: '20px 0 20px 0',
    },
    marginLeft: '-3px',
  },
  headerForRU: {
    color: theme.palette.primary.main,
    alignItems: 'center',
    width: '81%',
    margin: '60px 0 -3px 0',
    [theme.breakpoints.down('xs')]: {
      margin: '20px 0 20px 0',
    },
    marginLeft: '-3px',
  },
  imageText: {
    color: '#6c757d',
    marginTop: 10,
  },
  paper: {
    boxShadow: 'none',
    border: '1px solid lightgray',
    padding: '40px 25px',
    marginBottom: 50,
    marginTop: 20,
    [theme.breakpoints.down('sm')]: {
      padding: 10,
    },
  },
  paperForEE: {
    boxShadow: 'none',
    border: '1px solid lightgray',
    padding: '40px 25px',
    marginBottom: 50,
    marginTop: 23,
    [theme.breakpoints.down('sm')]: {
      padding: 10,
    },
  },

  ctaBtn: {
    margin: '50px 0',
  },
  dropzone: {
    alignSelf: 'flex-end', // to show the buttons in the same level
  },
  serviceLink: {
    color: theme.palette.secondary.main,
  },
  emailInput: {
    marginTop: -5,
    [theme.breakpoints.up('lg')]: {
      minWidth: 275,

      marginTop: -3,
    },
  },
  frequencySelect: {
    [theme.breakpoints.up('md')]: {
      maxWidth: 'fit-content',
    },
  },
});

const _onFormSubmit = () => {
  return false;
};

const AdvertFormComponent = ({
  classes,
  handleSubmit,
  saveAndPublishAdvertisement,
  saveAndPublishAdvertisementToEe,
  saveAdvertisementAsDraft,
  choosePaymentMethod,
  showPaymentDialog,
  isToEdit,
  image,
  dispatch,
  apiSuccess,
  apiFailed,
  jobCategories,
  jobTags,
  showSpinner,
  closeSnackbar,
  clearImagesFromState,
  valid,
  synchronousError,
  submitFailed,
  extraService,
  changeRoute,
}) => {
  const { t } = useTranslation('advertForm', 'campaigns');
  const storedPath =
    Array.isArray(formValueSelector('vacancy')(store.getState(), 'image_document')) &&
    formValueSelector('vacancy')(store.getState(), 'image_document')[0] &&
    formValueSelector('vacancy')(store.getState(), 'image_document')[0].path;

  const { lang } = store.getState().language;

  return (
    <div className="container">
      <Grid container className={i18n.language === 'ee' ? classes.headerForEE :
      i18n.language === 'ru' ? classes.headerForRU : classes.header}>
        <Grid item md={6} sm={12}>
          <h2>{isToEdit ? t('editTitle') : t('title')}</h2>
        </Grid>
        <Grid item md={6} sm={12}>
          <ExtraServiceButtonContainer />
        </Grid>
      </Grid>
      <div>
        <form onSubmit={handleSubmit(_onFormSubmit)}>
          <div className={i18n.language === 'ee' ? classes.paperForEE : classes.paper}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Field component={renderTextField} id="jobTitle" label={t('field1')} name="jobTitle" required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <JobCategoriesComponent jobCategories={jobCategories} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <JobTypeComponent />
              </Grid>
              <Grid item xs={12} sm={6} id='jobDuration' name="jobDuration">
                <JobHoursComponent />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field component={AutoCompleteLocationInput} name="jobLocation" label={t('field3')} id="jobLocation" required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field component={renderDatePicker} id="lastApplicationDate" label={t('Last application date')} name="lastApplicationDate" required />
              </Grid>
              <Grid item xs={12}>
                <p style={{ color: '#6c757d' }}>{t('linkInfoMsg')}</p>
                <Field component={renderTextField} label={t('field6')} name="applicationUrl" id="applicationUrl" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  component={renderDropzoneField}
                  type="file"
                  imagefile={image && !image.path && !Array.isArray(image) ? image : Array.isArray(image) ? image[0].path : ''}
                  btnText={t('addPic')}
                  name="logo"
                  id="logo"
                  fullWidth
                  isImage
                />
              </Grid>
              <Grid item xs={12} sm={6} className={classes.dropzone}>
                <i style={{ color: '#6c757d' }}>{t('voluntary')}</i>
                <p className={classes.imageText}>{t('picText')}</p>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    // deleting stored image in db vs. newly uploaded image
                    storedPath
                      ? dispatch(
                          change('vacancy', 'image_document', {
                            path: storedPath,
                          }),
                        )
                      : dispatch(change('vacancy', 'image_document', ''));
                    clearImagesFromState();
                  }}
                >
                  <DeleteForeverIcon fontSize="small" style={{ marginRight: 5 }} />
                  {t('delPic')}
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Field component={TextEditor} fullWidth name="jobDescription" placeholder={t('field4')} id="jobDescription" />
              </Grid>
              {/* <Grid item xs={12}>
                <Field component={TextEditor} fullWidth name="campaignLevel" placeholder={t('campaignLevel')} id="campaignLevel" />
              </Grid> */}
            </Grid>
            <Grid container>
            </Grid>
            <CampaignsContainer />
          </div>

          <div>
            <Field
              name="is_agreement"
              component={renderCheckbox}
              //label={t('agree3')}
              label={
                <Trans>
                  {t('agree3')}
                  <a href={ServiceTermPage(lang)} target="_blank" rel="noopener noreferrer" className={classes.serviceLink}>
                    {' '}
                  </a>
                  <a href={PrivacyTermPage(lang)} target="_blank" rel="noopener noreferrer" className={classes.serviceLink}>
                    {' '}
                  </a>
                </Trans>
              }
            />
            <Grid container alignItems="center">
              <Grid item className={classes.emailLabel} md={6} xs={12}>
                <Field name="is_email_notification" component={renderCheckbox} label={t('agree2')} />
              </Grid>
              <Grid item md={6} xs={12}>
                <Grid container alignItems="center" justifyContent="flex-end" spacing={1}>
                  <Grid item className={classes.emailInput} xs={12} sm={6} md={7}>
                    <Field name="email" component={renderDenseTextField} placeholder={t('common:email')} />
                  </Grid>
                  <Grid item className={classes.frequencySelect} xs={12} sm={6} md={5}>
                    <Field component={renderSelectField} name="notice_frequency" variant="outlined" margin="dense">
                      <option value="1">{t('day')}</option>
                      <option value="7">{t('week')}</option>
                      <option value="expiry">{t('onExpire')}</option>
                    </Field>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>

          <div className={classes.ctaBtn}>
            <Grid container>
              <Grid item sm={6} />
              <Grid item md={6} xs={12}>
                <Grid container spacing={2} justifyContent="flex-end">
                  <Grid item>
                    <Button variant="outlined" color="primary" onClick={() => changeRoute()}>
                      {t('cancelBtn')}
                    </Button>
                  </Grid>

                  {extraService.help || extraService.sos ? (
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        //onClick={valid ? saveAdvertisementAsDraft : null}
                        onClick={valid ? choosePaymentMethod : null}
                        className="fullWidthBtn"
                      >
                        {t('reviewBtn')}
                      </Button>
                    </Grid>
                  ) : (
                    <>
                      <Grid item>
                        <Button variant="outlined" color="primary" type="submit" onClick={valid ? saveAdvertisementAsDraft : null}>
                          {t('saveAsDraft')}
                        </Button>
                      </Grid>
                      <Grid item className="fullWidthBtn">
                        <Button variant="contained" color="primary" type="submit" onClick={valid ? choosePaymentMethod : null} className="fullWidthBtn">
                          {t('paymentBtn')}
                        </Button>
                      </Grid>
                    </>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </div>
        </form>
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={apiSuccess}
        autoHideDuration={4000}
        onClose={() => {
          closeSnackbar();
          changeRoute();
        }}
      >
        <MySnackbarContentWrapper
          variant="success"
          message={t('successMsg')}
          onClose={() => {
            closeSnackbar();
            changeRoute();
          }}
        />
      </Snackbar>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={apiFailed || (submitFailed && synchronousError)} // for rte text editor!!
        autoHideDuration={4000}
        onClose={() => {
          closeSnackbar();
        }}
      >
        <MySnackbarContentWrapper
          variant="error"
          message={apiFailed ? t('apiErrorMsg') : t('errorMsg')}
          onClose={() => {
            closeSnackbar();
          }}
        />
      </Snackbar>
      <Loader showSpinner={showSpinner} />
      <CustomizedDialog showDialog={showPaymentDialog} dialogText="" paymentModal paymentAction={saveAndPublishAdvertisement} />
    </div>
  );
};

export default withStyles(styles)(AdvertFormComponent);

