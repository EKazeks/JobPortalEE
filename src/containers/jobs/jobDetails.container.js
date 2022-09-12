import React from "react";
import { connect } from "react-redux";
import JobDetailsComponent from "../../components/jobs/jobDetails.component";
import {
  getJobDetailsById,
  toggleFavoriteJobs,
  closeSnackbar,
  changePagination,
  fetchJobById,
  fetchJobInfo,
  setIdToApply,
} from "../../actions";

class JobDetailsContainer extends React.Component {
  componentDidMount() {
    this.props.getJobDetailsById(
      `${this.props.match.params.jobtitle}/${this.props.match.params.id}`
    );
  }

  render() {
    return <JobDetailsComponent {...this.props} />;
  }
}

const mapStateToProps = (state) => {
  return {
    state,
    jobDetails: state.jobs.jobDetails && state.jobs.jobDetails,
    workStart: state.jobs.workStart && state.jobs.workStart,
    favoriteJobs: state.jobs.favoriteJobs && state.jobs.favoriteJobs,
    favBtnstatus: !!(
      state.jobs.favoriteJobs && state.jobs.favoriteJobs.isFavourite
    ),
    showSuccessSnackbar: state.asyncActions.showSuccessSnackbar,
    showFailedSnackbar: state.asyncActions.showFailedSnackbar,
    showDialog: state.asyncActions.showDialog,
    showSpinner: state.jobs.showSpinner,
  };
};
const mapDispatchToProps = {
  getJobDetailsById,
  toggleFavoriteJobs,
  closeSnackbar,
  changePagination,
  fetchJobById,
  fetchJobInfo,
  setIdToApply,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JobDetailsContainer);
