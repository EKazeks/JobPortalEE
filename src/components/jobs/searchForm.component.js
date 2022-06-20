import React from 'react';
import { Field } from 'redux-form';
import { useTranslation } from 'react-i18next';
import { Container, Button, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { renderMultiselect, jobHours, jobType, publishedTimes } from '../../utils/customSelectField';
import { renderDenseTextField, renderSearchSelectField } from '../../utils/wrappers';
import autoCompleteLocation from '../../utils/autoCompleteLocation';

const _onFormSubmit = () => {
  return false;
};

const styles = theme => ({
  searchField: {
    backgroundColor: 'white',
  },
  searchSelectField: {
    transform: 'translate(14px, 14px) scale(1)',
  },
  title: {
    color: 'white',
    textAlign: 'center',
  },
  searchBtn: {
    color: theme.palette.primary.main,
    float: 'right',
    margin: '20px auto',
    width: '100%',
    '&:hover': {
      color: theme.palette.custom.jobListHoverColor,
    },
  },
  multiSelectSearch: {
    '& .rw-widget-container': {
      borderRadius: 0,
      border: 'none',
    },
    '& .rw-widget': {
      margin: '8px 0',
    },
    '& .rw-multiselect .rw-input-reset': {
      width: '100%',
    },
    // '& .rw-multiselect-tag': {
    //   width: '100%'
    // }
    /* '& .rw-list-option .rw-state-focus .rw-list-option .rw-state-focus:hover': {
      border: 'none'
    } */
  },
});
const SearchFormComponent = ({ handleSubmit, jobCategories, filterJobs, classes }) => {
  const { t } = useTranslation('searchForm', 'publishedTimes');

  return (
    <div>
      <h2 className={classes.title}>{t('title')}</h2>
      <Container>
        <form className={classes.multiSelectSearch} onSubmit={handleSubmit(_onFormSubmit)}>
          <Grid>
            <Grid item xs={12}>
              <Field
                component={renderDenseTextField}
                variant="outlined"
                name="search_phrase"
                fullWidth
                id="searchPhrase"
                placeholder={t('searchPhrase')}
                className={classes.searchField}
                style={{ marginBottom: 0 }}
                searchForm
                // autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                component={autoCompleteLocation}
                name="job_location"
                variant="outlined"
                id="jobLocation"
                fullWidth
                placeholder={t('jobLocation')}
                className={classes.searchField}
                margin="dense"
                searchForm
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                name="portal_category_id"
                component={renderMultiselect}
                data={jobCategories.map(category => {
                  return {
                    id: category.id,
                    type: category.type,
                    label: t(`category:${category.id}`),
                  };
                })}
                valueField="type"
                textField="label"
                placeholder={t('chooseCategory')}
                className={classes.searchField}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                name="job_type"
                component={renderMultiselect}
                data={jobType.map(jobType => {
                  return {
                    value: jobType.value,
                    label: t(`jobtype:jobType${jobType.value}`),
                  };
                })}
                valueField="value"
                textField="label"
                placeholder={t('chooseJobType')}
                className={classes.searchField}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                name="job_hours"
                component={renderMultiselect}
                data={jobHours.map(hour => {
                  return {
                    value: hour.value,
                    label: t(`jobhours:jobHours${hour.value}`),
                  };
                })}
                valueField="value"
                textField="label"
                placeholder={t('chooseJobHours')}
                className={classes.searchField}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                component={renderSearchSelectField}
                name="published"
                variant="outlined"
                className={classes.searchField}
                label={t('publishedTimes:publishLabel')}
                searchForm={classes.searchSelectField}
              >
                {/* <option value="" disabled>
                  {t('publishedTimes:publishLabel')}
                </option> */}
                {publishedTimes.map(item => {
                  return (
                    <option value={item.value} key={item.value}>
                      {t(`publishedTimes:${item.value}`)}
                    </option>
                  );
                })}
              </Field>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="secondary" className={classes.searchBtn} onClick={() => filterJobs(false)}>
                {t('searchBtn')}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
};

export default withStyles(styles)(SearchFormComponent);
