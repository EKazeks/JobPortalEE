import React from 'react';
import { Field, reset } from 'redux-form';
import Button from '@material-ui/core/Button';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { withStyles } from '@material-ui/core/styles';
import { Radio, Grid, Container } from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { useTranslation } from 'react-i18next';
import {
  // AdminCampaigns,
  AdminStatus,
  MarketingPlatform,
  AdminAdditionalServiceStatus,
  AdminAdditionalServiceRequest,
} from '../../utils/customSelectField';
import { renderDenseTextField, renderCheckbox, renderAdminDatePicker, renderRadioButton } from '../../utils/wrappers';
import store from '../../store';

const AdminSearchFormComponent = ({ search, handleSubmit, searchBtnAction, classes }) => {
  return (
    <Container maxWidth="xl">
      {search === 'invoice' && (
        <div>
          <InvoiceSearch handleSubmit={handleSubmit} classes={classes} searchBtn={searchBtnAction} />
        </div>
      )}
      {search === 'marketing' && (
        <div>
          <MarketingSearch handleSubmit={handleSubmit} classes={classes} searchBtn={searchBtnAction} />
        </div>
      )}
      {search === 'applicants' && (
        <div>
          <ApplicantSearch handleSubmit={handleSubmit} classes={classes} searchBtn={searchBtnAction} />
        </div>
      )}
      {search === 'company' && (
        <div>
          <CompanySearch searchBtn={searchBtnAction} handleSubmit={handleSubmit} classes={classes} />
        </div>
      )}
      {search === 'additionalService' && (
        <div>
          <AdditionalServiceSearch searchBtn={searchBtnAction} handleSubmit={handleSubmit} classes={classes} />
        </div>
      )}
    </Container>
  );
};

const _onFormSubmit = () => {
  return false;
};

const styles = theme => ({
  searchField: {
    backgroundColor: 'white',
    margin: 10,
    width: 200,
  },
  searchBtn: {
    margin: '10px 0px',
    borderRadius: 0,
    textTransform: 'uppercase',
  },
  form: {
    padding: '50px 0px',
  },

  moreMoneyCheckIcon: {
    [theme.breakpoints.down('lg')]: {
      marginLeft: 20,
    },
    [theme.breakpoints.up('xl')]: {
      marginLeft: 10,
    },
  },

  mktStatus: {
    marginLeft: 30,
  },
});

const InvoiceSearch = ({ classes, searchBtn, handleSubmit }) => {
  const { t } = useTranslation('adminInvoice');
  return (
    <div>
      <form className={classes.form} onSubmit={handleSubmit(_onFormSubmit)}>
        <Grid container>
          <Grid item>
            <Field component={renderDenseTextField} variant="outlined" name="email" placeholder={t('common:email')} className={classes.searchField} />
          </Grid>
          <Grid item>
            <Field
              component={renderDenseTextField}
              variant="outlined"
              name="company_name"
              placeholder={t('common:companyName')}
              className={classes.searchField}
            />
          </Grid>
          <Grid item>
            <Field component={renderDenseTextField} variant="outlined" name="invoice_id" placeholder={t('invoiceNum')} className={classes.searchField} />
          </Grid>
          <Grid item>
            <Field component={renderDenseTextField} variant="outlined" name="invoice_reference" placeholder={t('invoiceRef')} className={classes.searchField} />
          </Grid>
          <Grid item>
            <div style={{ margin: 10 }}>
              <Field component={renderCheckbox} variant="outlined" name="overdue_inv" label={t('overDueInv')} />
            </div>
          </Grid>
          <Grid>
            <Button type="submit" variant="contained" color="primary" className={classes.searchBtn} onClick={searchBtn}>
              {t('common:searchBtn')}
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

const ApplicantSearch = ({ classes, searchBtn, handleSubmit }) => {
  const { t } = useTranslation('common');
  return (
    <div>
      <form className={classes.form} onSubmit={handleSubmit(_onFormSubmit)}>
        <Grid container>
          <Grid item md={11} lg={11} xl={11}>
            <Grid container alignItems="center">
              <Grid item>{t('applicants')}: </Grid>
              <Grid item>
                <Field component={renderDenseTextField} variant="outlined" name="firstName" placeholder={t('firstName')} className={classes.searchField} />
              </Grid>
              <Grid item>
                <Field component={renderDenseTextField} variant="outlined" name="lastName" placeholder={t('lastName')} className={classes.searchField} />
              </Grid>
              <Grid item>
                <Field component={renderDenseTextField} variant="outlined" name="email" placeholder={t('email')} className={classes.searchField} />
              </Grid>
              <Grid item>
                <Field component={renderDenseTextField} variant="outlined" name="contact_number" placeholder={t('phone')} className={classes.searchField} />
              </Grid>
            </Grid>
          </Grid>

          <Grid item md={1} lg={1} xl={1}>
            <Grid container>
              <Grid item>
                <Button type="submit" variant="contained" color="primary" className={classes.searchBtn} onClick={searchBtn}>
                  {t('searchBtn')}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
const CompanySearch = ({ classes, searchBtn, handleSubmit }) => {
  const { t } = useTranslation('common');

  return (
    <div>
      <form className={classes.form} onSubmit={handleSubmit(_onFormSubmit)}>
        <Grid container>
          <Grid item md={11} lg={11} xl={11}>
            <Grid container alignItems="center">
              <Grid item>
                <Field component={renderDenseTextField} variant="outlined" name="companyName" placeholder={t('companyName')} className={classes.searchField} />
              </Grid>
              <Grid item>
                <Field component={renderDenseTextField} variant="outlined" name="firstName" placeholder={t('firstName')} className={classes.searchField} />
              </Grid>
              <Grid item>
                <Field component={renderDenseTextField} variant="outlined" name="lastName" placeholder={t('lastName')} className={classes.searchField} />
              </Grid>
              <Grid item>
                <Field component={renderDenseTextField} variant="outlined" name="email" placeholder={t('email')} className={classes.searchField} />
              </Grid>
              <Grid item>
                <Field component={renderDenseTextField} variant="outlined" name="business_id" placeholder={t('businessId')} className={classes.searchField} />
              </Grid>
            </Grid>
          </Grid>

          <Grid item md={1} lg={1} xl={1}>
            <Grid container>
              <Grid item>
                <Button type="submit" variant="contained" color="primary" className={classes.searchBtn} onClick={searchBtn}>
                  {t('searchBtn')}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

const MarketingSearch = ({ classes, handleSubmit, searchBtn }) => {
  const { t } = useTranslation('adminMarketing', 'common');

  return (
    <div>
      <form className={classes.form} onSubmit={handleSubmit(_onFormSubmit)}>
        <Grid container>
          <Grid item md={11} lg={11} xl={11}>
            <Grid container alignItems="center">
              <Grid item>
                <Field
                  component={renderDenseTextField}
                  variant="outlined"
                  name="company_name"
                  placeholder={t('common:companyName')}
                  className={classes.searchField}
                />
              </Grid>
              <Grid item>
                <Field component={renderDenseTextField} variant="outlined" name="job_title" placeholder={t('jobTitle')} className={classes.searchField} />
              </Grid>
              {/* <Grid item>
                  <AdminCampaigns viewBy="admin" />
                </Grid> */}
              <Grid item>
                <AdminStatus viewBy="admin" />
              </Grid>
              <Grid item>
                <MarketingPlatform viewBy="admin" />
              </Grid>
              <Grid item>
                <Field component={renderAdminDatePicker} variant="outlined" name="startdate" label={t('published')} />
              </Grid>
              <Grid item>
                <Field component={renderAdminDatePicker} variant="outlined" name="enddate" label={t('expired')} />
              </Grid>
              <Grid item className={classes.moreMoneyCheckIcon}>
                <Field component={renderCheckbox} variant="outlined" name="more_budget" label={t('campaigns:moreMoney')} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={1} lg={1} xl={1}>
            <Grid container>
              <Grid item>
                <Button type="submit" variant="contained" color="primary" className={classes.searchBtn} onClick={searchBtn}>
                  {t('common:searchBtn')}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container alignItems="center">
          <Grid item>
            <h6 style={{ margin: '-15px 10px' }}>{t('marketed')}</h6>
          </Grid>
          <Grid item>
            <Field component={renderRadioButton} name="marketing_status" variant="outlined" required>
              <div>
                <label className={classes.mktStatus}>
                  <Radio value="2" />
                  <FiberManualRecordIcon style={{ color: 'green' }} />
                </label>
                <label className={classes.mktStatus}>
                  <Radio value="0" />
                  <FiberManualRecordIcon style={{ color: 'red' }} />
                </label>
                <label onClick={() => store.dispatch(reset('adminSearch'))}>
                  <HighlightOffIcon variant="outlined" color="primary" style={{ marginLeft: 36 }} />
                  Clear
                </label>
              </div>
            </Field>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

const AdditionalServiceSearch = ({ classes, handleSubmit, searchBtn }) => {
  const { t } = useTranslation('adminAdditionalService', 'common', 'adminMarketing');

  return (
    <div>
      <form className={classes.form} onSubmit={handleSubmit(_onFormSubmit)}>
        <Grid container>
          <Grid item md={11} lg={11} xl={11}>
            <Grid container>
              <Grid item>
                <Field
                  component={renderDenseTextField}
                  variant="outlined"
                  name="company_name"
                  placeholder={t('common:companyName')}
                  className={classes.searchField}
                />
              </Grid>
              <Grid item>
                <Field
                  component={renderDenseTextField}
                  variant="outlined"
                  name="job_title"
                  placeholder={t('adminMarketing:jobTitle')}
                  className={classes.searchField}
                />
              </Grid>
              <Grid item>
                <Field component={renderAdminDatePicker} variant="outlined" name="startdate" label={t('arrivalDate')} />
              </Grid>
              <Grid item>
                <AdminAdditionalServiceStatus viewBy="admin" />
              </Grid>
              <Grid item>
                <AdminAdditionalServiceRequest viewBy="admin" />
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={1} lg={1} xl={1}>
            <Grid container>
              <Grid item>
                <Button type="submit" variant="contained" color="primary" className={classes.searchBtn} onClick={searchBtn}>
                  {t('common:searchBtn')}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid container alignItems="center">
          <Grid item>
            <h6 style={{ margin: '-15px 10px' }}>{t('reviewStatus')}</h6>
          </Grid>
          <Grid item>
            <Field component={renderRadioButton} name="status" variant="outlined" required>
              <div>
                <label className={classes.mktStatus}>
                  <Radio value="1" />
                  <FiberManualRecordIcon style={{ color: 'green' }} />
                </label>
                <label className={classes.mktStatus}>
                  <Radio value="0" />
                  <FiberManualRecordIcon style={{ color: 'red' }} />
                </label>
                <label className={classes.mktStatus}>
                  <Radio value="3" />
                  <FiberManualRecordIcon style={{ color: 'gray' }} />
                </label>
                <label onClick={() => store.dispatch(reset('adminSearch'))}>
                  <HighlightOffIcon variant="outlined" color="primary" style={{ marginLeft: 36 }} />
                  Clear
                </label>
              </div>
            </Field>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default withStyles(styles)(AdminSearchFormComponent);
