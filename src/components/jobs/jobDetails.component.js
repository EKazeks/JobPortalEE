import React, { useEffect, useState } from "react";
import { Button, Grid, Divider, Snackbar, Hidden } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import DescriptionIcon from "@material-ui/icons/Description";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { MySnackbarContentWrapper } from "../../utils/snackbar.utils";
import { FavBtn } from "../../utils/favBtn.js";
import {
  convertJobHoursToStr,
  convertJobTypeToStr,
  convertJobWorksStartToStr,
  customURL,
  dateFormat,
} from "../../utils/helperFunctions";
import CustomizedDialogs from "../../utils/customizedDialog";
import Loader from "../../utils/loader";
import { SEO } from "../seo/metaInfo.component";
import { mol_page_url } from "../../constants";
import axios from "axios";
import { useSelector } from "react-redux";
import { isRteEmpty } from "../../containers/validate";
import NotFoundPage from "../../utils/notFoundPage";
import { fetchJobById, fetchJobInfo, setIdToApply } from "../../actions";
import i18n from "../../utils/i18n";

const styles = (theme) => ({
  addMargin: {
    margin: "20px auto 20px auto",
  },
  backBtnContainer: {
    margin: "16px auto",
  },
  backBtnText: {
    color: theme.palette.secondary.main,
    "&:hover": {
      textDecoration: "none",
      color: theme.palette.primary.main,
    },
  },

  logo: {
    minHeight: 420,
    maxHeight: 600,
    maxWidth: "100%",
    [theme.breakpoints.down("xs")]: {
      minHeight: 190,
      maxHeight: 190,
      width: "100%",
    },
    [theme.breakpoints.only("sm")]: {
      minHeight: 360,
      maxHeight: 420,
      width: "100%",
    },
  },
  companyImgFrame: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  companyLogo: {
    minHeight: 80,
    minWidth: 150,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
  },
  jobDetail: {
    margin: "20px 0 50px 0",
    padding: "0 0 50px",
    border: "1px solid lightgray",
  },
  jobDesc: {
    padding: "20px 40px",
  },
  additionalInfo: {
    padding: "10px 40px",
  },
  sourceInfo: {
    padding: "10px 40px",
    float: "right",
  },
  metaData: {
    color: theme.palette.secondary.main,
  },
  metaDataTitle: {
    color: theme.palette.primary.main,
  },

  ctaBtn: {
    marginBottom: 20,
    [theme.breakpoints.up("md")]: {
      justifyContent: "flex-end",
      marginBottom: 50,
    },
  },
});

const JobDetailsComponent = ({
  jobDetails,
  workStart,
  toggleFavoriteJobs,
  favBtnstatus,
  favoriteJobs,
  showSuccessSnackbar,
  showFailedSnackbar,
  closeSnackbar,
  showDialog,
  showSpinner,
  classes,
  changePagination,
  fetchJobInfo,
  setIdToApply,
}) => {
  const [jobsToRender, setJobsToRender] = useState([]);
  const { id } = useSelector((state) => state.jobs);
  const [dateOfApplication, setDateOfApplication] = useState();
  const [address, setAddress] = useState("");
  const isPermanentPlace = "isPermanentPlace";
  const isPartPlace = "isPartPlace";

  useEffect(() => {
    axios.get(`https://localhost:7262/jobsEn/${id}`).then((res) => {
      setJobsToRender(res.data);
      setDateOfApplication(dateFormat(res.data.dateOfApplication));
      setAddress(res.data.jobPostAddress.address);
    });
  }, []);

  const { t } = useTranslation("jobDetails", "jobhours", "jobtype");
  const heroImage = jobsToRender.logo && jobsToRender.logo[0].path;
  const title = `${jobsToRender?.jobName} - ${jobsToRender?.companyName} | Avoimet työpaikat`;
  const selectedPage = 1;

  return (
    <div>
      <div className="container">
        <SEO
          title={title}
          location={jobsToRender?.url}
          heroImage={jobsToRender?.logo} // Incase we want to use post specific image..Right now, we are using same default image for all posts as marketing wanted.
        />
        <div className={classes.addMargin}>
          <div className={classes.backBtnContainer}>
            <Link
              onClick={() => changePagination(false)}
              to={{
                pathname: "/tyopaikat",
              }}
              className={classes.backBtnText}
            >
              <ArrowBackIosIcon /> {t("backToJobList")}
            </Link>
          </div>
          <Grid container spacing={4} alignItems="center">
            <Grid item sm={12} md={7}>
              <h2 className="ad_title_1">{`${jobsToRender.jobName},${address}`}</h2>
              <h6>
                <strong className={classes.metaDataTitle}>
                  <span>{t("applyPeriod")}: </span>
                  <span className={classes.metaData}>
                    {jobsToRender.dateOfApplication?.indexOf(":00.000Z") !== -1
                      ? jobsToRender.dateOfApplication?.substring(0, 10)
                      : jobsToRender.dateOfApplication}
                    {/* {dateOfApplication?.indexOf(':00.000Z') !== -1 ? getDate(dateOfApplication?.substring(0,10)) : getDate(dateOfApplication)} */}
                  </span>
                </strong>
              </h6>
              <h6>
                <strong className={classes.metaDataTitle}>
                  <span>{t("jobtype:jobTypeLabel")}: </span>
                  <span className={classes.metaData}>
                    {convertJobTypeToStr(t, jobsToRender.titleSpecification)}
                    {convertJobTypeToStr(
                      t,
                      (jobsToRender?.isPermanentPlace === 1 &&
                        jobsToRender?.isPartPlace === 1) ||
                        jobsToRender?.isPermanentPlace === 1
                        ? isPermanentPlace
                        : null
                    )}
                    {convertJobTypeToStr(
                      t,
                      jobsToRender?.isPartPlace === 1 &&
                        jobsToRender?.isPermanentPlace === 0
                        ? isPartPlace
                        : null
                    )}
                  </span>
                </strong>
              </h6>
              <h6>
                <strong className={classes.metaDataTitle}>
                  <span>{t("jobhours:jobHoursLabel")}: </span>
                  <span className={classes.metaData}>
                    {convertJobHoursToStr(t, jobsToRender.durationOfEmployment)}
                  </span>
                </strong>
              </h6>
              {workStart != null ? (
                <h6>
                  <strong className={classes.metaDataTitle}>
                    <span>{t("jobhours:workStartLabel")}: </span>
                    <span className={classes.metaData}>
                      {convertJobWorksStartToStr(t, workStart)}
                    </span>
                  </strong>
                </h6>
              ) : null}
              {jobsToRender.offerStatus === "inactive" && (
                <p style={{ color: "red" }}>{t("inactiveBtn")}</p>
              )}
            </Grid>
            <Grid item sm={12} md={5}>
              {jobsToRender.offerStatus === "active" && (
                <Grid container spacing={2} className={classes.ctaBtn}>
                  {/* <Grid item>
                        <Button color="primary" variant="outlined">
                          {t("shareBtn")}
                        </Button>src/components/jobs/jobDetails.component.js
                      </Grid> */}
                  <Grid item>
                    <FavBtn
                      isFav={!!jobsToRender.isFavourite}
                      handleFav={() =>
                        toggleFavoriteJobs(
                          jobsToRender.companyBusinessId,
                          jobsToRender.id,
                          !favBtnstatus
                        )
                      }
                      btnText={
                        !jobsToRender.isFavourite ? t("addFav") : t("deleteFav")
                      }
                    />
                  </Grid>
                  <Grid item>
                    {jobsToRender.urlToApplyJob ? (
                      <a
                        className="btnLink"
                        href={jobsToRender.urlToApplyJob}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button color="primary" variant="contained">
                          <DescriptionIcon />
                          <span style={{ marginLeft: 8 }}>{t("applyBtn")}</span>
                        </Button>
                      </a>
                    ) : (
                      <Link
                        className="btnLink"
                        to={customURL(jobsToRender.url, "application")}
                      >
                        <Button
                          color="primary"
                          variant="contained"
                          onClick={() => {
                            setIdToApply(jobsToRender.id);
                            // fetchJobInfo(
                            //   jobsToRender.companyName,
                            //   jobsToRender.companyBusinessId,
                            //   jobsToRender.jobName,
                            //   jobsToRender.jobPostNumber,
                            //   address.address)
                          }}
                        >
                          <DescriptionIcon />
                          <span style={{ marginLeft: 8 }}>{t("applyBtn")}</span>
                        </Button>
                      </Link>
                    )}
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
          <Divider style={{ margin: "15px 0 0 0" }} />
        </div>
        <Grid container justifyContent="flex-end">
          {/* <div
                className={jobsToRender.logo ? classes.logo : null}
                style={{
                  backgroundImage: `${
                    jobsToRender.logo ? jobsToRender.logo[0].path : ""
                  }`,
                }}
              /> */}
        </Grid>
        <div className={classes.jobDetail}>
          {jobsToRender.logo && (
            <div className={classes.companyImgFrame}>
              <img
                src={`${jobsToRender.logo}`}
                alt={
                  jobsToRender.company_image
                    ? `${jobsToRender.jobName} Company-Image`
                    : ""
                }
                className={jobsToRender.logo ? classes.logo : ""}
              />
            </div>
          )}
          <div
            className={classes.jobDesc}
            dangerouslySetInnerHTML={{ __html: jobsToRender.jobDescription }} // To convert rte string into html
          />
          {jobsToRender.companyDescription &&
            !isRteEmpty(jobsToRender.companyDescription) && (
              <div className={classes.additionalInfo}>
                <p>
                  <strong>{t("aboutUs")}</strong>
                </p>
                <div
                  dangerouslySetInnerHTML={{
                    __html: jobDetails.companyDescription,
                  }} // To convert rte string into html
                />
              </div>
            )}
          {jobsToRender.companyPageUrl && (
            <p className={classes.additionalInfo}>
              {`${t("readMore")} : `}
              <a
                href={jobsToRender.companyPageUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {`${jobsToRender.companyPageUrl}`}
              </a>
            </p>
          )}
          {!!jobsToRender?.url && (
            <p className={classes.sourceInfo}>
              <em>
                {t("source")}
                <a
                  href={`${jobsToRender?.url}`}
                  className={classes.metaData}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("mol")}
                </a>
              </em>
            </p>
          )}
        </div>
        <Grid container spacing={4} alignItems="center">
          <Hidden smDown>
            <Grid item sm={12} md={7} />
          </Hidden>
          <Grid item sm={12} md={5}>
            {jobsToRender.offerStatus === "active" && (
              <Grid container spacing={2} className={classes.ctaBtn}>
                {/* <Grid item>
                      <Button color='primary' variant='outlined'>
                        {t('shareBtn')}
                      </Button>
                    </Grid> */}
                <Grid item>
                  <FavBtn
                    isFav={!!jobsToRender.isFavourite}
                    handleFav={() =>
                      toggleFavoriteJobs(
                        jobsToRender.companyBusinessId,
                        jobsToRender.id,
                        !favBtnstatus
                      )
                    }
                    btnText={
                      !jobsToRender.isFavourite ? t("addFav") : t("deleteFav")
                    }
                  />
                </Grid>
                <Grid item>
                  {jobsToRender.urlToApplyJob ? (
                    <a
                      className="btnLink"
                      href={jobsToRender.urlToApplyJob}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button color="primary" variant="contained">
                        <DescriptionIcon />
                        <span style={{ marginLeft: 8 }}>{t("applyBtn")}</span>
                      </Button>
                    </a>
                  ) : (
                    <Link
                      className="btnLink"
                      to={customURL(jobsToRender.url, "application")}
                    >
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={() => {
                          setIdToApply(jobsToRender.id);
                          fetchJobInfo(
                            jobsToRender.companyName,
                            jobsToRender.companyBusinessId,
                            jobsToRender.jobName,
                            jobsToRender.jobPostNumber,
                            jobsToRender.jobPostAddress.address,
                            jobsToRender.url
                          );
                        }}
                      >
                        <DescriptionIcon />
                        <span style={{ marginLeft: 8 }}>{t("applyBtn")}</span>
                      </Button>
                    </Link>
                  )}
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </div>
      )
      {/* Display structure for mol ads --Copy code from molAds.js if needed in future otherwise delete that file */}
      {/* <Loader showSpinner={showSpinner} /> */}
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={showSuccessSnackbar}
        autoHideDuration={2000}
        onClose={() => {
          closeSnackbar();
        }}
      >
        <MySnackbarContentWrapper
          variant="success"
          message={t("successMsg")}
          onClose={() => {
            closeSnackbar();
          }}
        />
      </Snackbar>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={showFailedSnackbar}
        autoHideDuration={2000}
        onClose={() => {
          closeSnackbar();
        }}
      >
        <MySnackbarContentWrapper
          onClose={() => {
            closeSnackbar();
          }}
          variant="error"
          message={t("failedMsg")}
        />
      </Snackbar>
      <CustomizedDialogs
        showDialog={showDialog}
        dialogText={t("loginText")}
        loginModal
      />
    </div>
  );
};

export default withStyles(styles)(JobDetailsComponent);
