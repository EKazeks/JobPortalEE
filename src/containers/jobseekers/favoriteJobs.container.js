import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  getFavoriteJobs,
  changeAdvertPage,
  fetchJobInfo,
  fetchJobById,
  deleteFavoriteJobs
} from "../../actions";
import FavoriteJobsComponent from "../../components/jobseekers/favoriteJobs.component";
import store from "../../store";

class FavoriteJobsContainer extends React.Component {
  componentDidMount() {
    this.props.getFavoriteJobs();
  }

  componentWillUnmount() {
    store.getState().pagination = {
      selectedPage: {
        selected: 0,
      },
    };
  }

  render() {
    if (this.props.isUserType === "applicant") {
      return <FavoriteJobsComponent {...this.props} />;
    }
    return <Redirect to="/" />;
  }
}

const mapStateToProps = (state) => {
  return {
    favoriteJobs: state.jobs.dashboard.favoriteJobs && state.jobs.dashboard.favoriteJobs,
    selectedPage: state.pagination.selectedPage.selected,
    advertPages: Math.ceil(state.jobs.favoriteJobs.length / 10),
    isUserType: state.client.user && state.client.user.data.user_type,
  };
};

const mapDispatchToProps = {
  getFavoriteJobs,
  changeAdvertPage,
  fetchJobInfo,
  fetchJobById,
  deleteFavoriteJobs
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FavoriteJobsContainer);
