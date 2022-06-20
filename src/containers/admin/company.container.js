import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import AdminCompanyComponent from '../../components/admin/company.component';
import { adminSearchCompany, changeAdvertPage, editContactDetails, addCompanyProfile } from '../../actions';
import { ADMIN_VIEW_COUNT_PER_PAGE } from '../../constants';

class AdminCompanyContainer extends React.Component {
  componentDidMount() {
    this.props.adminSearchCompany(false);
  }

  render() {
    if (!this.props.isAdmin) {
      return <Redirect to="/" />;
    }
    return <AdminCompanyComponent {...this.props} />;
  }
}
const mapStateToProps = state => ({
  companies: state.admin.companies,
  selectedPage: state.pagination.selectedPage.selected,
  advertPages: Math.ceil(state.admin.companies[0]?.full_count / ADMIN_VIEW_COUNT_PER_PAGE),
  isAdmin: state.client.user && state.client.user.data[5],
  isEdit: state.admin.isEdit,
  isToEditId: state.admin.isToEditId,
});
const mapDispatchToProps = {
  adminSearchCompany,
  changeAdvertPage,
  editContactDetails,
  addCompanyProfile,
};
export default connect(mapStateToProps, mapDispatchToProps)(AdminCompanyContainer);
