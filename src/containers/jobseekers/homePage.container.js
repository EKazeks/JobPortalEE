import React, { useEffect, useState } from "react";
import { getFormValues, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import HomePageComponent from "../../components/jobseekers/homePage.component";
import {
  getApplicantDashboardInfo,
  toggleEmailNotification,
  updateEmailNotification,
  closeSnackbar
} from "../../actions";
import { jobPreferenceValidate as validate } from "../validate";
import i18next from "i18next";
import axios from "axios";

class HomePageContainer extends React.Component {
  componentDidMount() {
    this.props.getApplicantDashboardInfo();
  }

  render() {
    if (this.props.isUserType === "applicant") {
      return <HomePageComponent {...this.props} />;
    }
    return <Redirect to="/" />;
  }
}
const HomePageContainerForm = reduxForm({
  form: "jobPreference",
  //initialValues: {},
  enableReinitialize: true,
  validate
})(HomePageContainer);

const mapStateToProps = state => {
  const formValues = getFormValues("jobPreference")(state);
  const dashboard = state.jobs.dashboard && state.jobs.dashboard[0];
  const favoriteJobs = state.jobs?.favoriteJobs && state.jobs?.favoriteJobs;
  const appliedJobs =
    state.jobs.dashboard?.appliedJobs && state.jobs.dashboard?.appliedJobs;

  const extractJobCategoriesData = list => {
    return list.map(el => {
      let data = {};
      data.id = el.id;
      data.label = i18next.t(`category:${el.name}`);
      return data;
    });
  };

  const extractJobTypeData = list => {
    return list.map(el => {
      const data = {};
      data.type = el.id;
      data.label = i18next.t(`jobtype:jobType${el.name}`);
      return data;
    });
  };

  const extractJobHoursData = list => {
    return list.map(el => {
      const data = {};
      data.type = el.id;
      data.label = i18next.t(`jobhours:jobHours${el.name}`);
      return data;
    });
  };

  // const populateFormValues = {
  //   notice_frequency: dashboard && dashboard.notice_frequency,
  //   job_location: dashboard && dashboard.job_location,
  //   job_category:
  //     dashboard &&
  //     dashboard.job_category &&
  //     extractJobCategoriesData(dashboard.job_category.categoryList),
  //   job_type:
  //     dashboard &&
  //     dashboard.job_type &&
  //     extractJobTypeData(dashboard.job_type.jobtypeList),
  //   job_hours:
  //     dashboard &&
  //     dashboard.job_hours &&
  //     extractJobHoursData(dashboard.job_hours.jobhoursList)
  // };

  // Dashboard used in sjob alert
  const db = state.jobs.dashboard;
  const emailNotificationStatus = state.jobs.dashboard.emailNotificationActive;
  const populateFormValues = {
    notice_frequency: db.emailNotificationFrequency,
    job_location: db.job_location,
    job_category:
      db.applicant_job_category &&
      extractJobCategoriesData(db.applicant_job_category),
    job_type:
      db.applicant_job_type && extractJobTypeData(db.applicant_job_type),
    job_hours:
      db.applicant_job_hours && extractJobHoursData(db.applicant_job_hours)
  };

  return {
    initialValues: populateFormValues,
    dashboard,
    jobCategories: state.jobCategories.jobCategories,
    notificationToggleBtn: emailNotificationStatus,
    showSuccessSnackbar: state.asyncActions.showSuccessSnackbar,
    showFailedSnackbar: state.asyncActions.showFailedSnackbar,
    isUserType: state.client.user && state.client.user.data.user_type,
    formValues,
    favoriteJobs,
    appliedJobs
  };
};

const mapDispatchToProps = {
  getApplicantDashboardInfo,
  toggleEmailNotification,
  updateEmailNotification,
  closeSnackbar
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePageContainerForm);
