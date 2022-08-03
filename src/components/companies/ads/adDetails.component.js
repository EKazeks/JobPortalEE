import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Divider, Grid, Button, Snackbar } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import store from "../../../store";
import { customURL,dateFormat } from "../../../utils/helperFunctions";
import {
  updateAdvertisement,
  changeCampaign,
  changeActivePostToInactive,
  closeSnackbar,
  populateVacancyForm
} from "../../../actions";
import { MySnackbarContentWrapper } from "../../../utils/snackbar.utils";
import {
  customTranslateCampaign,
  customTranslateStatus,
} from "../../../utils/customTranslate";
import Loader from "../../../utils/loader";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const styles = (theme) => ({
  titleMargin: {
    margin: "20px auto 24px auto",
    [theme.breakpoints.down("sm")]: {
      marginTop: 4,
    },
  },
  companyLogo: {
    minHeight: 80,
    minWidth: 150,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    marginBottom: 6,
  },
  companyImgFrame: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  companyImage: {
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
  adDetail: {
    margin: "0px 0 50px 0",
    padding: "0 0 50px",
    border: "1px solid lightgray",
  },
  jobDesc: {
    padding: 40,
  },
  ctaBtn: {
    marginBottom: 50,
    [theme.breakpoints.up("md")]: {
      justifyContent: "flex-end",
    },
  },
  backBtnText: {
    color: theme.palette.secondary.main,
    "&:hover": {
      textDecoration: "none",
      color: theme.palette.primary.main,
    },
  },
  backBtnContainer: {
    marginTop: 2,
  },
  campaignType: {
    marginRight: 16,
  },
});

const AdDetails = ({
  classes,
  viewSelectedAd,
  userRole,
  showSuccessSnackbar,
  showFailedSnackbar,
  showSpinner,
  selectedPage,
  campaignsList,
  props,
}) => {
  const { t } = useTranslation("adDetails");
  const { id, jobDetails } = useSelector((state) => state.jobs);
  const [dateOfApplication,setDateOfApplication] = useState();
  const [address,setAddress] = useState();
  const [toEdit,setToEdit] = useState()
  const [jobsToRender, setJobsToRender] = useState({});
  const dispatch = useDispatch()
  selectedPage = 1;
  
  useEffect(() => {
    
    axios.get(`https://localhost:7262/jobsEn/${id}`).then((res) => {
      setJobsToRender(res.data);
      let date = res.data.dateOfApplication.split('.')

      if(date.length === 3 )
      {
        setDateOfApplication(res.data.dateOfApplication)
      }
      else{
        setDateOfApplication(dateFormat(res.data.dateOfApplication))
      }
      setAddress(res.data.jobPostAddress.address)
    });
  }, []);

  return (
    // <div>
    //   <div>
    //     <Grid>
    //       <div>
    //         <h1>
    //           {jobsToRender.map((job) => {
    //             return (
    //               <div>
    //                 <h1>
    //                   {job.jobPostAddress.address}
    //                 </h1>
    //               </div>
    //             )
    //           })}
    //         </h1>
    //       </div>
    //     </Grid>
    //   </div>

    //   <h1>Test</h1>
    // </div>

    <div>
      <div className="container" key={jobsToRender.id}>
        <div className={classes.backBtnContainer}>
          <Link
            to={userRole === "company" ? "/omat-ilmoitukseni" : "/tyopaikat"}
            className={classes.backBtnText}
          >
            <ArrowBackIosIcon /> {t("jobs:backButton")}
          </Link>
        </div>
        <div className={classes.titleMargin}>
          <Grid container>
            <Grid item sm={12} md={7}>
              <h2 className="ad_title_1">
                {jobsToRender.jobName}, {address}
              </h2>
              <h6 className="ad_title_2">
                <strong style={{ marginRight: 10 }}>
                  {`${
                    jobsToRender.status === 0
                      ? t("draft")
                      : jobsToRender.status === 1
                      ? t("active")
                      : t("inactive")
                  }`}
                  :
                </strong>
                <strong>{dateOfApplication}</strong>
              </h6>
            </Grid>
            <Grid item sm={12} md={5}>
              <Grid container spacing={2} className={classes.ctaBtn}>
                <Grid item>
                  {/* If post is active post, show Inactive btn. If it is inactive post, show copy btn in Addetails */}
                  {jobsToRender.campaignType === "Free" ? (
                    <Link to="/tyopaikkailmoitus/" className="btnLink">
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                          store.dispatch(populateVacancyForm(jobsToRender.id, false));
                        }} 
                      >
                        {t("common:copyBtn")}
                      </Button>
                    </Link>
                  ) : jobsToRender.campaignLevel === "Free" ? (
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => {
                        // alert('updateJOBPOSTSTATUS');
                        store.dispatch(
                          changeActivePostToInactive(
                            userRole === "admin"
                              ? `${jobsToRender.id}admin${jobsToRender.companyBusinessId}`
                              : jobsToRender.id
                          )
                        );
                      }}
                    >
                      {t("common:inactiveBtn")}
                    </Button>
                  ) : (
                    ""
                  )}
                </Grid>
                {jobsToRender.campaignType === "Free" && (
                  <Grid item>
                    <Link
                      to={`/tyopaikkailmoitus/${jobsToRender.id}`}
                      className="btnLink"
                    >
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => store.dispatch(updateAdvertisement(jobsToRender.id))}
                      >
                        {t("editBtn")}
                      </Button>
                    </Link>
                  </Grid>
                )}
                <Grid item>
                  {/* To avoid errors when viewSelectedAd is empty array */}
                  {jobsToRender.jobName && (
                    <Link
                      to={customURL(jobsToRender.url, "campaign")}
                      className="btnLink"
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          store.dispatch(
                            changeCampaign(
                              campaignsList.find(
                                (campaign) =>
                                  campaign.id === jobsToRender.campaignType
                              )
                            )
                          )
                        }
                      >
                        {t("boostBtn")}
                      </Button>
                    </Link>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Divider />
        </div>
        <div className={classes.addMargin}>
          <Grid container>
            <Grid item sm={8}>
              <div className={classes.campaignType}>
                <h6>
                  <strong>{t("postType")}: </strong>
                  {/* <span>{customTranslateCampaign(item.campaignType)}</span> */}
                  {/* <span>{jobsToRender.campaignType}</span> */}
                  {jobsToRender.campaignType === "free" && <span>Free</span>}
                  {jobsToRender.campaignType === "lift" && <span>Lift</span>}
                  {jobsToRender.campaignType === "home_page_thing" && <span>Front Page News</span>}
                  {jobsToRender.campaignType === "noteworthy" && <span>Remarkable</span>}
                  {jobsToRender.campaignType === "some_start" && <span>Social Media Start</span>}
                </h6>
                <h6>
                  <strong>{t("postStatus")}: </strong>
                  {customTranslateStatus(jobsToRender.campaignType)}
                  {`Active`}
                </h6>
              </div>
            </Grid>
            <Grid
              item
              sm={4}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <div
                className={classes.companyLogo}
                style={{
                  backgroundImage: `url(${
                    jobsToRender.logo ? jobsToRender.logo[0].path : ""
                  })`,
                }}
              />
            </Grid>
          </Grid>
        </div>
        <div className={classes.adDetail}>
          <div className={classes.companyImgFrame}>
          </div>
          <div
            className={classes.jobDesc}
            dangerouslySetInnerHTML={{
              __html: jobsToRender.jobDescription,
            }} // To convert rte string into html
          />
        </div>
        <Grid container>
          <Grid item sm={12} md={6} />
          <Grid item sm={12} md={6}>
            <Grid container spacing={2} className={classes.ctaBtn}>
              <Grid item>
                {/* If post is active post, show Inactive btn. If it is inactive post, show copy btn in Addetails */}
                {jobsToRender.campaignType === "Free" ? (
                  <Link to="/tyopaikkailmoitus/" className="btnLink">
                    <Button
                      variant="outlined"
                      color="primary"
                        onClick={() => {
                          store.dispatch(populateVacancyForm(jobsToRender.id, false));
                        }}
                    >
                      {t("common:copyBtn")}
                    </Button>
                  </Link>
                ) : jobsToRender.campaignType === "Free" ? (
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      store.dispatch(
                        changeActivePostToInactive(
                          userRole === "admin"
                            ? `${jobsToRender.id}admin${jobsToRender.companyBusinessId}`
                            : jobsToRender.id
                        )
                      );
                    }}
                  >
                    {t("common:inactiveBtn")}
                  </Button>
                ) : (
                  ""
                )}
              </Grid>
              {jobsToRender.campaignType === "Free" && (
                <Grid item>
                  <Link
                    to={`/tyopaikkailmoitus/${jobsToRender.id}`}
                    className="btnLink"
                  >
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => 
                        store.dispatch(updateAdvertisement(jobsToRender.id))}
                    >
                      {t("editBtn")}
                    </Button>
                  </Link>
                </Grid>
              )}
              <Grid item>
                {/* To avoid errors when viewSelectedAd is empty array */}
                {jobsToRender.jobName && (
                  <Link
                    to={customURL(jobsToRender.url, "campaign")}
                    className="btnLink"
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        store.dispatch(
                          changeCampaign(
                            campaignsList.find(
                              (campaign) =>
                                campaign.id === jobsToRender.campaign_id
                            )
                          )
                        )
                      }
                    >
                      {t("boostBtn")}
                    </Button>
                  </Link>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <Loader showSpinner={showSpinner} />
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={showSuccessSnackbar}
        autoHideDuration={2000}
        onClose={() => store.dispatch(closeSnackbar())}
      >
        <MySnackbarContentWrapper
          onClose={() => store.dispatch(closeSnackbar())}
          variant="success"
          message={t("successMsg")}
        />
      </Snackbar>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={showFailedSnackbar}
        autoHideDuration={2000}
        onClose={() => store.dispatch(closeSnackbar())}
      >
        <MySnackbarContentWrapper
          onClose={() => store.dispatch(closeSnackbar())}
          variant="error"
          message={t("failedMsg")}
        />
      </Snackbar>
    </div>
  );
};

export default withStyles(styles)(AdDetails);
