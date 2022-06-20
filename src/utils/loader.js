import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';

const styles = theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  loader: {
    color: theme.palette.secondary,
  },
});

const Loader = ({ classes, showSpinner }) => {
  return (
    <div>
      <Backdrop className={classes.backdrop} open={showSpinner || false}>
        <CircularProgress className={classes.loader} />
      </Backdrop>
    </div>
  );
};

export default withStyles(styles)(Loader);
