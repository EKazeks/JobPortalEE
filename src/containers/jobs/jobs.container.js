import React from 'react';
import { connect } from 'react-redux';
import {
  filterJobs,
  changeAdvertPage,
  toggleFavoriteJobs,
  closeSnackbar,
  getFavoriteJobs,
  openAdToSeeAdInfo,
  warnToDelete,
  deleteAdvertisement,
  resetSearchCriteriaForm,
  changePagination,
  fetchJobById
} from '../../actions';
import JobsComponent from '../../components/jobs/jobs.component';
import { JOBPOST_COUNT_PER_PAGE } from '../../constants';

class JobsContainer extends React.Component {
  componentDidMount() {
    this.props.filterJobs(true);
    this.props.getFavoriteJobs();
    window.onbeforeunload = e => {
      this.props.resetSearchCriteriaForm();
    };
  }

  // /* componentWillUnmount() {
  //   store.getState().pagination = {
  //     selectedPage: {
  //       selected: 0
  //     },
  //     rowsPerPage: 10
  //   };
  // } */

  render() {
    return <JobsComponent {...this.props} />;
  }
}

const mapStateToProps = state => {
  const userRole = state.client.user && state.client.user.data && state.client.user.data[6] && state.client.user.data[6].user_type;
  return {
    state,
    jobs: state.jobs.jobsList // Write comment based on job portal data or mol data
      ? state.jobs.jobsList
      : state.jobs.jobsList,
    selectedPage: state.pagination.selectedPage?.selected,
    advertPages: Math.ceil(state.jobs.jobsList[0]?.full_count / JOBPOST_COUNT_PER_PAGE),
    showSpinner: state.jobs.showSpinner,
    showSuccessSnackbar: state.asyncActions.showSuccessSnackbar,
    favoriteJobs: state.jobs.favoriteJobs && state.jobs.favoriteJobs,
    showDialog: userRole === 'admin' ? state.advertisement.warnToDelete : state.asyncActions.showDialog, // For admins, we shouw the delete dialog
    userRole,
    isToDeleteAdvertisementId: state.advertisement.isToDeleteAdvertisementId,
    isWarnToDelete: state.advertisement.warnToDelete,
  };
};
const mapDispatchToProps = {
  filterJobs,
  changeAdvertPage,
  toggleFavoriteJobs,
  closeSnackbar,
  getFavoriteJobs,
  openAdToSeeAdInfo,
  warnToDelete,
  deleteAdvertisement,
  resetSearchCriteriaForm,
  changePagination,
  fetchJobById,
};

export default connect(mapStateToProps, mapDispatchToProps)(JobsContainer);
