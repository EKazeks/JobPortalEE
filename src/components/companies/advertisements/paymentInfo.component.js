import React from 'react';
import { Field } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import { Button, Grid, Radio } from '@material-ui/core';
import { renderRadioButton } from '../../../utils/wrappers';
import { useTranslation } from 'react-i18next';

const styles = theme => ({
  container: {
    border: `2px solid ${theme.palette.custom.dialogBorder}`,
    padding: '30px 20px',
    margin: 20,
    [theme.breakpoints.up('sm')]: {
      minWidth: 450,
    },
  },
  title: {
    fontSize: 20,
    fontWeight: 600,
    color: theme.palette.secondary.main,
    marginBottom: '.2rem',
  },
  horizontal: {
    margin: 0,
  },
  orderInfo: {
    margin: '30px auto',
    fontWeight: 600,
    fontSize: '1rem',
    color: theme.palette.primary.main,
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.8rem',
    },
  },
  label: {
    marginBottom: 0,
    fontWeight: 600,
    fontSize: '1rem',
    color: theme.palette.primary.main,
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.8rem',
    },
  },

  info: {
    textAlign: 'right',
  },
  ctaBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaPublishBtn: {
    marginTop: 30,
    textAlign: 'center',
  },
  ctaCancelBtn: {
    marginTop: 30,
    textAlign: 'center',
    marginRight: 20,
  },
  note: {
    fontWeight: 'normal',
    fontColor: 'black',
    fontStyle: 'italic',
    fontSize: 14,
    margin: '15px auto',
  },
});

const visa = require('../../../images/nets_card_logo/visa.png');
const master = require('../../../images/nets_card_logo/mastercard.gif');
const amex = require('../../../images/nets_card_logo/amex.gif');
const diners = require('../../../images/nets_card_logo/diners.gif');
const discover = require('../../../images/nets_card_logo/discover.gif');
const jcb = require('../../../images/nets_card_logo/jcb.png');
const maestro = require('../../../images/nets_card_logo/maestro.gif');
const ikano = require('../../../images/nets_card_logo/svwIkano.png');

const PaymentInfoComponent = ({
  campaignType,
  campaignValue,
  marketingBudget,
  campaignPrice,
  sumWithoutVAT,
  VAT,
  totalSumWithVAT,
  extraService,
  roleId,
  campaignid,
  newCampValue,
  isToChangeCampaign,
  jobPostStatus,
  totalSum,
  classes,
  pristine,
  paymentAction,
  closeDialog,
}) => {
  const { t } = useTranslation('payment');
  return (
    <div className={classes.container}>
      <div>
        <p className={classes.title}>{t('title')}</p>
        <hr className={classes.horizontal} />
        {!!extraService ? (
          <div className={classes.orderInfo}>
            <Grid container>
              <Grid item xs={6} sm={6}>
                <p>{t(`serviceLabel${extraService}`)} </p>
              </Grid>
              <Grid item xs={6} sm={6}>
                <p className={classes.info}>{sumWithoutVAT}</p>
              </Grid>
            </Grid>

            <Grid container>
              <Grid item xs={6} sm={8}>
                <p>{t('label4')} </p>
              </Grid>
              <Grid item xs={6} sm={4}>
                <p className={classes.info}>{VAT}</p>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={6} sm={8}>
                <p>{t('label5')} </p>
              </Grid>
              <Grid item xs={6} sm={4}>
                <p className={classes.info}>{totalSumWithVAT}</p>
              </Grid>
            </Grid>
            <p className={classes.note}>
              {t('note1')}
              {extraService.toUpperCase()}
              {t('note2')}
            </p>
          </div>
        ) : (
          <div className={classes.orderInfo}>
            <>
              <Grid container>
                <Grid item xs={6} sm={6}>
                  <p>{t('label1')} </p>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <p className={classes.info}>{`${campaignType} / ${campaignPrice}`}</p>
                </Grid>
              </Grid>
              {isToChangeCampaign && (
                <Grid container>
                  <Grid item xs={6} sm={6}>
                    <p>{t('label6')} </p>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <p className={classes.info}>{`${newCampValue}`}</p>
                  </Grid>
                </Grid>
              )}
            </>
            {campaignid === 5 && (
              <Grid container>
                <Grid item xs={6} sm={8}>
                  <p>{t('label2')} </p>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <p className={classes.info}>{marketingBudget} </p>
                </Grid>
              </Grid>
            )}
            <Grid container>
              <Grid item xs={6} sm={8}>
                <p>{t('label3')} </p>
              </Grid>
              <Grid item xs={6} sm={4}>
                <p className={classes.info}>{sumWithoutVAT} </p>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={6} sm={8}>
                <p>{t('label4')} </p>
              </Grid>
              <Grid item xs={6} sm={4}>
                <p className={classes.info}>{VAT}</p>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={6} sm={8}>
                <p>{t('label5')} </p>
              </Grid>
              <Grid item xs={6} sm={4}>
                <p className={classes.info}>{totalSumWithVAT}</p>
              </Grid>
            </Grid>
          </div>
        )}
        <form>
          {totalSum > 0 && (
            <>
              <p className={classes.title}>{t('paymentMethodTitle')}</p>
              <hr className={classes.horizontal} />

              <Field component={renderRadioButton} name="payment_method" variant="outlined">
                <label className={classes.label}>
                  <Radio value="invoice" />
                  {t('invoice')}
                </label>
                <Grid container justifyContent="space-between" alignItems="baseline" spacing={2}>
                  <Grid item>
                    <label className={classes.label}>
                      <Radio value="online" disabled={roleId === 1} />
                      {t('online')}
                    </label>
                  </Grid>
                  <Grid item>
                    <Grid container>
                      <Grid item>
                        <img src={visa} alt="visa-card" />
                      </Grid>

                      <Grid item>
                        <img src={master} alt="master-card" />
                      </Grid>

                      <Grid item>
                        <img src={amex} alt="amex-card" />
                      </Grid>

                      <Grid item>
                        <img src={diners} alt="diners-card" />
                      </Grid>

                      <Grid item>
                        <img src={discover} alt="discover-card" />
                      </Grid>

                      <Grid item>
                        <img src={jcb} alt="jcb-card" />
                      </Grid>

                      <Grid item>
                        <img src={maestro} alt="maestro-card" />
                      </Grid>

                      <Grid item>
                        <img src={ikano} alt="ikano-card" />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Field>
            </>
          )}
          <div className={classes.ctaBtn}>
            <Button type="button" variant="outlined" color="primary" className={classes.ctaCancelBtn} onClick={closeDialog}>
              {t('common:cancelBtn')}
            </Button>

            <Button
              type="button"
              variant="contained"
              color="primary"
              className={classes.ctaPublishBtn}
              disabled={jobPostStatus === 2 ? false : (totalSum > 0 && pristine) || (isToChangeCampaign && totalSum === 0) ? true : false} // For inactive posts when trying to activate, allow to publish without upgrading campaign
              onClick={() => {
                paymentAction();
              }}
            >
              {t('advertForm:publishBtn')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withStyles(styles)(PaymentInfoComponent);
