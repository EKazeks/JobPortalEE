import React from 'react';
import { Field, change, reset, formValueSelector } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Button, Snackbar } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { useTranslation } from 'react-i18next';
import renderDropzoneField from '../../../utils/dropzone';
import { MySnackbarContentWrapper } from '../../../utils/snackbar.utils';
// import browserHistory from '../../../history';
import { renderTextField, renderDatePicker, renderCheckbox, renderDenseTextField, renderSelectField } from '../../../utils/wrappers';
import { JobTypeComponent, JobHoursComponent, JobCategoriesComponent } from '../../../utils/customSelectField';
import store from '../../../store';
import AutoCompleteLocationInput from '../../../utils/autoCompleteLocation';
import Loader from '../../../utils/loader';
import TextEditor from '../../../utils/textEditor';

const styles = theme => ({
  header: {
    color: theme.palette.primary.main,
    margin: '80px 0 50px 0',
  },

  imageText: {
    color: '#6c757d',
  },
  paper: {
    boxShadow: 'none',
    border: '1px solid lightgray',
    padding: '40px 25px',
    marginBottom: 50,
  },
  ctaDiv: {
    textAlign: 'center',
    marginTop: 50,
  },
  ctaBtn: {
    marginRight: 20,
  },
  emailNoti: {
    padding: 8,
    marginTop: 10,
  },
  emailInput: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      marginTop: -5,
      width: '50%',
    },
    [theme.breakpoints.up('lg')]: {
      marginTop: -3,
      minWidth: 320,
    },
  },
  frequencySelect: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      width: '50%',
    },
    [theme.breakpoints.up('md')]: {
      maxWidth: 'fit-content',
    },
  },
});

const _onFormSubmit = () => {
  return false;
};

const EditAdvertFormComponent = ({
  classes,
  handleSubmit,
  image,
  dispatch,
  apiSuccess,
  apiFailed,
  jobCategories,
  clearImagesFromState,
  updateAndPublishAdvertisement,
  showSpinner,
  closeSnackbar,
  valid,
  synchronousError,
  submitFailed,
}) => {
  const { t } = useTranslation('advertForm');

  const storedPath =
    Array.isArray(formValueSelector('editVacancy')(store.getState(), 'image_document')) &&
    formValueSelector('editVacancy')(store.getState(), 'image_document')[0] &&
    formValueSelector('editVacancy')(store.getState(), 'image_document')[0].path;

  return (
    <div className="container">
      <div className={classes.header}>
        <h2>{t('editTitle')}</h2>
      </div>
      <div>
        <form onSubmit={handleSubmit(_onFormSubmit)}>
          <div className={classes.paper}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Field component={renderTextField} id="job_title" label={t('field1')} name="job_title" fullWidth required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <JobCategoriesComponent jobCategories={jobCategories} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <JobTypeComponent />
              </Grid>
              <Grid item xs={12} sm={6}>
                <JobHoursComponent />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field component={AutoCompleteLocationInput} name="job_location" label={t('field3')} id="job_location" required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field component={renderDatePicker} id="due_date" label={t('advertForm:field5')} name="due_date" required />
              </Grid>
              <Grid item xs={12}>
                <p style={{ color: '#6c757d' }}>{t('linkInfoMsg')}</p>
                <Field component={renderTextField} label={t('field6')} name="application_link" id="application_link" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  component={renderDropzoneField}
                  type="file"
                  imagefile={image && !image.path && !Array.isArray(image) ? image : Array.isArray(image) ? image[0].path : ''}
                  btnText={t('addPic')}
                  name="image_document"
                  id="image_document"
                  fullWidth
                  isImage
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <i style={{ color: '#6c757d' }}>{t('voluntary')}</i>
                <p className={classes.imageText}>{t('picText')}</p>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    // deleting stored image in db vs. newly uploaded image
                    storedPath
                      ? dispatch(
                          change('editVacancy', 'image_document', {
                            path: storedPath,
                          }),
                        )
                      : dispatch(change('editVacancy', 'image_document', ''));
                    clearImagesFromState();
                  }}
                >
                  <DeleteForeverIcon fontSize="small" style={{ marginRight: 5 }} />
                  {t('delPic')}
                </Button>
              </Grid>

              <Grid item xs={12}>
                <Field component={TextEditor} fullWidth name="job_description" label={t('field4')} id="job_description" placeholder={t('field4')} required />
              </Grid>
              <Grid container spacing={1} alignItems="center" justifyContent="space-between" className={classes.emailNoti}>
                <Grid item xs={12} md={6}>
                  <Field name="is_email_notification" component={renderCheckbox} label={t('agree2')} />
                </Grid>

                <Grid item className={classes.emailInput} md={3}>
                  <Field name="email" component={renderDenseTextField} placeholder={t('common:email')} />
                </Grid>
                <Grid item className={classes.frequencySelect}>
                  <Field component={renderSelectField} name="notice_frequency" variant="outlined" margin="dense">
                    <option value="1">{t('day')}</option>
                    <option value="7">{t('week')}</option>
                    <option value="expiry">{t('onExpire')}</option>
                  </Field>
                </Grid>
              </Grid>
            </Grid>

            <div>
              <Grid container justifyContent="flex-end" className={classes.ctaDiv}>
                <Grid item>
                  <div>
                    <Button
                      variant="outlined"
                      color="secondary"
                      className={classes.ctaBtn}
                      onClick={() => {
                        dispatch(reset('editVacancy'));
                        // browserHistory.push('/omat-ilmoitukseni');
                        window.history.back();
                      }}
                    >
                      {t('cancelBtn')}
                    </Button>

                    <Button variant="contained" color="primary" type="submit" onClick={valid ? updateAndPublishAdvertisement : null}>
                      {t('publishBtn')}
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </div>
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
          window.history.back();
        }}
      >
        <MySnackbarContentWrapper
          variant="success"
          message={t('editSuccessMsg')}
          onClose={() => {
            closeSnackbar();
            window.history.back();
          }}
        />
      </Snackbar>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={apiFailed || (submitFailed && synchronousError)}
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
    </div>
  );
};

export default withStyles(styles)(EditAdvertFormComponent);
