import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import store from '../../store';
import { changeAdvertPage, logout } from '../../actions';
import Language from './lang.component';
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
    transition: 'all 0.2s',
    '&:hover': {
      textDecoration: 'none',
      transform: 'scale(1.1)',
      color: theme.palette.primary.main,
    },
    [theme.breakpoints.down('xs')]: {
      borderBottom: '1px solid',
      padding: 10,
      display: 'block',
      textAlign: 'left',
      margin: 'auto auto',
    },
  },
  activeNav: {
    color: theme.palette.primary.main,
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

  logoutBtn: {
    fontSize: 20,
    marginLeft: 10,
  },
});

const brandLogo = 'https://vptapiprodstorage.blob.core.windows.net/jobportaldocs/job_portal_logo_white-200-px.png';

const AdminNavBarComponent = ({ classes }) => {
  const { t } = useTranslation('navbar', 'common');
  const { lang } = store.getState().language;
  return (
    <div className={classes.root}>
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
                  <NavLink to="/login" className="nav-link" onClick={() => store.dispatch(logout())}>
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
            {t('admin')}
          </Typography>
        </div>

        <div>
          <Toolbar className={classes.secondaryMenuContainer}>
            <NavLink to="/yritysasiakkaat" className={classes.secondaryMenu} activeClassName={classes.activeNav}>
              {t('company')}
            </NavLink>

            <NavLink to="/tyonhakijat" className={classes.secondaryMenu} activeClassName={classes.activeNav}>
              {t('applicants')}
            </NavLink>

            {/* <NavLink
                to='/laskut'
                className={classes.secondaryMenu}
                activeClassName={classes.activeNav}
              >
                {t('invoice')}
              </NavLink> */}

            <NavLink
              to="/tyopaikat"
              className={classes.secondaryMenu}
              activeClassName={classes.activeNav}
              onClick={() => store.dispatch(changeAdvertPage({ selected: 0 }))}
            >
              {t('advertisements')}
            </NavLink>

            <NavLink to="/markkinoinnit" className={classes.secondaryMenu} activeClassName={classes.activeNav}>
              {t('marketing')}
            </NavLink>

            <NavLink to="/lisapalvelu" className={classes.secondaryMenu} activeClassName={classes.activeNav}>
              {t('serviceRequest')}
            </NavLink>
          </Toolbar>
        </div>
      </AppBar>
    </div>
  );
};

export default withStyles(styles)(AdminNavBarComponent);
