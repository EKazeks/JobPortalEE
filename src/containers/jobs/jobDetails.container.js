import React from 'react';
import { connect } from 'react-redux';
import JobDetailsComponent from '../../components/jobs/jobDetails.component';
import { getJobDetailsById, toggleFavoriteJobs, closeSnackbar, changePagination,fetchJobById,fetchJobInfo } from '../../actions';

class JobDetailsContainer extends React.Component {
  componentDidMount() {
    this.props.getJobDetailsById(`${this.props.match.params.id}$$${this.props.match.params.companyId}`);
  }

  render() {
    return <JobDetailsComponent {...this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    state,
    jobDetails: state.jobs.jobsList && state.jobs.jobsList,
    workStart: state.jobs.workStart && state.jobs.workStart,
    favoriteJobs: state.jobs.favoriteJobs && state.jobs.favoriteJobs,
    favBtnstatus: !!(state.jobs.jobDetails && state.jobs.jobDetails.favourite),
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
  fetchJobInfo
};

export default connect(mapStateToProps, mapDispatchToProps)(JobDetailsContainer);
