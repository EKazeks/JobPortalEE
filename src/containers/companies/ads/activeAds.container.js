import { connect } from "react-redux";
import ActiveAdsComponent from "../../../components/companies/ads/activeAds.component";
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
  fetchJobInfo,
  editOffer,
  deleteSuccess,
} from "../../../actions";

const mapStateToProps = (state) => {
  return {
    //activeAds: state.advertisement.advertisements.activeAds,
    selectedPage: state.pagination.selectedPage.selected,
    advertPages: Math.ceil(
      state.advertisement.advertisements.activeAds.length / 10
    ),
    companyId: state.companyProfile.profile.company_id,
    showDialog: state.advertisement.warnToDelete,
    isToDeleteAdvertisementId: state.advertisement.isToDeleteAdvertisementId,
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
  openAdToSeeAdInfo,
  fetchJobById,
  fetchJobInfo,
  editOffer,
  deleteSuccess,
};
export default connect(mapStateToProps, mapDispatchToProps)(ActiveAdsComponent);
