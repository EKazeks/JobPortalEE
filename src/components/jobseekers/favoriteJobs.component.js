import React from 'react';
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

const FavoriteJobsComponent = ({ favoriteJobs, advertPages, changeAdvertPage, selectedPage }) => {
  const { t } = useTranslation('favoriteJobs', 'common');
  return (
    <div className="container">
      <div>
        <Grid container style={{ padding: '50px 0px' }}>
          <Grid item sm={10}>
            <h3>
              <FavoriteOutlinedIcon style={{ marginRight: 10 }} />
              {t('favorites')} ({favoriteJobs && favoriteJobs.length}):
            </h3>
          </Grid>
        </Grid>
      </div>

      {favoriteJobs &&
        favoriteJobs.slice(selectedPage * 10, selectedPage * 10 + 10).map(post => {
          return (
            <div key={`${post.company_id}${post.post_id}`}>
              <Paper style={{ marginTop: 20 }}>
                <Grid container style={{ padding: 20 }} alignItems="center" spacing={1} justifyContent="space-between">
                  <Grid item md={8} sm={8} xs={12}>
                    <div>
                      {/* <Link to={customURL(post.job_post_link, 'external')} className="btnLink">
                        <h4>{post.job_title}</h4>
                      </Link> */}
                    </div>
                    <div>
                      <span>
                        {t('common:deadline')}:
                        <span style={{ color: 'red', margin: '0 5px' }}>{new Intl.DateTimeFormat('fi-FI').format(new Date(post.due_date))}</span>
                      </span>
                    </div>
                  </Grid>
                  <Grid item md={4} sm={4} xs={12}>
                    <Grid container spacing={4} justifyContent="flex-end">
                      <Grid item>
                        <Button variant="outlined" color="secondary" onClick={() => store.dispatch(deleteFavoriteJobs(post.company_id, post.post_id, 0))}>
                          {t('common:deleteBtn')}
                        </Button>
                      </Grid>
                      <Grid item>
                        {/* <Link to={customURL(post.job_post_link, 'external')} className="btnLink">
                          <Button variant="contained" color="primary">
                            {t('common:openBtn')}
                          </Button>
                        </Link> */}
                      </Grid>
                    </Grid>
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

export default FavoriteJobsComponent;
