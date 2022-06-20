import React from 'react';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const styles = {
  renderSmallImagePlaceholder: {
    background: 'url(https://vptapiprodstorage.blob.core.windows.net/jobportaldocs/upload_smallimg_placeholder.svg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: '0%',
  },
  renderBigImagePlaceholder: {
    background: 'url(https://vptapiprodstorage.blob.core.windows.net/jobportaldocs/upload_bigimg_placeholder.svg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: '0%',
    /* border: '1.8px dashed #E9E9E9',
    borderRadius: 4, */
  },
  unsetRenderPlaceholder: {
    background: 'unset',
  },
  placeholderPreview: {
    height: 180,
  },
  showImage: {
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: '50%',
    height: 180,
  },
  uploadbtn: {
    borderRadius: 4,
    width: 'max-content',
  },
};

const Placeholder = ({ classes, imagefile, error, touched, btnText, isLogo, isImage }) => {
  return (
    <div
      className={
        imagefile === undefined || imagefile === ''
          ? isImage
            ? classes.renderBigImagePlaceholder
            : classes.renderSmallImagePlaceholder
          : classes.unsetRenderPlaceholder
      }
    >
      <div
        className={imagefile !== undefined ? classes.showImage : classes.placeholderPreview}
        style={{
          backgroundImage: imagefile !== undefined ? `url(${imagefile})` : 'none',
        }}
      />
      <div>
        <Button variant="contained" color="secondary" className={classes.uploadbtn}>
          <CloudUploadIcon fontSize="small" style={{ marginRight: 5 }} />
          {btnText}
        </Button>
      </div>
    </div>
  );
};

export default withStyles(styles)(Placeholder);
