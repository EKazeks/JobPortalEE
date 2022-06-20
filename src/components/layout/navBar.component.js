import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { AppBar, Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import JobseekerNavBarContainer from '../../containers/layout/jobseeker.navBar.container';
import CompanyNavBarContainer from '../../containers/layout/company.navBar.container';
import AdminNavBarComponent from './admin.navBar.component';
import { resetSearchCriteriaForm } from '../../actions';
import store from '../../store';
import Language from './lang.component';
import { EmployerPage, Homepage } from '../../constants/wordpressRoutes';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },

  paper: {
    boxShadow: 'none',
  },
  header: {
    minHeight: 100,
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
  },

  brandLogo: {
    padding: 16,
    width: 200,
  },
});

const brandLogo = 'https://vptapiprodstorage.blob.core.windows.net/jobportaldocs/job_portal_logo_white-200-px.png';

const NavBarComponent = ({ classes, isUserLoggedIn, userType, adminRole }) => {
  return (
    <div className={classes.root}>
      {isUserLoggedIn && userType === 'company' && <CompanyNavBarContainer />}

      {/* Applicant's navbar view */}
      {isUserLoggedIn && userType === 'applicant' && <JobseekerNavBarContainer />}
      {isUserLoggedIn && adminRole === 1 && userType === 'admin' && <AdminNavBarComponent />}
      {/* For users who are not logged in */}
      {!isUserLoggedIn && <NavBar classes={classes} />}
    </div>
  );
};

const NavBar = ({ classes }) => {
  const { t } = useTranslation('navbar', 'footer');
  const { lang } = store.getState().language;

  return (
    <AppBar position="static" className={classes.paper}>
      <div className={classes.header}>
        <Navbar variant="dark" expand="sm">
          <a
            href={Homepage(lang)}
            //target="_blank"
            rel="noopener noreferrer"
            className="navbar-brand"
          >
            <img src={brandLogo} alt="job-portal-logo" className={classes.brandLogo} />
          </a>
          <Navbar.Toggle aria-controls="primary-navbar-nav" />
          <Navbar.Collapse id="primary-navbar-nav" className="ml-auto">
            <Nav className="ml-auto">
              <Typography variant="h6">
                <a href={EmployerPage(lang)} className="nav-link">
                  {t('footer:employers')}
                </a>
              </Typography>
              <Typography variant="h6">
                <NavLink
                  to="/tyopaikat"
                  className="nav-link"
                  onClick={() => {
                    store.dispatch(resetSearchCriteriaForm());
                  }}
                >
                  {t('vacancies')}
                </NavLink>
              </Typography>
              <Typography variant="h6">
                <NavLink to="/login" className="nav-link">
                  {t('login')}
                </NavLink>
              </Typography>
              <div className="nav-link">
                <Language />
              </div>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </AppBar>
  );
};

export default withStyles(styles)(NavBarComponent);
