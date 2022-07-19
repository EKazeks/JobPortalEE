import React, { useEffect, useState } from 'react';
import { Grid, Paper, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import { useTranslation } from 'react-i18next';
import ReactPaginate from 'react-paginate';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import { customURL } from '../../utils/helperFunctions';
import store from '../../store';
import { deleteFavoriteJobs } from '../../actions';
import axios from 'axios';

const FavoriteJobsComponent = ({ favoriteJobs, advertPages, changeAdvertPage, selectedPage }) => {
  const { t } = useTranslation('favoriteJobs', 'common');
  const [jobsToRender, setJobsToRender] = useState([]);

  useEffect(() => {
    axios.get(`https://localhost:7262/jobsEn`).then((res) => {
      setJobsToRender(res.data);
    });
  }, []);

  return (
    <div className="container">
      <div>
        <Grid container style={{ padding: '50px 0px' }}>
          <Grid item sm={10}>
            <h3>
              <FavoriteOutlinedIcon style={{ marginRight: 10 }} />
              {/* {t('favorites')} ({favoriteJobs && favoriteJobs.length}): */}
              {t('favorites')} ({'0'}):
            </h3>
          </Grid>
        </Grid>
      </div>

      {favoriteJobs &&
        favoriteJobs.slice(selectedPage * 10, selectedPage * 10 + 10).map(post => {
          return (
            <div></div>
            // <div key={`${post.company_id}${post.post_id}`}>
            //   <Paper style={{ marginTop: 20 }}>
            //     <Grid container style={{ padding: 20 }} alignItems="center" spacing={1} justifyContent="space-between">
            //       <Grid item md={8} sm={8} xs={12}>
            //         {/* <div>
            //           <Link to={customURL(jobsToRender.url, 'external')} className="btnLink">
            //             <h4>{jobsToRender.jobName}</h4>
            //           </Link>
            //         </div> */}
            //         <div>
            //           <span>
            //             {t('common:deadline')}:
            //             <span style={{ color: 'red', margin: '0 5px' }}>{jobsToRender.dateOfApplication}</span>
            //           </span>
            //         </div>
            //       </Grid>
            //       <Grid item md={4} sm={4} xs={12}>
            //         <Grid container spacing={4} justifyContent="flex-end">
            //           <Grid item>
            //             <Button variant="outlined" color="secondary" onClick={() => store.dispatch(deleteFavoriteJobs(post.company_id, post.post_id, 0))}>
            //               {t('common:deleteBtn')}
            //             </Button>
            //           </Grid>
            //           <Grid item>
            //             {/* <Link to={customURL(post.job_post_link, 'external')} className="btnLink">
            //               <Button variant="contained" color="primary">
            //                 {t('common:openBtn')}
            //               </Button>
            //             </Link> */}
            //           </Grid>
            //         </Grid>
            //       </Grid>
            //     </Grid>
            //   </Paper>
            // </div>
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

export default FavoriteJobsComponent;
