import React from 'react';
import { Button, Grid, Snackbar } from '@material-ui/core';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { withStyles } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { useTranslation } from 'react-i18next';
import { Field } from 'redux-form';
import classNames from 'classnames';
import CustomizedDialog from '../../../utils/customizedDialog';
import { MySnackbarContentWrapper } from '../../../utils/snackbar.utils';
import { renderDatePicker } from '../../../utils/wrappers';
import { customTranslateCampaign, translateMktplatform } from '../../../utils/customTranslate';
import CustomTooltip from '../../../utils/tooltip';
import Loader from '../../../utils/loader';

const styles = theme => ({
  header: {
    marginTop: 20,
    color: theme.palette.primary.main,
    [theme.breakpoints.up('md')]: {
      marginTop: 50,
    },
  },
  card: {
    backgroundColor: '#F0F0F1',
    textAlign: 'center',
    border: '5px solid #F0F0F1',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.05)',
      transition: 'all .5s',
    },
  },
  campaignType: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    paddingBottom: 10,
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.5rem',
    },
  },
  price: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  icon: {
    fontSize: 'small',
    marginRight: 15,
  },
  fullGridFeature: {
    marginTop: 20,
    [theme.breakpoints.up('md')]: {
      textAlign: 'center',
      display: 'inline-block',
    },
  },
  campaignMeta: {
    backgroundColor: '#fff',
  },
  upperGridFeature: {
    minHeight: 150,
    textAlign: 'center',
    backgroundColor: '#fff',
    padding: 8,
    [theme.breakpoints.down('sm')]: {
      textAlign: 'left',
    },
  },
  lowerGridFeature: {
    minHeight: 150,
    textAlign: 'center',
    backgroundColor: '#fff',
    padding: 8,
    [theme.breakpoints.down('sm')]: {
      textAlign: 'left',
    },
  },
  featureList: {
    display: 'flex',
    textAlign: 'left',
    fontWeight: 600,
    fontSize: '1.1rem',
  },
  freeCampaignFeatures: {
    paddingLeft: 60,
    marginBottom: 30,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 20,
    },
  },
  ctaBtn: {
    [theme.breakpoints.down('xs')]: {
      marginTop: 20,
      width: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      width: '100%',
    },
  },
  fieldLabel: {
    margin: 20,
  },
  datepicker: {
    paddingRight: 12,
    [theme.breakpoints.down('xs')]: {
      paddingRight: 0,
    },
  },
  cheaperCampaignsContainer: {
    cursor: 'not-allowed',
  },
  cheaperCampaigns: {
    pointerEvents: 'none',
    opacity: '0.5',
  },
  marketingDetails: {
    color: theme.palette.secondary.main,
    marginTop: 15,
    fontWeight: 600,
    fontSize: '1.1rem',
  },
  iconBox: {
    marginRight: 5,
  },
  info: {
    color: 'red',
    marginLeft: 10,
  },
  campaignInfoContainer: {
    backgroundColor: theme.palette.secondary.main,
    padding: '10px 20px',
  },
  campaignInfo: {
    color: 'red',
    [theme.breakpoints.up('sm')]: {
      marginTop: '-12px',
      marginLeft: 20,
    },
  },
  customWidth: {
    maxWidth: 600,
  },
  alvInfo: {
    fontSize: 20,
  },
});

const _onFormSubmit = () => {
  return false;
};

const CampaignComponent = ({
  classes,
  campaigns,
  chooseCampaign,
  currentCampaignPrice,
  selectedCampaign,
  marketingDetails,
  isToChangeCampaign,
  userRole,
  id,
  saveNewCampaign,
  showPaymentDialog,
  choosePaymentMethod,
  saveNewCampaignSuccess,
  showSuccessSnackbar,
  showFailedSnackbar,
  closeSnackbar,
  handleSubmit,
  match,
  valid,
  showDialog,
  showSpinner,
}) => {
  const { t } = useTranslation('campaigns');
  const setStyle = campaign => {
    if (selectedCampaign.type === campaign.type) {
      return {
        border: '5px solid #88C0F7',
      };
    }
  };
  return (
    <div className="container" style={{ marginBottom: 50 }}>
      <div>
        <Grid container alignItems="center" className={classes.header}>
          <Grid item>
            <h3>{t('title')}:</h3>
          </Grid>
          <Grid item>
            <CustomTooltip
              title={
                <>
                  <p>{t('campaignInfo1')}</p>
                  <p>{t('campaignInfo2')}</p>
                </>
              }
              aria-label="more info"
              arrow
              placement="right-start"
              enterTouchDelay={50}
              classes={{ tooltip: classes.customWidth }}
            >
              <InfoOutlinedIcon className={classes.campaignInfo} />
            </CustomTooltip>
          </Grid>
        </Grid>
        <div>
          <p style={{ marginTop: 20 }}>{t('freeCampaignTitle')}</p>
          <div className={classes.freeCampaignFeatures}>
            <div className={classes.featureList}>
              <span>
                <CheckIcon className={classes.icon} />
              </span>
              <span>{t('feature1')}</span>
            </div>
            <div className={classes.featureList}>
              <span>
                <CheckIcon className={classes.icon} />
              </span>
              <span>{t('feature2')}</span>
            </div>
            <div className={classes.featureList}>
              <span>
                <CheckIcon className={classes.icon} />
              </span>
              <span>{t('feature12')}</span>
            </div>
            <div className={classes.featureList}>
              <span>
                <CheckIcon className={classes.icon} />
              </span>
              <span>{t('feature5')}</span>
            </div>
            <div className={classes.featureList}>
              <span>
                <CheckIcon className={classes.icon} />
              </span>
              <span>{t('feature6a')}</span>
            </div>
          </div>
        </div>

        <Grid container spacing={3}>
          {campaigns &&
            campaigns.map(campaign => (
              <Grid
                item
                md={campaign.id === 'fd90b98a-c44f-4c38-9f96-2cbe9d3f3739' || campaign.id === 'e4f3fb19-db74-4aac-8190-6fa936aa0ac5' ? 6 : 'fd90b98a-c44f-4c38-9f96-2cbe9d3f3739'}
                xs={12}
                sm={4}
                key={campaign.value}
                className={
                  (userRole === 'admin' && !isToChangeCampaign) || (isToChangeCampaign && campaign.value < currentCampaignPrice)
                    ? classes.cheaperCampaignsContainer
                    : null
                }
              >
                <div
                  className={classNames(
                    (userRole === 'admin' && !isToChangeCampaign) || (isToChangeCampaign && campaign.value < currentCampaignPrice)
                      ? classes.cheaperCampaigns
                      : null,
                    classes.card,
                  )}
                  style={setStyle(campaign)}
                  onClick={() => chooseCampaign(campaign)}
                >
                  <div className={classes.campaignMeta}>
                    <span className={classes.price}>
                      {campaign.value} € {campaign.id !== 1 && <span className={classes.alvInfo}>{t('alv')}</span>}
                    </span>
                    <h4 className={classes.campaignType}>{customTranslateCampaign(campaign.id)}</h4>
                  </div>
                  <div className={campaign.id === 'fd188ed8-80e3-4f02-9ca5-b1bb14f73f6b' || campaign.id === '5bb74a6f-ec6e-4dab-bf04-1d344d03a9be' || campaign.id === '142c7490-6cb4-4799-9b38-6807bc1954f3' ? classes.upperGridFeature : classes.lowerGridFeature}>
                    <div className={classes.featureList}>
                      <span>
                        <CheckIcon className={classes.icon} />
                      </span>
                      <span>
                        {campaign.id === 'e4f3fb19-db74-4aac-8190-6fa936aa0ac5'
                          ? t('type5Feature1')
                          : campaign.id === 'fd90b98a-c44f-4c38-9f96-2cbe9d3f3739'
                          ? t('type4Feature1')
                          : campaign.id === '142c7490-6cb4-4799-9b38-6807bc1954f3'
                          ? t('type3Feature1')
                          : t('type1Feature1')}
                      </span>
                    </div>

                    {campaign.id === '5bb74a6f-ec6e-4dab-bf04-1d344d03a9be' && (
                      <div className={classes.featureList}>
                        <span>
                          <CheckIcon className={classes.icon} />
                        </span>
                        <span>{t('feature4')}</span>
                      </div>
                    )}

                    {campaign.id === '142c7490-6cb4-4799-9b38-6807bc1954f3' && (
                      <div className={classes.featureList}>
                        <span>
                          <CheckIcon className={classes.icon} />
                        </span>
                        <span>{t('feature7')}</span>
                      </div>
                    )}
                    {campaign.id === 'fd90b98a-c44f-4c38-9f96-2cbe9d3f3739' && (
                      <div className={classes.featureList}>
                        <span>
                          <CheckIcon className={classes.icon} />
                        </span>
                        <span>{t('feature8')}</span>
                      </div>
                    )}
                    {campaign.google_visible && (
                      <div className={classes.featureList}>
                        <span>
                          <CheckIcon className={classes.icon} />
                        </span>
                        <span>{t('feature10')}</span>
                      </div>
                    )}
                    {campaign.sm_marketing && (
                      <div className={classes.featureList}>
                        <span>
                          <CheckIcon className={classes.icon} />
                        </span>
                        <span>{t('feature11')}</span>
                      </div>
                    )}
                    {campaign.includes_mktbudget && (
                      <div className={classes.featureList}>
                        <span>
                          <CheckIcon className={classes.icon} />
                        </span>
                        <span>{t('feature13')}</span>
                      </div>
                    )}
                    {selectedCampaign.id === campaign.id && campaign.includes_mktbudget && marketingDetails && (
                      <Grid container spacing={1} alignItems="center">
                        {marketingDetails.marketing_platform && (
                          <Grid item xs={12} sm={6}>
                            <p className={classes.marketingDetails}>
                              <CheckBoxIcon className={classes.iconBox} />
                              {translateMktplatform(marketingDetails.marketing_platform)}
                            </p>
                          </Grid>
                        )}
                        <Grid item xs={12} sm={6}>
                          {marketingDetails.more_budget === 'yes' && (
                            <Grid container alignItems="center">
                              <Grid item xs={8}>
                                <p className={classes.marketingDetails}>
                                  <CheckBoxIcon className={classes.iconBox} />
                                  {t('moreMoney')}{' '}
                                </p>
                              </Grid>
                              <Grid item xs={4}>
                                <CustomTooltip title={t('info')} aria-label="more info" arrow placement="top-start" enterTouchDelay={50}>
                                  <InfoOutlinedIcon className={classes.info} />
                                </CustomTooltip>
                              </Grid>
                            </Grid>
                          )}
                        </Grid>
                      </Grid>
                    )}
                  </div>
                </div>
              </Grid>
            ))}
          {/* if isToChangeCampaign is true, show the save button in this component */}
        </Grid>
        {isToChangeCampaign && (
          <>
            <form onSubmit={handleSubmit(_onFormSubmit)}>
              <Grid container alignItems="center" justifyContent="space-between" style={{ marginTop: 20 }}>
                <Grid item sm={6} xs={12} className={classes.datepicker}>
                  <Field component={renderDatePicker} id="due_date" label={t('advertForm:field5')} name="due_date" dense="dense" />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <Grid container spacing={4} justifyContent="flex-end">
                    <Grid item sm={5} xs={12}>
                      <Button
                        type="submit"
                        variant="outlined"
                        color="primary"
                        // color='secondary'
                        onClick={() => {
                          saveNewCampaignSuccess(); // Need to change the isToChangeCampaign back to false
                          window.history.back();
                        }}
                        className={classes.ctaBtn}
                      >
                        {t('common:cancelBtn')}
                      </Button>
                    </Grid>
                    <Grid item sm={5} xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        /*  onClick={
                        valid
                          ? () =>
                              saveNewCampaign(
                                userRole === 'admin' ? id : match.params.id
                              )
                          : null
                      } */
                        onClick={valid ? choosePaymentMethod : null}
                        className={classes.ctaBtn}
                      >
                        {t('common:confirmBtn')}
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </form>
            <CustomizedDialog
              showDialog={showPaymentDialog}
              dialogText=""
              paymentModal
              paymentAction={() => saveNewCampaign(userRole === 'admin' ? id : match?.params?.id)}
            />
          </>
        )}
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
          window.history.back();
        }}
      >
        <MySnackbarContentWrapper
          onClose={() => {
            closeSnackbar();
            window.history.back();
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
      <CustomizedDialog showDialog={showDialog} dialogText="" campaignModal />
      <Loader showSpinner={showSpinner} />
    </div>
  );
};

export default withStyles(styles)(CampaignComponent);
