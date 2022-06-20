import i18next from 'i18next';

export const customTranslateCampaign = campaignId => {
  let campaign;
  switch (campaignId) {
    case 1: // Free
      campaign = i18next.t('campaigns:type1');
      break;
    case 2: // Lift
      campaign = i18next.t('campaigns:type2');
      break;

    case 3: // Frontpage news
      campaign = i18next.t('campaigns:type3');
      break;

    case 4: // Remarkable job
      campaign = i18next.t('campaigns:type4');
      break;

    case 5: // Social media star
      campaign = i18next.t('campaigns:type5');
      break;
    default:
      campaign = '';
  }
  return campaign;
};

export const customTranslateStatus = statusInt => {
  let statusString;
  switch (statusInt) {
    case 0:
      statusString = i18next.t('adDetails:draft');
      break;
    case 1:
      statusString = i18next.t('adDetails:active');
      break;
    case 2:
      statusString = i18next.t('adDetails:inactive');
      break;
    default:
      statusString = '';
  }
  return statusString;
};

export const translateMktplatform = platform => {
  let platformString;
  switch (platform) {
    case 'facebook/instagram':
      platformString = i18next.t('campaigns:facebook');
      break;
    case 'linkedin':
      platformString = i18next.t('campaigns:linkedin');
      break;
    case 'any':
      platformString = i18next.t('campaigns:any');
      break;
    default:
      platformString = i18next.t('campaigns:none');
  }
  return platformString;
};
