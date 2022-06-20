import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import MarketingDetailsComponent from '../../../components/companies/ads/marketingDetails.component';
import { saveMarketingDetails, closeDialog } from '../../../actions';
import { marketingDetailsValidate as validate } from '../../validate';

const MarketingDetailsContainerForm = reduxForm({
  form: 'marketingDetails',
  validate,
})(MarketingDetailsComponent);

const mapStateToProps = state => ({
  initialValues: state.advertisement.marketingDetails,
  isSaved: state.advertisement.marketingDetails.isPlatformSaved,
  isToDisable: state.form.marketingDetails && state.form.marketingDetails?.values?.more_budget,
});

const mapDispatchToProps = {
  saveMarketingDetails,
  closeDialog,
};

export default connect(mapStateToProps, mapDispatchToProps)(MarketingDetailsContainerForm);
