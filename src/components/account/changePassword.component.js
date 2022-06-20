import React from 'react';
import classNames from 'classnames';
import { Button, Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core';
import { Field } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { renderTextField } from '../../utils/wrappers';

const styles = theme => ({
  title: {
    color: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    textAlign: 'center',
  },
  submitBtn: {
    margin: theme.spacing(3, 0, 2),
  },
  expandable: {
    '&:hover:not(.Mui-disabled)': {
      backgroundColor: theme.palette.custom.white,
    },
  },
});

const _onFormSubmit = () => {
  return false;
};

const ChangePasswordComponent = ({ classes, handleSubmit, valid, changePassword }) => {
  const { t } = useTranslation('changePassword');
  return (
    <div style={{ paddingBottom: 150 }}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header" className={classes.expandable}>
          <h3 className={classes.title}>{t('title')}</h3>
        </AccordionSummary>
        <AccordionDetails>
          <form className={classes.form} onSubmit={handleSubmit(_onFormSubmit)}>
            <Field
              component={renderTextField}
              variant="outlined"
              name="current_password"
              margin="normal"
              fullWidth
              id="current_password"
              label={t('current_password')}
              required
              type="password"
              autoComplete="password"
            />

            <Field
              component={renderTextField}
              variant="outlined"
              name="new_password"
              margin="normal"
              fullWidth
              id="new_password"
              label={t('new_password')}
              required
              type="password"
              autoComplete="password"
            />
            <Field
              component={renderTextField}
              variant="outlined"
              name="new_password_confirmation"
              margin="normal"
              fullWidth
              id="new_password_confirmation"
              label={t('new_password_confirmation')}
              required
              type="password"
              autoComplete="password"
            />

            <Button
              type="submit"
              variant="outlined"
              color="primary"
              className={classNames(classes.submitBtn, 'fullWidthBtn')}
              onClick={valid ? changePassword : null}
            >
              {t('common:sendBtn')}
            </Button>
          </form>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default withStyles(styles)(ChangePasswordComponent);
