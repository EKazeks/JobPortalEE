import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getAppliedJobs, changeAdvertPage } from '../../actions';
import AppliedJobsComponent from '../../components/jobseekers/appliedJobs.component';
import store from '../../store';

class AppliedJobsContainer extends React.Component {
  componentDidMount() {
    this.props.getAppliedJobs();
  }

  componentWillUnmount() {
    store.getState().pagination = {
      selectedPage: {
        selected: 0,
      },
    };
  }

  render() {
    if (this.props.isUserType === 'applicant') {
      return <AppliedJobsComponent {...this.props} />;
    }
    return <Redirect to="/" />;
  }
}
const mapStateToProps = state => {
  return {
    appliedJobs: state.jobs.appliedJobs,
    selectedPage: state.pagination.selectedPage.selected,
    advertPages: Math.ceil(state.jobs.appliedJobs.length / 10),
    isUserType: state.client.user && state.client.user.data[6].user_type,
  };
};

const mapDispatchToProps = {
  getAppliedJobs,
  changeAdvertPage,
};
export default connect(mapStateToProps, mapDispatchToProps)(AppliedJobsContainer);
