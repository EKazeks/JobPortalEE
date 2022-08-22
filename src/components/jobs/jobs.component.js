import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { Grid, Paper, Button, Snackbar, Hidden } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import ReactPaginate from "react-paginate";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import { useTranslation } from "react-i18next";
import { customURL, dateFormat } from "../../utils/helperFunctions";
import { FavBtn } from "../../utils/favBtn.js";
import SearchFormContainer from "../../containers/jobs/searchForm.container.js";
import { MySnackbarContentWrapper } from "../../utils/snackbar.utils";
import CustomizedDialog from "../../utils/customizedDialog";
import Loader from "../../utils/loader";
import jobHeroImg from "../../images/jobportal_hero.jpg";
import { SEO } from "../seo/metaInfo.component";
import axios from "axios";

const styles = (theme) => ({
  heroImage: {
    height: 420,
    background: `url(${jobHeroImg}) no-repeat`,
    backgroundSize: "contain",
    backgroundPosition: "center center",
    backgroundColor: "#F1B1B1",
  },
  heroImageTitle: {
    color: "white",
    textAlign: "center",
    paddingTop: 20,
    fontWeight: 800,
    fontSize: "4.5rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "2.5rem !important",
    },
  },
  searchForm: {
    marginTop: -150,
    backgroundColor: theme.palette.primary.main,
    padding: "50px 10px 70px 10px",
  },
  jobInfo: {
    color: theme.palette.custom.darkText,
    [theme.breakpoints.down("xs")]: {
      fontSize: "1rem",
    },
  },
  titleSpacer: {
    [theme.breakpoints.up("sm")]: {
      height: 170,
    },
  },
  jobTitle: {
    color: theme.palette.primary.main,

    fontWeight: 600,
    [theme.breakpoints.down("xs")]: {
      fontSize: 18,
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: 20,
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: 22,
    },
  },
  companyInfo: {
    fontWeight: 400,
    [theme.breakpoints.down("xs")]: {
      fontSize: 14,
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: 16,
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: 18,
    },
  },

  jobInfobody: {
    [theme.breakpoints.up("md")]: {
      paddingLeft: "12px !important",
    },
    [theme.breakpoints.up("lg")]: {
      paddingLeft: "40px !important",
    },
  },

  emptyResult: {
    padding: "50px 20px 70px 20px",
  },
  listContainer: {
    backgroundColor: theme.palette.custom.background,
    paddingBottom: 30,
  },
  logoContainer: {
    height: "6rem",
    width: "6rem",
    position: "relative",
    display: "flex",
    [theme.breakpoints.down("xs")]: {
      height: "6rem",
      width: "5rem",
      fontSize: 12,
    },
    [theme.breakpoints.up("lg")]: {
      marginLeft: 20,
    },
  },
  logoDiv: {
    height: "5.5rem",
    width: "5.5rem",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "50% 50%",
    [theme.breakpoints.down("xs")]: {
      height: "4rem",
      width: "4rem",
    },
  },
  companyName: {
    borderRadius: 50,
    overflow: "hidden",
    width: "100%",
    fontSize: 13,
    alignSelf: "center",
  },
  jobContainerHover: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
  },
  paper: {
    marginTop: 12,
    position: "relative",
    "&:hover": {
      backgroundColor: theme.palette.custom.jobListHoverColor,
    },
  },
  dateInfo: {
    "& span": {
      marginRight: 20,
      fontSize: 16,
      [theme.breakpoints.down("xs")]: {
        fontSize: "0.8rem",
      },
      [theme.breakpoints.down("sm")]: {
        fontSize: "0.9rem",
      },
    },
  },
  paginationBody: {
    backgroundColor: theme.palette.custom.background,
  },
});

const JobsComponent = ({
  jobs,
  changeAdvertPage,
  filterJobs,
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
  fetchJobById,
  fetchJobInfo,
  deleteFavoriteJobs,
}) => {
  const { t } = useTranslation("jobsList", "jobs");
  const [jobsToRender, setJobsToRender] = useState([]);
  const [favouritesJobs, setFavouritesJobs] = useState([]);
  const [address, setAddress] = useState();

  useEffect(() => {
    axios.get(`https://localhost:7262/activeAds`).then((res) => {
      setJobsToRender(
        res.data.filter((activeJobs) => activeJobs.offerStatus === "active")
      );
      setFavouritesJobs(
        res.data.filter((favourite) => favourite.isFavourite === 1)
      );
    });
  }, []);

  return (
    <div>
      <SEO title="Töökohad | Jobportal" />
      <div className={classes.heroImage}>
        <div className={classes.titleSpacer} />
        <h1 className={classes.heroImageTitle}>{t("heroTitle")}</h1>
      </div>
      <div>
        <Grid
          container
          justifyContent="space-around"
          className={jobsToRender.length !== 0 ? classes.listContainer : null}
        >
          <Grid item md={3} xs={10} xl={2}>
            <div className={classes.searchForm}>
              <SearchFormContainer />
            </div>
          </Grid>
          <Grid item md={8} xs={12} sm={10} xl={8}>
            {jobsToRender &&
              jobsToRender.length === 0 &&
              showSpinner === false && (
                <p className={classes.emptyResult}>
                  <strong>{t("noJobsFound")}</strong>
                </p>
              )}
            <Loader showSpinner={showSpinner} />

            {jobsToRender &&
              jobsToRender
                .slice(selectedPage * 10, selectedPage * 10 + 10)
                .map((item) => {
                  return (
                    <div key={`${item.companyBusinessId}${item.id}`}>
                      <Paper className={classes.paper}>
                        <Grid
                          container
                          style={{ padding: 8 }}
                          spacing={1}
                          alignItems="center"
                          justifyContent="space-around"
                        >
                          {userRole === "admin" ? ( // To give the admins same view as Companies so they can edit ads!
                            <Link
                              className={classes.jobContainerHover}
                              to={customURL(item.url, "internal")}
                              onClick={() => {
                                fetchJobById(item.id);
                                fetchJobInfo(
                                  item.companyName,
                                  item.companyBusinessId,
                                  item.jobName,
                                  item.jobPostNumber
                                );
                              }}
                            />
                          ) : (
                            <Link
                              onClick={() => {
                                fetchJobById(item.id);
                                fetchJobInfo(
                                  item.companyName,
                                  item.companyBusinessId,
                                  item.jobName,
                                  item.jobPostNumber
                                );
                              }}
                              className={classes.jobContainerHover}
                              to={customURL(item.url, "external")}
                            />
                          )}
                          <Grid
                            item
                            sm={2}
                            xs={4}
                            lg={2}
                            xl={1}
                            style={{ display: "contents" }}
                          >
                            <div className={classes.logoContainer}>
                              {item.logo ? (
                                // <div
                                //   className={classes.logoDiv}
                                //   style={{
                                //     backgroundImage: `url(${item.logo[0].path})`,
                                //   }}
                                // />
                                <span className={classes.companyName}>
                                  {item.companyName?.length > 9
                                    ? `${item.companyName.slice(0, 9)}...`
                                    : item.companyName}
                                </span>
                              ) : (
                                <span className={classes.companyName}>
                                  {item.companyName?.length > 9
                                    ? `${item.companyName?.slice(0, 9)}...`
                                    : item?.companyName}
                                </span>
                              )}
                            </div>
                          </Grid>
                          <Grid
                            item
                            sm={6}
                            xs={8}
                            lg={7}
                            xl={5}
                            className={classes.jobInfobody}
                          >
                            <div>
                              <h3
                                className={classNames(
                                  classes.jobTitle,
                                  classes.jobInfo
                                )}
                              >
                                {item.jobName}
                              </h3>
                            </div>

                            <div>
                              <h5 className={classes.companyInfo}>
                                {item.companyName},{item.jobPostAddress.address}
                              </h5>
                            </div>
                            <Hidden only={"xl"}>
                              <Grid container className={classes.dateInfo}>
                                <Grid item>
                                  <span>
                                    {/* {t("publishedDate")}:
                                    {/* {item.dateOfApplication} */}
                                    {/* {'At the moment'} */}
                                  </span>
                                </Grid>
                                <Grid item>
                                  <span>
                                    {t("applicationDueDate")}:
                                    {item.dateOfApplication.charAt(2) === "."
                                      ? item.dateOfApplication
                                      : dateFormat(item.dateOfApplication)}
                                  </span>
                                </Grid>
                              </Grid>
                            </Hidden>
                          </Grid>
                          <Grid item xl={2}>
                            <Hidden only={["xs", "sm", "md", "lg"]}>
                              <Grid item>
                                <span>
                                  {/* {t("publishedDate")}: */}
                                  {/* {item.dateOfApplication} */}
                                </span>
                              </Grid>
                              <Grid item>
                                <span>
                                  {t("applicationDueDate")}:
                                  {item.dateOfApplication.charAt(2) === "."
                                    ? item.dateOfApplication
                                    : dateFormat(item.dateOfApplication)}
                                </span>
                              </Grid>
                            </Hidden>
                          </Grid>
                          <Grid item xl={2} lg={3} md={4} sm={4} xs={12}>
                            <Grid
                              container
                              justifyContent="space-between"
                              spacing={2}
                            >
                              <Grid item sm={5} xs={6}>
                                {userRole === "admin" ? ( // For admins show deleteBtn instead of FavBtn
                                  <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={() =>
                                      warnToDelete(
                                        `${item.id}admin${item.companyBusinessId}`
                                      )
                                    }
                                  >
                                    {t("common:deleteBtn")}
                                  </Button>
                                ) : (
                                  <FavBtn
                                    className={classes.favBtn}
                                    handleFav={() => {
                                      toggleFavoriteJobs(
                                        item.id
                                        //item.companyBusinessId,
                                        //item.jobPostNumber,
                                        //!favoriteJobs.some(favList => favList.isFavourite),
                                      );
                                    }}
                                    isFav={favoriteJobs.some(
                                      (favList) =>
                                        favList.companyBusinessId ===
                                          item.companyBusinessId &&
                                        favList.id === item.id
                                    )} // checking from the favoriteJobs list
                                    btnText={
                                      !favoriteJobs.some(
                                        (favList) =>
                                          favList.companyBusinessId ===
                                            item.companyBusinessId &&
                                          favList.id === item.id
                                      )
                                        ? //!favoriteJobs.filter((favourite) => favourite.isFavourite)
                                          t("addFav")
                                        : t("delFav")
                                    }
                                  />
                                )}
                              </Grid>
                              <Grid item sm={5} xs={6}>
                                <div>
                                  {userRole === "admin" ? ( // To show the company view so admins can edit the ads.
                                    <Link
                                      className="btnLink"
                                      to={customURL(item.url, "internal")}
                                    >
                                      <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => {
                                          fetchJobById(item.id);
                                          fetchJobInfo(
                                            item.companyName,
                                            item.companyBusinessId,
                                            item.jobName,
                                            item.jobPostNumber
                                          );
                                        }}
                                      >
                                        {t("common:openBtn")}
                                      </Button>
                                    </Link>
                                  ) : (
                                    <Link
                                      className="btnLink"
                                      to={customURL(item.url, "external")}
                                    >
                                      <Button
                                        variant="contained"
                                        color="primary"
                                        className="fullWidthBtn"
                                        onClick={() => {
                                          fetchJobById(item.id);
                                          fetchJobInfo(
                                            item.companyName,
                                            item.companyBusinessId,
                                            item.jobName,
                                            item.jobPostNumber
                                          );
                                        }}
                                      >
                                        {t("watchBtn")}
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
                  );
                })}
          </Grid>
        </Grid>
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
        <CustomizedDialog
          showDialog={showDialog}
          dialogText={t("loginText")}
          loginModal
        />
        <CustomizedDialog
          showDialog={showDialog && isWarnToDelete}
          dialogText={t("jobs:warnToDeletePostText")}
          warnToDeleteModal
          handleClick={() => deleteAdvertisement(isToDeleteAdvertisementId)}
        />
      </div>
      <div className={classes.paginationBody}>
        <ReactPaginate
          previousLabel={<NavigateBeforeIcon />}
          nextLabel={<NavigateNextIcon />}
          breakLabel="..."
          breakClassName="break-me"
          pageCount={3000}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={(data) => {
            changeAdvertPage({
              selected: data.selected,
            });
            filterJobs(true);
          }}
          containerClassName="pagination"
          subContainerClassName="pages pagination"
          activeClassName="active"
          forcePage={selectedPage}
          // style={{backgroundColor: '#F9FAFB'}}
        />
      </div>
    </div>
  );
};

export default withStyles(styles)(JobsComponent);
