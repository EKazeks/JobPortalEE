import React from 'react';
import { Field } from 'redux-form';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Button, Grid, IconButton } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { renderDenseTextField } from './wrappers';

export const RenderAdditionalUsers = ({ fields, meta: { error, submitFailed }, clientUserEmail }) => {
  const { t } = useTranslation('profile');
  return (
    <ul
      style={{
        listStyle: 'none',
        paddingLeft: 0,
        marginTop: 15,
        display: 'grid',
      }}
    >
      {fields.map((user, index) => (
        <li key={index} style={{ marginBottom: 15 }}>
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <h4 style={{ marginTop: 10 }}>
                {t('users')} #{index + 1}
              </h4>
            </Grid>
            <Grid item>
              <IconButton
                aria-label="Remove user"
                onClick={() => fields.remove(index)}
                disabled={fields.get(index).email === clientUserEmail} // condition resutls true
                style={{
                  color: fields.get(index).email === clientUserEmail ? 'grey' : 'red',
                  marginLeft: 10,
                }}
              >
                <DeleteForeverIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Grid container alignItems="center">
            <Grid item xs={12}>
              <Field
                name={`${user}.firstname`}
                type="text"
                component={renderDenseTextField}
                label={t('firstName')}
                disabled={fields.get(index).disable === 'true'}
              />
              <Field
                name={`${user}.lastname`}
                type="text"
                component={renderDenseTextField}
                label={t('lastName')}
                disabled={fields.get(index).disable === 'true'}
              />
              <Field name={`${user}.email`} type="text" component={renderDenseTextField} label={t('email')} disabled={fields.get(index).disable === 'true'} />
            </Grid>
            <Grid item sm={1} />
          </Grid>
        </li>
      ))}
      <li>
        <Button variant="outlined" color="primary" type="button" onClick={() => fields.push({})}>
          {t('additionalUsers')}
        </Button>
        {submitFailed && error && <span>{error}</span>}
      </li>
    </ul>
  );
};
