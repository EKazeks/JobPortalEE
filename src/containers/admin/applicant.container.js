import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import AdminApplicantComponent from "../../components/admin/applicant.component";
import {
  adminSearchApplicant,
  changeAdvertPage,
  editContactDetails,
} from "../../actions";
import { ADMIN_VIEW_COUNT_PER_PAGE } from "../../constants";

class AdminApplicantContainer extends React.Component {
  componentDidMount() {
    this.props.adminSearchApplicant(false);
  }

  render() {
    if (!this.props.isAdmin) {
      return <Redirect to="/" />;
    }
    return <AdminApplicantComponent {...this.props} />;
  }
}
const mapStateToProps = (state) => ({
  applicants: state.admin.applicants,
  selectedPage: state.pagination.selectedPage.selected,
  isAdmin: state.client.user && state.client.user.data.user_role,
  advertPages: Math.ceil(
    state.admin.applicants[0]?.full_count / ADMIN_VIEW_COUNT_PER_PAGE
  ),
  isEdit: state.admin.isEdit,
  isToEditId: state.admin.isToEditId,
});
const mapDispatchToProps = {
  adminSearchApplicant,
  changeAdvertPage,
  editContactDetails,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminApplicantContainer);
