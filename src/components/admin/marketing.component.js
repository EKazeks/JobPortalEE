import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import EuroSymbolOutlinedIcon from '@material-ui/icons/EuroSymbolOutlined';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import ReactPaginate from 'react-paginate';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import { useTranslation } from 'react-i18next';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import { Snackbar, Button } from '@material-ui/core';
import { Field } from 'redux-form';
import MarketingBudget, { calculateBudgetAfterSeviceFee } from './marketingBudget.component';
import AdminSearchFormContainer from '../../containers/admin/admin.searchForm.container';
import { PaymentCheckBox, renderCheckbox } from '../../utils/wrappers';
import { MySnackbarContentWrapper } from '../../utils/snackbar.utils';
import { customTranslateCampaign, translateMktplatform } from '../../utils/customTranslate';
import { ADMIN_VIEW_COUNT_PER_PAGE } from '../../constants';
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

  marketingRow: {
    backgroundColor: 'white',
  },
  expandedMktRow: {
    backgroundColor: 'aliceblue',
  },
  marketing_tablecell: {
    borderBottom: 'none',
    paddingLeft: 20,
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  expandRow: {
    paddingLeft: 75,
    borderBottom: '5px solid #f7f8fc',
    backgroundColor: 'aliceblue',
  },
  marketingFeatures: {
    display: 'flex',
    margin: '20px 0',
    alignItems: 'center',
  },
  title: {
    marginRight: 20,
  },
  metaData: {
    margin: '20px auto',
    fontWeight: 600,
  },
  info: {
    padding: 15,
    color: theme.palette.secondary.main,
    fontSize: 20,
  },
});

const _onFormSubmit = () => {
  return false;
};

const MarketingComponent = ({
  classes,
  adsMarketing,
  marketingDetails,
  adminSearchAdsMarketing,
  advertPages,
  changeAdvertPage,
  selectedPage,
  adminUpdateMarketingStatus,
  adminExpandAdRow,
  adminCloseAdRow,
  expanded,
  handleSubmit,
  showSuccessSnackbar,
  showFailedSnackbar,
  closeSnackbar,
  updatePaymentStatus,
  paymentToUpdateDetails,
  pristine,
}) => {
  const { t } = useTranslation('adminMarketing', 'campaigns', 'common');
  const header = [
    {
      name: t('company'),
    },
    {
      name: t('jobTitle'),
    },
    {
      name: t('campaignType'),
    },
    {
      name: t('campaigns:moreMoney'),
    },
    {
      name: t('published'),
    },
    {
      name: t('expired'),
    },

    {
      name: t('status'),
    },
    {
      name: t('marketed'),
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
        <AdminSearchFormContainer search="marketing" searchBtnAction={adminSearchAdsMarketing} />
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
            {adsMarketing.slice(selectedPage * ADMIN_VIEW_COUNT_PER_PAGE, selectedPage * ADMIN_VIEW_COUNT_PER_PAGE + ADMIN_VIEW_COUNT_PER_PAGE).map((ad, i) => {
              const orderDetails = {
                company_id: ad.company_id,
                post_id: ad.post_id,
                payment_reference: ad.payment_reference,
                fetch: 'marketing',
              };
              return (
                <Fragment key={`${ad.company_id}${ad.post_id}`}>
                  <TableRow className={expanded !== `${ad.company_id}JP${ad.post_id}` ? classes.marketingRow : classes.expandedMktRow}>
                    <TableCell className={classes.marketing_tablecell}>{ad.company_name}</TableCell>
                    <TableCell className={classes.marketing_tablecell}>{ad.job_title}</TableCell>
                    <TableCell className={classes.marketing_tablecell}>{customTranslateCampaign(ad.campaign_id)}</TableCell>
                    <TableCell className={classes.marketing_tablecell}>{ad.more_budget === 'yes' ? t('campaigns:yes') : t('campaigns:no')}</TableCell>
                    <TableCell className={classes.marketing_tablecell}>{new Intl.DateTimeFormat('fi-Fi').format(new Date(ad.created))}</TableCell>
                    <TableCell className={classes.marketing_tablecell}>{new Intl.DateTimeFormat('fi-FI').format(new Date(ad.due_date))}</TableCell>
                    <TableCell className={classes.marketing_tablecell}>
                      {ad.status === 1 ? t('adDetails:active') : ad.status === 2 ? t('adDetails:inactive') : t('adDetails:deleted')}
                    </TableCell>
                    <TableCell className={classes.marketing_tablecell}>
                      <FiberManualRecordIcon
                        style={{
                          color: ad.marketing_status === 0 ? 'red' : 'green',
                        }}
                      />
                    </TableCell>

                    <TableCell className={classes.marketing_tablecell}>
                      <EuroSymbolOutlinedIcon
                        style={{
                          color: setCurrencyColor(ad.payment_reference, ad.payment_status),
                        }}
                      />
                    </TableCell>
                    <TableCell className={classes.marketing_tablecell}>{ad.payment_reference}</TableCell>
                    <TableCell className={classes.marketing_tablecell}>
                      <PaymentCheckBox
                        isToCheck={ad.payment_status === 1 ? true : false}
                        onChange={() => updatePaymentStatus(orderDetails)}
                        disabled={isToDisableCheckBox(ad.payment_reference, ad.payment_method)}
                        orderDetails={orderDetails}
                        paymentToUpdateDetails={paymentToUpdateDetails}
                      />
                    </TableCell>
                    <TableCell className={classes.marketing_tablecell}>
                      <IconButton
                        onClick={() =>
                          expanded !== `${ad.company_id}JP${ad.post_id}`
                            ? adminExpandAdRow(`${ad.company_id}JP${ad.post_id}`, ad.sm_marketing_status)
                            : adminCloseAdRow()
                        }
                        aria-expanded={expanded}
                        aria-label="show more"
                        className={expanded === `${ad.company_id}JP${ad.post_id}` ? classes.expandOpen : null}
                      >
                        <ExpandMoreIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <td colSpan={12} className={classes.expandRow}>
                      <Collapse in={expanded === `${ad.company_id}JP${ad.post_id}`} timeout="auto" unmountOnExit>
                        <div>
                          <div className={classes.metaData}>
                            <p>
                              {t('campaigns:platformTitle')}
                              <span className={classes.info}>{translateMktplatform(ad.marketing_platform)}</span>
                            </p>
                            <>
                              {ad.more_budget === 'yes' && (
                                <>
                                  {t('campaigns:moreMoneyToSpend')}:<span className={classes.info}>{calculateBudgetAfterSeviceFee(ad.marketing_budget)}€</span>
                                  <MarketingBudget
                                    marketingDetails={marketingDetails}
                                    updatePaymentStatus={updatePaymentStatus}
                                    paymentToUpdateDetails={paymentToUpdateDetails}
                                  />
                                </>
                              )}
                            </>
                          </div>

                          <form onSubmit={handleSubmit(_onFormSubmit)} className={classes.marketingFeatures}>
                            <Field component={renderCheckbox} name="sm_marketing_status" label={t('feature2')} isChecked={ad.sm_marketing_status} />
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={
                                !pristine
                                  ? () =>
                                      // call api only if any changes in form!
                                      adminUpdateMarketingStatus(ad.company_id, ad.post_id, ad.campaign_id)
                                  : null
                              }
                              type="submit"
                            >
                              {t('common:saveBtn')}
                            </Button>
                          </form>

                          <div style={{ marginBottom: 20 }}>
                            <strong className={classes.title}>{t('linkAddress')}: </strong>
                            <a href={ad.job_post_link} target="_blank" rel="noopener noreferrer">
                              {ad.job_post_link}
                            </a>
                          </div>
                        </div>
                      </Collapse>
                    </td>
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
          onPageChange={changeAdvertPage}
          containerClassName="pagination"
          subContainerClassName="pages pagination"
          activeClassName="active"
          forcePage={selectedPage}
        />
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={showSuccessSnackbar}
        autoHideDuration={3000}
        onClose={() => {
          closeSnackbar();
        }}
      >
        <MySnackbarContentWrapper
          onClose={() => {
            closeSnackbar();
          }}
          variant="success"
          message={t('successMsg')}
        />
      </Snackbar>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={showFailedSnackbar}
        autoHideDuration={3000}
        onClose={() => {
          closeSnackbar();
        }}
      >
        <MySnackbarContentWrapper
          onClose={() => {
            closeSnackbar();
          }}
          variant="error"
          message={t('failedMsg')}
        />
      </Snackbar>
    </div>
  );
};

export default withStyles(styles)(MarketingComponent);
