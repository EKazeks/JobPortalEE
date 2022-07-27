import { connect } from 'react-redux';
import ActiveAdsComponent from '../../../components/companies/ads/activeAds.component';
import {
  getAllAdsByStatus,
  changeAdvertPage,
  openAdToSeeAdInfo,
  postAdvertisement,
  warnToDelete,
  populateVacancyForm,
  deleteAdvertisement,
  deleteJobOffer,
  fetchJobById,
  editOffer
} from '../../../actions';

const mapStateToProps = state => {
  return {
    //activeAds: state.advertisement.advertisements.activeAds,
    selectedPage: state.pagination.selectedPage.selected,
    advertPages: Math.ceil(state.advertisement.advertisements.activeAds.length / 10),
    companyId: state.companyProfile.profile.company_id,
    showDialog: state.jobs.warnToDelete,
    isToDeleteAdvertisementId: state.jobs.isToDeleteAdvertisementId,
  };
};

const mapDispatchToProps = {
  getAllAdsByStatus,
  changeAdvertPage,
  openAdToSeeAdInfo,
  postAdvertisement,
  warnToDelete,
  populateVacancyForm,
  deleteAdvertisement,
  deleteJobOffer,
  fetchJobById,
  editOffer
};
export default connect(mapStateToProps, mapDispatchToProps)(ActiveAdsComponent);
