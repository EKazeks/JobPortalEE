import React from 'react';
// import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { reset } from 'redux-form';

const styles = {
  image: {
    maxWidth: 150,
    maxHeight: 150,
    textAlign: 'center',
  },
};

const ImagePreview = ({ imagefile, classes, imageMaxWidth, imageMaxHeight, imageSideText }) => {
  return (
    <Grid container spacing={3} alignItems="center" justifyContent="space-between">
      <Grid item>
        <img
          src={imagefile}
          alt={imagefile[0].name}
          // className={classes.image}
          style={{ maxWidth: imageMaxWidth, maxHeight: imageMaxHeight }}
        />
      </Grid>
      <Grid item>
        <Button variant="outlined" color="secondary">
          {imageSideText}
        </Button>
      </Grid>
    </Grid>
  );
};

/* ImagePreview.propTypes = {
  imagefile: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string))
}; */

export default withStyles(styles)(ImagePreview);
