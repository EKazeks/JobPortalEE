import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { saveAndPublishAdvertisement,saveAndPublishAdvertisementToEe, closeDialog } from '../../../actions';
import PaymentInfoComponent from '../../../components/companies/advertisements/paymentInfo.component';
import { HELP_SERVICE_FEE, SOS_SERVICE_FEE } from '../../../constants';
import { customTranslateCampaign } from '../../../utils/customTranslate';
import { formatToFinnishCurrency } from '../../../utils/helperFunctions';

const PaymentInfoContainerForm = reduxForm({
  form: 'paymentInfo',
})(PaymentInfoComponent);

const mapStateToProps = state => {
  const { selectedCampaign, viewSelectedAd, isToChangeCampaign } = state.advertisement;
  const { id, value, includes_mktbudget } = selectedCampaign;
  const addedBudget = state.advertisement.marketingDetails.marketing_budget;
  const mktBudget = parseInt(includes_mktbudget && addedBudget ? addedBudget : 0);

  let newCampValue;
  if (isToChangeCampaign) {
    const currentCampValue = viewSelectedAd.value;
    newCampValue = value - currentCampValue; //Only charge if new campaign type is selected and the difference
  }
  const isExtraServiceAdded = state.advertisement.extraService.help || state.advertisement.extraService.sos ? true : false;
  const extraService = state.advertisement.extraService.help ? 'help' : state.advertisement.extraService.sos ? 'sos' : null;

  const extraServiceSum = extraService === 'help' ? HELP_SERVICE_FEE : extraService === 'sos' ? SOS_SERVICE_FEE : 0;
  const totalSum = isExtraServiceAdded ? extraServiceSum : isToChangeCampaign ? newCampValue + mktBudget : value + mktBudget;

  const userRole = state.client.user && state.client.user.data.user_role;
  return {
    /* initialValues: {
      payment_method: userRole === 1 ? 'invoice' : null
    }, */
    campaignType: customTranslateCampaign(id),
    campaignid: id,
    campaignValue: value,
    marketingBudget: formatToFinnishCurrency(mktBudget),
    campaignPrice: formatToFinnishCurrency(value),
    sumWithoutVAT: formatToFinnishCurrency(totalSum),
    VAT: formatToFinnishCurrency(totalSum * 0.24),
    totalSumWithVAT: formatToFinnishCurrency(totalSum * 1.24),
    extraService: extraService,
    totalSum: totalSum,
    roleId: userRole,
    isToChangeCampaign: isToChangeCampaign,
    newCampValue: formatToFinnishCurrency(newCampValue),
    jobPostStatus: viewSelectedAd?.status,
  };
};

const mapDispatchToProps = {
  saveAndPublishAdvertisement,
  closeDialog,
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentInfoContainerForm);
