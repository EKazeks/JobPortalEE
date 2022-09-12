import { connect } from "react-redux";
import NavBarComponent from "../../components/layout/navBar.component";
import { navigateAdsFromMainMenu, postAdvertisement } from "../../actions";

const mapStateToProps = (state) => {
  const { client, advertisement, companyProfile } = state;
  return {
    selectedMainMenu: advertisement.selectedMainMenu,
    isUserLoggedIn: client.user,
    companyId: companyProfile.profile.company_id,
    userType:
      client.user &&
      client.user.data &&
      client.user.data &&
      client.user.data.user_type,
    adminRole: client.user && client.user.data && client.user.data.user_role,
  };
};

const mapDispatchToProps = {
  navigateAdsFromMainMenu,
  postAdvertisement,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBarComponent);
