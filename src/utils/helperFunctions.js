import React from "react";
import store from "../store";

export const customURL = (url, type) => {

  const {id} = store.getState().jobs
  const {jobName} = store.getState().jobs
  const {jobPostNumber} = store.getState().jobs
  const splittedJobName = jobName.split(' ').join('-').toLowerCase();
  // url comes from backend in this format - "https://vpt-ui-dev.azurewebsites.net/tyopaikat/Nordic-C-Creditor-Oy/67289/Kirjanpitäjä-Controller/14"
  let path = []
  let connectString;
  let pathName;
  let splittedPath;
  let jobTitle;
  let postId;

  // const pathname = url && url.split("/toopakkumised/")[1]; 

  if(url === undefined || url === null)
  {
    pathName = splittedJobName
    splittedPath = id
    path = [pathName,splittedPath]
  }else{
    pathName = url.split("/toopakkumised/")[1];
    splittedPath = pathName.split("/"); 
    path = splittedPath[0].split("-"); 
  }

  // const splittedPath = pathname && pathname.split("/"); 



  if (path.length >= 3) {
    connectString = path[0] + "-" + path[1] + "-" + path[2] + "/" + jobPostNumber;
  } else {
    connectString = path[0] + "/" + path[1]; // work
  }

  const companyName = path[0]; // work
  const companyId = path[1]; // work
  if (path.length > 2) {
    jobTitle = path[0] + '-' + path[1] + '-' + path[2];
  } else {
    jobTitle = path[0];
  }
  if (path.length > 2) {
    postId = path[3]
  } else {
    postId = path[1]; // work
  }

  switch (type) {
    case "internal": // For admins and companies, url path is jobpost/jobTitle/postId
      return `/jobpost/${connectString}`;
      
    case "external": // For public, url path is tyopaikat/companyName/companyId/jobTitle/postId
      return `/tyopaikat/${connectString}`;

    case "application": // For application form component
      return `/tyopaikat/${jobTitle}/${companyId}/${postId}/hae`;

    case "campaign": // For campaign component
      return `/${jobTitle}/${postId}/campaign`;

    case "open_position":
      return `/tyopaikat/${companyName}/${companyId}/${jobTitle}/${postId}`;
    default:
      break;
  }
};

export const convertJobTypeToStr = (t, type) => {
  return (
    <>
      {type === "12" && t("jobtype:jobType12")}
      {type === "13" && t("jobtype:jobType13")}
      {type === "14" && t("jobtype:jobType14")}
      {type === "15" && t("jobtype:jobType15")}
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
};

export const convertJobHoursToStr = (t, type) => {
  return (
    <>
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
