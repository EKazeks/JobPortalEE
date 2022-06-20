import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import AllAdsComponent from '../../../components/companies/ads/allAds.component';
import { getAllAdsByStatus } from '../../../actions';

class AllAdsContainer extends React.Component {
  componentDidMount() {
    this.props.getAllAdsByStatus(0);
    this.props.getAllAdsByStatus(1);
    this.props.getAllAdsByStatus(2);
  }

  // To change the visual effect of active menu in secondary menubar, when user's path changes!
  /* componentWillUnmount() {
    console.log('histriy', this.props.history);
    store.getState().advertisement.selectedMainMenu = '0';
  } */

  render() {
    if (this.props.isUserType === 'company') {
      return <AllAdsComponent {...this.props} />;
    }
    return <Redirect to="/" />;
  }
}

const mapStateToProps = state => ({
  state,
  selectedMainMenu: state.advertisement.selectedMainMenu,
  isUserType: state.client.user && state.client.user.data && state.client.user.data[6] && state.client.user.data[6].user_type,
});

const mapDispatchToProps = {
  getAllAdsByStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(AllAdsContainer);
