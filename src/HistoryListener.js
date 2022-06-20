import { useEffect } from 'react';
import { connect } from 'react-redux';
import { closeSnackbar, displayPaymentStatusMessage, hideSpinner, addExtraService } from './actions';
import browserHistory from './history';

const HistoryListener = ({
  children,
  // MDTP
  closeSnackbar,
  displayPaymentStatusMessage,
  hideSpinner,
  showSuccessSnackbar,
  showFailedSnackbar,
  extraService,
  addExtraService,
}) => {
  // locations listener
  useEffect(() => {
    // Incase users route to another components before any snackbar is closed leaving the state of showSuccessSnackbar as true
    return browserHistory.listen(location => {
      const isSnackBarOpen = showSuccessSnackbar || showFailedSnackbar;
      if (isSnackBarOpen) {
        closeSnackbar();
      }
      if (extraService?.help) {
        addExtraService('help');
      } else if (extraService?.sos) {
        addExtraService('sos');
      }
      displayPaymentStatusMessage('');
      hideSpinner(); //To ensure the spinner is always off in advertform
    });
  });

  return children;
};

const mapStateToProps = state => {
  return {
    showSuccessSnackbar: state.asyncActions.showSuccessSnackbar,
    showFailedSnackbar: state.asyncActions.showFailedSnackbar,
    extraService: state.advertisement.extraService,
  };
};

const mapDispatchToProps = {
  closeSnackbar,
  displayPaymentStatusMessage,
  hideSpinner,
  addExtraService,
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryListener);
