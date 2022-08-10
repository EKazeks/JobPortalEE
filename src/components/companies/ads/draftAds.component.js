import React, { useEffect, useState } from 'react';
import { Grid, Paper, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import { useTranslation } from 'react-i18next';
import CustomizedDialogs from '../../../utils/customizedDialog';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';

const styles = theme => ({
  activatedHelp: {
    color: 'green',
    fontSize: 18,
  },
  jobTitle: {
    color: '#007bff',
  },
});

const DraftAds = ({
  classes,
  draftAds,
  changeAdvertPage,
  advertPages,
  selectedPage,
  showDialog,
  populateVacancyForm,
  warnToDelete,
  isToDeleteAdvertisementId,
  deleteAdvertisement,
  deleteJobOffer
}) => {
  const { t } = useTranslation('jobs', 'advertForm');
  const [jobs, setJobs] = useState([]);
  const [draftJobs, setDraftJobs] = useState([]);

  useEffect(() => {
    axios.get(`https://localhost:7262/activeAds`).then((res) => {
      setJobs(res.data)
      setDraftJobs(res.data.filter(isDraft => isDraft.isDraft === 1))
    })
   
  },[])
  console.log("draftJOBS",draftJobs);
  return (
    <div className="container">
      <h3 style={{ margin: '30px 0px' }}>
        {t('draftAdsTitle')} ({`${draftJobs && draftJobs.length}`}):
      </h3>
      {draftJobs &&
        draftJobs.slice(selectedPage * 10, selectedPage * 10 + 10).map(item => {
          return (
            <div key={item.id}>
              <Paper style={{ marginTop: 20 }}>
                <Grid container spacing={1} style={{ padding: 20 }} alignItems="center">
                  <Grid item md={5} sm={8} xs={8}>
                    <div>
                      {/* {item.extra_service === null ? ( */}
                        <Link to="/tyopaikkailmoitus" className="btnLink">
                          <h4
                            onClick={() => {
                              populateVacancyForm(item.id, true);
                            }}
                          >
                            {item.jobName}, {item.jobPostAddress.address}
                          </h4>
                        </Link>
                      {/* ) : ( */}
                        {/* <span className={classes.jobTitle}>
                          <h4>
                            {item.jobName}, {item.jobPostAddress.address}
                          </h4>
                        </span> */}
                      {/* )} */}
                    </div>
                  </Grid>
                  <Grid item md={3} sm={4} xs={4} style={{ color: '#34495E ' }}>
                    <div>
                      {/* <h5>{new Intl.DateTimeFormat('fi-FI').format(new Date(item.created))}</h5> */}
                      <h5>{new Intl.DateTimeFormat('fi-FI').format(new Date())}</h5>
                    </div>
                  </Grid>
                  <Grid item md={4} sm={12} xs={12}>
                    <Grid container spacing={4}>
                      {item.extra_service === 'help' ? (
                        <Grid item>
                          <span className={classes.activatedHelp}>{t('advertForm:activateHelp')}</span>
                        </Grid>
                      ) : item.extra_service === 'sos' ? (
                        <Grid item>
                          <span className={classes.activatedHelp}>{t('advertForm:activateSos')}</span>
                        </Grid>
                      ) : (
                        <>
                          <Grid item>
                            <Button variant="outlined" color="secondary" onClick={() => warnToDelete(item.id)}>
                              {t('common:deleteBtn')}
                            </Button>
                          </Grid>
                          <Grid item>
                            <Link to="/tyopaikkailmoitus/" style={{ textDecoration: 'none' }}>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                  populateVacancyForm(item.id, true);
                                }}
                              >
                                {t('common:openBtn')}
                              </Button>
                            </Link>
                          </Grid>
                        </>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </div>
          );
        })}

      <CustomizedDialogs
        showDialog={showDialog}
        dialogText={t('warnToDeletePostText')}
        warnToDeleteModal
        handleClick={() => deleteJobOffer(isToDeleteAdvertisementId)}
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

export default withStyles(styles)(DraftAds);
