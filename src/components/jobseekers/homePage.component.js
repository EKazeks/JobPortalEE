import React,{ useEffect,useState } from 'react';
import { Field } from 'redux-form';
import { Paper, Grid, Button, Card, CardContent, Snackbar } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { renderSwitchLabels as RenderSwitchLabels, renderSelectField } from '../../utils/wrappers';
import { MySnackbarContentWrapper } from '../../utils/snackbar.utils';
import autoCompleteLocation from '../../utils/autoCompleteLocation';
import { MultiSelectJobCategoriesComponent, MultiSelectJobHoursComponent, MultiSelectJobTypeComponent } from '../../utils/multiSelectCustomField';
import axios from 'axios';

const styles = theme => ({
  title: {
    textAlign: 'center',
    marginTop: 20,
    paddingTop: 30,
  },
  notification: {
    textAlign: 'center',
    marginBottom: 20,
  },
  body: {
    padding: '20px 50px',
  },
  dashboardInfo: {
    margin: '30px 0px',
  },
  card: {
    paddingLeft: '0 !important',
  },
  cardContent: {
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      padding: '50px !important',
    },
  },
  cardContentInfo: {
    marginTop: 40,
    color: 'black',
  },
  cardContentDynamicInfo: {
    margin: '0 8px',
  },
  searchBtn: {
    textAlign: 'center',
    paddingBottom: 80,
  },
  searchBtnText: {
    fontSize: 20,
    color: theme.palette.primary.main,
    textTransform: 'none',
  },
  homePageMultiSelectInitial: {
    '& .rw-widget-input': {
      boxShadow: 'none',
    },
  },
  homePageMultiSelectCategory: {
    '& .rw-multiselect-taglist': {
      width: '100%',
    },
    '& .rw-multiselect-tag': {
      width: 'auto',
    },
    '& .rw-multiselect .rw-input-reset': {
      height: 0,
      width: 0,
      padding: 0,
    },
  },
  homePageMultiSelectType: {
    '& .rw-multiselect-taglist': {
      width: '100%',
    },
    '& .rw-multiselect-tag': {
      width: 'auto',
    },
    '& .rw-multiselect .rw-input-reset': {
      height: 0,
      width: 0,
      padding: 0,
    },
  },
  homePageMultiSelectHours: {
    '& .rw-multiselect-taglist': {
      width: '100%',
    },
    '& .rw-multiselect-tag': {
      width: 'auto',
    },
    '& .rw-multiselect .rw-input-reset': {
      height: 0,
      width: 0,
      padding: 0,
    },
  },
  switch_base: {
    '&.Mui-checked': {
      transform: 'translateX(30px)',
    },
  },
});

const _onFormSubmit = () => {
  return false;
};

const HomePageComponent = ({
  dashboard,
  jobCategories,
  notificationToggleBtn,
  toggleEmailNotification,
  updateEmailNotification,
  formValues,
  showSuccessSnackbar,
  showFailedSnackbar,
  closeSnackbar,
  handleSubmit,
  classes,
  valid,
  pristine,
}) => {
  const[jobCategorys,setJobCategorys]=useState([])
  useEffect(() => {
    axios.get('https://localhost:7262/getAllCategories').then((res) => {
       const categoryArray=res.data
        const jobCateg= [...categoryArray.reduce((map, obj) =>map.set(obj.jobCode, obj), new Map()).values()];
       const sorted= jobCateg.sort((a, b) => a.jobCode - b.jobCode );
     const lastCategory={jobCode:`${jobCateg.length+1}`,jobTags:"Other"}
     jobCateg.push(lastCategory)
     const mapped=jobCateg.map(item => {
      return {
        id: item.jobCode,
        type: item.jobTags
      };
    });
       setJobCategorys(mapped)
    }) 
 
 },[])
  console.log(jobCategorys); 
  const { t } = useTranslation('homepage');
  return (
    <div className="container">
      <Paper>
        <div className={classes.body}>
          <h2 className={classes.title}>{t('title')}</h2>
          {/* In jobs reducer,  notificationToggleBtn is undefined, if no previous job alert has been submitted, so to hide the toggle btn */}
          {notificationToggleBtn !== undefined && (
            <div className={classes.notification}>
              <RenderSwitchLabels
                label={notificationToggleBtn ? t('on') : t('off')}
                isNotificationOn={notificationToggleBtn}
                toggleChecked={toggleEmailNotification}
                switchBaseStyle={classes.switch_base}
              />
            </div>
          )}
          <p>{t('infoText')}</p>
          <div>
            <form onSubmit={handleSubmit(_onFormSubmit)}>
              <Grid container spacing={1} alignItems="flex-start">
                <Grid item xs={12} sm={12} md={12}>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={12} sm={2}>
                      <label>{t('category')}*:</label>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={10}
                      className={
                        formValues && formValues.job_category && formValues.job_category.length > 0
                          ? classes.homePageMultiSelectCategory
                          : classes.homePageMultiSelectInitial
                      }
                    >
                      <MultiSelectJobCategoriesComponent jobCategories={jobCategorys} />
                    </Grid>
                  </Grid>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={12} sm={2}>
                      <label>{t('jobHours')}*: </label>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={10}
                      className={
                        formValues && formValues.job_hours && formValues.job_hours.length > 0
                          ? classes.homePageMultiSelectHours
                          : classes.homePageMultiSelectInitial
                      }
                    >
                      <MultiSelectJobHoursComponent />
                    </Grid>
                  </Grid>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={12} sm={2}>
                      <label>{t('jobType')}*:</label>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={10}
                      className={
                        formValues && formValues.job_type && formValues.job_type.length > 0
                          ? classes.homePageMultiSelectType
                          : classes.homePageMultiSelectInitial
                      }
                    >
                      <MultiSelectJobTypeComponent />
                    </Grid>
                  </Grid>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={12} sm={2}>
                      <label>{t('location')}*:</label>
                    </Grid>
                    <Grid item xs={12} sm={10}>
                      <Field component={autoCompleteLocation} name="job_location" variant="outlined" fullWidth margin="dense" jobseekerHome />
                    </Grid>
                  </Grid>

                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={12} sm={2}>
                      <label>{t('noticeFrequency')}*:</label>
                    </Grid>
                    <Grid item xs={12} sm={10}>
                      <Field component={renderSelectField} name="notice_frequency" variant="outlined" margin="dense" marginLeft="0" fullWidth>
                        <option value="" />
                        <option value="heti">{t('immediate')}</option>
                        <option value="1">{t('day')}</option>
                        <option value="7">{t('week')}</option>
                        <option value="30">{t('month')}</option>
                      </Field>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={12}></Grid>
              </Grid>
              <div style={{ textAlign: 'center', marginTop: 30 }}>
                <Button
                  type="submit"
                  size="large"
                  variant="contained"
                  color="primary"
                  className="fullWidthBtn"
                  disabled={pristine}
                  onClick={valid ? updateEmailNotification : null}
                >
                  {t('orderBtn')}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Paper>
      <Grid container spacing={2} className={classes.dashboardInfo}>
        <Grid item xs={12} sm={6} md={4} className={classes.card}>
          <Card>
            <CardContent className={classes.cardContent}>
              <div>
                <Link to="/profile">
                  <h3>{t('profile')}</h3>
                </Link>
              </div>
              <p className={classes.cardContentInfo}>
                {t('lastUpdated')}
                <span className={classes.cardContentDynamicInfo}>
                  {dashboard && new Intl.DateTimeFormat('fi-Fi').format(new Date(dashboard.last_modified_date))}
                </span>
              </p>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4} className={classes.card}>
          <Card>
            <CardContent className={classes.cardContent}>
              <div>
                <Link to="/suosikit">
                  <h3>{t('favorites')}</h3>
                </Link>
              </div>
              <p className={classes.cardContentInfo}>
                {/* <span className={classes.cardContentDynamicInfo}>{dashboard && dashboard.favourite}</span> */}
                <span className={classes.cardContentDynamicInfo}>{'0'}</span>
                {t('totalFavs')}
              </p>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4} className={classes.card}>
          <Card>
            <CardContent className={classes.cardContent}>
              <div>
                <Link to="/toopakkumised">
                  <h3>{t('appliedJobs')}</h3>
                </Link>
              </div>
              <p className={classes.cardContentInfo}>
                <span className={classes.cardContentDynamicInfo}>{dashboard && dashboard.applied}</span>
                {t('applied')}{' '}
              </p>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <div className={classes.searchBtn}>
        <Link to="/tyopaikat" className="btnLink">
          <Button variant="contained" color="secondary">
            <strong className={classes.searchBtnText}>{t('openJobsBtn')}</strong>
          </Button>
        </Link>
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
          variant="success"
          message={t('successMsg')}
          onClose={() => {
            closeSnackbar();
          }}
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

export default withStyles(styles)(HomePageComponent);
