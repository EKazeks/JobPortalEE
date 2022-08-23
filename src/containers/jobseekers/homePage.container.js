import React, { useEffect, useState } from 'react';
import { getFormValues, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import HomePageComponent from '../../components/jobseekers/homePage.component';
import { getApplicantDashboardInfo, toggleEmailNotification, updateEmailNotification, closeSnackbar } from '../../actions';
import { jobPreferenceValidate as validate } from '../validate';
import i18next from 'i18next';
import axios from 'axios';

class HomePageContainer extends React.Component {
  componentDidMount() {
    this.props.getApplicantDashboardInfo();
  }

  render() {
    if (this.props.isUserType === 'applicant') {
      return <HomePageComponent {...this.props} />;
    }
    return <Redirect to="/" />;
  }
}
const HomePageContainerForm = reduxForm({
  form: 'jobPreference',
  //initialValues: {},
  enableReinitialize: true,
  validate,
})(HomePageContainer);

const mapStateToProps = state => {
  const formValues = getFormValues('jobPreference')(state);
  const dashboard = state.jobs.dashboard && state.jobs.dashboard[0];
  const favoriteJobs = state.jobs.favoriteJobs && state.jobs.favoriteJobs;
  const extractJobCategoriesData = list => {
    const jobcategoryList = list.map(el => {
      const data = {};
      data.id = el.job_category;
      data.label = i18next.t(`category:${el.job_category}`);
      return data;
    });
    console.log(jobcategoryList)
    return jobcategoryList;
  };

  const extractJobTypeData = list => {
    const jobtypeList = list.map(el => {
      const data = {};
      data.type = el.job_type;
      data.label = i18next.t(`jobtype:jobType${el.job_type}`);
      return data;
    });
    return jobtypeList;
  };

  const extractJobHoursData = list => {
    const jobhourList = list.map(el => {
      const data = {};
      data.type = el.job_hours;
      data.label = i18next.t(`jobhours:jobHours${el.job_hours}`);
      return data;
    });
    return jobhourList;
  };

  const populateFormValues = {
    notice_frequency: dashboard && dashboard.notice_frequency,
    job_location: dashboard && dashboard.job_location,
    job_category: dashboard && dashboard.job_category && extractJobCategoriesData(dashboard.job_category.categoryList),
    job_type: dashboard && dashboard.job_type && extractJobTypeData(dashboard.job_type.jobtypeList),
    job_hours: dashboard && dashboard.job_hours && extractJobHoursData(dashboard.job_hours.jobhoursList),
  };
console.log(populateFormValues)
  return {
    initialValues: populateFormValues,
    dashboard,
    jobCategories: state.jobCategories.jobCategories,
    notificationToggleBtn: state.jobs.notificationToggleBtn,
    showSuccessSnackbar: state.asyncActions.showSuccessSnackbar,
    showFailedSnackbar: state.asyncActions.showFailedSnackbar,
    isUserType: state.client.user && state.client.user.data.user_type,
    formValues,
  };
};

const mapDispatchToProps = {
  getApplicantDashboardInfo,
  toggleEmailNotification,
  updateEmailNotification,
  closeSnackbar,
};
export default connect(mapStateToProps, mapDispatchToProps)(HomePageContainerForm);
