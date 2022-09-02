import i18next from 'i18next';

export const customTranslateCampaign = campaignId => {
  let campaign;
  switch (campaignId) {
    case 'fd188ed8-80e3-4f02-9ca5-b1bb14f73f6b': // Free
      campaign = i18next.t('campaigns:type1');
      break;
    case '5bb74a6f-ec6e-4dab-bf04-1d344d03a9be': // Lift
      campaign = i18next.t('campaigns:type2');
      break;

    case '142c7490-6cb4-4799-9b38-6807bc1954f3': // Frontpage news
      campaign = i18next.t('campaigns:type3');
      break;

    case 'fd90b98a-c44f-4c38-9f96-2cbe9d3f3739': // Remarkable job
      campaign = i18next.t('campaigns:type4');
      break;

    case 'e4f3fb19-db74-4aac-8190-6fa936aa0ac5': // Social media star
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
