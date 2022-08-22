import React from "react";
import store from "../store";

export const customURL = (url,type) => {

  const pathname = url && url.split('/tyopaikat/')[1];
  const splittedPath = pathname && pathname.split('/');
  let {jobName} = store.getState().advertisement.viewSelectedAd
  // const companyName = splittedPath && splittedPath[0]
  let jobPostNumber = '65009'
  const companyId = splittedPath && splittedPath[1];
  //const jobName = splittedPath && splittedPath[2];
  //const jobPostNumber = splittedPath && splittedPath[3];
  //let splittedJobName = jobName.split(' ').join("-").toLowerCase();
  switch (type) {
    case 'internal': // For admins and companies, url path is jobpost/jobTitle/postId
      return `/jobpost/${jobName}/${jobPostNumber}`;

    case 'external': // For public, url path is tyopaikat/companyName/companyId/jobTitle/postId
      return `/tyopaikat/${pathname}`;

    case 'application': // For application form component
      return `/tyopaikat/${jobName}/${companyId}JP${jobPostNumber}/hae`;

    case 'campaign': // For campaign component
      return `/${jobName}/${jobPostNumber}/campaign`;
    default:
      break;
  }
  // const {id} = store.getState().jobs
  // let {jobName} = store.getState().advertisement.viewSelectedAd
  // const {jobPostNumber} = store.getState().jobs
  // const {companyName} = store.getState().jobs
  // const {companyBusinessId} = store.getState().jobs
  // let splittedJobName;
  // // if (jobName === undefined) {
  // //   return jobName = 'customUrl';
  // // } else {
  // // }
  // splittedJobName = jobName.split(' ').join("-").toLowerCase();
  // if (jobName.length >= 40) {
  //   splittedJobName = jobName.split(' ').toString().replace(/[ ,-,,/]/g, '-').toLowerCase()
  // } else if (jobName.includes('/')) {
  //   splittedJobName = jobName.split(' ').toString().replace('/','-').replace(/[,]/gi, '').toLowerCase();
  // } 
    
  // const splittedCompanyName = companyName.split(' ').join('-').toLowerCase();
  
  // switch (type) {
  //   case "internal": // For admins and companies, url path is jobpost/jobTitle/postId
  //     return `/jobpost/${splittedJobName}/${jobPostNumber}`;
      
  //   case "external": // For public, url path is tyopaikat/companyName/companyId/jobTitle/postId
  //     return `/tyopaikat/${splittedCompanyName}/${companyBusinessId}/${splittedJobName}/${jobPostNumber}`;

  //   case "application": // For application form component
  //     return `/tyopaikat/${splittedJobName}/${companyBusinessId}JP${jobPostNumber}/hae`;

  //   case "campaign": // For campaign component
  //     return `/${splittedJobName}/${jobPostNumber}/campaign`;

  //   case "open_position":
  //     return `/tyopaikat/${splittedCompanyName}/${companyBusinessId}/${splittedJobName}/${jobPostNumber}`;
  //   default:
  //     break;
  // }
};

export const convertJobTypeToStr = (t, type) => {
  return (
    <>
      {type === "isPermanentPlace" && t("jobtype:isPermanentPlace")}
      {type === "isPartPlace" && t("jobtype:isPartPlace")}
      {type === "12" && t("jobtype:jobType12")}
      {type === "13" && t("jobtype:jobType13")}
      {type === "14" && t("jobtype:jobType14")}
    </>
  );
};



export const dateFormat = (date) => {
  const formatedDate = date.split("T", 10)[0].split("-");
  const newDateFormat =
    formatedDate[2] + "." + formatedDate[1] + "." + formatedDate[0];
  if (
    newDateFormat == "undefined.undefined." ||
    newDateFormat == "undefined.undefined.string"
  ) {
    return (
      <>
        <p>"Date"</p>
      </>
    );
  } else {
    return <>{newDateFormat}</>;
  }
  //console.log(date);

// if (date === date.slice(-1)) {
//   return formatedDate
// } 

  // if (date === date) {
  //   return date
  // } else if ( date === date.indexOf(':00.000Z')) {
  //    formatedDate = date.split("T", 10)[0].split("-");
  // } else if (formatedDate) {
  //    newDateFormat =
  //     formatedDate[2] + "." + formatedDate[1] + "." + formatedDate[0];
  // } else {
  //   return <>{newDateFormat}</>;
  // }
  // if (!date.indexOf(':00.000Z')) {
  //   return (
  //     <>
  //       {formadatedDate}
  //     </>
  //   );
  // } else {
  //   return <>{newDateFormat}</>;
  // }
};

export const convertJobHoursToStr = (t, type) => {
  return (
    <>
      {type === "tähtajatu" && t("jobhours:tähtajatu")}
      {type === "tähtajaline" && t("jobhours:tähtajaline")}
      {type === "31" && t("jobhours:jobHours31")}
      {type === "32" && t("jobhours:jobHours32")}
      {type === "33" && t("jobhours:jobHours33")}
      {type === "34" && t("jobhours:jobHours34")}
    </>
  );
};

export const convertJobWorksStartToStr = (t, type) => {
  let check = false;
  let byAgreement = false;
  let immediately = false;
  let workWillBegin = false;
  let asSoonAs = false;
  let heti = false;
  let description = false;
  let agreeStartTime = false;
  let summerWork = false;
  let asSoonAsPossible = false;
  let valueDate = type.split(",")[0];
  let valueAgremment = type.split(",")[1];
  let dateCheck = false;
  let valueWithNewDate;
  if (type === "Mahdollisimman pian") {
    asSoonAsPossible = true;
    check = true;
  }
  if (type === "Kesällä") {
    summerWork = true;
    check = true;
  }
  if (type === "Alkamisajankohta sovittaissa") {
    agreeStartTime = true;
    check = true;
  }
  if (type === "HETI" || type === "Heti") {
    heti = true;
    check = true;
  }
  if (type === "Katso kuvaus") {
    description = true;
    check = true;
  }
  if (
    type === "Sopimuksen mukaan" ||
    type === "sopimuksen mukaan" ||
    type === "sopimuksen mukaan." ||
    type === "Sopimuksen mukaan."
  ) {
    byAgreement = true;
    check = true;
  }
  if (type === "heti tai sopimuksen mukaan") {
    immediately = true;
    check = true;
  }
  if (type === "Työ alkaa heti sopivan henkilön löydytt") {
    workWillBegin = true;
    check = true;
  }
  if (type.toLowerCase() === "heti sopivan henkilön löydyttyä") {
    asSoonAs = true;
    check = true;
  }
  if (valueAgremment === " tai sopimuksen mukaan") {
    dateCheck = true;
    check = true;
    valueWithNewDate =
      valueDate && valueDate + ", " + t("workStartLabelDate:orByAgreement");
  }
  return (
    <>
      {byAgreement && t("workStartLabelDate:byAgreement")}
      {immediately && t("workStartLabelDate:immediately")}
      {workWillBegin && t("workStartLabelDate:workWillBegin")}
      {asSoonAs && t("workStartLabelDate:asSoonAs")}
      {asSoonAsPossible && t("workStartLabelDate:As soon as possible")}
      {heti && t("workStartLabelDate:immediate")}
      {agreeStartTime && t("workStartLabelDate:agreeStartTime")}
      {description && t("workStartLabelDate:description")}
      {summerWork && t("workStartLabelDate:summerWork")}
      {dateCheck && valueWithNewDate}
      {check === false ? type : null}
    </>
  );
};

// To scroll the page on top when paginating
export const scrollToTop = () => {
  window.scrollTo({
    top: 250,
    behavior: "smooth",
  });
};

export const formatToFinnishCurrency = (amount) => {
  return new Intl.NumberFormat("fi-FI", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
};

export const setCurrencyColor = (paymentRef, paymentStatus) => {
  if (!!paymentRef) {
    if (!paymentStatus) return "red";
    if (paymentStatus === 1) return "green";
  } else return "gray";
};

export const isToDisableCheckBox = (paymentRef, paymentMethod) => {
  if (!paymentRef || paymentMethod === "online") return true;
  else return false;
};
