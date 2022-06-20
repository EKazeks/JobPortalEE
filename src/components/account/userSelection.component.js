import React from 'react';
import { makeStyles, Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import companyBgImg from '../../images/companyImgBg.png';
import jobseekerBgImg from '../../images/jobseekerImgBg.png';

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: '3rem',
    fontWeight: 800,
    display: 'flex',
    justifyContent: 'center',
    color: '#fafafa',
    paddingTop: '35vh',
    [theme.breakpoints.up('xl')]: {
      paddingTop: '28vh',
    },
  },
  ctaBtn: {
    marginTop: 15,
    padding: '12px 30px',
    textTransform: 'uppercase',
    color: theme.palette.custom.white,
  },
  jobseekerContainer: {
    justifyContent: 'center',
    textAlign: 'center',
    minHeight: '565px',
    //height: '72vh',
    background: `url(${jobseekerBgImg}) no-repeat`,
    backgroundPosition: '28%',
    backgroundSize: 'cover',
    overflowY: 'hidden',
  },
  companyContainer: {
    justifyContent: 'center',
    textAlign: 'center',
    minHeight: '565px',
    //height: '72vh',
    overflowY: 'hidden',
    background: `url(${companyBgImg}) no-repeat`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  },
}));

const UserSelection = ({ label, userType, selectUserType }) => {
  const classes = useStyles();
  const { t } = useTranslation('register');

  return (
    <div className={userType === 'company' ? `${classes.companyContainer}` : `${classes.jobseekerContainer}`}>
      <h1 className={classes.title}>{t(`${label}`)}</h1>
      <Button variant="contained" color={userType === 'company' ? 'primary' : 'secondary'} className={classes.ctaBtn} onClick={() => selectUserType(userType)}>
        {t('registerBtn')}
      </Button>
    </div>
  );
};

export default UserSelection;
