import React, { useEffect, useState } from 'react';
import { Grid, Paper, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ReactPaginate from 'react-paginate';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import { customURL, dateFormat } from '../../utils/helperFunctions';
import axios from 'axios';
import { fetchJobApplicants, fetchJobById } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';

const AppliedJobsComponent = ({ appliedJobs, advertPages, changeAdvertPage, selectedPage }) => {
  const { t } = useTranslation('appliedJobs', 'common');
  const [jobsToRender, setJobsToRender] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const { id } = useSelector((state) => state.jobs);
  const dispatch = useDispatch()

  useEffect(() => {
    axios.get(`https://localhost:7262/jobsEn/${id}`).then((res) => {
      setJobsToRender(res.data);
      setApplicants(res.data.jobPostApplications)
      // dispatch(fetchJobApplicants(applicants.id))
    });
  }, []);

  return (
    <div className="container" key={jobsToRender.id}>
      <div>
        <Grid container style={{ padding: '50px 0px' }}>
          <Grid item sm={10}>
            <h3>
              {t('appliedJobsTitle')}({`${applicants.length}`}):
            </h3>
          </Grid>
        </Grid>
      </div>

      {jobsToRender &&
        jobsToRender.slice(selectedPage * 10, selectedPage * 10 + 10).map(post => {
          return (
            <div key={`${post.jobPostApplications.jobpostId}${post.jobPostApplications.id}`}>
              <Paper style={{ marginTop: 20 }}>
                <Grid container spacing={1} style={{ padding: 20 }} alignItems="center">
                  <Grid item xs={8}>
                    <div>
                      <Link to={customURL(post.url, 'internal')} className="btnLink">
                        <h4>{post.jobName}</h4>
                      </Link>
                    </div>
                    <div>
                      <span>
                        {t('common:deadline')}:
                        <span style={{ color: 'red', margin: '0 5px' }}>{post.dateOfApplication.lastIndexOf(':00.000Z') ? dateFormat(post.dateOfApplication) : post.dateOfApplication}</span>
                      </span>
                    </div>
                  </Grid>
                  <Grid item xs={4}>
                    <div style={{ textAlign: 'right' }}>
                      <Link to={customURL(post.url, 'internal')} className="btnLink">
                        <Button variant="contained" color="primary"  onClick={() => fetchJobById(post.id)}>
                          {t('common:openBtn')}
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
