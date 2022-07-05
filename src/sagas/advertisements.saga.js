import {useState} from 'react'
import { takeEvery, put, call } from 'redux-saga/effects';
import { getFormValues, change, formValueSelector, initialize, getFormInitialValues, touch } from 'redux-form';
import {
  SAVE_AND_PUBLISH_ADVERTISEMENT,
  UPDATE_AND_PUBLISH_ADVERTISEMENT,
  API_SERVER,
  API_SERVER_EST,
  API_SERVER_EST_GET_ID,
  GET_ALL_CAMPAIGNS,
  OPEN_AD_TO_SEE_AD_INFO,
  UPDATE_ADVERTISEMENT,
  POPULATE_VACANCY_FORM,
  DELETE_ADVERTISEMENT,
  GET_ALL_JOB_CATEGORY,
  GET_ALL_ADS_BY_STATUS,
  SAVE_ADVERTISEMENT_AS_DRAFT,
  SAVE_NEW_CAMPAIGN,
  CHANGE_ACTIVE_POST_TO_INACTIVE,
  GET_APPLICATION_DETAILS_BY_ID,
  UPDATE_APPLICANT_STATUS,
  GET_JOBPOST_VIEWS_BY_DATE,
  NAVIGATE_ADS_FROM_MAIN_MENU,
  UPDATE_JOB_APPLICATION_DETAILS,
  EDIT_INTERVIEW_DETAILS,
  SAVE_MARKETING_DETAILS,
  DELETE_APPLICATION,
  CHANGE_ROUTE,
  ADMIN_GET_USER_PROFILE,
  HELP_SERVICE_FEE,
  SOS_SERVICE_FEE,
  POPULATE_EMAIL_MESSAGE,
  AUTO_EMAIL_TO_APPLICANT,
  GET_JOBS_OFFERS,
  GET_JOBS_OFFERS_SUCCESS,
} from '../constants';
import store from '../store';
import { apiManualRequest, apiManualPost, apiOpenRequest, apiGetJobsOffers } from '../utils/request';
import { filterObj } from '../utils/wrappers';
import {
  getAllCampaignsSuccess,
  saveAndPublishAdvertisementSuccess,
  getAllJobCategorySuccess,
  saveAndPublishAdvertisementFailed,
  getAllAdsByStatusSuccess,
  saveAndPublishAdvertisement,
  showSuccessSnackbar,
  showFailedSnackbar,
  openAdToSeeAdInfo,
  populateVacancyFormSuccess,
  updateAndPublishAdvertisementSuccess,
  getApplicationDetailsById,
  getApplicationDetailsByIdSuccess,
  getJobPostViewsByDateSuccess,
  changeAdvertPage,
  getAllAdsByStatus,
  filterJobs,
  hideSpinner,
  saveMarketingDetailsSuccess,
  closeDialog,
  registerPayment,
  sendInvoiceToTalous,
  getCompanyProfileSuccess,
  openAdToSeeAdInfoSuccess,
  getJobsOffers,
} from '../actions';
import { customTranslateCampaign } from '../utils/customTranslate';
import browserHistory from '../history';
import { messageTemplate } from '../components/companies/advertisements/automaticMessageToApplicants/messages';

// GET JOBS OFFERS

// function* getJobsOffersSaga() {
//   try {
//     const offers = yield call(apiGetJobsOffers);
//     yield put({type: GET_JOBS_OFFERS_SUCCESS, offers})
//   } catch (error) {
//     console.log(error);
//   }
// }

// END

function* getAllCampaignsSaga() {
  try {
    const url = `${API_SERVER}/GetCampaigns`;
    const result = yield call(apiManualRequest, url);
    const resultParsed = JSON.parse(result.data);
    yield put(getAllCampaignsSuccess(resultParsed));
  } catch (error) {
    console.log(error);
  }
}
function* getAllJobCategorySaga() {
  try {
    const url = `${API_SERVER}/GetJobCategories`;
    const result = yield call(apiOpenRequest, url);
    const resultParsed = JSON.parse(result.data);
    yield put(getAllJobCategorySuccess(resultParsed));
  } catch (error) {
    console.log(error);
  }
}

function* saveAndPublishAdvertisementSaga() {
  try {
    let url;
    let body;
    let parsedCompany = {};

    const { advertisement, client, companyProfile } = store.getState();
    const formValues = getFormValues('vacancy')(store.getState());
    const paymentInfoForm = getFormValues('paymentInfo')(store.getState());
    const uuid = client.user.data[2];
    const userRole = client.user.data[6].user_type;
    const payment_method = paymentInfoForm && paymentInfoForm.payment_method;
    const companyBusinessId = companyProfile.profile.companyBusinessId;

    if (!formValues.companyBusinessId) {
      formValues.companyBusinessId = companyBusinessId; // Also sending company_id to add company specific post.
    }

    yield put(closeDialog());

    if (userRole === 'admin') {
      const companyDetails = {
        companyBusinessId: parseInt(formValues.companyBusinessId),
        uuid,
      };
      const jobPostOwner = yield call(apiManualPost, `${API_SERVER_EST}/postJob`, JSON.stringify({ ...companyDetails }));
      parsedCompany = JSON.parse(jobPostOwner.data);
    }

    const { selectedCampaign, isSaveAdvertisementAsDraft, isToEdit, uploadedImage, marketingDetails, extraService } = advertisement;
    const isDraft = isSaveAdvertisementAsDraft;
    const refinedUploadedImage = uploadedImage && uploadedImage.name && uploadedImage.name.replace(/\s+\(\d+\)/g, 'JP'); // If stored filename has (int), dropzone doesn't understand the path..so changing such names before sending to db.
    const refinedFormValues = filterObj('image_document', formValues);

    if (isToEdit) {
      url = `${API_SERVER}/UpdateJobPost`;
    } else {
      url = `${API_SERVER_EST}/postJob`;
    }

    const statusToUpdate = isDraft || extraService.help || extraService.sos ? 0 : selectedCampaign.type === 'free' ? 1 : 4;

    const selectedService = extraService.help ? 'help' : extraService.sos ? 'sos' : null;

    // image_document array means, it already exists in db, no need to send while updating
    if (Array.isArray(formValues.image_document) === true) {
      body = {
        ...refinedFormValues,
        uuid,
        campaign_type: selectedCampaign.type,
        status: statusToUpdate,
        extra_service: selectedService,
      };
    } else if (!uploadedImage.name) {
      // no uploaded image means, no need to send any base64. Also, if there is an image stored in db..and we want to delete it, I am changing the formvalues of image_document in component
      body = {
        ...formValues,
        uuid,
        campaign_type: selectedCampaign.type,
        status: statusToUpdate,
        extra_service: selectedService,
      };
    } else if (uploadedImage.name && !Array.isArray(formValues.image_document)) {
      const base64 = formValues.image_document;
      body = {
        ...formValues,
        uuid,
        campaign_type: selectedCampaign.type,
        status: statusToUpdate,
        image_document: {
          uuid,
          document_id: uploadedImage.id,
          path: '',
          filename: refinedUploadedImage,
          filetype: uploadedImage.type,
          data: base64,
        },
        extra_service: selectedService,
      };
    }
    if (selectedCampaign.includes_mktbudget) {
      const { marketing_platform, more_budget, marketing_budget } = marketingDetails;
      body.marketing_platform = !!marketing_platform ? marketing_platform : null;
      body.more_budget = !!more_budget ? more_budget : null;
      body.marketing_budget = !!marketing_budget ? parseInt(marketing_budget) : 0;
    }
    // SAVING AND PUBLISHING JOBPOST
    const result = yield call(apiManualPost, url, JSON.stringify({ ...body }));
    const parsedResult = JSON.parse(result.data);
    //console.log(result.data);
    // If publishing post, Generate invoice under the hood via Talousvirta API or online payment via NETS

    if (parsedResult) {
      const { company_name, business_id, firstname, lastname, email, address, zip_code, city } =
        userRole === 'admin' ? parsedCompany[0] : companyProfile.profile;
      const jobTitle = formValues.jobName;
      const postId = parsedResult[0].jobPostNumber;
      const orderId = parsedResult[0].order_id;
      const publishedPostStatus = parsedResult[0].job_post_status;
      const description = `${jobTitle} | Kampanjapaketti - ${customTranslateCampaign(selectedCampaign.id)}`;
      const mkt_description = `${jobTitle} | Lisätty markkinointiraha`;

      const extra_service_description = `Aktivoitu lisäpalvelu | ${extraService.help ? 'HELP' : 'SOS'}`;

      // If mkt budget is added with campaigns with mkt budget, i.e. 5th campaign for now.
      let marketing_budget = 0;
      if (selectedCampaign.includes_mktbudget && !!parsedResult[0].marketing_budget) {
        marketing_budget = parsedResult[0].marketing_budget;
      }

      const extra_service_fee = extraService.help ? HELP_SERVICE_FEE : extraService.sos ? SOS_SERVICE_FEE : 0;

      if (
        (publishedPostStatus === 0 && extra_service_fee > 0) || // If help and sos are added as extra service
        publishedPostStatus === 4 // If paid campaigns are selected, temporary placeholder status
      ) {
        const isExtraServiceAdded = publishedPostStatus === 0 && extra_service_fee > 0 ? true : false;
        const extra_service_fee_with_vat = extra_service_fee * 1.24; // Total price for the extra service including vat

        const amount = parsedResult[0].job_post_campaign_money;
        const totalSum = (marketing_budget + amount) * 1.24;

        const details = {
          company_id: formValues.company_id,
          company_name,
          business_id,
          firstname,
          lastname,
          email,
          address,
          zip_code,
          city,
          description: isExtraServiceAdded ? extra_service_description : description,
          totalSum: isExtraServiceAdded ? extra_service_fee_with_vat : totalSum,
          amount: isExtraServiceAdded ? extra_service_fee : amount,
          post_id: postId,
          order_id: orderId,
          marketing_budget,
          mkt_description,
          selectedCampaign,
        };

        if (payment_method === 'invoice') {
          yield put(sendInvoiceToTalous(details));
        } else if (payment_method === 'online') {
          yield put(registerPayment(details));
        }
      }
      // Post saved as a draft or free campaign or help/sos feature
      //if (parsedResult[0].job_post_status !== 4)
      else {
        yield put(saveAndPublishAdvertisementSuccess());
      }
    } else {
      yield put(saveAndPublishAdvertisementFailed());
    }
  } catch (error) {
    console.log(error);
    yield put(saveAndPublishAdvertisementFailed());
  }
}

function* getJobPostByPostIdSaga({ id }) {
  try {
    const url = `${API_SERVER_EST}/${id}`;
    const companyBusinessId = store.getState().companyProfile.profile.companyBusinessId;
    const userRole = store.getState().client.user.data[6].user_type;

    const body = JSON.stringify({
      jobPostNumber: userRole === 'admin' ? id.split('admin')[0] : id,
      companyBusinessId: userRole === 'admin' ? id.split('admin')[1] : companyBusinessId,
    });
    const result = yield call(apiOpenRequest, url, body);
    const resultParsed = JSON.parse(result.data);
    yield put(openAdToSeeAdInfoSuccess(resultParsed[0]));
  } catch (error) {
    console.log(error);
    yield put(hideSpinner());
  }
}

function* getAllAdsByStatusSaga({ status }) {
  try {
    const url = `${API_SERVER}/SearchJobPosts`;
    const { client, usersCompanyList, companyProfile } = store.getState();
    const uuid = client.user.data[2];
    const roleId = client.user.data[5];
    let selectedCompanyId;
    selectedCompanyId = usersCompanyList.selectedCompany.company_id;
    const assignedCompanyId = client.user.data[6].company_id;

    if (!selectedCompanyId) {
      // For first time registered users, client company_id is null since user profile is not updated
      selectedCompanyId = companyProfile.profile.company_id;
    }

    const company_id = roleId === 0 ? selectedCompanyId : assignedCompanyId; //super user with many companies
    const body = JSON.stringify({
      status,
      uuid,
      company_id,
    });

    const result = yield call(apiManualPost, url, body);
    const resultParsed = JSON.parse(result.data);
    yield put(getAllAdsByStatusSuccess(status, resultParsed));
  } catch (error) {
    console.log(error);
  }
}
// Populating vacancy form when editing or copying
function* populateVacancyFormSaga({ id, isToEdit }) {
  try {
    const url = `${API_SERVER_EST}`;
    const companyId = store.getState().jobsToRender.companyBusinessId;
    //const campaigns = store.getState().advertisement.campaigns;
    const userRole = store.getState().client.user.data[6].user_type;

    const body = JSON.stringify({
      jobPostNumber: userRole === 'admin' ? id.split('admin')[0] : id,
      companyBusinessId: userRole === 'admin' ? id.split('admin')[1] : companyId,
    });
    const result = yield call(apiManualPost, url, body);
    const resultParsed = JSON.parse(result.data);
    // console.log('resultParsed', resultParsed);
    // If we are populating from Draft Component, we are editing--> call UpdateJobPost API, it needs company_id && post_id which is being sent along with the vacancy form!

    const {
      post_id,
      company_id,
      company_image,
      image_id,
      job_title,
      job_type,
      job_hours,
      job_category,
      job_location,
      job_description,
      is_agreement,
      due_date,
      is_email_notification,
      email,
      notice_frequency,
      campaign_id,
      marketing_platform,
      more_budget,
      marketing_budget,
      application_link,
    } = resultParsed[0];

    if (isToEdit) {
      yield put(change('vacancy', 'post_id', post_id));
      yield put(change('vacancy', 'company_id', company_id));
      if (company_image) {
        yield put(change('vacancy', 'image_document', company_image));
        yield put(change('vacancy', 'image_id', image_id));
      }
    }
    yield put(change('vacancy', 'job_title', job_title));
    yield put(change('vacancy', 'job_type', job_type));
    yield put(change('vacancy', 'job_hours', job_hours));
    yield put(change('vacancy', 'job_category', job_category));
    yield put(change('vacancy', 'job_location', job_location));
    yield put(change('vacancy', 'job_description', job_description));
    yield put(change('vacancy', 'is_agreement', is_agreement));
    yield put(change('vacancy', 'application_link', application_link));

    yield put(change('vacancy', 'due_date', due_date));
    yield put(change('vacancy', 'is_email_notification', is_email_notification));
    yield put(change('vacancy', 'email', email));
    yield put(change('vacancy', 'notice_frequency', notice_frequency));

    //const postCampaign = campaigns.find(campaign => campaign.id === campaign_id);

    const campaignDetails = {
     // postCampaign,
      marketing_platform,
      more_budget,
      marketing_budget,
    };

    yield put(populateVacancyFormSuccess(campaignDetails, isToEdit));
  } catch (e) {
    console.log(e);
  }
}

// Update advertisement - editAdvertForm is open/ Campaigns are not shown here.

function* updateJobPostSaga() {
  try {
    const advertisement = store.getState().advertisement.viewSelectedAd;
    const keys = Object.keys(advertisement);
    // console.log('keys', keys);
    const refinedKeys =
      keys &&
      keys.filter(
        key =>
          key !== 'company_image' &&
          key !== 'total_applicants' &&
          key !== 'total_likes' &&
          key !== 'total_viewed' &&
          key !== 'value' &&
          key !== 'company_logo' &&
          key !== 'marketing_budget', // Don't update budget when just editing vacancy.
      ); // Irrelevant keys, not needed here

    for (const key of refinedKeys) {
      yield put(change('editVacancy', key, advertisement[key]));
    }
    if (advertisement.company_image) {
      yield put(change('editVacancy', 'image_document', advertisement.company_image));
    }
    if (!advertisement.notice_frequency) {
      yield put(change('editVacancy', 'notice_frequency', 7));
    }
    yield put(change('editVacancy', 'is_agreement', true));
  } catch (error) {
    console.log(error);
  }
}

function* updateAndPublishAdvertisementSaga() {
  try {
    let body;
    const url = `${API_SERVER}/UpdateJobPost`;
    const formValues = getFormValues('editVacancy')(store.getState());
    const uuid = store.getState().client.user.data[2];
    const { uploadedImage } = store.getState().advertisement;
    const userRole = store.getState().client.user.data[6].user_type;

    const refinedUploadedImage = uploadedImage && uploadedImage.name && uploadedImage.name.replace(/\(\d+\)/, 'JP'); // If stored filename has (int), dropzone doesn't understand the path..so changing such names before sending to db.
    const refinedFormValues = filterObj('image_document', formValues);

    // image_document array means, it already exists in db, no need to send while updating
    if (Array.isArray(formValues.image_document) === true) {
      body = JSON.stringify({
        ...refinedFormValues,
        uuid,
      });
    } else if (!uploadedImage.name) {
      // no uploaded image means, no need to send any base64. Also, if there is an image stored in db..and we want to delete it, I am changing the formvalues of image_document in component
      body = JSON.stringify({
        ...formValues,
        uuid,
      });
    } else {
      const base64 = formValues.image_document;
      body = JSON.stringify({
        ...formValues,
        uuid,
        image_document: {
          uuid,
          document_id: uploadedImage.id,
          path: '',
          filename: refinedUploadedImage,
          filetype: uploadedImage.type,
          data: base64,
        },
      });
    }

    const result = yield call(apiManualPost, url, body);
    const parsedResult = JSON.parse(result.data);
    if (parsedResult) {
      yield put(updateAndPublishAdvertisementSuccess());
      if (userRole === 'admin') {
        yield put(openAdToSeeAdInfo(`${formValues.post_id}admin${formValues.company_id}`));
      } else {
        yield put(openAdToSeeAdInfo(formValues.post_id));
      }
    } else {
      yield put(saveAndPublishAdvertisementFailed());
    }
  } catch (e) {
    console.log(e);
    yield put(saveAndPublishAdvertisementFailed());
  }
}

// Update campaign
function* updateCampaignSaga({ id }) {
  try {
    yield put(closeDialog());

    const { advertisement, client, companyProfile } = store.getState();
    const paymentInfoForm = getFormValues('paymentInfo')(store.getState());
    const payment_method = paymentInfoForm && paymentInfoForm.payment_method;

    // Upgrade campaign
    const url = `${API_SERVER}/HandleCampaignUpgrade`;
    const uuid = store.getState().client.user.data[2];
    const { type, includes_mktbudget } = advertisement.selectedCampaign;
    const campaign_id = advertisement.selectedCampaign.id;
    const userRole = client.user.data[6].user_type;
    const post_id = userRole === 'admin' ? id.split('admin')[0] : id;
    const companyId = userRole === 'admin' ? id.split('admin')[1] : companyProfile.profile.company_id;
    const due_date = formValueSelector('campaign')(store.getState(), 'due_date');
    let parsedCompany = {};

    const body = {
      campaign_type: type,
      uuid,
      post_id,
      company_id: companyId,
      due_date,
    };

    if (includes_mktbudget) {
      const { marketing_platform, more_budget, marketing_budget } = advertisement.marketingDetails;

      body.marketing_platform = !!marketing_platform ? marketing_platform : null;
      body.more_budget = !!more_budget ? more_budget : null;
      body.marketing_budget = !!marketing_budget ? parseInt(marketing_budget) : 0;
    }

    const result = yield call(apiManualPost, url, JSON.stringify({ ...body }));
    const resultParsed = JSON.parse(result.data);

    if (resultParsed) {
      //If admin is upgrading post or updating jobpost on behalf of companies:
      if (userRole === 'admin') {
        const body2 = {
          company_id: parseInt(companyId),
          uuid,
        };
        const jobPostOwner = yield call(apiManualPost, `${API_SERVER}/GetCompanyProfile`, JSON.stringify({ ...body2 }));
        parsedCompany = JSON.parse(jobPostOwner.data);
      }

      const { company_name, business_id, firstname, lastname, email, address, zip_code, city } =
        userRole === 'admin' ? parsedCompany[0] : companyProfile.profile;
      const jobTitle = advertisement.viewSelectedAd.job_title;
      const description = `${jobTitle} | Kampanjapaketti - ${customTranslateCampaign(campaign_id)}`;
      const mkt_description = `${jobTitle} | Lisätty markkinointiraha`;

      const orderId = resultParsed[0].order_id;
      const previousCampaignPrice = resultParsed[0].prev_campaign_money;
      const newCampaignPrice = resultParsed[0].new_campaign_money;
      const amount = newCampaignPrice - previousCampaignPrice;

      // If mkt budget is added.
      let marketing_budget = 0;
      const newMarketingBudget = resultParsed[0].marketing_budget;
      if (includes_mktbudget && newMarketingBudget > 0) {
        marketing_budget = newMarketingBudget;
      }
      const totalSum = (marketing_budget + amount) * 1.24;

      // If new and more expensive campaign price OR more marketing budget, generate invoice

      const details = {
        company_id: companyId,
        company_name,
        business_id,
        firstname,
        lastname,
        email,
        address,
        zip_code,
        city,
        description,
        totalSum,
        amount,
        post_id: parseInt(post_id),
        order_id: orderId,
        marketing_budget,
        mkt_description,
        isSameCampaign: amount === 0 ? true : false, // Meaning same campaign but new budget
        selectedCampaign: advertisement.selectedCampaign,
        postIdToFetch: id,
      };
      if (payment_method === 'invoice') {
        yield put(sendInvoiceToTalous(details));
      } else if (payment_method === 'online') {
        yield put(registerPayment(details));
      } else {
        yield put(showSuccessSnackbar());
      }
    }
  } catch (error) {
    console.log(error);
    yield put(showFailedSnackbar());
  }
}

function* changeJobPostStatusSaga({ id }) {
  try {
    const url = `${API_SERVER}/UpdateJobPostStatus`;
    const { company_id } = store.getState().companyProfile.profile;
    const post_id = id;
    const userRole = store.getState().client.user.data[6].user_type;

    const body = JSON.stringify({
      post_id: userRole === 'admin' ? id.split('admin')[0] : post_id, // For admins, we need to get company id from post itself
      company_id: userRole === 'admin' ? id.split('admin')[1] : company_id,
      status: 2,
    });
    const result = yield call(apiManualPost, url, body);
    if (result.data === 'Job Post Status updated successfully!') {
      yield put(showSuccessSnackbar());
      yield put(openAdToSeeAdInfo(id));
    } else {
      yield put(showFailedSnackbar());
    }
  } catch (e) {
    console.log(e);
  }
}
function* saveMarketingDetailsSaga() {
  try {
    const formValues = getFormValues('marketingDetails')(store.getState());
    const { marketing_platform, more_budget, marketing_budget } = formValues;
    if (!marketing_platform) {
      yield put(touch('marketingDetails', 'marketing_platform'));
      return;
    }
    if (!more_budget) {
      yield put(touch('marketingDetails', 'more_budget'));
      return;
    }
    if (more_budget === 'yes') {
      if (!marketing_budget) {
        yield put(touch('marketingDetails', 'marketing_budget'));
        return;
      }
    }
    if (marketing_budget && (parseInt(marketing_budget) < 1 || !/^[0-9]+$/.test(marketing_budget))) {
      return;
    }
    yield put(saveMarketingDetailsSuccess(formValues));
    yield put(closeDialog());
  } catch (e) {
    console.log(e);
  }
}

function* displayInitialDetails({ isToEdit }) {
  try {
    if (!isToEdit) yield put(initialize('applicantDetails', getFormInitialValues('applicantDetails')(store.getState())));
  } catch (e) {
    console.log(e);
  }
}
function* deleteJobPostSaga({ id }) {
  try {
    const url = `${API_SERVER}/DeleteJobPost`;
    const companyId = store.getState().companyProfile.profile.company_id;
    const userRole = store.getState().client.user.data[6].user_type;

    const body = JSON.stringify({
      post_id: userRole === 'admin' ? id.split('admin')[0] : id,
      company_id: userRole === 'admin' ? id.split('admin')[1] : companyId,
    });
    yield call(apiManualPost, url, body);

    if (userRole === 'admin') {
      yield put(filterJobs(true));
    } else {
      yield put(getAllAdsByStatus(0));
      yield put(getAllAdsByStatus(1));
      yield put(getAllAdsByStatus(2));
    }
  } catch (error) {
    console.log(error);
  }
}
function* saveAdvertisementAsDraft() {
  yield put(saveAndPublishAdvertisement());
}

function* getApplicationDetailsByIdSaga({ application_id, company_id, post_id, email }) {
  try {
    const url = `${API_SERVER}/GetApplicationById`;

    const body = JSON.stringify({
      application_id,
      company_id,
      post_id,
      email,
    });

    const result = yield call(apiManualPost, url, body);
    const resultParsed = JSON.parse(result.data);
    if (resultParsed) {
      yield put(getApplicationDetailsByIdSuccess(resultParsed[0]));
      yield put(openAdToSeeAdInfo(post_id));
    }

    /* if (!resultParsed[0].interview_title) {
      const form = getFormValues('applicantDetails')(store.getState());
      form.interview_title = 'Haastattelu';
    } */
  } catch (e) {
    console.log(e);
  }
}

function* updateApplicantStatusSaga({ application_id, company_id, post_id, email, status }) {
  try {
    const url = `${API_SERVER}/UpdateJobApplicationStatus`;
    const body = JSON.stringify({
      application_id,
      company_id,
      post_id,
      email,
      status,
    });
    const result = yield call(apiManualPost, url, body);
    if (result.data === "Job Application's status updated successfully!") {
      //yield put(showSuccessSnackbar());
      yield put(getApplicationDetailsById(application_id, company_id, post_id, email));
      yield put(openAdToSeeAdInfo(post_id));
    } else {
      yield put(showFailedSnackbar());
    }
  } catch (e) {
    console.log(e);
  }
}
function* updateJobApplicationDetailsSaga({ application_id, company_id, post_id, email, update }) {
  try {
    let body;
    const url = `${API_SERVER}/UpdateJobApplicationDetails`;
    const formValues = getFormValues('applicantDetails')(store.getState());
    const loggedInUser = store.getState().client.user.data[1];
    const { application_notes, interview_title, interview_msg, interview_date, interview_time, interview_place } = formValues;

    if (update === 'note') {
      body = JSON.stringify({
        application_id,
        company_id,
        post_id,
        email,
        update,
        application_notes,
      });
    } else {
      body = JSON.stringify({
        application_id,
        company_id,
        post_id,
        email,
        update,
        interview_title,
        interview_msg,
        interview_date,
        interview_time,
        interview_place,
        loggedInUser,
      });
    }
    const result = yield call(apiManualPost, url, body);
    if (result.data === "Job Application's details updated successfully!" || result.data === 'Interview reminder emails sent successfully!') {
      yield put(showSuccessSnackbar());
      yield put(getApplicationDetailsById(application_id, company_id, post_id, email));
      yield put(openAdToSeeAdInfo(post_id));
    } else {
      yield put(showFailedSnackbar());
    }
    // console.log('result', result);
  } catch (e) {
    console.log(e);
  }
}

// Dashboard chart
function* getJobPostViewsByDateSaga() {
  try {
    const url = `${API_SERVER}/GetJobPostViewsByDate`;
    const { company_id } = store.getState().advertisement.viewSelectedAd;
    const { post_id } = store.getState().advertisement.viewSelectedAd;
    const body = JSON.stringify({
      company_id,
      post_id,
    });
    const result = yield call(apiManualPost, url, body);
    const resultParsed = JSON.parse(result.data);
    if (resultParsed) {
      yield put(getJobPostViewsByDateSuccess(resultParsed));
    }
  } catch (e) {
    console.log(e);
  }
}

//DELETE APPLICATION SAGA
function* deleteApplicationSaga() {
  try {
    const url = `${API_SERVER}/DeleteApplicationById`;
    const { applicationDetailsToDelete } = store.getState().advertisement;
    const { selectedAd } = store.getState().advertisement;

    const body = JSON.stringify({
      ...applicationDetailsToDelete,
    });

    const result = yield call(apiManualPost, url, body);

    if (result.data === 'Job application successfully deleted') {
      yield put(openAdToSeeAdInfo(selectedAd));
    }
  } catch (error) {
    console.log(error);
  }
}

function* changeRouteSaga() {
  try {
    const userRole = store.getState().client.user.data[6].user_type;

    if (userRole === 'company') {
      browserHistory.push('/omat-ilmoitukseni');
    }
    if (userRole === 'admin') {
      browserHistory.push('/lisapalvelu');
    }
    yield put(null); //Yield statement for generator function
  } catch (error) {
    console.log(error);
  }
}

// When navigateAdsFromMainMenu is dispatched, we want to ensure the page lands to 0 index.
function* changePaginationSaga() {
  yield put(changeAdvertPage({ selected: 0 }));
}

function* adminGetUserCompanyProfileSaga({ id }) {
  const url = `${API_SERVER}/GetCompanyProfile`;

  try {
    const uuid = store.getState().client.user.data[2];
    const body = JSON.stringify({ company_id: id, uuid });
    const result = yield call(apiManualPost, url, body);
    const resultParsed = JSON.parse(result.data)[0];
    yield put(getCompanyProfileSuccess(resultParsed));
  } catch (e) {
    console.log(e);
  }
}

// Automatic answers with email messages saga
function* populateEmailMessageSaga({ languages }) {
  const companyName = store.getState().usersCompanyList.selectedCompany?.company_name;
  const storedLanguages = formValueSelector('vacancy')(store.getState(), 'email_language');

  const isToSendAutoEmail = store.getState().advertisement.automaticEmailToggleBtn;

  try {
    if (isToSendAutoEmail) {
      const messages = messageTemplate(companyName, languages ? languages : storedLanguages);
      yield put(change('vacancy', 'email_message', messages));
    }
  } catch (e) {
    console.log(e);
  }
}

// export function* watchGetJobsOffersSaga() {
//   yield takeEvery(GET_JOBS_OFFERS, getJobsOffersSaga);
// } // GET JOBS OFFERS
export function* watchsaveAndPublishAdvertisementSaga() {
  yield takeEvery(SAVE_AND_PUBLISH_ADVERTISEMENT, saveAndPublishAdvertisementSaga);
}
export function* watchupdateAndPublishAdvertisementSaga() {
  yield takeEvery(UPDATE_AND_PUBLISH_ADVERTISEMENT, updateAndPublishAdvertisementSaga);
}
export function* watchSaveAdvertisementAsDraft() {
  yield takeEvery(SAVE_ADVERTISEMENT_AS_DRAFT, saveAdvertisementAsDraft);
}

export function* watchgetAllCampaignsSaga() {
  yield takeEvery(GET_ALL_CAMPAIGNS, getAllCampaignsSaga);
}

export function* watchgetAllJobCategorysSaga() {
  yield takeEvery(GET_ALL_JOB_CATEGORY, getAllJobCategorySaga);
}

export function* watchgetAllAdsByStatusSaga() {
  yield takeEvery(GET_ALL_ADS_BY_STATUS, getAllAdsByStatusSaga);
}
export function* watchgetJobPostByPostIdSaga() {
  yield takeEvery(OPEN_AD_TO_SEE_AD_INFO, getJobPostByPostIdSaga);
}
// export function* watchgetJobPostByPostIdSaga() {
//   yield takeEvery(GET_AND_OPEN_JOB_POSTS_SUCCESS, getJobPostByPostIdSaga);
// }

export function* watchdeleteJobPostSaga() {
  yield takeEvery(DELETE_ADVERTISEMENT, deleteJobPostSaga);
}
export function* watchupdateJobPostSaga() {
  yield takeEvery(UPDATE_ADVERTISEMENT, updateJobPostSaga);
}
export function* watchpopulateVacancyFormSaga() {
  yield takeEvery(POPULATE_VACANCY_FORM, populateVacancyFormSaga);
}
export function* watchupdateCampaignSaga() {
  yield takeEvery(SAVE_NEW_CAMPAIGN, updateCampaignSaga);
}
export function* watchchangeJobPostStatusSaga() {
  yield takeEvery(CHANGE_ACTIVE_POST_TO_INACTIVE, changeJobPostStatusSaga);
}
export function* watchgetApplicationDetailsByIdSaga() {
  yield takeEvery(GET_APPLICATION_DETAILS_BY_ID, getApplicationDetailsByIdSaga);
}
export function* watchupdateApplicantStatusSaga() {
  yield takeEvery(UPDATE_APPLICANT_STATUS, updateApplicantStatusSaga);
}
export function* watchupdateJobApplicationDetailsSaga() {
  yield takeEvery(UPDATE_JOB_APPLICATION_DETAILS, updateJobApplicationDetailsSaga);
}
export function* watchgetJobPostViewsByDateSaga() {
  yield takeEvery(GET_JOBPOST_VIEWS_BY_DATE, getJobPostViewsByDateSaga);
}
export function* watchchangePaginationSaga() {
  yield takeEvery(NAVIGATE_ADS_FROM_MAIN_MENU, changePaginationSaga);
  yield takeEvery(OPEN_AD_TO_SEE_AD_INFO, changePaginationSaga);
}

export function* watchEditInterviewDetailsSaga() {
  yield takeEvery(EDIT_INTERVIEW_DETAILS, displayInitialDetails);
}
export function* watchSaveMarketingDetailsSaga() {
  yield takeEvery(SAVE_MARKETING_DETAILS, saveMarketingDetailsSaga);
}

export function* watchdeleteApplicationSaga() {
  yield takeEvery(DELETE_APPLICATION, deleteApplicationSaga);
}

export function* watchChangeRouteSaga() {
  yield takeEvery(CHANGE_ROUTE, changeRouteSaga);
}

export function* watchAdminGetUserCompanyProfileSaga() {
  yield takeEvery(ADMIN_GET_USER_PROFILE, adminGetUserCompanyProfileSaga);
}

export function* watchPopulateEmailMessageSaga() {
  yield takeEvery(POPULATE_EMAIL_MESSAGE, populateEmailMessageSaga);
  yield takeEvery(AUTO_EMAIL_TO_APPLICANT, populateEmailMessageSaga);
}
