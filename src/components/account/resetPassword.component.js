import React from 'react';
import { Button, Typography, Snackbar, Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core';
import { Field } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { MySnackbarContentWrapper } from '../../utils/snackbar.utils';
import { renderTextField } from '../../utils/wrappers';

const styles = theme => ({
  expandable: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    margin: `${theme.spacing(5)}px auto`,
  },

  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    textTransform: 'uppercase',
    width: '100%',
  },
});

const _onFormSubmit = () => {
  return false;
};

const ResetPasswordComponent = ({ classes, handleSubmit, valid, resetPassword, showSuccessSnackbar, showFailedSnackbar, closeSnackbar }) => {
  const { t } = useTranslation('login');
  return (
    <div className={classes.expandable}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header" style={{ backgroundColor: '#88C0F7' }}>
          <Typography>{t('forgotPassword')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <form className={classes.form} onSubmit={handleSubmit(_onFormSubmit)}>
            <Field component={renderTextField} variant="outlined" name="email" margin="normal" fullWidth label={t('email')} required autoFocus />

            <Button type="submit" variant="outlined" color="primary" className={classes.submit} onClick={valid ? resetPassword : null}>
              {t('common:sendBtn')}
            </Button>
          </form>
        </AccordionDetails>
      </Accordion>

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={showFailedSnackbar}
        autoHideDuration={3000}
        onClose={() => {
          closeSnackbar();
        }}
      >
        <MySnackbarContentWrapper
          variant="error"
          message={t('login:resetPasswordFailedMsg')}
          onClose={() => {
            closeSnackbar();
          }}
        />
      </Snackbar>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={showSuccessSnackbar}
        autoHideDuration={3000}
        onClose={() => {
          closeSnackbar();
        }}
      >
        <MySnackbarContentWrapper
          variant="success"
          message={t('login:resetPasswordSuccessMsg')}
          onClose={() => {
            closeSnackbar();
          }}
        />
      </Snackbar>
    </div>
  );
};

export default withStyles(styles)(ResetPasswordComponent);
