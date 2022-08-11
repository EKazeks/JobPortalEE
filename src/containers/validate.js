import i18next from 'i18next';
import store from '../store';

export const registerValidate = values => {
  const errors = {};
  const requiredFields = ['firstName', 'lastName', 'email', 'password', 'user_type', 'agreement_terms'];

  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = i18next.t('validation:fieldRequired');
    }
  });

  if (values.password && !/^(?=.*[äöåa-z])(?=.*[ÄÖÅA-Z])(?=.*\d)[äöåa-zÄÖÅA-Z\d]*\S{8,}$/.test(values.password)) {
    errors.password = i18next.t('validation:invalidPassword');
  }

  if (values.password !== values.passwordConfirmation) {
    errors.passwordConfirmation = i18next.t('validation:unmatchedPassword');
  }

  if (!values.passwordConfirmation) {
    errors.passwordConfirmation = i18next.t('validation:confirmPassword');
  }

  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = i18next.t('validation:invalidEmail');
  }

  // console.log("errors", errors);
  return errors;
};

export const signInValidate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = i18next.t('validation:fieldRequired');
  }
  if (!values.password) {
    errors.password = i18next.t('validation:fieldRequired');
  }
  return errors;
};

export const jobPostFormValidate = values => {
  const errors = {};
  const extra_service = store.getState().advertisement.extraService;
  const requiredFields = ['jobTitle', 'jobCategory', 'jobType', 'jobDuration', 'lastApplicationDate', 'jobLocation', 'is_agreement', 'jobDescription'];

  if (!extra_service.sos) {
    requiredFields.push('job_description');
  }
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = i18next.t('validation:fieldRequired');
    }
  });

  if (
    (values.due_date &&
      // validate for date that is less than today
      new Date(values.due_date).setHours(0, 0, 0, 0) - new Date().setHours(0, 0, 0, 0) < 0) ||
    (values.due_date &&
      // validate for date that is less than today
      new Date(values.due_date).setHours(0, 0, 0, 0) - new Date().setHours(0, 0, 0, 0) === 0) ||
    // validate for date that is more than allowed 4 weeks - if given date is more than +30 days from today
    (values.due_date && new Date(values.due_date).getTime() > new Date().getTime() + 30 * 24 * 60 * 60 * 1000)
  ) {
    errors.due_date = i18next.t('validation:invalidDueDate');
  }

  if (values.job_description && isRteEmpty(values.job_description)) {
    errors.job_description = i18next.t('validation:fieldRequired');
  }

  if (values.is_email_notification && !values.email) {
    errors.email = i18next.t('validation:fieldRequired');
  }
  if (values.is_email_notification && values.email && isEmpty(values.email)) {
    errors.email = i18next.t('validation:fieldRequired');
  }
  if (
    values.applicationUrl &&
    !/^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm.test(
      values.applicationUrl,
    )
  ) {
    errors.applicationUrl = i18next.t('validation:urlInvalid');
  }
  return errors;
};

export const passwordValidate = values => {
  const errors = {};
  const requiredFields = ['current_password', 'new_password', 'new_password_confirmation'];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = i18next.t('validation:fieldRequired');
    }
  });

  if (values.new_password && !/^(?=.*[äöåa-z])(?=.*[ÄÖÅA-Z])(?=.*\d)[äöåa-zÄÖÅA-Z\d]*\S{8,}$/.test(values.new_password)) {
    errors.new_password = i18next.t('validation:invalidPassword');
  }

  if (values.new_password !== values.new_password_confirmation) {
    errors.new_password_confirmation = 'Antamasi salasanat eivät täsmää';
  }
  return errors;
};

export const profileValidate = values => {
  const errors = {};
  const requiredFields = ['company_name', 'firstname', 'lastname', 'email', 'contact_number', 'business_id', 'address', 'city', 'zip_code'];

  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = i18next.t('validation:fieldRequired');
    }
  });

  //

  // city validation
  if (values.city && !/^[äåöA-Z]+$/i.test(values.city)) {
    errors.city = i18next.t('validation:cityInvalid');
  }
  if (values.company_name && isEmpty(values.company_name)) errors['company_name'] = i18next.t('validation:emptyStr');

  if (values.address && isEmpty(values.address)) errors['address'] = i18next.t('validation:emptyStr');

  // zip code validation
  if (values.zip_code && !/^\d{5}$/i.test(values.zip_code)) {
    errors.zip_code = i18next.t('validation:postInvalid');
  }

  // business_id validation
  if (values.business_id && !/^\d{7}-\d{1}$/i.test(values.business_id)) {
    errors.business_id = i18next.t('validation:businessIdInvalid');
  }

  // phoneNumber validation
  if (values.contact_number && !/^\+?[0-9 ]{7,13}$/i.test(values.contact_number)) {
    errors.contact_number = i18next.t('validation:phoneInvalid');
  }

  if (
    values.company_url &&
    !/^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm.test(
      values.company_url,
    )
  ) {
    errors.company_url = i18next.t('validation:urlInvalid');
  }

  // For additional users

  if (values.companyUser) {
    const userArrayErrors = [];

    values.companyUser.forEach((user, i) => {
      const userErrors = {};

      const reqUserFields = ['firstname', 'lastname', 'email'];

      reqUserFields.forEach(field => {
        if (!user || !user[field]) {
          userErrors[field] = i18next.t('validation:fieldRequired');
          userArrayErrors[i] = userErrors;
        }
      });

      if (
        values.companyUser[i].email &&
        (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.companyUser[i].email) || values.companyUser[i].email === values.email)
      ) {
        userErrors.email = i18next.t('validation:invalidEmail');
        userArrayErrors[i] = userErrors;
      }
      if (userArrayErrors.length) {
        errors.companyUser = userArrayErrors;
      }
    });
  }
  return errors;
};

export const jobseekerProfileValidate = values => {
  const errors = {};
  const requiredFields = ['firstname', 'lastname', 'email', 'agreement_terms', 'profile_description'];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = i18next.t('validation:fieldRequired');
    }
  });

  if (values.firstname && isEmpty(values.firstname)) {
    errors['firstname'] = i18next.t('validation:emptyStr');
  }

  if (values.lastname && isEmpty(values.lastname)) {
    errors['lastname'] = i18next.t('validation:emptyStr');
  }

  if (values.profile_description && isEmpty(values.profile_description)) {
    errors['profile_description'] = i18next.t('validation:emptyStr');
  }
  return errors;
};

export const jobPreferenceValidate = values => {
  const errors = {};
  const requiredFields = ['job_category', 'notice_frequency', 'job_location', 'job_type', 'job_hours'];
  requiredFields.forEach(field => {
    if (!values[field] || values[field].length === 0) {
      errors[field] = i18next.t('validation:fieldRequired');
    }
  });

  return errors;
};

export const marketingDetailsValidate = values => {
  const errors = {};
  const requiredFields = ['marketing_platform', 'more_budget'];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = i18next.t('validation:fieldRequired');
    }
  });
  if (values.more_budget === 'yes' && !values.marketing_budget) {
    errors.marketing_budget = i18next.t('validation:fieldRequired');
  }
  if (values.marketing_budget && (parseInt(values.marketing_budget) < 1 || !/^[0-9]+$/.test(values.marketing_budget))) {
    errors.marketing_budget = i18next.t('validation:invalidAmount');
  }
  return errors;
};

export const interviewDetailsValidate = values => {
  const errors = {};
  const requiredFields = ['interview_title', 'interview_msg', 'interview_date', 'interview_time'];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = i18next.t('validation:fieldRequired');
    }
  });
  if (values.interview_title && isMaxLengthExceeded(values.interview_title, 100)) {
    errors.interview_title = i18next.t('validation:maxLengthInterviewTitle');
  }
  if (values.interview_msg && isMaxLengthExceeded(values.interview_msg, 1000)) {
    errors.interview_msg = i18next.t('validation:maxLengthInterview');
  }
  if (
    values.interview_date &&
    typeof values.interview_date === 'string' && //For dates coming from backend
    new Date(values.interview_date) < new Date()
  ) {
    errors.interview_date = i18next.t('validation:invalidDate');
  }

  if (!values.interview_msg || (values.interview_msg && isRteEmpty(values.interview_msg))) {
    errors.interview_msg = i18next.t('validation:fieldRequired&maxLength');
  }
  if (values.interview_place && isMaxLengthExceeded(values.interview_place, 100)) {
    errors.interview_place = i18next.t('validation:maxLengthInterviewTitle');
  }
  /* if (
    values.application_notes &&
    isMaxLengthExceeded(values.application_notes, 100)
  ) {
    errors.application_notes = i18next.t('validation:maxLengthInterview');
  } */
  return errors;
};

export const applicationFormValidate = values => {
  const errors = {};
  const requiredFields = ['firstname', 'lastname', 'email', 'agreement_terms'];

  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = i18next.t('validation:fieldRequired');
    }
  });

  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = i18next.t('validation:invalidEmail');
  }

  // phoneNumber validation
  if (values.contact_number && !/^\+?[0-9 ]{7,13}$/i.test(values.contact_number)) {
    errors.contact_number = i18next.t('validation:phoneInvalid');
  }

  if (values.application_description && isMaxLengthExceeded(values.application_description, 7000)) {
    errors.application_description = i18next.t('validation:maxLengthApplicationDesc');
  }

  return errors;
};

export const campaignValidate = values => {
  const errors = {};
  if (!values.due_date) {
    errors.due_date = i18next.t('validation:fieldRequired');
  }
  if (
    (values.due_date &&
      // validate for date that is less than today
      new Date(values.due_date).setHours(0, 0, 0, 0) - new Date().setHours(0, 0, 0, 0) < 0) ||
    // validate for date that is more than allowed 4 weeks - if given date is more than +30 days from today
    (values.due_date && new Date(values.due_date).getTime() > new Date().getTime() + 30 * 24 * 60 * 60 * 1000)
  ) {
    errors.due_date = i18next.t('validation:invalidDueDate');
  }
  return errors;
};

export const usersProfileValidate = values => {
  const errors = {};
  let requiredFields;

  if (values.company_id) {
    requiredFields = ['company_name', 'firstname', 'lastname', 'email'];
  } else {
    requiredFields = ['firstname', 'lastname', 'email'];
  }

  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = i18next.t('validation:fieldRequired');
    }
  });

  //

  if (values.company_name && isEmpty(values.company_name)) {
    errors['company_name'] = i18next.t('validation:emptyStr');
  }

  if (values.firstname && isEmpty(values.firstname)) {
    errors['firstname'] = i18next.t('validation:emptyStr');
  }

  if (values.lastname && isEmpty(values.lastname)) {
    errors['lastname'] = i18next.t('validation:emptyStr');
  }

  // business_id validation
  if (values.business_id && !/^\d{7}-\d{1}$/i.test(values.business_id)) {
    errors.business_id = i18next.t('validation:businessIdInvalid');
  }

  // phoneNumber validation
  if (values.contact_number && !/^\+?[0-9 ]{7,13}$/i.test(values.contact_number)) {
    errors.contact_number = i18next.t('validation:phoneInvalid');
  }

  if (values.company_url && !/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#()?&//=]*)/gim.test(values.company_url)) {
    errors.company_url = i18next.t('validation:urlInvalid');
  }

  return errors;
};

const isEmpty = str => {
  return !str.trim().length;
};

export const isRteEmpty = str => {
  var regex = /(<([^>]+)>)/gi;
  const text = str
    .replace(regex, '')
    .replace(/&nbsp;/g, '')
    .replace(/\s/g, '');
  return text.length === 0 ? true : false;
};

const isMaxLengthExceeded = (str, length) => {
  const strLength = str.length;
  //console.log('isMaxLengthExceeded', strLength);
  return strLength > length ? true : false;
};
