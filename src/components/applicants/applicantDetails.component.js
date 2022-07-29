import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { Button, Card, CardContent, CardActions, Grid, Divider, Snackbar, CircularProgress } from '@material-ui/core';
import { Field } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import DoneIcon from '@material-ui/icons/Done';
import { MySnackbarContentWrapper } from '../../utils/snackbar.utils';
import { renderAdminDatePicker, renderDenseTextField, renderTimePicker } from '../../utils/wrappers';
import SideBar from '../../containers/layout/sideBar.container';
import { Link } from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { customURL, dateFormat } from '../../utils/helperFunctions';
import TextEditor from '../../utils/textEditor';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { fetchJobApplicants } from '../../actions';

const styles = theme => ({
  formBtn: {
    margin: '20px 0 0 20px',
  },

  card: {
    margin: '70px auto',
  },
  layout: {
    padding: 40,
    [theme.breakpoints.down('xs')]: {
      padding: 20,
    },
  },
  ctaBtn: {
    padding: ' 0 40px 40px',
    [theme.breakpoints.down('xs')]: {
      padding: '0 20px 20px',
    },
  },
  title: {
    margin: '50px 0',
    color: theme.palette.primary.main,
  },
  fieldLabel: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
  },
  fieldTitle: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    //fontSize: 25
  },
  activeStatus: {
    marginBottom: 10,
    backgroundColor: theme.palette.custom.activeBtn,
    color: 'white',
    '&:disabled': {
      backgroundColor: theme.palette.custom.activeBtn,
      color: 'white',
    },
    [theme.breakpoints.up('sm')]: {
      marginRight: 6,
    },
  },
  rejectStatus: {
    marginBottom: 10,
    backgroundColor: theme.palette.custom.rejectBtn,
    '&:disabled': {
      backgroundColor: theme.palette.custom.rejectBtn,
      color: 'white',
    },
    [theme.breakpoints.up('sm')]: {
      marginRight: 6,
    },
  },
  inactiveStatus: {
    // width: 210,
    marginBottom: 10,
    [theme.breakpoints.up('sm')]: {
      marginRight: 6,
    },
  },
  adContent: {
    flexGrow: 1,

    [theme.breakpoints.up('md')]: {
      marginLeft: 200,
      padding: theme.spacing(3),
    },
  },
  applicationCard: {
    padding: 20,
    marginTop: 8,
    minHeight: 552,
  },
  backBtnText: {
    color: theme.palette.secondary.main,
    '&:hover': {
      textDecoration: 'none',
      color: theme.palette.primary.main,
    },
  },
  backBtnContainer: {
    marginTop: 2,
  },
  rte: {
    cursor: 'not-allowed',
  },
});

const _onFormSubmit = () => {
  return false;
};

const ApplicantDetails = ({
  viewSelectedAd,
  updateApplicantStatus,
  updateJobApplicationDetails,
  viewApplication,
  hasInterviewData,
  isToEdit,
  editInterviewDetails,
  showSuccessSnackbar,
  isToSendEmail,
  showFailedSnackbar,
  closeSnackbar,
  loading,
  classes,
  valid,
  pristine,
  handleSubmit,
}) => {
  const applicant_cv = viewApplication.applicant_cv && viewApplication.applicant_cv[0].path;
  const cv_filename = viewApplication.applicant_cv && viewApplication.applicant_cv[0].filename;
  const { t } = useTranslation('applicant', 'common');
  const [jobsToRender, setJobsToRender] = useState([]);
  const [applicants, setApplicants] = useState([])
  const [address, setAddress] = useState()
  const {id} = useSelector((state) => state.jobs)
  const dispatch = useDispatch()
  //const {jobpostId} = useSelector((state) => state.jobs.jobApplicants)

  useEffect(() => {
    axios.get(`https://localhost:7262/jobsEn/${id}`).then(res => {
      setJobsToRender(res.data);
      setApplicants(res.data.jobPostApplications)
      setAddress(res.data.jobPostAddress.address)
    });
  }, []);

  // useEffect(() => {
  //   dispatch(fetchJobApplicants(applicants.id))
  //   console.log(applicantId);
  // },[])
  return (
    <div className="job-application">
      <SideBar />
      <div className={classes.adContent}>
        <div className="container">
          <div className={classes.backBtnContainer}>
            <Link to={`${customURL(jobsToRender.url, 'internal')}`} className={classes.backBtnText}>
              <ArrowBackIosIcon /> {t('jobs:backButton')}
            </Link>
          </div>
          <div className={classes.title}>
            <h3>
              {jobsToRender.jobName}, {address}
            </h3>
            <Divider />
          </div>
          <form onSubmit={handleSubmit(_onFormSubmit)}>
            <Card className={classes.card}>
              <CardContent className={classes.layout}>
                <Grid container>
                  <Grid item md={8} sm={12}>
                    <div>
                      <Grid container alignItems="center">
                        <Grid item sm={4}>
                          <label htmlFor="firstName" className={classes.fieldLabel}>
                            {t('common:firstName')}:
                          </label>
                        </Grid>
                        <Grid item md={6} sm={8} xs={12}>
                          <Field component={renderDenseTextField} name="firstName" id="firstName" disabled />
                        </Grid>
                      </Grid>
                      <Grid container alignItems="center">
                        <Grid item sm={4}>
                          <label htmlFor="lastName" className={classes.fieldLabel}>
                            {t('common:lastName')}:
                          </label>
                        </Grid>
                        <Grid item md={6} sm={8} xs={12}>
                          <Field component={renderDenseTextField} name="lastName" id="lastName" disabled />
                        </Grid>
                      </Grid>

                      <Grid container alignItems="center">
                        <Grid item sm={4}>
                          <label htmlFor="email" className={classes.fieldLabel}>
                            {t('common:email')}:
                          </label>
                        </Grid>
                        <Grid item md={6} sm={8} xs={12}>
                          <Field component={renderDenseTextField} name="email" id="email" disabled />
                        </Grid>
                      </Grid>
                      <Grid container alignItems="center">
                        <Grid item sm={4}>
                          <label htmlFor="phone" className={classes.fieldLabel}>
                            {t('common:phone')}:
                          </label>
                        </Grid>
                        <Grid item md={6} sm={8} xs={12}>
                          <Field component={renderDenseTextField} name="phone" id="phone" disabled />
                        </Grid>
                      </Grid>
                      <Grid container alignItems="center">
                        <Grid item sm={4}>
                          <label htmlFor="linkedIn" className={classes.fieldLabel}>
                            {t('common:LinkedIn')}:
                          </label>
                        </Grid>
                        <Grid item md={6} sm={8} xs={12}>
                          <Field component={renderDenseTextField} name="linkedIn" id="linkedIn" disabled />
                        </Grid>
                      </Grid>
                      <Grid container alignItems="center">
                        <Grid item sm={4}>
                          <label htmlFor="description" className={classes.fieldLabel}>
                            {t('common:portfolio')}:
                          </label>
                        </Grid>
                        <Grid item md={6} sm={8} xs={12}>
                          <Field component={renderDenseTextField} name="description" id="description" disabled />
                        </Grid>
                      </Grid>
                      <Grid container alignItems="center">
                        <Grid item sm={4}>
                          <label htmlFor="cv" className={classes.fieldLabel}>
                            {t('cvTitle')}:
                          </label>
                        </Grid>
                        <Grid item md={6} sm={8} xs={12}>
                          {/* <a href={applicant_cv} target="_blank" rel="noopener noreferrer">
                            {cv_filename}
                          </a> */}
                        </Grid>
                      </Grid>
                    </div>
                  </Grid>
                  <Grid item md={4} sm={12} style={{ marginTop: 30 }}>
                    {viewApplication && viewApplication.applicant_photo ? (
                      <div className={classes.applicantPhoto}>
                        <p className={classes.fieldLabel}>{t('common:photo')}:</p>
                        <div
                          style={{
                            background: `url(${viewApplication.applicant_photo[0].path})`,
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat',
                            height: 200,
                            width: 200,
                          }}
                        />
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </Grid>
                </Grid>
                <Grid container alignItems="center" style={{ marginTop: 15 }}>
                  <Grid item sm={4}>
                    <label className={classes.fieldLabel} htmlFor="description">
                      {t('applicationMsg')}:
                    </label>
                  </Grid>
                  <Grid item xs={12} sm={12} md={10}>
                    <Field
                      className={classes.rte}
                      component={TextEditor}
                      name="description"
                      id="description"
                      disabled
                      // placeholder={t('descPlaceholder')}
                    />
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions className={classes.ctaBtn}>
                <Grid container justifyContent="space-evenly">
                  <Grid container item>
                    <Grid item className="fullWidthBtn">
                      <Button
                        variant="contained"
                        //className={classNames(viewApplication.status === 1 ? classes.activeStatus : classes.inactiveStatus, 'fullWidthBtn')}
                        //startIcon={viewApplication.status === 1 && <DoneIcon />}
                        //disabled={viewApplication.status === 1}
                        color="primary"
                        onClick={() =>
                          updateApplicantStatus(applicants.id, applicants.jobpostId, applicants.email, 1)
                        }
                      >
                        {t('call')} / {t('interview')}
                      </Button>
                    </Grid>
                    <Grid item className="fullWidthBtn">
                      <Button
                        variant="contained"
                        className={classNames(applicants.status === 4 ? classes.rejectStatus : classes.inactiveStatus, 'fullWidthBtn')}
                        startIcon={applicants.status === 4 && <DoneIcon />}
                        disabled={applicants.status === 4}
                        color="secondary"
                        onClick={() =>
                          updateApplicantStatus(applicants.id, applicants.jobpostId, applicants.email, 4)
                        }
                      >
                        {t('dontCall')}
                      </Button>
                    </Grid>
                    <Grid item className="fullWidthBtn">
                      <Button
                        variant="contained"
                        className={classNames(applicants.status === 2 ? classes.activeStatus : classes.inactiveStatus, 'fullWidthBtn')}
                        startIcon={applicants.status === 2 && <DoneIcon />}
                        disabled={applicants.status === 2}
                        color="primary"
                        onClick={() =>
                          updateApplicantStatus(applicants.id, applicants.jobpostId, applicants.email, 2)
                        }
                      >
                        {t('interviewBooked')}
                      </Button>
                    </Grid>
                    <Grid item className="fullWidthBtn">
                      <Button
                        variant="contained"
                        className={classNames(applicants.is_fav ? classes.activeStatus : classes.inactiveStatus, 'fullWidthBtn')}
                        startIcon={applicants.is_fav && <DoneIcon />}
                        color="secondary"
                        onClick={() =>
                          updateApplicantStatus(applicants.id,applicants.jobpostId, applicants.email, 3)
                        }
                      >
                        {t('addToFavorites')}
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </CardActions>
            </Card>

            <div className="final-content">
              <Grid container justifyContent="space-around" spacing={2}>
                <Grid item xs={12} sm={6}>
                  <ApplicantNotes
                    t={t}
                    isToSendEmail={isToSendEmail}
                    pristine={pristine}
                    classes={classes}
                    details={viewApplication}
                    loading={loading}
                    handleClick={() =>
                      updateJobApplicationDetails(
                        viewApplication.application_id,
                        viewApplication.company_id,
                        viewApplication.post_id,
                        viewApplication.email,
                        'note',
                      )
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ApplicantInterview
                    t={t}
                    isToSendEmail={isToSendEmail}
                    valid={valid}
                    classes={classes}
                    loading={loading}
                    hasInterviewData={hasInterviewData}
                    isToEdit={isToEdit}
                    editInterviewDetails={editInterviewDetails}
                    handleClick={() =>
                      updateJobApplicationDetails(
                        viewApplication.application_id,
                        viewApplication.company_id,
                        viewApplication.post_id,
                        viewApplication.email,
                        'interview',
                      )
                    }
                  />
                </Grid>
              </Grid>
            </div>
          </form>
        </div>
      </div>

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={showSuccessSnackbar}
        autoHideDuration={3000}
        onClose={() => {
          closeSnackbar();
        }}
      >
        <MySnackbarContentWrapper
          onClose={() => {
            closeSnackbar();
          }}
          variant="success"
          message={isToSendEmail ? t('emailSuccessMsg') : t('successMsg')}
        />
      </Snackbar>
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
          onClose={() => {
            closeSnackbar();
          }}
          variant="error"
          message={isToSendEmail ? t('emailFailedMsg') : t('failedMsg')}
        />
      </Snackbar>
    </div>
  );
};

const ApplicantNotes = ({ t, classes, handleClick, loading, isToSendEmail, pristine }) => {
  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        <h3 className="panel-title">{t('addNotes')}</h3>
      </div>
      <div className={classes.applicationCard}>
        <Grid className="application-notes">
          <Field
            component={TextEditor}
            name="application_notes"
            id="application_notes"
            multiline
            rows="16"
            // placeholder={t('descPlaceholder')}
          />
        </Grid>
        <Grid container justifyContent="flex-end">
          <Button variant="outlined" className={classes.formBtn} color="primary" onClick={!pristine ? handleClick : undefined}>
            {loading && !isToSendEmail ? <CircularProgress size={20} color="white" /> : t('common:saveBtn')}
          </Button>
        </Grid>
      </div>
    </div>
  );
};
const ApplicantInterview = ({ t, classes, handleClick, loading, isToSendEmail, valid, hasInterviewData, isToEdit, editInterviewDetails }) => {
  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        <h3 className="panel-title">{t('interviewTitle')}</h3>
      </div>
      <div className={classes.applicationCard}>
        <Grid container alignItems="center">
          <Grid item sm={3}>
            <label htmlFor="title" className={classes.fieldLabel}>
              {t('interview:title')}:
            </label>
          </Grid>
          <Grid item sm={9} xs={12}>
            <Field component={renderDenseTextField} name="interview_title" id="title" disabled={hasInterviewData && !isToEdit ? true : false} />
          </Grid>
        </Grid>
        <Grid container alignItems="center" className="interview-rte">
          <Grid item sm={3}>
            <label htmlFor="message" className={classes.fieldLabel}>
              {t('interview:message')}:
            </label>
          </Grid>
          <Grid item sm={9} xs={12}>
            <Field component={TextEditor} name="interview_msg" id="message" multiline rows="20" disabled={hasInterviewData && !isToEdit ? true : false} />
          </Grid>
        </Grid>
        <Grid container alignItems="center">
          <Grid item sm={3}>
            <label htmlFor="interview_date" className={classes.fieldLabel}>
              {t('interview:date')}:
            </label>
          </Grid>
          <Grid item sm={9} xs={12}>
            <Field
              component={renderAdminDatePicker}
              name="interview_date"
              id="interview_date"
              role="interview"
              disabled={hasInterviewData && !isToEdit ? true : false}
            />
          </Grid>
        </Grid>
        <Grid container alignItems="center">
          <Grid item sm={3}>
            <label htmlFor="interview_time" className={classes.fieldLabel}>
              {t('interview:time')}:
            </label>
          </Grid>
          <Grid item sm={9} xs={12}>
            <Field component={renderTimePicker} name="interview_time" id="interview_time" disabled={hasInterviewData && !isToEdit ? true : false} />
          </Grid>
        </Grid>
        <Grid container alignItems="center">
          <Grid item sm={3}>
            <label htmlFor="interview_place" className={classes.fieldLabel}>
              {t('interview:place')}:
            </label>
          </Grid>
          <Grid item sm={9} xs={12}>
            <Field component={renderDenseTextField} name="interview_place" id="interview_place" disabled={hasInterviewData && !isToEdit ? true : false} />
          </Grid>
        </Grid>

        <Grid container alignItems="center" justifyContent="flex-end">
          <Grid item>
            {isToEdit ? (
              <Button
                variant="outlined"
                className={classes.formBtn}
                color="primary"
                type="submit"
                onClick={() => {
                  editInterviewDetails(false);
                }}
              >
                {t('common:cancelBtn')}
              </Button>
            ) : (
              hasInterviewData && (
                <Button variant="outlined" color="primary" className={classes.formBtn} onClick={() => editInterviewDetails(true)}>
                  {t('common:editBtn')}
                </Button>
              )
            )}
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              className={classes.formBtn}
              color="primary"
              type="submit"
              disabled={hasInterviewData && !isToEdit ? true : false}
              onClick={valid ? handleClick : undefined}
            >
              {loading && isToSendEmail ? <CircularProgress size={20} color="white" /> : t('common:sendBtn')}
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
export default withStyles(styles)(ApplicantDetails);
