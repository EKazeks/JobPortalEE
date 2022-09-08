import React from 'react';
import { Button, Card, CardContent, CardActions, Grid, Divider, Snackbar } from '@material-ui/core';
import { Field, change, FieldArray } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { renderDenseTextField } from '../../utils/wrappers';
import renderDropzoneField from '../../utils/dropzone';
import { clearCompanyLogo } from '../../actions';
import { RenderAdditionalUsers } from '../../utils/profile.utils';
import { MySnackbarContentWrapper } from '../../utils/snackbar.utils';
import CompanyListsModel from '../../utils/companyListsModel';
import TextEditor from '../../utils/textEditor';

const styles = theme => ({
  title: {
    margin: '50px 0',
    color: theme.palette.primary.main,
  },

  fieldLabel: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    marginTop: 20,
  },
  formBtn: {
    margin: '30px 5px',
  },
  card: {
    margin: '70px auto',
  },

  dropDownListsTextField: {
    position: 'relative',
  },

  dropDownLists: {
    position: 'absolute',
    width: '100%',
    zIndex: 3,
    background: '#f9f9f9',
  },

  marginTop: {
    [theme.breakpoints.up('sm')]: {
      marginTop: 50,
    },
  },
});

const _onFormSubmit = () => {
  return false;
};

const NewProfileComponent = ({
  classes,
  invalid,
  logo,
  dispatch,
  handleSubmit,
  addCompanyProfile,
  showSuccessSnackbar,
  showFailedSnackbar,
  closeSnackbar,
  searchCompanyDetails,
  companyLists,
  loadSelectedCompany,
  closeCompanyLists,
  apiSuccess,
}) => {
  const { t } = useTranslation('profile');
  return (
    <div className="container">
      <div className={classes.title}>
        <h3>{t('title')}</h3>
        <Divider />
      </div>
      <div>
        <form onSubmit={handleSubmit(_onFormSubmit)}>
          <Card className={classes.card}>
            <CardContent>
              <Grid container>
                <Grid item sm={12}>
                  <div>
                    <Grid container alignItems="center">
                      <Grid item sm={4}>
                        <label htmlFor="company_name" className={classes.fieldLabel}>
                          {t('companyName')}
                        </label>
                      </Grid>
                      <Grid item sm={8} xs={12}>
                        <div className={classes.dropDownListsTextField}>
                          <Field
                            component={renderDenseTextField}
                            name="company_name"
                            id="company_name"
                            required
                            onChange={e => (e.target.value.length > 1 ? searchCompanyDetails(e.target.value) : closeCompanyLists())}
                            autoComplete="no"
                          />
                          <div className={classes.dropDownLists}>
                            {apiSuccess && (
                              <CompanyListsModel
                                companyLists={companyLists}
                                loadSelectedCompany={loadSelectedCompany}
                                closeCompanyLists={closeCompanyLists}
                                formName="newCompanyForm"
                              />
                            )}
                          </div>
                        </div>
                      </Grid>
                    </Grid>

                    <div>
                      <Grid container alignItems="center">
                        <Grid item sm={4}>
                          <label className={classes.fieldLabel} htmlFor="firstName">
                            {t('firstName')}
                          </label>
                        </Grid>
                        <Grid item sm={8} xs={12}>
                          <Field component={renderDenseTextField} name="firstName" id="firstName" required disabled />
                        </Grid>
                      </Grid>
                      <Grid container alignItems="center">
                        <Grid item sm={4}>
                          <label className={classes.fieldLabel} htmlFor="lastName">
                            {t('lastName')}:
                          </label>
                        </Grid>
                        <Grid item sm={8} xs={12}>
                          <Field component={renderDenseTextField} name="lastName" required disabled />
                        </Grid>
                      </Grid>
                      <Grid container alignItems="center">
                        <Grid item sm={4}>
                          <label className={classes.fieldLabel} htmlFor="email">
                            {t('email')}:
                          </label>
                        </Grid>
                        <Grid item sm={8} xs={12}>
                          <Field component={renderDenseTextField} name="email" id="email" required disabled />
                        </Grid>
                      </Grid>
                    </div>
                    <Grid container alignItems="center">
                      <Grid item sm={4}>
                        <label className={classes.fieldLabel} htmlFor="contact_number">
                          {t('phone')}:
                        </label>
                      </Grid>
                      <Grid item sm={8} xs={12}>
                        <Field component={renderDenseTextField} name="contact_number" id="contact_number" required />
                      </Grid>
                    </Grid>
                    <Grid container alignItems="center">
                      <Grid item sm={4}>
                        <label className={classes.fieldLabel} htmlFor="business_id">
                          {t('businessId')}:
                        </label>
                      </Grid>
                      <Grid item sm={8} xs={12}>
                        <Field component={renderDenseTextField} name="business_id" id="business_id" required />
                      </Grid>
                    </Grid>
                    <Grid container alignItems="center">
                      <Grid item sm={4}>
                        <label className={classes.fieldLabel} htmlFor="address">
                          {t('address')}:
                        </label>
                      </Grid>
                      <Grid item sm={8} xs={12}>
                        <Field component={renderDenseTextField} name="address" id="address" required />
                      </Grid>
                    </Grid>
                    <Grid container alignItems="center">
                      <Grid item sm={4}>
                        <label className={classes.fieldLabel} htmlFor="city">
                          {t('city')}:
                        </label>
                      </Grid>
                      <Grid item sm={8} xs={12}>
                        <Field component={renderDenseTextField} name="city" id="city" required />
                      </Grid>
                    </Grid>
                    <Grid container alignItems="center">
                      <Grid item sm={4}>
                        <label className={classes.fieldLabel} htmlFor="zip_code">
                          {t('postNum')}:
                        </label>
                      </Grid>
                      <Grid item sm={8} xs={12}>
                        <Field component={renderDenseTextField} name="zip_code" id="zip_code" required />
                      </Grid>
                    </Grid>
                    <Grid container alignItems="center">
                      <Grid item sm={4}>
                        <label className={classes.fieldLabel} htmlFor="company_url">
                          {t('companyURL')}:
                        </label>
                      </Grid>
                      <Grid item sm={8} xs={12}>
                        <Field component={renderDenseTextField} name="company_url" id="company_url" />
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
              </Grid>
              <Grid>
                <Grid item xs={12}>
                  <label className={classes.fieldLabel} htmlFor="profile_description">
                    {t('companyDesc')}:
                  </label>
                </Grid>
                {/* <Grid item xs={10} sm={12} md={10}> */}
                <Grid item xs={12}>
                  <Field component={TextEditor} name="profile_description" id="profile_description" multiline rows="10" placeholder={t('descPlaceholder')} />
                </Grid>
                <Grid item md={4} sm={12} />
              </Grid>
              <Grid container className={classes.marginTop} alignItems="flex-end">
                <Grid item xs={12} sm={6}>
                  <Field name="logo_document" component={renderDropzoneField} type="file" imagefile={logo} btnText={t('addLogo')} fullWidth isLogo />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <div>
                    <i style={{ color: '#6c757d' }}>{t('advertForm:voluntary')}</i>

                    <p className={classes.imageText}>{t('picText')}</p>
                  </div>

                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      dispatch(change('newCompanyForm', 'logo_document', undefined));
                      dispatch(clearCompanyLogo());
                    }}
                  >
                    <DeleteForeverIcon fontSize="small" style={{ marginRight: 5 }} />
                    {t('deleteLogo')}
                  </Button>
                </Grid>
              </Grid>
              <div className={classes.marginTop}>
                <FieldArray name="companyUser" component={RenderAdditionalUsers} />
              </div>
            </CardContent>

            <CardActions>
              <Button
                type="submit"
                variant="contained"
                className={classes.formBtn}
                color="primary"
                style={{ margin: '20px auto' }}
                onClick={!invalid ? addCompanyProfile : null}
              >
                {t('common:saveBtn')}
              </Button>
            </CardActions>
          </Card>
        </form>
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={showSuccessSnackbar}
        autoHideDuration={4000}
        onClose={() => {
          closeSnackbar();
        }}
      >
        <MySnackbarContentWrapper
          onClose={() => {
            closeSnackbar();
            // browserHistory.push('/dashboard/main')
          }}
          variant="success"
          message={t('successMsg')}
        />
      </Snackbar>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={showFailedSnackbar}
        autoHideDuration={4000}
        onClose={() => {
          closeSnackbar();
        }}
      >
        <MySnackbarContentWrapper
          onClose={() => {
            closeSnackbar();
          }}
          variant="error"
          message={t('failedMsg')}
        />
      </Snackbar>
    </div>
  );
};

export default withStyles(styles)(NewProfileComponent);
