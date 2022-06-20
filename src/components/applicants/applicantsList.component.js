import React, { useEffect, useState } from 'react';
import { Grid, Paper, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import ReactPaginate from 'react-paginate';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import store from '../../store';
import { getApplicationDetailsById, warnToDeleteApplication } from '../../actions';
import CustomizedDialogs from '../../utils/customizedDialog';
import DropDownPagination from '../../utils/dropDownPagination';
import noProfileImg from '../../images/no_profile_pic.png';
import axios from 'axios';

const styles = theme => ({
  titleMargin: {
    [theme.breakpoints.down('sm')]: {
      marginTop: 0,
    },
  },
  status: {
    color: theme.palette.custom.activeBtn,
    lineHeight: 2,
  },
  rejectStatus: {
    color: theme.palette.custom.rejectBtn,
    lineHeight: 2,
  },
  lists: {
    marginTop: 10,
    overflowWrap: 'breakWord',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
    },
  },
  newApplicants: {
    marginBottom: 50,
  },
  profileImage: {
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    height: 70,
    width: 70,
    borderRadius: 50,
    border: '1px solid lightgray',
    margin: 'auto',
    [theme.breakpoints.down('md')]: {
      height: 60,
      width: 60,
    },
  },
  headers: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  applicationEmail: {
    overflowWrap: 'break-word',
  },
  ctaBtn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.between('sm', 'md')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
  },
  removeBtn: {
    marginRight: 8,
    [theme.breakpoints.between('sm', 'md')]: {
      marginLeft: 0,
      marginBottom: 4,
    },
  },
  selectPage: {
    marginBottom: 20,
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
});

const ApplicantsList = ({ viewSelectedAd, applications, classes, showDialog, deleteApplication, advertPages, changeAdvertPage, selectedPage, rowsPerPage }) => {
  const { t } = useTranslation('applicant');
  const [jobsToRender, setJobsToRender] = useState([]);
  selectedPage = 1;

  useEffect(() => {
    axios.get(`https://localhost:7262/jobsEn`).then(res => {
      setJobsToRender(res.data);
      console.log(jobsToRender);
    });
  }, []);

  return (
    <div className="container">
      <div className={classes.backBtnContainer}>
        <Link to="/omat-ilmoitukseni" className={classes.backBtnText}>
          <ArrowBackIosIcon /> {t('jobs:backButton')}
        </Link>
      </div>

      <div className={classes.totalApplicants}>
        <Grid container>
          <Grid item xs={9} sm={11}>
            <h3 className="ad_title_3">
              {t('allApplicants')} ({jobsToRender.totalApplicants}):
            </h3>
          </Grid>
          <Grid item xs={3} sm={1}>
            <div className={classes.selectPage}>
              <DropDownPagination rows={rowsPerPage} />
            </div>
          </Grid>
        </Grid>

        <Grid container spacing={2} style={{ padding: '0 20px' }} className={classes.headers}>
          <Grid item sm={2} />
          <Grid item sm={2}>
            <div>
              <strong>{t('common:name')}</strong>
            </div>
          </Grid>
          <Grid item sm={3}>
            <div>
              <strong>{t('common:email')}</strong>
            </div>
          </Grid>
          <Grid item sm={2}>
            <div>
              <strong>{t('common:phone')}</strong>
            </div>
          </Grid>
          <Grid item sm={2}>
            <div>
              <strong>{t('common:Applied date')}</strong>
            </div>
          </Grid>
          <Grid item sm={1}>
            <div />
          </Grid>
        </Grid>
        <ApplicationsList
          applications={applications}
          classes={classes}
          advertPages={advertPages}
          changeAdvertPage={changeAdvertPage}
          selectedPage={selectedPage}
          showPagination={applications && applications.length > 0 ? true : false}
          rowsPerPage={rowsPerPage}
        />
      </div>

      <CustomizedDialogs
        showDialog={showDialog}
        dialogText={t('jobs:warnToDeleteApplicationText')}
        warnToDeleteApplicationModal
        handleClick={deleteApplication}
      />
    </div>
  );
};

const ApplicationsList = ({ applications, classes, selectedPage, advertPages, changeAdvertPage, showPagination, rowsPerPage }) => {
  const { t } = useTranslation('applicant');
  return (
    <div style={applications && applications.length > 0 ? { marginBottom: 0 } : { marginBottom: 160 }}>
      {applications &&
        applications
          // .slice(selectedPage * 4, selectedPage * 4 + 4)
          .slice(selectedPage * rowsPerPage, selectedPage * rowsPerPage + rowsPerPage)
          .map((application, i) => {
            const applicationDetails = {
              application_id: application.application_id,
              company_id: application.company_id,
              post_id: application.post_id,
              email: application.email,
            };
            return (
              <div>
                <div key={i}>
                  <Paper className={classes.lists}>
                    <Grid container spacing={1} alignItems="center" style={{ padding: 8 }}>
                      <Grid item xs={12} sm={2}>
                        {application.applicant_photo && application.applicant_photo ? (
                          <div>
                            <div
                              className={classes.profileImage}
                              style={{
                                backgroundImage: `url(${application.applicant_photo[0].path})`,
                              }}
                            />
                          </div>
                        ) : (
                          <div>
                            <div
                              className={classes.profileImage}
                              style={{
                                backgroundImage: `url(${noProfileImg})`,
                              }}
                            />
                          </div>
                        )}
                      </Grid>
                      <Grid item xs={12} sm={2}>
                        <div>
                          <strong className={application.status !== 4 ? classes.status : classes.rejectStatus}>
                            {application.open_status === 0 ? t('newApplicant') : ''}
                            {application.is_fav && <StarBorderIcon />}

                            {application.status === 1
                              ? t('call')
                              : application.status === 2
                              ? t('interviewBooked')
                              : application.status === 4
                              ? t('dontCall')
                              : ''}
                          </strong>
                          <p>
                            {application.firstname} {application.lastname}
                          </p>
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <div className={classes.applicationEmail}>
                          <a href={`mailto:${application.email}`} target="_blank" rel="noopener noreferrer">
                            <p>{application.email}</p>
                          </a>
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={2}>
                        <div>
                          <p>{application.contact_number}</p>
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={1}>
                        <div>
                          <p> {new Intl.DateTimeFormat('fi-FI', {
                            month: '2-digit',
                            day: '2-digit',
                            year: 'numeric',
                          }).format(new Date(application.created))}</p>
                        </div>
                      </Grid>

                      <Grid item xs={12} sm={1} md={2}>
                        <div className={classes.ctaBtn}>
                          <Button
                            variant="outlined"
                            color="secondary"
                            className={classes.removeBtn}
                            onClick={() => store.dispatch(warnToDeleteApplication(applicationDetails))}
                          >
                            {t('common:deleteBtn')}
                          </Button>
                          <div>
                            <Link to={`/applicants/${application.company_id}JP${application.post_id}${application.application_id}`} className="btnLink_white">
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() =>
                                  store.dispatch(
                                    getApplicationDetailsById(application.application_id, application.company_id, application.post_id, application.email),
                                  )
                                }
                              >
                                {t('common:viewBtn')}
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                  </Paper>
                </div>
              </div>
            );
          })}
      {showPagination && (
        <div className={classes.paginationBody}>
          <ReactPaginate
            previousLabel={<NavigateBeforeIcon />}
            nextLabel={<NavigateNextIcon />}
            breakLabel="..."
            breakClassName="break-me"
            pageCount={advertPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={changeAdvertPage}
            containerClassName="pagination"
            subContainerClassName="pages pagination"
            activeClassName="active"
            forcePage={selectedPage}
          />
        </div>
      )}
    </div>
  );
};

export default withStyles(styles)(ApplicantsList);
