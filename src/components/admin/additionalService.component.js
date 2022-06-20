import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import AdminSearchFormContainer from '../../containers/admin/admin.searchForm.container';
import { useTranslation } from 'react-i18next';
import { Table, TableHead, TableRow, TableCell, TableBody, Button } from '@material-ui/core';
import ReactPaginate from 'react-paginate';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import EuroSymbolOutlinedIcon from '@material-ui/icons/EuroSymbolOutlined';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import { PaymentCheckBox } from '../../utils/wrappers';
import { isToDisableCheckBox, setCurrencyColor } from '../../utils/helperFunctions';

const styles = theme => ({
  header: {
    backgroundColor: 'lightgray',
    borderTop: `4px solid ${theme.palette.primary.main}`,
  },
  tableHeadCell: {
    paddingLeft: 20,
  },
  tableHead: {
    color: theme.palette.primary.main,
    fontSize: '1em',
    fontWeight: 'bold',
  },
  pyyntoRow: {
    backgroundColor: 'white',
  },
  pyyntoCell: {
    paddingLeft: 20,
    borderBottom: '5px solid #f7f8fc',
  },
});

const AdminAdditionalService = ({
  classes,
  adminSearchAdditionalService,
  additionalService,
  populateVacancyForm,
  advertPages,
  changeAdvertPage,
  selectedPage,
  jobCategories,
  getAllJobCategory,
  updatePaymentStatus,
  paymentToUpdateDetails,
}) => {
  const { t } = useTranslation('adminAdditionalService', 'adminMarketing', 'campaigns');
  const header = [
    {
      name: t('companyName'),
    },
    {
      name: t('adminMarketing:jobTitle'),
    },
    {
      name: t('arrivalDate'),
    },
    {
      name: t('status'),
    },
    {
      name: t('request'),
    },
    {
      name: t('reviewStatus'),
    },
    {
      name: t('common:paymentStatus'),
    },
    {
      name: t('common:paymentReference'),
    },
    {
      name: t('common:isPaid'),
    },
    {
      name: '',
    },
  ];
  return (
    <div>
      <div>
        <AdminSearchFormContainer search="additionalService" searchBtnAction={() => adminSearchAdditionalService(false)} />
      </div>
      <div style={{ overflowX: 'auto' }}>
        <Table>
          <TableHead className={classes.header}>
            <TableRow>
              {header.map((x, i) => (
                <TableCell key={`thc-${i}`} className={classes.tableHeadCell}>
                  <span className={classes.tableHead}>{x.name}</span>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {additionalService?.map((jobPost, i) => {
              const extraService = jobPost.extra_service;
              const jobPostStatus = `${jobPost.status === 0 ? t('draft') : jobPost.status === 1 ? t('published') : t('deleted')}`;
              const orderDetails = {
                company_id: jobPost.company_id,
                post_id: jobPost.post_id,
                payment_reference: jobPost.payment_reference,
                fetch: 'additionalService',
              };
              return (
                <Fragment key={i}>
                  <TableRow className={classes.pyyntoRow}>
                    <TableCell className={classes.pyyntoCell}>{jobPost.company_name}</TableCell>
                    <TableCell className={classes.pyyntoCell}>{jobPost.job_title}</TableCell>
                    <TableCell className={classes.pyyntoCell}>{new Intl.DateTimeFormat('fi-Fi').format(new Date(jobPost.created))}</TableCell>
                    <TableCell className={classes.pyyntoCell}>{jobPostStatus}</TableCell>
                    <TableCell className={classes.pyyntoCell}>
                      {extraService === 'help' ? t('activatedHelp') : extraService === 'sos' ? t('activatedSos') : null}
                    </TableCell>
                    <TableCell className={classes.pyyntoCell}>
                      {(extraService === 'help' || extraService === 'sos') && (
                        <FiberManualRecordIcon
                          style={{
                            color: jobPost.status === 0 ? 'red' : jobPost.status === 1 ? 'green' : 'gray',
                          }}
                        />
                      )}
                    </TableCell>
                    <TableCell className={classes.pyyntoCell}>
                      <EuroSymbolOutlinedIcon
                        style={{
                          color: setCurrencyColor(jobPost.payment_reference, jobPost.payment_status),
                        }}
                      />
                    </TableCell>
                    <TableCell className={classes.pyyntoCell}>{jobPost.payment_reference}</TableCell>
                    <TableCell className={classes.pyyntoCell}>
                      <PaymentCheckBox
                        isToCheck={jobPost.payment_status === 1 ? true : false}
                        onChange={() => updatePaymentStatus(orderDetails)}
                        disabled={isToDisableCheckBox(jobPost.payment_reference, jobPost.payment_method)}
                        orderDetails={orderDetails}
                        paymentToUpdateDetails={paymentToUpdateDetails}
                      />
                    </TableCell>

                    <TableCell className={classes.pyyntoCell}>
                      {jobPost.status === 0 ? (
                        <Link to="/tyopaikkailmoitus/" className="btnLink">
                          <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            onClick={() => {
                              populateVacancyForm(`${jobPost.post_id}admin${jobPost.company_id}`, true);
                              !jobCategories.length && getAllJobCategory();
                            }}
                          >
                            {t('reviewAndEditBtn')}
                          </Button>
                        </Link>
                      ) : (
                        <Button type="submit" variant="contained" color="primary" disabled>
                          {t('reviewAndEditBtn')}
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                </Fragment>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <div className="pagination-body">
        <ReactPaginate
          previousLabel={<NavigateBeforeIcon />}
          nextLabel={<NavigateNextIcon />}
          breakLabel="..."
          breakClassName="break-me"
          pageCount={advertPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={data => {
            changeAdvertPage({
              selected: data.selected,
            });
            adminSearchAdditionalService(true);
          }}
          containerClassName="pagination"
          subContainerClassName="pages pagination"
          activeClassName="active"
          forcePage={selectedPage}
        />
      </div>
    </div>
  );
};

export default withStyles(styles)(AdminAdditionalService);
