import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography, Container, Box, Link } from '@material-ui/core';
// import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import store from '../../store';
import { CampaignsPage, EmployerPage, Homepage, PrivacyTermPage } from '../../constants/wordpressRoutes';

const styles = theme => ({
  footer: {
    minHeight: 360,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.custom.white,
    [theme.breakpoints.up('md')]: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
    },
  },

  brandLogo: {
    paddingTop: 74,
    paddingBottom: 16,
    width: 200,
    [theme.breakpoints.only('sm')]: {
      paddingTop: 30,
    },
  },

  partnersLogo: {
    width: '42%',
    paddingTop: 8,
  },

  footerTitle: {
    paddingTop: 66,
    paddingBottom: 16,
    fontSize: 24,
    [theme.breakpoints.down('sm')]: {
      paddingTop: 10,
      paddingBottom: 2,
    },
  },

  footerLinks: {
    color: theme.palette.custom.white,
    '&:hover': {
      color: '#D0D0D0',
    },
  },
  info: {
    lineHeight: 1.8,
  },
});

const brandLogo = 'https://vptapiprodstorage.blob.core.windows.net/jobportaldocs/job_portal_logo_white-200-px.png';
const luotettavaLogo = require('../../images/luotettava-kumppani.jpg');
// const cManagementLogo = require('../../images/nordic-c-management-logo.png');
// const kassavirtanenLogo = require('../../images/kassavirtanen-logo.png');
// const mediaSparkLogo = require('../../images/mediaspark-logo.png');
// const resoniaLogo = require('../../images/resonia-logo.png');
// const talousvirtaLogo = require('../../images/talousvirta-logo.png');

const FooterComponent = ({ classes, isUserAuthenticated }) => {
  const { t } = useTranslation('footer');
  const { lang } = store.getState().language;
  return (
    <footer>
      <Box className={classes.footer}>
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography>
                <a href={Homepage(lang)} target="_blank" rel="noopener noreferrer">
                  <img src={brandLogo} alt="job-portal-logo" className={classes.brandLogo} />
                </a>
              </Typography>
              <Typography className={classes.info}>{t('address')}</Typography>
              <Typography className={classes.info}>
                {t('postCode')} {t('location')}
              </Typography>
              <Typography className={classes.info}>
                <a href={Homepage(lang)} target="_blank" rel="noopener noreferrer" className={classes.footerLinks}>
                  www.jobportal.fi
                </a>
              </Typography>
              <Typography className={classes.info}>
                {t('businessId')}: {t('businessIdNumber')}
              </Typography>
              {/* <div>
                <Typography className={classes.footerTitle}>
                  {t('customerService')}
                </Typography>
                <Typography>
                  <a
                    href="mailto:asiakaspalvelu@jobportal.fi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classes.footerLinks}
                  >
                    {t('customerServiceEmail')}
                  </a>
                </Typography>
                <Typography>
                  {t('tel')} {t('phone')}
                </Typography>
              </div> */}
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography className={classes.footerTitle}>{t('employer')}</Typography>
              {/* <Typography>
                <a
                  href={Homepage(lang)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classes.footerLinks}
                >
                  {t('frontPage')}
                </a>
              </Typography> */}
              <Typography className={classes.info}>
                <a href={EmployerPage(lang)} target="_blank" rel="noopener noreferrer" className={classes.footerLinks}>
                  {t('jobAdvertisement')}
                </a>
              </Typography>
              <Typography className={classes.info}>
                <a href={CampaignsPage(lang)} target="_blank" rel="noopener noreferrer" className={classes.footerLinks}>
                  {t('campaignDetials')}
                </a>
              </Typography>
              <Typography>
                <a href="https://www.vastuugroup.fi/" target="_blank" rel="noopener noreferrer">
                  <img src={luotettavaLogo} alt="luotettava-kumppani-logo" className={classes.partnersLogo} style={{ paddingTop: 12 }} />
                </a>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography className={classes.footerTitle}>{t('employee')}</Typography>
              <Typography>
                <Link href="/tyopaikat" className={classes.footerLinks}>
                  {t('navbar:vacancies')}
                </Link>
              </Typography>
              {/* <Typography>
                <a
                  href={PrivacyTermPage(lang)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classes.footerLinks}
                >
                  {t('jobseekersPrivacy')}
                </a>
              </Typography> */}

              {/* <Typography className={classes.footerTitle}>
                {t('employer')}
              </Typography>
              <Typography>
                <a
                  href={PrivacyTermPage(lang)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classes.footerLinks}
                >
                  {t('employersPrivacy')}
                </a>
              </Typography>
              <Typography>
                <a
                  href={Homepage(lang)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classes.footerLinks}
                >
                  {t('contactInfo')}
                </a>
              </Typography> */}
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography className={classes.footerTitle}>{t('customerService')}</Typography>
              <Typography className={classes.info}>
                <a href="mailto:asiakaspalvelu@jobportal.fi" target="_blank" rel="noopener noreferrer" className={classes.footerLinks}>
                  {t('customerServiceEmail')}
                </a>
              </Typography>
              <Typography className={classes.info}>
                {t('tel')} {t('phone')}
              </Typography>
              <Typography style={{ marginTop: 20 }}>
                <a href={PrivacyTermPage(lang)} target="_blank" rel="noopener noreferrer" className={classes.footerLinks}>
                  {t('privacy')}
                </a>
              </Typography>
            </Grid>
            {/* <Grid item xs={12} sm={3}>
              <Typography className={classes.footerTitle}>
                {t('partnership')}
              </Typography>
              <Typography>
                <a
                  href="https://www.c-management.fi/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={cManagementLogo}
                    alt="nordic-c-management-logo"
                    className={classes.partnersLogo}
                  />
                </a>
              </Typography>
              <Typography>
                <a
                  href="https://www.kassavirtanen.fi/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={kassavirtanenLogo}
                    alt="kassavirtanen-logo"
                    className={classes.partnersLogo}
                  />
                </a>
              </Typography>
              <Typography>
                <a
                  href="https://www.mediaspark.fi/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={mediaSparkLogo}
                    alt="mediaspark-logo"
                    className={classes.partnersLogo}
                  />
                </a>
              </Typography>
              <Typography>
                <a
                  href="https://www.talousvirta.fi/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={talousvirtaLogo}
                    alt="talousvirta-logo"
                    className={classes.partnersLogo}
                  />
                </a>
              </Typography>
              <Typography>
                <a
                  href="https://www.resonia.fi/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={resoniaLogo}
                    alt="resonia-logo"
                    className={classes.partnersLogo}
                  />
                </a>
              </Typography>
            </Grid> */}
          </Grid>
        </Container>
      </Box>
    </footer>
  );
};

export default withStyles(styles)(FooterComponent);
