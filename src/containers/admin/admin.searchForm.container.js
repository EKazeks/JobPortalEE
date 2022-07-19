import React from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import AdminSearchFormComponent from '../../components/admin/admin.searchForm.component';
 import { getAllJobCategory, filterJobs } from '../../actions';

class AdminSearchFormContainer extends React.Component {
  componentDidMount() {
     //this.props.getAllJobCategory();
  }

  render() {
    return <AdminSearchFormComponent {...this.props} />;
  }
}
const AdminSearchForm = reduxForm({
  form: 'adminSearch',
  // destroyOnUnmount: true
})(AdminSearchFormContainer);

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AdminSearchForm);
