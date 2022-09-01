import { connect } from "react-redux";
import CompanyNavBarComponent from "../../components/layout/company.navBar.component";
import {
  navigateAdsFromMainMenu,
  postAdvertisement,
  logout,
} from "../../actions";

const mapStateToProps = (state) => ({
  selectedMainMenu: state.advertisement.selectedMainMenu,
  companyId: state.client.user.data.company_id,
  companyName: state.companyProfile.profile.company_name,
  userRole: state.client.user.data.user_role && state.client.user.data.user_role,
  companiesList: state.usersCompanyList.companiesList,
});

const mapDispatchToProps = {
  navigateAdsFromMainMenu,
  postAdvertisement,
  logout,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyNavBarComponent);
