import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { closeDialog } from '../actions';
import store from '../store';

import AddNewCompanyProfileContainer from '../containers/companies/addNewCompanyProfile.container';
import MarketingDetailsContainer from '../containers/companies/ads/marketingDetails.container';
import PaymentInfoContainer from '../containers/companies/advertisements/paymentInfo.container';

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  dialogBoxContent: {
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: 20,
  },
  registerBtn: {
    textAlign: 'center',
    marginRight: 20,
  },
  dialogTitle: {
    textAlign: 'center',
    fontSize: 20,
  },
  suggestionText: {
    fontSize: 14,
  },
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

function CustomizedDialogs({
  showDialog,
  dialogText,
  loginModal,
  applicationModal,
  warnToDeleteModal,
  isToAddNewProfile,
  campaignModal,
  paymentModal,
  paymentAction,
  handleClick,
  isLoggedIn,
  addNewCompanyEnd, // To close the company profile dialog
  warnToDeleteApplicationModal,
  classes,
}) {
  // Passing showDialog as a prop from redux state and assigning its value to open
  let open = showDialog;
  const handleClose = () => {
    if (isToAddNewProfile) {
      addNewCompanyEnd();
    } else {
      open = false;
      // Dispatching closeDialog action to change the value of showDialog to false
      store.dispatch(closeDialog());
    }
  };
  const { t } = useTranslation('navbar', 'common', 'jobs', 'register');
  return (
    <div>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose} />
        <DialogContent>
          <div className={classes.dialogBoxContent}>{applicationModal && <CheckCircleOutlineIcon fontSize="large" />}</div>
          {warnToDeleteModal ? (
            <Typography variant="h5" gutterBottom>
              <strong>{dialogText}</strong>
            </Typography>
          ) : (
            <p className={classes.dialogTitle}>{dialogText}</p>
          )}
          {applicationModal && !isLoggedIn && (
            <>
              <p className={classes.suggestionText}>{t('register:suggestToRegister')}</p>
              <div style={{ textAlign: 'center' }}>
                <Link to="/register" className="btnLink">
                  <Button
                    variant="outlined"
                    color="primary"
                    className={classes.registerBtn}
                    onClick={() => {
                      handleClose();
                    }}
                  >
                    {t('register:registerNow')}x
                  </Button>
                </Link>
                <Link to="/login" className="btnLink">
                  <Button variant="outlined" color="primary" onClick={handleClose}>
                    {t('login')}
                  </Button>
                </Link>
              </div>
            </>
          )}
          {loginModal && (
            <div style={{ textAlign: 'center' }}>
              <Link to="/register" className="btnLink">
                <Button variant="outlined" color="primary" className={classes.registerBtn} onClick={handleClose}>
                  {t('register')}
                </Button>
              </Link>
              <Link to="/login" className="btnLink">
                <Button variant="outlined" color="primary" onClick={handleClose}>
                  {t('login')}
                </Button>
              </Link>
            </div>
          )}
          {/* The following dialog to show when companies delete job post */}
          {warnToDeleteModal && (
            <div>
              <ul>
                <h6>{t('jobs:warnDialogTitle')}</h6>
                <li> {t('jobs:warnDialogText1')}</li>
                <li> {t('jobs:warnDialogText2')}</li>
                <li> {t('jobs:warnDialogText3')}</li>
                <li> {t('jobs:warnDialogText4')}</li>
              </ul>
              <div style={{ textAlign: 'center' }}>
                <Button variant="outlined" color="primary" onClick={handleClick}>
                  {t('common:deleteBtn')}
                </Button>
              </div>
            </div>
          )}
          {warnToDeleteApplicationModal && (
            <div>
              <ul>
                <h6>{t('jobs:warnDialogTitle')}</h6>
                <li>{t('jobs:warnDialogText5')}</li>
                <li>{t('jobs:warnDialogText6')}</li>
              </ul>
              <div style={{ textAlign: 'center' }}>
                <Button variant="outlined" color="primary" onClick={handleClick}>
                  {t('common:deleteBtn')}
                </Button>
              </div>
            </div>
          )}
          {isToAddNewProfile && <AddNewCompanyProfileContainer />}
          {campaignModal && <MarketingDetailsContainer />}
          {paymentModal && <PaymentInfoContainer paymentAction={paymentAction} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default withStyles(styles)(CustomizedDialogs);
