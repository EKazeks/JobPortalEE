import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import { useTranslation } from 'react-i18next';
import Language from './lang.component';
import store from '../../store';
import { Homepage } from '../../constants/wordpressRoutes';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },

  secondaryMenu: {
    flexGrow: 1,
    color: theme.palette.custom.white,
    textAlign: 'center',
    cursor: 'pointer',
    fontSize: 20,
    fontWeight: 500,
    '&:hover': {
      textDecoration: 'none',
      color: theme.palette.primary.main,
    },
    [theme.breakpoints.down('xs')]: {
      borderBottom: '1px solid white',
      padding: 10,
      display: 'block',
    },
  },

  logoutBtn: {
    fontSize: 20,
    marginLeft: 10,
  },
  activeNav: {
    color: theme.palette.primary.main,
    fontWeight: 700,
  },
  paper: {
    boxShadow: 'none',
  },
  header: {
    minHeight: 100,
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
  },
  heading: {
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: 'bold',
    [theme.breakpoints.up('md')]: {
      marginTop: -30,
    },
  },
  brandLogo: {
    padding: 16,
    width: 200,
  },
});

const brandLogo = 'https://vptapiprodstorage.blob.core.windows.net/jobportaldocs/job_portal_logo_white-200-px.png';

const JobseekerNavBarComponent = ({ classes, isUserLoggedIn, logout }) => {
  const { t } = useTranslation('navbar');
  const { lang } = store.getState().language;
  return (
    <div className={classes.root}>
      {isUserLoggedIn && (
        <AppBar position="static" className={classes.paper}>
          <div className={classes.header}>
            <Navbar variant="dark" expand="sm">
              <a href={Homepage(lang)} target="_blank" rel="noopener noreferrer" className="navbar-brand">
                <img src={brandLogo} alt="job-portal-logo" className={classes.brandLogo} />
              </a>
              <Navbar.Toggle aria-controls="primary-navbar-nav" />
              <Navbar.Collapse id="primary-navbar-nav" className="ml-auto">
                <Nav className="ml-auto">
                  <Typography variant="h6">
                    <NavLink to="/profile" className="nav-link">
                      {t('profile')}
                    </NavLink>
                  </Typography>
                  <Typography variant="h6">
                    <NavLink to="/login" className="nav-link" onClick={logout}>
                      {t('common:logout')}
                      <ExitToAppIcon className={classes.logoutBtn} />
                    </NavLink>
                  </Typography>
                  <div className="nav-link">
                    <Language />
                  </div>
                </Nav>
              </Navbar.Collapse>
            </Navbar>

            <Typography variant="h6" className={classes.heading}>
              {t('jobseekerProfile')}
            </Typography>
          </div>

          <div>
            <Toolbar>
              <NavLink to="/etusivu" className={classes.secondaryMenu} activeClassName={classes.activeNav}>
                {t('frontpage')}
              </NavLink>

              <NavLink to="/suosikit" className={classes.secondaryMenu} activeClassName={classes.activeNav}>
                <FavoriteOutlinedIcon />
              </NavLink>

              <NavLink to="/tyopaikat" className={classes.secondaryMenu} activeClassName={classes.activeNav}>
                {t('vacancies')}
              </NavLink>

              <NavLink to="/toopakkumised" className={classes.secondaryMenu} activeClassName={classes.activeNav}>
                {t('appliedJobs')}
              </NavLink>
            </Toolbar>
          </div>
        </AppBar>
      )}
    </div>
  );
};

export default withStyles(styles)(JobseekerNavBarComponent);
