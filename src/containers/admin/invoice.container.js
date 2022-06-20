import React from 'react';
import { connect } from 'react-redux';
import AdminInvoiceComponent from '../../components/admin/invoice.component';
import { adminSearchInvoice, changeAdvertPage } from '../../actions';

class AdminInvoiceContainer extends React.Component {
  componentDidMount() {
    this.props.adminSearchInvoice();
  }

  render() {
    return <AdminInvoiceComponent {...this.props} />;
  }
}
const mapStateToProps = state => ({
  invoices: state.admin.invoices,
  selectedPage: state.pagination.selectedPage.selected,
  advertPages: Math.ceil(state.admin.invoices.length / 5),
});
const mapDispatchToProps = {
  adminSearchInvoice,
  changeAdvertPage,
};
export default connect(mapStateToProps, mapDispatchToProps)(AdminInvoiceContainer);
