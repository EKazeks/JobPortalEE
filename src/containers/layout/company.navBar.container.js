import { connect } from 'react-redux';
import CompanyNavBarComponent from '../../components/layout/company.navBar.component';
import { navigateAdsFromMainMenu, postAdvertisement, logout } from '../../actions';

const mapStateToProps = state => ({
  selectedMainMenu: state.advertisement.selectedMainMenu,
  companyId: state.companyProfile.profile.company_id,
  companyName: state.companyProfile.profile.company_name,
  userRole: state.client.user && state.client.user.data[5],
  companiesList: state.usersCompanyList.companiesList,
});

const mapDispatchToProps = {
  navigateAdsFromMainMenu,
  postAdvertisement,
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyNavBarComponent);
