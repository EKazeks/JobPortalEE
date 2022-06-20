import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import DashboardContainer from '../../../containers/companies/adInfo/dashboard.container';
import AdDetails from '../ads/adDetails.component';
import ApplicantsListComponent from '../../applicants/applicantsList.component';
import SideBar from '../../../containers/layout/sideBar.container';

const styles = theme => ({
  adContent: {
    flexGrow: 1,
    padding: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      marginLeft: 190,
    },
  },
});

const AdInfoComponent = ({
  selectedMenu,
  viewSelectedAd,
  applications,
  userRole,
  showSpinner,
  campaigns,
  showFailedSnackbar,
  showSuccessSnackbar,
  showDialog,
  deleteApplication,
  classes,
  advertPages,
  changeAdvertPage,
  selectedPage,
  rowsPerPage,
}) => {
  return (
    <div>
      {userRole === 'company' && <SideBar />}
      <div className={classes.adContent}>
        {selectedMenu === 0 && (
          <AdDetails
            viewSelectedAd={viewSelectedAd}
            showFailedSnackbar={showFailedSnackbar}
            showSuccessSnackbar={showSuccessSnackbar}
            userRole={userRole}
            showSpinner={showSpinner}
            campaignsList={campaigns}
          />
        )}
        {selectedMenu === 1 && (
          <ApplicantsListComponent
            applications={applications}
            viewSelectedAd={viewSelectedAd}
            showDialog={showDialog}
            deleteApplication={deleteApplication}
            advertPages={advertPages}
            changeAdvertPage={changeAdvertPage}
            selectedPage={selectedPage}
            rowsPerPage={rowsPerPage}
          />
        )}
        {selectedMenu === 2 && <DashboardContainer viewSelectedAd={viewSelectedAd} />}
      </div>
    </div>
  );
};

export default withStyles(styles)(AdInfoComponent);
