import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Grid, Paper, Button, Snackbar } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ReactPaginate from 'react-paginate';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import { useTranslation } from 'react-i18next';
import { customURL } from '../../utils/helperFunctions';
import { FavBtn } from '../../utils/favBtn.js';
import SearchFormContainer from '../../containers/jobs/searchForm.container.js';
import { MySnackbarContentWrapper } from '../../utils/snackbar.utils';
import CustomizedDialog from '../../utils/customizedDialog';
import Loader from '../../utils/loader';

const styles = theme => ({
  heroImage: {
    height: 400,
    background: 'url(avoimet-vapaat-tyopaikat-banner-photo.jpg) no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
  },
  heroImageTitle: {
    color: 'white',
    textAlign: 'center',
    paddingTop: 20,
    fontWeight: 800,
    fontSize: '4.5rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2.5rem',
    },
  },
  searchForm: {
    marginTop: -150,
    backgroundColor: theme.palette.primary.main,
    padding: '50px 20px 70px 20px',
  },
  jobInfo: {
    color: theme.palette.custom.darkText,
    // fontSize: '1.25rem',
    [theme.breakpoints.down('xs')]: {
      fontSize: '1rem',
    },
  },
  jobTitle: {
    color: theme.palette.primary.main,

    fontWeight: 700,
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.2rem',
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.5rem',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '1.60rem',
    },
  },
  emptyResult: {
    padding: '50px 20px 70px 20px',
  },
  logoContainer: {
    fontSize: 16,
    height: '9rem',
    width: '9rem',
    position: 'relative',
    [theme.breakpoints.down('xs')]: {
      height: '7rem',
      width: '5rem',
    },
  },
  logoDiv: {
    height: '8rem',
    width: '8rem',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '50% 50%',
    [theme.breakpoints.down('xs')]: {
      height: '6rem',
      width: '5rem',
    },
  },
  companyName: {
    position: 'absolute',
    top: '40%',
    // fontSize: 12
  },
  jobContainerHover: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0,
  },
  paper: {
    marginTop: 20,
    position: 'relative',
    '&:hover': {
      backgroundColor: theme.palette.custom.jobListHoverColor,
    },
  },
});

// For styling the pagination:

const JobsComponent = ({
  getJobDetailsById,
  jobs,
  changeAdvertPage,
  advertPages,
  selectedPage,
  favoriteJobs,
  toggleFavoriteJobs,
  showSpinner,
  showSuccessSnackbar,
  showDialog,
  userRole,
  isToDeleteAdvertisementId,
  closeSnackbar,
  openAdToSeeAdInfo,
  warnToDelete,
  isWarnToDelete,
  deleteAdvertisement,
  classes,
}) => {
  const { t } = useTranslation('jobsList', 'jobs');
  return (
    <div>
      <div className={classes.heroImage}>
        <div style={{ height: 100 }} />
        <h1 className={classes.heroImageTitle}>{t('heroTitle')}</h1>
      </div>
      <div>
        <Grid container justifyContent="space-around">
          <Grid item md={3} xs={10}>
            <div className={classes.searchForm}>
              <SearchFormContainer />
            </div>
          </Grid>
          {/* Depending on the flag from backend (e.g. isJobPortal/ ask Pragya), we will pick the right keys for job portal and mol jobs */}
          <Grid item md={8} xs={12} sm={10}>
            {jobs.length === 0 && showSpinner === false && (
              <p className={classes.emptyResult}>
                <strong>{t('noJobsFound')}</strong>
              </p>
            )}
            <Loader showSpinner={showSpinner} />

            {jobs &&
              jobs.slice(selectedPage * 10, selectedPage * 10 + 10).map(item => {
                return item.post_id !== undefined ? (
                  <div key={`${item.company_id}${item.post_id}`}>
                    <Paper className={classes.paper}>
                      {/*  <p style={{ backgroundColor: 'blue' }}>
                        Testing for reference:This job belongs to JOB PORTAL /
                        DELETE THIS
                      </p> */}

                      {/* <Grid container sm={12} xs={8} style={{ padding: 20 }} spacing={1}> */}
                      <Grid container style={{ padding: 20 }} spacing={1} alignItems="center" justifyContent="space-around">
                        {userRole === 'admin' ? ( // To give the admins same view as Companies so they can edit ads!
                          <Link
                            className={classes.jobContainerHover}
                            to={`/jobpost/${customURL(item.job_title)}/${item.post_id}`}
                            onClick={() => openAdToSeeAdInfo(`${item.post_id}admin${item.company_id}`)}
                          />
                        ) : (
                          <Link
                            className={classes.jobContainerHover}
                            to={`/tyopaikat/${customURL(item.company_name)}/${item.company_id}/${customURL(item.job_title)}/${item.post_id}`}
                          />
                        )}
                        <Grid item sm={3} xs={4}>
                          <div className={classes.logoContainer}>
                            {item.logo_document ? (
                              <div
                                className={classes.logoDiv}
                                style={{
                                  backgroundImage: `url(${item.logo_document[0].path})`,
                                }}
                              />
                            ) : (
                              <span className={classes.companyName}>{item.company_name.slice(0, 20)}</span>
                            )}
                          </div>
                        </Grid>
                        <Grid item sm={5} xs={8}>
                          <div>
                            <h3 className={classNames(classes.jobTitle, classes.jobInfo)}> {item.job_title} </h3>
                          </div>

                          <div>
                            <h5 className={classes.jobInfo}>{item.company_name}</h5>
                          </div>

                          <div>
                            <h5 className={classes.jobInfo}>{item.job_location}</h5>
                          </div>
                        </Grid>
                        <Grid item xl={2} lg={3} md={4} sm={4} xs={12}>
                          <Grid container justifyContent="space-between" spacing={2}>
                            <Grid item sm={5} xs={6}>
                              {userRole === 'admin' ? ( // For admins show deleteBtn instead of FavBtn
                                <Button variant="outlined" color="secondary" onClick={() => warnToDelete(`${item.post_id}admin${item.company_id}`)}>
                                  {t('common:deleteBtn')}
                                </Button>
                              ) : (
                                <FavBtn
                                  className={classes.favBtn}
                                  handleFav={() => {
                                    toggleFavoriteJobs(
                                      item.company_id,
                                      item.post_id,
                                      !favoriteJobs.some(favList => favList.company_id === item.company_id && favList.post_id === item.post_id),
                                    );
                                  }}
                                  isFav={favoriteJobs.some(favList => favList.company_id === item.company_id && favList.post_id === item.post_id)} // checking from the favoriteJobs list
                                  btnText={
                                    !favoriteJobs.some(favList => favList.company_id === item.company_id && favList.post_id === item.post_id)
                                      ? t('addFav')
                                      : t('delFav')
                                  }
                                />
                              )}
                            </Grid>

                            <Grid item sm={5} xs={6}>
                              <div>
                                {userRole === 'admin' ? ( // To show the company view so admins can edit the ads.
                                  <Link className="btnLink" to={`/jobpost/${customURL(item.job_title)}/${item.post_id}`}>
                                    <Button variant="contained" color="primary" onClick={() => openAdToSeeAdInfo(`${item.post_id}admin${item.company_id}`)}>
                                      {t('common:openBtn')}
                                    </Button>
                                  </Link>
                                ) : (
                                  <Link
                                    className="btnLink"
                                    to={`/tyopaikat/${customURL(item.company_name)}/${item.company_id}/${customURL(item.job_title)}/${item.post_id}`}
                                  >
                                    <Button variant="contained" color="primary" className="fullWidthBtn">
                                      {t('watchBtn')}
                                    </Button>
                                  </Link>
                                )}
                              </div>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Paper>
                  </div>
                ) : jobs.length !== 0 ? (
                  // Display structure for mol, pick the right key-values
                  <div key={item.ilmoitusnumero}>
                    <Paper style={{ marginTop: 20 }}>
                      <p style={{ backgroundColor: 'red' }}>Testing for reference:This job belongs to MOL / DELETE THIS</p>

                      {/* <Grid container sm={12} xs={8} style={{ padding: 20 }} spacing={1}> */}
                      <Grid container style={{ padding: 20 }} spacing={1} alignItems="center" justifyContent="space-around">
                        <Grid item sm={2} xs={6} md={3}>
                          <div className={classes.logoContainer}>
                            {item.company_logo ? (
                              <img src={item.company_logo} alt="company_logo" />
                            ) : (
                              <span className={classes.companyName}>
                                {`${item.tyonantajanNimi.length > 25 ? `${item.tyonantajanNimi.slice(0, 18)}...` : item.tyonantajanNimi}`}
                              </span>
                            )}
                          </div>
                        </Grid>
                        <Grid item sm={5} md={6} xs={6}>
                          <div>
                            <p>{item.tehtavanimi}</p>
                          </div>
                          <div>
                            <p>{item.tyonantajanNimi}</p>
                          </div>
                          <div>
                            <p>{item.kunta}</p>
                          </div>
                        </Grid>

                        <Grid item sm={1} xs={6}>
                          <FavBtn />
                        </Grid>
                        <Grid item sm={2} md={1} xs={6}>
                          <div>
                            <Link className="btnLink" to={`/tyopaikat/${customURL(item.tehtavanimi)}/${item.ilmoitusnumero}`}>
                              <Button variant="contained" color="primary" onClick={() => getJobDetailsById(`${item.ilmoitusnumero}$$${item.kieli}$$fromMol`)}>
                                {t('watchBtn')}
                              </Button>
                            </Link>
                          </div>
                        </Grid>
                      </Grid>
                    </Paper>
                  </div>
                ) : (
                  <p className={classes.emptyResult}>
                    <strong>{t('noJobsFound')}</strong>
                  </p>
                );
              })}
          </Grid>
        </Grid>
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
        <CustomizedDialog showDialog={showDialog} dialogText={t('loginText')} loginModal />
        <CustomizedDialog
          showDialog={showDialog && isWarnToDelete}
          dialogText={t('jobs:warnToDeletePostText')}
          warnToDeleteModal
          handleClick={() => deleteAdvertisement(isToDeleteAdvertisementId)}
        />
      </div>
      <div className="pagination-body">
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
    </div>
  );
};

export default withStyles(styles)(JobsComponent);
