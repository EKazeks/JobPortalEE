import React from 'react';
import { jobHours, jobType, renderMultiselect, emailLanguages } from './customSelectField';
import { useTranslation } from 'react-i18next';
import { Field } from 'redux-form';

export const MultiSelectJobCategoriesComponent = ({ jobCategories, margin }) => {
  const { t } = useTranslation('category');
  return (
    <div>
      <Field
        component={renderMultiselect}
        name="job_category"
        id="job_category"
        fullWidth
        margin={margin}
        required
        data={jobCategories.map(category => {
          return {
            id: category.id,
            label: t(`category:${category.id}`),
          };
        })}
        valueField="id"
        textField="label"
      />
    </div>
  );
};

export const MultiSelectJobTypeComponent = () => {
  const { t } = useTranslation('jobtype');
  return (
    <div>
      <Field
        component={renderMultiselect}
        name="job_type"
        id="job_type"
        fullWidth
        margin="dense"
        required
        data={jobType.map(type => {
          return {
            type: type.value,
            label: t(`jobType${type.value}`),
          };
        })}
        valueField="type"
        textField="label"
      />
    </div>
  );
};
export const MultiSelectJobHoursComponent = () => {
  const { t } = useTranslation('jobhours');
  return (
    <div>
      <Field
        component={renderMultiselect}
        name="job_hours"
        id="job_hours"
        fullWidth
        margin="dense"
        required
        data={jobHours.map(hour => {
          return {
            type: hour.value,
            label: t(`jobHours${hour.value}`),
          };
        })}
        valueField="type"
        textField="label"
      />
    </div>
  );
};

export const MultiselectAutoEmailLanguages = ({ populateEmailMessage }) => {
  const { t } = useTranslation('advertForm');
  return (
    <div>
      <p>{t('emailLanguage')}:</p>
      <Field
        component={renderMultiselect}
        name="email_language"
        id="email_language"
        fullWidth
        margin="dense"
        required
        placeholder={t('emailLanguage')}
        data={emailLanguages.map(language => {
          return {
            type: language.value,
            label: t(`${language.value}`),
          };
        })}
        valueField="type"
        textField="label"
        onChange={e => populateEmailMessage(e)}
      />
    </div>
  );
};
