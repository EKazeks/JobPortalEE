import { connect } from 'react-redux';
import SideBarComponent from '../../components/layout/sideBar.component';
import { getAdInfoFromSideMenu } from '../../actions';

const mapStateToProps = state => ({
  selectedMenu: state.advertisement.selectedSideMenu,
  viewSelectedAd: state.advertisement.viewSelectedAd && state.advertisement.viewSelectedAd,
});

const mapDispatchToProps = {
  getAdInfoFromSideMenu,
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBarComponent);
