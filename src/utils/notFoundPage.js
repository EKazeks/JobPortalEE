import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, withStyles, Grid } from '@material-ui/core';

const illustration = require('../images/error-img.png');

const styles = () => ({
  content: {
    margin: '50px 0px',
    textAlign: 'center',
  },
  image: {
    background: `url(${illustration}) no-repeat`,
    height: 200,
    backgroundSize: 'contain',
    backgroundPosition: 'center center',
  },
  body: {
    margin: '50px 0',
  },
});

const NotFoundPage = ({ classes }) => {
  const { t } = useTranslation('notFound');
  return (
    <div className="container">
      <div className={classes.content}>
        <h3> {t('title')}</h3>
        <Grid container alignItems="center" justifyContent="center" spacing={1} className={classes.body}>
          <Grid item xs={12} sm={6} className={classes.image} />
          <Grid item>
            <p> {t('body')}</p>
            <Button variant="contained" color="primary" onClick={() => window.history.back()}>
              {' '}
              {t('goBack')}
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default withStyles(styles)(NotFoundPage);
