import moment from "../../node_modules/moment";

//pickerDateTime format : 2021-03-18T20:27:00.000Z
//pickerDateTime can be format: 18.03.2021
export const formatISOToFi = pickerDateTime => {
  if (pickerDateTime.split(".").length === 3) {
    return pickerDateTime;
  }

  const minJobPostDate = moment().add(1, "days");
  const convertToStr = new Date(
    !!pickerDateTime ? pickerDateTime : minJobPostDate
  ); //Thu Mar 18 2021 22:27:00 GMT+0200 (Eastern European Standard Time)
  return new Intl.DateTimeFormat("fi-FI").format(convertToStr);
};

export const formatStringToFi = datetime => {
  return Intl.DateTimeFormat("ee-EE").format(datetime);
};
