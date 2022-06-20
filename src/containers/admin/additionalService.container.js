import React from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import AdminAdditionalService from '../../components/admin/additionalService.component';
import { ADMIN_VIEW_COUNT_PER_PAGE } from '../../constants';
import { adminSearchAdditionalService, populateVacancyForm, changeAdvertPage, getAllJobCategory, updatePaymentStatus } from '../../actions';

class AdditionalService extends React.Component {
  componentDidMount() {
    this.props.adminSearchAdditionalService(false);
  }

  render() {
    return <AdminAdditionalService {...this.props} />;
  }
}

const mapStateToProps = state => ({
  additionalService: state.admin.additionalService,
  selectedPage: state.pagination.selectedPage.selected,
  advertPages: Math.ceil(state.admin.additionalService[0]?.full_count / ADMIN_VIEW_COUNT_PER_PAGE),
  isAdmin: state.client.user && state.client.user.data[5],
  isEdit: state.admin.isEdit,
  isToEditId: state.admin.isToEditId,
  jobCategories: state.jobCategories.jobCategories,
  paymentToUpdateDetails: state.admin.paymentToUpdateDetails,
});

const mapDispatchToProps = {
  adminSearchAdditionalService,
  populateVacancyForm,
  changeAdvertPage,
  getAllJobCategory,
  updatePaymentStatus,
};

const AdditionalServiceContainer = reduxForm({
  form: 'additionalService',
})(AdditionalService);

export default connect(mapStateToProps, mapDispatchToProps)(AdditionalServiceContainer);
