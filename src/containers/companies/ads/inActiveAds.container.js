import { connect } from 'react-redux';
import InActiveAdsComponent from '../../../components/companies/ads/inactiveAds.component';
import {
  getAllAdsByStatus,
  changeAdvertPage,
  openAdToSeeAdInfo,
  changeCampaign,
  warnToDelete,
  populateVacancyForm,
  deleteJobOffer,
  deleteAdvertisement
} from '../../../actions';

const mapStateToProps = state => ({
  inActiveAds: state.advertisement.advertisements.inActiveAds,
  selectedPage: state.pagination.selectedPage.selected,
  advertPages: Math.ceil(state.advertisement.advertisements.inActiveAds.length / 10),
  showDialog: state.advertisement.warnToDelete,
  isToDeleteAdvertisementId: state.advertisement.isToDeleteAdvertisementId,
  campaigns: state.advertisement.campaigns,
});

const mapDispatchToProps = {
  getAllAdsByStatus,
  changeAdvertPage,
  openAdToSeeAdInfo,
  changeCampaign,
  warnToDelete,
  populateVacancyForm,
  deleteJobOffer,
  deleteAdvertisement
};
export default connect(mapStateToProps, mapDispatchToProps)(InActiveAdsComponent);
