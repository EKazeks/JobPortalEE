import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { processOnlinePayment, displayPaymentStatusMessage } from '../../../actions';
import { useTranslation } from 'react-i18next';
import { Button, withStyles, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import Loader from '../../../utils/loader';

const happyIllustration = require('../../../images/post_happy_announcement.svg');
const sadIllustration = require('../../../images/post_sad_announcement.svg');

const styles = theme => ({
  title: {
    margin: 40,
    fontWeight: 'bold',
    color: theme.palette.primary.main,
  },
  content: {
    margin: '50px 0px',
    textAlign: 'center',
  },
  image: {
    height: 200,
    backgroundSize: 'contain',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
  },
  sadImg: {
    backgroundImage: `url(${sadIllustration})`,
  },
  happyImg: {
    backgroundImage: `url(${happyIllustration})`,
  },
  body: {
    margin: '50px 0',
  },
  ctaBtn: {
    margin: 40,
  },
});

const PaymentRedirect = ({ classes }) => {
  const apiResponse = useSelector(state => state.payment.responseText); // 'Success' | 'Failed' | 'Cancelled' | 'NotFound' | 'Processed | ActivatePostFailed'
  const isLoading = useSelector(state => state.payment.isLoading);
  const dispatch = useDispatch();

  const extraService = useSelector(state => state.advertisement.extraService);
  const isToChangeCampaign = useSelector(state => state.advertisement.isToChangeCampaign);
  const upgradeCampaignCancelled = isToChangeCampaign && apiResponse === 'Cancelled';

  const upgradeCampaignSuccess = isToChangeCampaign && apiResponse === 'Success';
  const serviceText = upgradeCampaignSuccess ? 'Upgrade' : extraService.help || extraService.sos ? 'Service' : '';

  const urlParams = new URLSearchParams(window.location.search);
  const transaction_id = urlParams.get('transactionId');
  const comp_post_id = urlParams.get('paymentId');
  const responseCode = urlParams.get('responseCode');

  useEffect(() => {
    if (!!transaction_id && !!comp_post_id) {
      dispatch(processOnlinePayment());
    } else {
      dispatch(displayPaymentStatusMessage(''));
    }
  }, [dispatch, transaction_id, comp_post_id]);

  const { t } = useTranslation('payment');

  return (
    <div className="container">
      {!!transaction_id && !!responseCode ? (
        <div className={classes.content}>
          {isLoading && <Loader showSpinner={isLoading} />}
          {!!apiResponse && !isLoading && (
            <Grid spacing={1} className={classes.body}>
              <Grid
                item
                xs={12}
                className={classNames(
                  classes.image,
                  apiResponse === 'Failed' || apiResponse === 'Cancelled' || apiResponse === 'NotFound' || apiResponse === 'ActivatePostFailed'
                    ? classes.sadImg
                    : classes.happyImg,
                )}
              />
              <Grid item xs={12}>
                <h3 className={classes.title}> {t(`title${apiResponse}`)}</h3>
              </Grid>
              <Grid item xs={12}>
                <p>
                  {apiResponse === 'Success'
                    ? t(`body${apiResponse}${serviceText}`)
                    : upgradeCampaignCancelled
                    ? t('upgradeCancelled')
                    : t(`body${apiResponse}`)}
                </p>
              </Grid>
              <Grid item xs={12} className={classes.ctaBtn}>
                <Link to="/omat-ilmoitukseni" style={{ textDecoration: 'none' }}>
                  <Button variant="contained" color="primary">
                    {t('ctaBtnText')}
                  </Button>
                </Link>
              </Grid>
            </Grid>
          )}
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default withStyles(styles)(PaymentRedirect);
