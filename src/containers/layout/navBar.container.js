import { connect } from 'react-redux';
import NavBarComponent from '../../components/layout/navBar.component';
import { navigateAdsFromMainMenu, postAdvertisement } from '../../actions';

const mapStateToProps = state => {
  const { client, advertisement, companyProfile } = state;
  return {
    selectedMainMenu: advertisement.selectedMainMenu,
    isUserLoggedIn: client.user,
    companyId: companyProfile.profile.company_id,
    userType: client.user && client.user.data && client.user.data[6] && client.user.data[6].user_type,
    adminRole: client.user && client.user.data && client.user.data[5],
  };
};

const mapDispatchToProps = {
  navigateAdsFromMainMenu,
  postAdvertisement,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBarComponent);
