import React, { useEffect, useState } from "react";
import { Grid, Paper, Button } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import ReactPaginate from "react-paginate";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import { useTranslation } from "react-i18next";
import { customURL, dateFormat } from "../../../utils/helperFunctions";
import CustomizedDialogs from "../../../utils/customizedDialog";
import i18n from "../../../utils/i18n";
import axios from "axios";
import { changeRoute } from "../../../actions";

const ActiveAdsComponent = ({
  warnToDelete,
  populateVacancyForm,
  deleteJobOffer,
  changeAdvertPage,
  selectedPage,
  advertPages,
  openAdToSeeJobPost,
  postAdvertisement,
  showDialog,
  isToDeleteAdvertisementId,
  fetchJobById,
  editOffer,
}) => {
  const { t } = useTranslation("jobs");
  const [isDesktop, setIsDesktop] = useState(window.innerWidth);
  const [jobsToRender, setJobsToRender] = useState([]);
  const [toEdit, setToEdit] = useState();
  const [jobCategorys, setJobCategorys] = useState([]);

  // useEffect(() => {
  //     axios.get('https://www.tootukassa.ee/api/toopakkumised').then((res) => {
  //         setJobCategorys(res.data)
  //     })
  //     console.log(jobCategorys);
  // },[])

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
    //   {jobsToRender.map(job => {

    //     return (
    //       <div key={job.id}>
    //       <Grid>
    //         <div>
    //           <h1>
    //             {applicants && applicants.map((applicant) => {
    //               return (
    //                 <h1>
    //                   {applicant.firstName}

    //                 </h1>
    //               )
    //             })}
    //             {/* {console.log(applicants.length)} */}
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
            <div key={item.id === null ? item.id : item.id}>
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
                          }) === null || undefined
                            ? item.jobPostAsukohaAddress.map((address) => {
                                {
                                  if (address.address[17] === null) {
                                    return address.address
                                      .split(",")
                                      .splice(1)
                                      .toString();
                                  } else return address.address;
                                }
                              })
                            : item.jobPostAddress.address}
                        </h4>
                      </Link>
                    </div>
                    <div>
                      <span>
                        {t("applicationsInTotal")}:
                        <span style={{ color: "red", margin: "0 5px" }}>
                          ({item.jobPostApplications.length})
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
                      <h5>{dateFormat(item.dateOfApplication)}</h5>
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
                              setToEdit(true);
                              editOffer(item.id);
                              populateVacancyForm(item.id, true);
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
        handleClick={() => {
          deleteJobOffer(isToDeleteAdvertisementId);
          changeRoute();
        }}
      />
      <div className="pagination-body">
        <ReactPaginate
          previousLabel={<NavigateBeforeIcon />}
          nextLabel={<NavigateNextIcon />}
          breakLabel="..."
          breakClassName="break-me"
          pageCount={6}
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
