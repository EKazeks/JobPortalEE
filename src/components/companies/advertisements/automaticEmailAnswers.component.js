import React from 'react';
import { Grid } from '@material-ui/core';
import { Field } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { renderSwitchLabels as RenderSwitchLabels, renderTextField } from '../../../utils/wrappers';
import { MultiselectAutoEmailLanguages } from '../../../utils/multiSelectCustomField';
import TextEditor from '../../../utils/textEditor';

const styles = theme => ({
  switchBtn: {
    marginTop: 30,
    paddingLeft: 15,
  },
  switch_base: {
    '&.Mui-checked': {
      transform: 'translateX(30px)',
    },
  },
  homePageMultiSelectInitial: {
    '& .rw-widget-input': {
      boxShadow: 'none',
    },
  },
  emailMultiSelectLanguage: {
    '& .rw-multiselect-taglist': {
      width: '100%',
    },
    '& .rw-multiselect-tag': {
      width: 'auto',
    },
    '& .rw-multiselect .rw-input-reset': {
      height: 0,
      width: 0,
      padding: 0,
    },
  },
});

const AutomaticEmailAnswers = ({ automaticEmailToggleBtn, classes, autoEmailToApplicant, formValues, language, populateEmailMessage }) => {
  const { t } = useTranslation('advertForm');
  return (
    <>
      <div className={classes.switchBtn}>
        <RenderSwitchLabels
          label={t('toggleBtnTitle')}
          isNotificationOn={automaticEmailToggleBtn}
          toggleChecked={autoEmailToApplicant}
          switchBaseStyle={classes.switch_base}
        />
      </div>
      <Grid container>
        {automaticEmailToggleBtn && (
          <Grid item xs={12}>
            <div style={{ marginBottom: 20 }}>
              <p style={{ color: '#6c757d' }}>{t('emailSubject')}:</p>
              <Field component={renderTextField} label={t('emailSubject')} name="email_subject" id="email_subject" />
            </div>
            <p style={{ color: '#6c757d' }}>{t('emailMessage')}:</p>
            <div
              className={
                formValues && formValues.email_language && formValues.email_language.length > 0
                  ? classes.emailMultiSelectLanguage
                  : classes.homePageMultiSelectInitial
              }
            >
              <MultiselectAutoEmailLanguages populateEmailMessage={populateEmailMessage} />
            </div>
            <Field
              component={TextEditor}
              fullWidth
              name="email_message"
              placeholder={t('Email message here')}
              id="email_message"
              value={'emailMessage'}
            ></Field>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default withStyles(styles)(AutomaticEmailAnswers);
