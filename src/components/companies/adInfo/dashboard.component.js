import React, { useEffect, useState } from "react";
import {
  Divider,
  Card,
  CardContent,
  Grid,
  Button,
  CardActions,
  Hidden,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Line } from "react-chartjs-2";
import { customURL,dateFormat } from "../../../utils/helperFunctions";
import { customTranslateCampaign } from "../../../utils/customTranslate";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const styles = (theme) => ({
  cardContent: {
    textAlign: "center",
    padding: "40px !important",
  },
  titleMargin: {
    margin: "20px auto 20px auto",
    [theme.breakpoints.down("sm")]: {
      marginTop: 0,
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
});

const DashboardComponent = ({
  data,
  viewSelectedAd,
  changeCampaign,
  classes,
  campaigns,
}) => {
  const { t } = useTranslation("campaigns", "adDetails");
  const [jobsToRender, setJobsToRender] = useState([]);
  const [dateOfApplication,setDateOfApplication] = useState();
  const [applicant, setApplicant] = useState({})
  const [address,setAddress] = useState();
  const selectedPage = 1; 
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.jobs);

  useEffect(() => {
    axios.get(`https://localhost:7262/jobsEn/${id}`).then((res) => {
      setJobsToRender(res.data);
      setDateOfApplication(dateFormat(res.data.dateOfApplication))
      setAddress(res.data.jobPostAddress.address)
      setApplicant(res.data.jobPostApplications)
    });
  }, []);

  

  return (
    <div>
      <div className="container">
        <div className={classes.backBtnContainer}>
          <Link to="/omat-ilmoitukseni" className={classes.backBtnText}>
            <ArrowBackIosIcon /> {t("jobs:backButton")}
          </Link>
        </div>

        <div className={classes.titleMargin}>
          <h2 className="ad_title_1">{t("adDetails:dashboard")} </h2>
          <h6 className="ad_title_2">
            <strong style={{ marginRight: 10 }}>
              {jobsToRender.jobName},{" "}
              {/* {jobsToRender.jobPostAsukohaAddress.map((address) => {
                {
                  if (address.address[17]) {
                    return address.address
                      .split(",")
                      .splice(1)
                      .toString();
                  } else return address.address;
                }
              })} */}
              {address}
            </strong>
          </h6>
          <Divider />
        </div>
        <div className="ad_title_3">
          <Grid container spacing={1}>
            <Grid item>
              <h3>{t("campaign")}: {jobsToRender.campaignType}</h3>
            </Grid>
            <Grid item>
              <h3>{customTranslateCampaign("Free")}</h3>
            </Grid>
          </Grid>
          <strong style={{ color: "#34495e" }}>
            {jobsToRender && dateOfApplication}
          </strong>{" "}
        </div>
        <div>
          <Card>
            <CardContent>
              <Grid
                container
                justifyContent="space-around"
                alignItems="center"
                spacing={1}
              >
                <Grid item>
                  <div>
                    <h5>{t("campaignType")}</h5>
                  </div>
                  <div>
                    <h3 className="ad_title_1">
                      {jobsToRender.campaignType}
                    </h3>
                  </div>
                </Grid>
                <CardActions>
                  <Grid item sm={12}>
                    <Link
                      to={customURL(jobsToRender.url, "campaign")}
                      className="btnLink"
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          changeCampaign(
                            campaigns.find(
                              (campaign) => campaign.id === jobsToRender.campaignType
                            )
                          )
                        }
                      >
                        {t("adDetails:boostBtn")}
                      </Button>
                    </Link>
                  </Grid>
                </CardActions>
              </Grid>
            </CardContent>
          </Card>
        </div>
        <div style={{ marginTop: 30 }}>
          <Grid container spacing={2}>
            <Grid item sm={6} xs={12}>
              <Card>
                <CardContent className={classes.cardContent}>
                  <div>
                    <h3>
                      {/* <strong>{jobsToRender.totalLikes}</strong> */}
                      <strong>{'0'}</strong>
                    </h3>
                  </div>
                  <div>{t("adDetails:totalFavs")}</div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item sm={6} xs={12}>
              <Card>
                <CardContent className={classes.cardContent}>
                  <div>
                    <h3>
                      {/* <strong>{jobsToRender.totalViewed}</strong> */}
                      <strong>{'0'}</strong>
                    </h3>
                  </div>
                  <div>{t("adDetails:totalViewed")}</div>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
        <div style={{ marginTop: 30 }}>
          <Grid container spacing={2}>
            <Grid item sm={6} xs={12}>
              <Card>
                <CardContent className={classes.cardContent}>
                  <div>
                    <h3>
                      <strong>{"0"}</strong>
                    </h3>
                  </div>
                  <div>{t("adDetails:totalLinkClicks")}</div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item sm={6} xs={12}>
              <Card>
                <CardContent className={classes.cardContent}>
                  <div>
                    <h3>
                      <strong>{applicant.length}</strong>
                    </h3>
                  </div>
                  <div>{t("adDetails:totalApplication")}</div>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>

        <Hidden xsDown>
          <div style={{ marginTop: 30 }}>
            <Grid container spacing={2}>
              <Grid item sm={12}>
                <Card>
                  <CardContent className={classes.cardContent}>
                    <div>
                      <h3>{t("adDetails:chartTitle")}</h3>
                    </div>
                    <div>
                      <Line data={data} />
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </div>
        </Hidden>
        {/* For responsive charts */}
        {/*  <Hidden smUp>
        <div style={{ marginTop: 30 }}>
          <h3>{t('adDetails:chartTitle')}</h3>

          <Line data={data} />
        </div>
      </Hidden> */}
        <div style={{ height: 60 }}></div>
      </div>
      )
    </div>
  );
};

// Customizing our chart as per the data

export default withStyles(styles)(DashboardComponent);
