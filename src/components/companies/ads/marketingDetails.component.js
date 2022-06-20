import React from 'react';
import { Field, change } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Button, Grid, Radio } from '@material-ui/core';
import { renderDenseTextField, renderRadioButton } from '../../../utils/wrappers';
import { useTranslation } from 'react-i18next';
import store from '../../../store';

const styles = theme => ({
  container: {
    border: `2px solid ${theme.palette.custom.dialogBorder}`,
    padding: '30px 20px',
    margin: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 600,
    color: theme.palette.primary.main,
    marginBottom: '.2rem',
  },
  horizontal: {
    margin: 0,
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
  additionalBudget: {
    marginTop: 50,
  },
  ctaBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaSaveBtn: {
    marginTop: 30,
    textAlign: 'center',
  },
  ctaCancelBtn: {
    marginTop: 30,
    textAlign: 'center',
    marginRight: 20,
  },
  infoNote: {
    marginTop: 12,
  },
});

const MarketingDetailsComponent = ({ classes, saveMarketingDetails, initialFormValues, isToDisable, pristine, isSaved, closeDialog }) => {
  const { t } = useTranslation('campaigns');
  return (
    <div className={classes.container}>
      <form>
        <div>
          <p className={classes.title}>{t('platformTitle')}</p>
          <hr className={classes.horizontal} />
          <Field component={renderRadioButton} name="marketing_platform" variant="outlined">
            <label className={classes.label}>
              <Radio value="facebook/instagram" disabled={isSaved} />
              {t('facebook')}
            </label>
            <label className={classes.label}>
              <Radio value="linkedin" disabled={isSaved} />
              {t('linkedin')}
            </label>
            <label className={classes.label}>
              <Radio value="any" disabled={isSaved} />
              {t('any')}
            </label>
          </Field>
        </div>
        <div className={classes.additionalBudget}>
          <p className={classes.title}>{t('budgetTitle')}</p>
          <hr className={classes.horizontal} />
          <p className={classes.infoNote}>{t('info')}</p>
          <Field component={renderRadioButton} name="more_budget" variant="outlined">
            <label className={classes.label}>
              <Radio value="yes" />
              {t('yes')}
            </label>

            <label className={classes.label}>
              <Radio value="no" onChange={() => store.dispatch(change('marketingDetails', 'marketing_budget', ''))} />
              {t('no')}
            </label>
          </Field>
          <Grid container spacing={1} alignItems="center">
            <Grid item sm={6} xs={12}>
              <label className={classes.label} htmlFor="marketing_budget" style={{ paddingLeft: 9 }}>
                {t('amountTitle')}
              </label>
            </Grid>
            <Grid item sm={5} xs={8}>
              <Field
                component={renderDenseTextField}
                name="marketing_budget"
                id="marketing_budget"
                maxLength={5}
                endAdornment={<InputAdornment position="end">€</InputAdornment>}
                disabled={isToDisable === 'no'}
              />
            </Grid>
          </Grid>

          <div className={classes.ctaBtn}>
            <Button type="button" variant="outlined" color="primary" className={classes.ctaCancelBtn} onClick={closeDialog}>
              {t('common:cancelBtn')}
            </Button>

            <Button type="button" variant="contained" color="primary" className={classes.ctaSaveBtn} disabled={pristine} onClick={saveMarketingDetails}>
              {t('common:saveBtn')}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default withStyles(styles)(MarketingDetailsComponent);
