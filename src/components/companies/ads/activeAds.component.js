import React, { useEffect, useState } from "react";
import { Grid, Paper, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import { useTranslation } from "react-i18next";
import { customURL } from "../../../utils/helperFunctions";
import CustomizedDialogs from "../../../utils/customizedDialog";
import i18n from "../../../utils/i18n";
import axios from "axios";

const ActiveAdsComponent = ({
  warnToDelete,
  populateVacancyForm,
  deleteAdvertisement,
  changeAdvertPage,
  selectedPage,
  advertPages,
  openAdToSeeJobPost,
  postAdvertisement,
  showDialog,
  isToDeleteAdvertisementId,
  fetchJobById,
}) => {
  const { t } = useTranslation("jobs");
  const [isDesktop, setIsDesktop] = useState(window.innerWidth);
  const [jobsToRender, setJobsToRender] = useState([]);

  useEffect(() => {
    axios.get(`https://localhost:7262/jobsEn`).then((res) => {
      setJobsToRender(res.data);
    });
  }, []);

  const updateSize = () => {
    setIsDesktop(window.innerWidth >= 1440);
  };
  useEffect(() => {
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  });

  return (
    //  <div>
    //   {jobsToRender.slice(1 * 30, 1 * 30 + 30).map(job => {
    //     {job.jobPostHaridus.map((valdkond) => {
    //       return (
    //         <div>
    //           {/* {console.log(jobPostHaridus)} */}

    //         </div>
    //       )
    //     })}
    //     return (
    //       <div key={job.jobPostNumber}>
    //       <Grid>
    //         <div>
    //           <h1>
    //             {console.log(job.jobPostHaridus)}
    //           </h1>
    //         </div>
    //       </Grid>
    //       </div>
    //     )
    //   })}
    //   </div>
    <div className="container">
      <Grid container style={{ margin: "30px 0px" }}>
        <Grid item sm={10}>
          <h3>
            {t("activeJobsTitle")} (
            {`${
              jobsToRender && jobsToRender.length === null
                ? jobsToRender.length
                : jobsToRender.length
            }`}
            ):
          </h3>
        </Grid>
        <Grid item sm={2}>
          {jobsToRender.companyBusinessId !== 0 &&
          jobsToRender.companyBusinessId === null ? (
            <Link to="/tyopaikkailmoitus" className="btnLink">
              <Button
                onClick={postAdvertisement}
                variant="contained"
                size={i18n.language === "ru" ? "small" : "medium"}
                color="primary"
              >
                {t("addPost")}
              </Button>
            </Link>
          ) : (
            <Link to="/tyopaikkailmoitus" className="btnLink">
              <Button
                onClick={postAdvertisement}
                variant="contained"
                size={i18n.language === "ru" ? "small" : "medium"}
                color="primary"
              >
                {t("addPost")}
              </Button>
            </Link>
          )}
        </Grid>
      </Grid>
      {jobsToRender
        .slice(selectedPage * 10, selectedPage * 10 + 10)
        .map((item) => {
          return (
            <div
              key={
                item.id === null
                  ? item.id
                  : item.id
              }
            >
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
                          onClick={() => {
                            // openAdToSeeAdInfo(item.jobPostNumber)
                            fetchJobById(item.id);
                          }}
                        >
                          {item.jobName === null ? item.jobName : item.jobName},
                          {item.jobPostAsukohaAddress.map((address) => {
                            {
                              if (address.address[17] === null) {
                                return address.address
                                  .split(",")
                                  .splice(1)
                                  .toString();
                              } else return address.address;
                            }
                          })}
                        </h4>
                      </Link>
                    </div>
                    <div>
                      <span>
                        {t("applicationsInTotal")}:
                        <span style={{ color: "red", margin: "0 5px" }}>
                          (
                          {`${
                            item.totalApplicants === null
                              ? item.totalApplicants
                              : item.totalApplicants
                          }`}
                          )
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
                  <Grid item md={3} style={{ color: "#34495E " }}>
                    <div>
                      <h5>
                        {item.dateOfApplication === null
                          ? item.dateOfApplication
                          : item.dateOfApplication}
                      </h5>
                    </div>
                  </Grid>
                  <Grid item md={4}>
                    <Grid container spacing={1}>
                      <Grid item md={4}>
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={() =>
                            warnToDelete(item.id) === null
                              ? warnToDelete(item.id)
                              : warnToDelete(item.id)
                          }
                        >
                          {t("common:deleteBtn")}
                        </Button>
                      </Grid>
                      <Grid item md={4}>
                        <Link to="/tyopaikkailmoitus/" className="btnLink">
                          <Button
                            //style={ isDesktop && i18n.language === 'ru' ? {left: '15px'} : null }
                            variant="contained"
                            color="secondary"
                            onClick={() => {
                              populateVacancyForm(item.id, false) ===
                              null
                                ? populateVacancyForm(item.id, false)
                                : populateVacancyForm(
                                    item.id,
                                    false
                                  );
                            }}
                          >
                            {t("common:copyBtn")}
                          </Button>
                        </Link>
                      </Grid>
                      <Grid item md={4}>
                        <div>
                          <Link
                            className="btnLink"
                            to={
                              customURL(item.url, "internal") === null
                                ? customURL(item.url, "internal")
                                : customURL(item.url, "internal")
                            }
                          >
                            <Button
                              variant="contained"
                              style={
                                isDesktop && i18n.language === "ru"
                                  ? { left: "29px" }
                                  : null
                              }
                              color="primary"
                              onClick={() => fetchJobById(item.id)}
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
        handleClick={() => deleteAdvertisement(isToDeleteAdvertisementId)}
      />
      <div className="pagination-body">
        <ReactPaginate
          previousLabel={<NavigateBeforeIcon />}
          nextLabel={<NavigateNextIcon />}
          breakLabel="..."
          breakClassName="break-me"
          pageCount={5}
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
export default ActiveAdsComponent;
