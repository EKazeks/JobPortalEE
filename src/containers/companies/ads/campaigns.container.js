import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import CampaignsComponent from '../../../components/companies/ads/campaigns.component';
import { chooseCampaign, getAllCampaigns, saveNewCampaign, saveNewCampaignSuccess, closeSnackbar, choosePaymentMethod } from '../../../actions';
import { campaignValidate as validate } from '../../validate';

const CampaignsContainer = reduxForm({
  form: 'campaign',
  validate,
})(CampaignsComponent);

const mapStateToProps = state => ({
  campaigns: state.advertisement.campaigns,
  currentCampaignPrice: state.advertisement.viewSelectedAd && state.advertisement.viewSelectedAd.campaignValue,
  selectedCampaign: state.advertisement.selectedCampaign,
  marketingDetails: state.advertisement.marketingDetails,
  isToChangeCampaign: state.advertisement.isToChangeCampaign,
  showSuccessSnackbar: state.asyncActions.showSuccessSnackbar,
  showFailedSnackbar: state.asyncActions.showFailedSnackbar,
  userRole: state.client.user.data.user_type,
  id: state.advertisement.selectedAd,
  showDialog: state.asyncActions.showMktDialog,
  showPaymentDialog: state.asyncActions.showPaymentDialog,
  showSpinner: state.advertisement.showSpinner,
});

const mapDispatchToProps = {
  chooseCampaign,
  getAllCampaigns,
  saveNewCampaign,
  saveNewCampaignSuccess,
  closeSnackbar,
  choosePaymentMethod,
  // getAllJobCategory
};
export default connect(mapStateToProps, mapDispatchToProps)(CampaignsContainer);
