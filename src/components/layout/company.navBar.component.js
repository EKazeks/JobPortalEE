import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { AppBar, Grid, Toolbar, Typography } from '@material-ui/core';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Language from './lang.component';
import CompanySelectorContainer from '../../containers/companies/companySelector.container';
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
    //cursor: 'pointer',
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
  changeLink: {
    color: 'rgba(255,255,255,.5)',
    '&:hover': {
      color: 'rgba(255,255,255,.75)',
      textDecoration: 'none',
    },
  },
  brandLogo: {
    padding: 16,
    width: 200,
  },
  activeNav: {
    color: theme.palette.primary.main,
    transform: 'scale(1.5)',
    // borderBottom: '5px solid',
    '&:hover': {
      textDecoration: 'none',
      color: theme.palette.primary.main,
    },
  },
  inactiveNav: {
    color: 'white',
    '&:hover': {
      textDecoration: 'none',
      color: theme.palette.primary.main,
    },
  },
  logoutBtn: {
    fontSize: 20,
    marginLeft: 10,
  },
});

const brandLogo = 'https://vptapiprodstorage.blob.core.windows.net/jobportaldocs/job_portal_logo_white-200-px.png';

const CompanyNavBarComponent = ({
  classes,
  selectedMainMenu,
  navigateAdsFromMainMenu,
  postAdvertisement,
  companyId,
  companyName,
  userRole,
  companiesList,
  logout,
}) => {
  const { t } = useTranslation('navbar', 'common');
  const location = useLocation();

  const displayAllNavItems = companyName !== undefined ? true : false; //  1. When users are newly registered, hide secondary nav.

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
                {displayAllNavItems && (
                  <Typography variant="h6">
                    <NavLink to="/omat-tiedot" className="nav-link">
                      {t('profile')}
                    </NavLink>
                  </Typography>
                )}
                {/* Companies can add job post only after id is not 0, i.e. they fill up their profile */}
                {companyId !== 0 && displayAllNavItems && (
                  <Typography variant="h6">
                    <NavLink to="/tyopaikkailmoitus" className="nav-link" onClick={postAdvertisement}>
                      {t('addPost')}
                    </NavLink>
                  </Typography>
                )}
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
          <div className={classes.heading}>
            {userRole === 0 &&
            companiesList.length > 0 && //Only if more than one company
            companyName ? (
              // Show the change option only for super user.
              <>
                <Grid container justifyContent="center" alignItems="center">
                  <Grid item>
                    <Typography variant="h6">{t('companyNavbarTitle')}:</Typography>
                  </Grid>
                  <Grid item>
                    <CompanySelectorContainer
                      activeCompany={{
                        company_name: companyName,
                        id: companyId,
                      }}
                    />
                  </Grid>
                </Grid>
              </>
            ) : (
              <Typography variant="h6">
                {t('companyNavbarTitle')} {companyName && `: ${companyName}`}
              </Typography>
            )}
          </div>
        </div>
        {displayAllNavItems && (
          <div>
            <Toolbar>
              <Typography variant="h6" className={classes.secondaryMenu}>
                <Link
                  to="/omat-ilmoitukseni"
                  onClick={() => navigateAdsFromMainMenu(1)}
                  className={selectedMainMenu === 1 && location.pathname === '/omat-ilmoitukseni' ? classes.activeNav : classes.inactiveNav}
                >
                  {t('active')}
                </Link>
              </Typography>

              <Typography variant="h6" className={classes.secondaryMenu}>
                <Link
                  to="/omat-ilmoitukseni"
                  onClick={() => navigateAdsFromMainMenu(0)}
                  className={selectedMainMenu === 0 && location.pathname === '/omat-ilmoitukseni' ? classes.activeNav : classes.inactiveNav}
                >
                  {t('draft')}
                </Link>
              </Typography>

              <Typography variant="h6" className={classes.secondaryMenu}>
                <Link
                  to="/omat-ilmoitukseni"
                  onClick={() => navigateAdsFromMainMenu(2)}
                  className={selectedMainMenu === 2 && location.pathname === '/omat-ilmoitukseni' ? classes.activeNav : classes.inactiveNav}
                >
                  {t('inactive')}
                </Link>
              </Typography>
            </Toolbar>
          </div>
        )}
      </AppBar>
    </div>
  );
};

export default withStyles(styles)(CompanyNavBarComponent);
