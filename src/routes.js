import React from 'react';

import { Router, Route, Switch } from 'react-router-dom';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import JobsContainer from './containers/jobs/jobs.container';
import JobDetailsContainer from './containers/jobs/jobDetails.container';

import history from './history';
import SignUpContainer from './containers/account/signUp.container';
import SignInContainer from './containers/account/signIn.container';

import ApplicantDetails from './containers/applicants/applicantDetails.container';
import ApplicationFormContainer from './containers/applicants/applicationForm.container';
import AdInfoContainer from './containers/companies/adInfo/adInfo.container';
import NavBarContainer from './containers/layout/navBar.container';
import AllAdsContainer from './containers/companies/ads/allAds.container';
import FooterComponent from './components/layout/footer.component';
// Giving access to only authenticated users
import AdvertForm from './containers/companies/advertisements/advertForm.container';
import EditAdvertFormContainer from './containers/companies/advertisements/editAdvertForm.container';
import ProfileContainer from './containers/companies/profile.container';
import CampaignsContainer from './containers/companies/ads/campaigns.container';
import JobseekerProfileContainer from './containers/jobseekers/jobseekerProfile.container';
import AppliedJobsContainer from './containers/jobseekers/appliedJobs.container';
import FavoriteJobsContainer from './containers/jobseekers/favoriteJobs.container';
import HomePageContainer from './containers/jobseekers/homePage.container';

// ADMINS
import AdminMarketingContainer from './containers/admin/marketing.container';
import AdminApplicantContainer from './containers/admin/applicant.container';
import AdminCompanyContainer from './containers/admin/company.container';
import AdminAdditionalService from './containers/admin/additionalService.container';
import NotFoundPage from './utils/notFoundPage';
import PaymentRedirectComponent from './components/companies/advertisements/paymentRedirect.component';

const user = JSON.parse(localStorage.getItem('user'));

const isUserAuthenticated = connectedRouterRedirect({
  // The url to redirect user to if they fail
  redirectPath: '/login',
  // If selector is true, wrapper will not redirect
  // For example let's check that state contains user data
  authenticatedSelector: state => state.client.user !== null,
  // A nice display name for this check
  wrapperDisplayName: 'isUserAuthenticated',
});

// const user = JSON.parse(sessionStorage.getItem('user'));
const isUserType = user && user.data && user.data[6] && user.data[6].user_type;

export default class Routes extends React.Component {
  render() {
    return (
      <div id="page-container">
        <div id="content-wrap">
          <Router history={history}>
            <NavBarContainer />

            <div>
              <Switch>
                {/* The following '/' routes for different user scenarios */}
                {isUserType === null ? (
                  <Route exact path="/" component={SignInContainer} />
                ) : isUserType === 'company' ? (
                  <Route exact path="/" component={isUserAuthenticated(AllAdsContainer)} />
                ) : (
                  <Route exact path="/" component={isUserAuthenticated(JobsContainer)} />
                )}
                <Route exact path="/register" component={SignUpContainer} />
                <Route exact path="/login" component={SignInContainer} />
                <Route exact path="/tyopaikat" component={JobsContainer} />
                <Route exact path="/tyopaikat/:companyName/:companyId/:jobtitle/:id" component={JobDetailsContainer} />
                <Route exact path="/tyopaikat/:jobtitle/:id/hae" component={ApplicationFormContainer} />
                {/* The following routes for companies */}
                <Route exact path="/tyopaikkailmoitus" component={isUserAuthenticated(AdvertForm)} />
                <Route exact path="/tyopaikkailmoitus/:id" component={isUserAuthenticated(EditAdvertFormContainer)} />
                <Route exact path="/applicants/:id" component={isUserAuthenticated(ApplicantDetails)} />
                <Route exact path="/jobpost/:name/:jobPostNumber" component={isUserAuthenticated(AdInfoContainer)} />
                <Route exact path="/omat-ilmoitukseni" component={isUserAuthenticated(AllAdsContainer)} />
                <Route exact path="/omat-tiedot" component={isUserAuthenticated(ProfileContainer)} />

                <Route exact path="/:jobpost/:id/campaign" component={isUserAuthenticated(CampaignsContainer)} />

                <Route exact path="/payment" component={isUserAuthenticated(PaymentRedirectComponent)} />

                {/* The following routes for applicants */}

                <Route exact path="/profile" component={isUserAuthenticated(JobseekerProfileContainer)} />
                <Route exact path="/haetut-tyopaikat" component={isUserAuthenticated(AppliedJobsContainer)} />
                <Route exact path="/suosikit" component={isUserAuthenticated(FavoriteJobsContainer)} />
                <Route exact path="/etusivu" component={isUserAuthenticated(HomePageContainer)} />

                {/* FOR ADMINS --> PUT EXTRA CHECK WITH USERTYPE & AUTHENTICATION */}

                <Route exact path="/markkinoinnit" component={isUserAuthenticated(AdminMarketingContainer)} />

                <Route exact path="/tyonhakijat" component={isUserAuthenticated(AdminApplicantContainer)} />

                <Route exact path="/yritysasiakkaat" component={isUserAuthenticated(AdminCompanyContainer)} />

                <Route exact path="/lisapalvelu" component={isUserAuthenticated(AdminAdditionalService)} />

                <Route path="/*" component={NotFoundPage} />
              </Switch>
            </div>
          </Router>
        </div>
        <FooterComponent />
      </div>
    );
  }
}
