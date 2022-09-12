import React, { useEffect, useState } from "react";
import { Grid, Paper, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ReactPaginate from "react-paginate";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import { customURL, dateFormat } from "../../utils/helperFunctions";
import axios from "axios";
import { fetchJobApplicants, fetchJobById } from "../../actions";
import { useDispatch, useSelector } from "react-redux";

const AppliedJobsComponent = ({
  appliedJobs,
  advertPages,
  changeAdvertPage,
  selectedPage,
}) => {
  const { t } = useTranslation("appliedJobs", "common");

  return (
    <div className="container" key={appliedJobs.id}>
      <div>
        <Grid container style={{ padding: "50px 0px" }}>
          <Grid item sm={10}>
            <h3>
              {t("appliedJobsTitle")}({`${appliedJobs.length}`}):
            </h3>
          </Grid>
        </Grid>
      </div>

      {appliedJobs &&
        appliedJobs
          .slice(selectedPage * 10, selectedPage * 10 + 10)
          .map((post) => {
            return (
              <div key={`${post.jobPostId}${post.id}`}>
                <Paper style={{ marginTop: 20 }}>
                  <Grid
                    container
                    spacing={1}
                    style={{ padding: 20 }}
                    alignItems="center"
                  >
                    <Grid item xs={8}>
                      <div>
                        <Link
                          to={customURL(post.url, "external")}
                          className="btnLink"
                        >
                          <h4>{post.jobTitle}</h4>
                        </Link>
                      </div>
                      <div>
                        <span>
                          {t("common:deadline")}:
                          <span style={{ color: "red", margin: "0 5px" }}>
                            {post.closingDate?.indexOf(":00.000Z")
                              ? dateFormat(post.closingDate)
                              : post.closingDate}
                          </span>
                        </span>
                      </div>
                    </Grid>
                    <Grid item xs={4}>
                      <div style={{ textAlign: "right" }}>
                        <Link
                          to={customURL(post.url, "external")}
                          className="btnLink"
                        >
                          <Button
                            variant="contained"
                            color="primary"
                            // onClick={() => fetchJobById(post.id, post.jobPostId)}
                          >
                            {t("common:openBtn")}
                          </Button>
                        </Link>
                      </div>
                    </Grid>
                  </Grid>
                </Paper>
              </div>
            );
          })}
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

export default AppliedJobsComponent;
