import React, { useEffect, useState } from "react";
import { Field } from "redux-form";
import { useTranslation } from "react-i18next";
import Multiselect from "react-widgets/lib/Multiselect";
import { renderSelectField, renderFormHelper } from "./wrappers";
import "react-widgets/dist/css/react-widgets.css";
import store from "../store";
import { customTranslateCampaign } from "./customTranslate";
import axios from "axios";
import { useSelector } from "react-redux";
import { Category, CenterFocusStrongOutlined } from "@material-ui/icons";

export const jobHours = [
  {
    value: 31,
  },
  {
    value: 32,
  },
  {
    value: 33,
  },
  {
    value: 34,
  },
];

export const jobType = [
  { value: 12 },
  { value: 13 },
  { value: 14 },
  { value: 15 },
];

export const publishedTimes = [
  { value: "" },
  { value: 2 },
  { value: 4 },
  { value: 8 },
 
];

export const emailLanguages = [
  { id: 1, value: "finnish" },
  { id: 2, value: "english" },
  { id: 3, value: "swedish" },
  { id: 4, value: "estonian" },
];

export const JobTypeComponent = ({ margin, hideLabel }) => {
  const { t } = useTranslation("jobtype");
  return (
    <div>
      <Field
        component={renderSelectField}
        name="jobType"
        label={hideLabel ? "" : `${t("jobTypeLabel")} *`}
        margin={margin}
        required
      >
        <option value="" />
        <option value="12">{t("jobType12")}</option>
        <option value="13">{t("jobType13")}</option>
       
      </Field>
    </div>
  );
};
export const JobHoursComponent = ({ margin, hideLabel }) => {
  const { t } = useTranslation("jobhours");
  return (
    <div>
      <Field
        component={renderSelectField}
        name="jobDuration"
        label={hideLabel ? "" : `${t("jobHoursLabel")} *`}
        margin={margin}
        required
      >
        <option value="" />
        <option value="31">{t("jobHours31")}</option>
        <option value="32">{t("jobHours32")}</option>
        <option value="33">{t("jobHours33")}</option>
        <option value="34">{t("jobHours34")}</option>
      </Field>
    </div>
  );
};
export const AdminCampaigns = ({ viewBy }) => {
  let { campaigns } = store.getState().advertisement;
  campaigns = campaigns.filter(
    (campaign) => campaign.id === 4 || campaign.id === 5
  );

  // For admins, initially I want to show campaigns type select field with empty option, so empty body is sent when the component mounts.
  const emptyCampaignOption = [
    {
      type: "",
      value: 0,
    },
  ];
  const adminCampaigns = emptyCampaignOption.concat(campaigns);
  const { t } = useTranslation("campaigns", "adminMarketing");
  return (
    <div>
      <Field
        component={renderSelectField}
        name="campaign_type"
        label={t("adminMarketing:campaignType")}
        margin="dense"
        style={{ backgroundColor: "white", margin: 10, width: 200 }}
        viewBy={viewBy}
      >
        {adminCampaigns.map((campaign, i) => {
          return (
            <option value={campaign.type} key={i}>
              {customTranslateCampaign(campaign.id)}
            </option>
          );
        })}
      </Field>
    </div>
  );
};
export const AdminStatus = ({ viewBy }) => {
  const { t } = useTranslation("adminMarketing");

  return (
    <div>
      <Field
        component={renderSelectField}
        name="status"
        label={t("status")}
        margin="dense"
        style={{ backgroundColor: "white", margin: 10, width: 200 }}
        viewBy={viewBy}
      >
        <option value="" />
        <option value="1">{t("active")}</option>
        <option value="2">{t("inactive")}</option>
        <option value="3">{t("deleted")}</option>
      </Field>
    </div>
  );
};
export const MarketingPlatform = ({ viewBy }) => {
  const { t } = useTranslation("campaigns");

  return (
    <div>
      <Field
        component={renderSelectField}
        name="marketing_platform"
        label={t("plTitle")}
        margin="dense"
        style={{ backgroundColor: "white", margin: 10, width: 200 }}
        viewBy={viewBy}
      >
        <option value="" />
        <option value="facebook/instagram">{t("facebook")}</option>
        <option value="linkedin">{t("linkedin")}</option>
        <option value="any">{t("any")}</option>
        <option value="unavailable">{t("notAvailable")}</option>
      </Field>
    </div>
  );
};

export const JobCategoriesComponent = ({
  margin,
  hideLabel,
  selectedPage,
  jobCategories
}) => {
  const { t } = useTranslation('category');
  return (
    <div>
      <Field
        component={renderSelectField}
        name="jobCategory"
        label={hideLabel ? '' : `${t('category')} *`}
        id="job_category"
        fullWidth
        margin={margin}
        required
      >
        {jobCategories.map(category => {
          return (
            <option
              value={category.id === 0? '' : category.id} // id:1 is empty -- required for validation
              key={category.id}
            >
              {t(`${category.id}`)}
            </option>
          );
        })}
      </Field>
    </div>
  );

  // const { t } = useTranslation("category");
  // const [jobsToRender, setJobsToRender] = useState([]);

  // const categorys = jobsToRender.map((category) => category.jobTags)
  // const sortCategorys = Array.from(new Set(categorys))

  // useEffect(() => {
  //   axios.get("https://localhost:7262/jobsEn").then((res) => {
  //     setJobsToRender(res.data);
  //   });
  // }, []);
  // const objCategory = sortCategorys.map((str, index) => ({
  //   value: str,
  //   id: index + 1
  // }));
  // if (objCategory.length = 23) {
  //    //console.log(objCategory)
  // }
  // return (
  //   <div>
  //     <Field
  //       component={renderSelectField}
  //       name="jobCategory"
  //       label={hideLabel ? "" : `${t("category")} *`}
  //       id="job_category"
  //       fullWidth
  //       margin={margin}
  //       required
  //     >
  //       {objCategory.map((category) => {
  //         return (
  //           <option
  //             value={category.id === 1 ? "" : category.id} // id:1 is empty -- required for validation
  //             key={category.id}
  //           >
  //             {t(`${category.id}`)}
  //           </option>
  //         );
  //       })}
  //     </Field>
  //   </div>
  // );
};

export const renderMultiselect = ({
  input,
  meta: { touched, error, invalid },
  data,
  valueField,
  textField,
  label,
  placeholder,
}) => {
  return (
    <div>
      <Multiselect
        {...input}
        onBlur={() => input.onBlur()}
        value={input.value || []} // requires value to be an array
        data={data}
        valueField={valueField}
        textField={textField}
        label={label}
        placeholder={placeholder}
        error={touched && invalid}
      />
      {renderFormHelper({ touched, error })}
    </div>
  );
};

export const AdminAdditionalServiceStatus = ({ viewBy }) => {
  const { t } = useTranslation("adminAdditionalService");

  return (
    <div>
      <Field
        component={renderSelectField}
        name="status"
        label={t("status")}
        margin="dense"
        style={{ backgroundColor: "white", margin: 10, width: 200 }}
        viewBy={viewBy}
      >
        <option value="" />
        <option value="1">{t("published")}</option>
        <option value="0">{t("draft")}</option>
        <option value="3">{t("deleted")}</option>
      </Field>
    </div>
  );
};

export const AdminAdditionalServiceRequest = ({ viewBy }) => {
  const { t } = useTranslation("adminAdditionalService");

  return (
    <div>
      <Field
        component={renderSelectField}
        name="extra_service"
        label={t("request")}
        margin="dense"
        style={{ backgroundColor: "white", margin: 10, width: 200 }}
        viewBy={viewBy}
      >
        <option value="" />
        <option value="help">{t("activatedHelp")}</option>
        <option value="sos">{t("activatedSos")}</option>
      </Field>
    </div>
  );
};
