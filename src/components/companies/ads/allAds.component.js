import React from 'react';
import ActiveAdsContainer from '../../../containers/companies/ads/activeAds.container';
import DraftAdsContainer from '../../../containers/companies/ads/draftAds.container';
import InActiveAdsContainer from '../../../containers/companies/ads/inActiveAds.container';

// status 1,0,2 for active, draft and inactive jobs respectively
const AllAdsComponent = ({ selectedMainMenu }) => {
  return (
    <div>
      {selectedMainMenu === 1 && <ActiveAdsContainer />}
      {selectedMainMenu === 0 && <DraftAdsContainer />}
      {selectedMainMenu === 2 && <InActiveAdsContainer />}
    </div>
  );
};

export default AllAdsComponent;
