import { connect } from 'react-redux';
import DraftAdsComponent from '../../../components/companies/ads/draftAds.component';
import { getAllAdsByStatus, changeAdvertPage, populateVacancyForm, warnToDelete, deleteAdvertisement } from '../../../actions';

const mapStateToProps = state => ({
  draftAds: state.advertisement.advertisements.draftAds,
  selectedPage: state.pagination.selectedPage.selected,
  advertPages: Math.ceil(state.advertisement.advertisements.draftAds.length / 10),
  showDialog: state.advertisement.warnToDelete,
  isToDeleteAdvertisementId: state.advertisement.isToDeleteAdvertisementId,
});

const mapDispatchToProps = {
  getAllAdsByStatus,
  changeAdvertPage,
  populateVacancyForm,
  warnToDelete,
  deleteAdvertisement,
};
export default connect(mapStateToProps, mapDispatchToProps)(DraftAdsComponent);
