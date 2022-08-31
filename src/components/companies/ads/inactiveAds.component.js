import React, { useEffect, useState } from "react";
import { Grid, Paper, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import { useTranslation } from "react-i18next";
import { customURL } from "../../../utils/helperFunctions";
import CustomizedDialogs from "../../../utils/customizedDialog";
import axios from "axios";
import store from "../../../store";

const InactiveAds = ({
  inActiveAds,
  openAdToSeeAdInfo,
  changeCampaign,
  changeAdvertPage,
  selectedPage,
  advertPages,
  showDialog,
  warnToDelete,
  isToDeleteAdvertisementId,
  deleteJobOffer,
  campaigns,
  populateVacancyForm,
  deleteAdvertisement
}) => {
  const { t } = useTranslation("jobs", "common");
  const [jobsToRender, setJobsToRender] = useState([]);
  const [activeJobs, setActiveJobs] = useState([]);
  const {email} = store.getState().client.user.data;
  const advertisement = store.getState().advertisement
  const refreshPage = () => {
    window.location.reload();
  };

  useEffect(() => {
    const getData = () => {
      axios.get(`https://localhost:7262/activeAds/${email}`).then((res) => {
        setJobsToRender(
          res.data.filter((status) => status.offerStatus === "inactive")
        );
      });
    };

    if (!advertisement.warnToDelete) {
      getData();
    }
  }, [advertisement.warnToDelete]);

  return (
    <div className="container">
      <div>
        <Grid container style={{ margin: "30px 0px" }}>
          <Grid item sm={10}>
            <h3>
              {t("inactiveJobsTitle")} (
              {`${jobsToRender && jobsToRender.length}`}
              ):
            </h3>
          </Grid>
          {/* <Grid item sm={2}>
            <Button variant='contained' color='secondary'>
              Lisää uusi
            </Button>
          </Grid> */}
        </Grid>
      </div>

      {jobsToRender &&
        jobsToRender
          .slice(selectedPage * 10, selectedPage * 10 + 10)
          .map(item => {
            return (
              <div key={item.id}>
                <Paper style={{ marginTop: 20 }}>
                  <Grid
                    container
                    spacing={3}
                    style={{ padding: 20 }}
                    alignItems="center"
                  >
                    <Grid item md={5}>
                      <div>
                        <Link
                          to={customURL(item.url, "internal")}
                          className="btnLink"
                        >
                          <h4
                            onClick={() =>
                              openAdToSeeAdInfo(item.jobPostNumber)
                            }
                          >
                            {item.jobName}, {item.jobPostAddress.address}
                          </h4>
                        </Link>
                      </div>
                      <div>
                        <span>
                          {t("applicationsInTotal")}:
                          <span style={{ color: "red", margin: "0 5px" }}>
                            ({`${item.totalApplicants}`})
                          </span>
                        </span>
                        <span />
                        <span>
                          {t("viewed")}: <span />
                          <span style={{ color: "red", margin: "0 5px" }}>
                            ({`${item.totalViewed}`})
                          </span>
                          {t("times")}
                        </span>
                      </div>
                    </Grid>
                    <Grid item md={3} style={{ color: "#34495E" }}>
                      <div>
                        {/* <h5>{new Intl.DateTimeFormat('fi-FI').format(new Date(item.created))}</h5> */}
                      </div>
                    </Grid>
                    <Grid item md={4}>
                      <Grid container spacing={1}>
                        <Grid item md={4}>
                          <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => warnToDelete(item.id)}
                          >
                            {t("common:deleteBtn")}
                          </Button>
                        </Grid>
                        <Grid item md={4}>
                          <Link to="/tyopaikkailmoitus">
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() => {
                                populateVacancyForm(item.id, false);
                              }}
                            >
                              {t("common:activeBtn")}
                            </Button>
                          </Link>
                        </Grid>
                        <Grid item md={4}>
                          <div>
                            <Link
                              to={customURL(item.url, "internal")}
                              className="btnLink"
                            >
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() => openAdToSeeAdInfo(item.id)}
                              >
                                {t("common:openBtn")}
                              </Button>
                            </Link>
                          </div>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </div>
            );
          })}

      <CustomizedDialogs
        showDialog={showDialog}
        dialogText={t("warnToDeletePostText")}
        warnToDeleteModal
        handleClick={() => {
          deleteJobOffer(isToDeleteAdvertisementId);
          refreshPage();
        }}
      />

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

export default InactiveAds;
