import React from 'react';
import { connect } from 'react-redux';
import AdInfoComponent from '../../../components/companies/adInfo/adInfo.component';
import { openAdToSeeAdInfo, deleteApplication, changeAdvertPage, closeSnackbar, fetchJobById } from '../../../actions';

class AdInfoContainer extends React.Component {
  componentDidMount() {
    this.props.openAdToSeeAdInfo(this.props.match.params.jobPostNumber);
  }

  render() {
    return <AdInfoComponent {...this.props} />;
  }
}
const mapStateToProps = state => {
  const rows = state.pagination.rowsPerPage;

  return {
    selectedMenu: state.advertisement.selectedSideMenu,
    viewSelectedAd: state.advertisement.viewSelectedAd,
    applications: state.advertisement.viewSelectedAd.applications && state.advertisement.viewSelectedAd.applications,
    showSpinner: state.advertisement.showSpinner,
    campaigns: state.advertisement.campaigns,
    showSuccessSnackbar: state.asyncActions.showSuccessSnackbar,
    showFailedSnackbar: state.asyncActions.showFailedSnackbar,
    userRole: state.client.user.data.user_type,
    showDialog: state.advertisement.warnToDeleteApplication,
    advertPages: state.advertisement.viewSelectedAd.applications && Math.ceil(state.advertisement.viewSelectedAd.applications.length / rows),
    selectedPage: state.pagination.selectedPage.selected,
    rowsPerPage: rows,
  };
};

const mapDispatchToProps = {
  openAdToSeeAdInfo,
  deleteApplication,
  changeAdvertPage,
  closeSnackbar,
  fetchJobById
};

export default connect(mapStateToProps, mapDispatchToProps)(AdInfoContainer);
