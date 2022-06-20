import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Redirect } from 'react-router-dom';
import {
  adminSearchAdsMarketing,
  changeAdvertPage,
  // getAllCampaigns,
  adminUpdateMarketingStatus,
  adminExpandAdRow,
  adminCloseAdRow,
  closeSnackbar,
  updatePaymentStatus,
} from '../../actions';
import AdminMarketingComponent from '../../components/admin/marketing.component';
import { ADMIN_VIEW_COUNT_PER_PAGE } from '../../constants';

class AdminMarketing extends React.Component {
  componentDidMount() {
    this.props.adminSearchAdsMarketing();
    // this.props.getAllCampaigns();
  }

  render() {
    if (!this.props.isAdmin) {
      return <Redirect to="/" />;
    }
    return <AdminMarketingComponent {...this.props} />;
  }
}
const mapStateToProps = state => {
  return {
    //initialValues: state.admin.expandedRowMarketingStatus,
    adsMarketing: state.admin.adsMarketing,
    marketingDetails: state.admin.marketingBudget,
    selectedPage: state.pagination.selectedPage.selected,
    advertPages: Math.ceil(state.admin.adsMarketing.length / ADMIN_VIEW_COUNT_PER_PAGE),
    showSuccessSnackbar: state.asyncActions.showSuccessSnackbar,
    showFailedSnackbar: state.asyncActions.showFailedSnackbar,
    expanded: state.admin.expanded,
    isAdmin: state.client.user && state.client.user.data[5],
    paymentToUpdateDetails: state.admin.paymentToUpdateDetails,
  };
};
const mapDispatchToProps = {
  adminSearchAdsMarketing,
  changeAdvertPage,
  // getAllCampaigns,
  adminUpdateMarketingStatus,
  adminExpandAdRow,
  adminCloseAdRow,
  closeSnackbar,
  updatePaymentStatus,
};

const AdminMarketingContainer = reduxForm({
  form: 'marketing',
})(AdminMarketing);

export default connect(mapStateToProps, mapDispatchToProps)(AdminMarketingContainer);
