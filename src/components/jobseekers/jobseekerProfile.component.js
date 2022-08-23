import React from "react";
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  Divider,
  Snackbar,
} from "@material-ui/core";
import { Field, change } from "redux-form";
import { withStyles } from "@material-ui/core/styles";
import { useTranslation, Trans } from "react-i18next";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import renderDropzoneField from "../../utils/dropzone";
import { renderDenseTextField, renderCheckbox } from "../../utils/wrappers";
import { MySnackbarContentWrapper } from "../../utils/snackbar.utils";
import ChangePasswordContainer from "../../containers/account/changePassword.container";
import store from "../../store";
import {
  PrivacyTermPage,
  ServiceTermPage,
} from "../../constants/wordpressRoutes";
import TextEditor from "../../utils/textEditor";

const styles = (theme) => ({
  formBtn: {
    margin: "30px 5px",
  },
  card: {
    margin: "70px auto",
  },
  layout: { margin: "50px 30px 0 30px" },
  ctaBtn: {
    margin: "-10px auto auto 40px",
  },
  title: {
    padding: "50px 0",
    color: theme.palette.primary.main,
  },
  fieldLabel: {
    color: theme.palette.primary.main,
    fontWeight: "bold",
    marginTop: 20,
  },
  photo: {
    [theme.breakpoints.down("sm")]: {
      marginTop: 30,
    },
  },
  serviceLink: {
    color: theme.palette.secondary.main,
  },
});
const _onFormSubmit = () => {
  return false;
};
const JobseekerProfileComponent = ({
  classes,
  profilePic,
  dispatch,
  clearJobseekerProfilePic,
  addApplicantProfile,
  closeSnackbar,
  showSuccessSnackbar,
  showFailedSnackbar,
  handleSubmit,
  valid,
  pristine,
  uploadedDocument,
  applicant_cv,
  cv_filename,
}) => {
  const cv_document = (
    <a href={applicant_cv} target="_blank" rel="noopener noreferrer">
      {cv_filename}
    </a>
  );
  const { t } = useTranslation("jobseeker", "common", "profile", "applicant");
  const { lang } = store.getState().language;

  return (
    <div className="container">
      <div className={classes.title}>
        <h3>{t("title")}</h3>
        <Divider />
      </div>
      <div>
        <form onSubmit={handleSubmit(_onFormSubmit)}>
          <Card className={classes.card}>
            <CardContent className={classes.layout}>
              <Grid container>
                <Grid item md={8} sm={12}>
                  <div>
                    <Grid container alignItems="center">
                      <Grid item sm={4}>
                        <label
                          htmlFor="firstname"
                          className={classes.fieldLabel}
                        >
                          {t("profile:firstName")}:
                        </label>
                      </Grid>
                      <Grid item md={6} sm={8} xs={12}>
                        <Field
                          component={renderDenseTextField}
                          name="firstName"
                          id="firstName"
                          required
                        />
                      </Grid>
                    </Grid>
                    <Grid container alignItems="center">
                      <Grid item sm={4}>
                        <label
                          htmlFor="lastName"
                          className={classes.fieldLabel}
                        >
                          {t("profile:lastName")}:
                        </label>
                      </Grid>
                      <Grid item md={6} sm={8} xs={12}>
                        <Field
                          component={renderDenseTextField}
                          name="lastName"
                          id="lastName"
                          required
                        />
                      </Grid>
                    </Grid>
                    <Grid container alignItems="center">
                      <Grid item sm={4}>
                        <label htmlFor="email" className={classes.fieldLabel}>
                          {t("profile:email")}:
                        </label>
                      </Grid>
                      <Grid item md={6} sm={8} xs={12}>
                        <Field
                          component={renderDenseTextField}
                          name="email"
                          id="email"
                          disabled
                        />
                      </Grid>
                    </Grid>
                    <Grid container alignItems="center">
                      <Grid item sm={4}>
                        <label
                          htmlFor="contactNumber"
                          className={classes.fieldLabel}
                        >
                          {t("common:phone")}:
                        </label>
                      </Grid>
                      <Grid item md={6} sm={8} xs={12}>
                        <Field
                          component={renderDenseTextField}
                          name="contactNumber"
                          id="contactNumber"
                        />
                      </Grid>
                    </Grid>
                    <Grid container alignItems="center">
                      <Grid item sm={4}>
                        <label
                          htmlFor="linkedIn"
                          className={classes.fieldLabel}
                        >
                          {t("common:LinkedIn")}:
                        </label>
                      </Grid>
                      <Grid item md={6} sm={8} xs={12}>
                        <Field
                          component={renderDenseTextField}
                          name="linkedIn"
                          id="linkedIn"
                        />
                      </Grid>
                    </Grid>
                    <Grid container alignItems="center">
                      <Grid item sm={4}>
                        <label
                          htmlFor="portfolio"
                          className={classes.fieldLabel}
                        >
                          {t("common:portfolio")}:
                        </label>
                      </Grid>
                      <Grid item md={6} sm={8} xs={12}>
                        <Field
                          component={renderDenseTextField}
                          name="portfolio"
                          id="portfolio"
                        />
                      </Grid>
                      <Grid container alignItems="center">
                        <Grid item sm={4}>
                          <label
                            htmlFor="CV"
                            className={classes.fieldLabel}
                          >
                            {t("applicant:cvTitle")}:
                          </label>
                        </Grid>
                        <Grid item md={6} sm={8} xs={12}>
                          <Field
                            component={renderDropzoneField}
                            name="cv_document"
                            isCV
                            uploadedDocument={uploadedDocument}
                            cvBtnLabel={t("applicant:cvLabel")}
                          />
                          {!uploadedDocument && cv_document}
                        </Grid>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
                <Grid item md={4} sm={12} className={classes.photo}>
                  <Field
                    name="photo_document"
                    component={renderDropzoneField}
                    type="file"
                    imagefile={typeof profilePic === 'string' ? profilePic : profilePic}
                    btnText={t("picBtnText")}
                    fullWidth
                    isProfilePic
                  />
                  <div style={{ marginTop: 20 }}>
                    <i style={{ color: "#6c757d" }}>
                      {t("advertForm:voluntary")}
                    </i>

                    <p className={classes.imageText}>{t("picText")}</p>
                  </div>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      dispatch(
                        change("jobseekerProfile", profilePic, undefined)
                      );
                      clearJobseekerProfilePic();
                    }}
                  >
                    <DeleteForeverIcon
                      fontSize="small"
                      style={{ marginRight: 5 }}
                    />
                    {t("deletePic")}
                  </Button>
                </Grid>
              </Grid>
              <Grid>
                <Grid item xs={12}>
                  <label
                    className={classes.fieldLabel}
                    htmlFor="profileDescription"
                  >
                    {t("applicantProfileDesc")}:
                  </label>
                  <Field
                    component={TextEditor}
                    name="profileDescription"
                    id="profileDescription"
                    multiline
                    rows="15"
                    placeholder={t("descPlaceholder")}
                    required
                  />
                </Grid>
                <Grid item md={4} sm={12} />
              </Grid>

              <div style={{ margin: "30px auto" }}>
                <Field
                  component={renderCheckbox}
                  name="agreement_terms"
                  id="agreement_terms"
                  label={
                    <Trans>
                      {t("common:acceptTerms")}
                      <a
                        href={ServiceTermPage(lang)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={classes.serviceLink}
                      >
                        {" "}
                      </a>
                      <a
                        href={PrivacyTermPage(lang)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={classes.serviceLink}
                      >
                        {" "}
                      </a>
                    </Trans>
                  }
                  margin={0}
                />
              </div>
            </CardContent>

            <CardActions className={classes.ctaBtn} />
            <CardActions>
              <Button
                variant="contained"
                className={classes.formBtn}
                color="primary"
                style={{ margin: "20px auto" }}
                type="submit"
                disabled={pristine}
                onClick={valid ? addApplicantProfile : null}
              >
                {t("common:saveBtn")}
              </Button>
            </CardActions>
          </Card>
        </form>
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={showSuccessSnackbar}
        autoHideDuration={4000}
        onClose={() => {
          closeSnackbar();
        }}
      >
        <MySnackbarContentWrapper
          onClose={() => {
            closeSnackbar();
            // browserHistory.push('/dashboard/main')
          }}
          variant="success"
          message={t("successMsg")}
        />
      </Snackbar>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={showFailedSnackbar}
        autoHideDuration={4000}
        onClose={() => {
          closeSnackbar();
        }}
      >
        <MySnackbarContentWrapper
          onClose={() => {
            closeSnackbar();
          }}
          variant="error"
          message={t("failedMsg")}
        />
      </Snackbar>
      <div>
        <ChangePasswordContainer />
      </div>
    </div>
  );
};

export default withStyles(styles)(JobseekerProfileComponent);
