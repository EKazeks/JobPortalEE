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
import { Field, change, FieldArray } from "redux-form";
import { withStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { renderDenseTextField } from "../../utils/wrappers";
import renderDropzoneField from "../../utils/dropzone";
import { clearCompanyLogo } from "../../actions";
import { RenderAdditionalUsers } from "../../utils/profile.utils";
import { MySnackbarContentWrapper } from "../../utils/snackbar.utils";
import ChangePasswordContainer from "../../containers/account/changePassword.container";
import CustomizedDialog from "../../utils/customizedDialog";
import CompanyListsModel from "../../utils/companyListsModel";
import TextEditor from "../../utils/textEditor";

const styles = (theme) => ({
  title: {
    margin: "50px 0",
    color: theme.palette.primary.main,
    display: "flex",
  },
  addBtn: {
    marginLeft: "auto",
  },
  fieldLabel: {
    color: theme.palette.primary.main,
    fontWeight: "bold",
    marginTop: 20,
  },
  formBtn: {
    margin: "30px 5px",
  },

  card: {
    margin: "70px auto",
  },
  layout: {
    margin: "50px 30px 0 30px",
  },

  dropDownListsTextField: {
    position: "relative",
  },

  dropDownLists: {
    position: "absolute",
    width: "100%",
    zIndex: 3,
    background: "#f9f9f9",
  },

  logoLayout: {
    // Put the margin only until tablet size
    margin: "50px 30px",
    padding: 16,
  },
  additionalUsersField: {
    marginTop: 30,
  },
});

const _onFormSubmit = () => {
  return false;
};

const ProfileComponent = ({
  classes,
  invalid,
  logo,
  uploadedLogo,
  dispatch,
  handleSubmit,
  addCompanyProfile,
  showProfileWarning,
  showSuccessSnackbar,
  showFailedSnackbar,
  showCustomError,
  errorMsg,
  closeSnackbar,
  submitFailed,
  synchronousError,
  initialValues,
  addNewCompanyStart,
  addNewCompanyEnd,
  isToAddNewProfile,
  isCompanyCreated,
  isSuperUser,
  searchCompanyDetails,
  companyLists,
  loadSelectedCompany,
  closeCompanyLists,
  apiSuccess,
  clientUserEmail,
}) => {
  const { t } = useTranslation("profile", "advertForm");

  return (
    <div className="container">
      <div className={classes.title}>
        <h3>{t("title")}</h3>
        {isCompanyCreated && isSuperUser && (
          <Button
            variant="contained"
            color="secondary"
            size="large"
            className={classes.addBtn}
            onClick={addNewCompanyStart}
          >
            {t("addBtn")}
          </Button>
        )}
      </div>
      <Divider />
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
                          htmlFor="companyName"
                          className={classes.fieldLabel}
                        >
                          {t("companyName")}
                        </label>
                      </Grid>
                      <Grid item md={6} sm={8} xs={12}>
                        <div className={classes.dropDownListsTextField}>
                          <Field
                            component={renderDenseTextField}
                            name="companyName"
                            id="companyName"
                            required
                            onChange={(e) =>
                              e.target.value.length > 1
                                ? searchCompanyDetails(e.target.value)
                                : closeCompanyLists()
                            }
                            autoComplete="no"
                          />
                          <div className={classes.dropDownLists}>
                            {apiSuccess && (
                              <CompanyListsModel
                                companyLists={companyLists}
                                loadSelectedCompany={loadSelectedCompany}
                                closeCompanyLists={closeCompanyLists}
                                formName="companyProfile"
                              />
                            )}
                          </div>
                        </div>
                      </Grid>
                    </Grid>

                    <Grid container alignItems="center">
                      <Grid item sm={4}>
                        <label
                          className={classes.fieldLabel}
                          htmlFor="firstName"
                        >
                          {t("firstName")}
                        </label>
                      </Grid>
                      <Grid item md={6} sm={8} xs={12}>
                        <Field
                          component={renderDenseTextField}
                          name="firstName"
                          id="firstname"
                          required
                          disabled
                        />
                      </Grid>
                    </Grid>
                    <Grid container alignItems="center">
                      <Grid item sm={4}>
                        <label
                          className={classes.fieldLabel}
                          htmlFor="lastName"
                        >
                          {t("lastName")}:
                        </label>
                      </Grid>
                      <Grid item md={6} sm={8} xs={12}>
                        <Field
                          component={renderDenseTextField}
                          name="lastName"
                          required
                          disabled
                        />
                      </Grid>
                    </Grid>
                    <Grid container alignItems="center">
                      <Grid item sm={4}>
                        <label className={classes.fieldLabel} htmlFor="email">
                          {t("email")}:
                        </label>
                      </Grid>
                      <Grid item md={6} sm={8} xs={12}>
                        <Field
                          component={renderDenseTextField}
                          name="email"
                          id="email"
                          required
                          disabled
                        />
                      </Grid>
                    </Grid>

                    <Grid container alignItems="center">
                      <Grid item sm={4}>
                        <label
                          className={classes.fieldLabel}
                          htmlFor="telephone"
                        >
                          {t("phone")}:
                        </label>
                      </Grid>
                      <Grid item md={6} sm={8} xs={12}>
                        <Field
                          component={renderDenseTextField}
                          name="telephone"
                          id="telephone"
                          required
                        />
                      </Grid>
                    </Grid>
                    <Grid container alignItems="center">
                      <Grid item sm={4}>
                        <label
                          className={classes.fieldLabel}
                          htmlFor="companyBusinessId"
                        >
                          {t("businessId")}:
                        </label>
                      </Grid>
                      <Grid item md={6} sm={8} xs={12}>
                        <Field
                          component={renderDenseTextField}
                          name="companyBusinessId"
                          id="companyBusinessId"
                          required
                        />
                      </Grid>
                    </Grid>
                    <Grid container alignItems="center">
                      <Grid item sm={4}>
                        <label className={classes.fieldLabel} htmlFor="address">
                          {t("address")}:
                        </label>
                      </Grid>
                      <Grid item md={6} sm={8} xs={12}>
                        <Field
                          component={renderDenseTextField}
                          name="address"
                          id="address"
                          required
                        />
                      </Grid>
                    </Grid>
                    <Grid container alignItems="center">
                      <Grid item sm={4}>
                        <label className={classes.fieldLabel} htmlFor="city">
                          {t("city")}:
                        </label>
                      </Grid>
                      <Grid item md={6} sm={8} xs={12}>
                        <Field
                          component={renderDenseTextField}
                          name="city"
                          id="city"
                          required
                        />
                      </Grid>
                    </Grid>
                    <Grid container alignItems="center">
                      <Grid item sm={4}>
                        <label className={classes.fieldLabel} htmlFor="zipCode">
                          {t("postNum")}:
                        </label>
                      </Grid>
                      <Grid item md={6} sm={8} xs={12}>
                        <Field
                          component={renderDenseTextField}
                          name="zipCode"
                          id="zipCode"
                          required
                        />
                      </Grid>
                    </Grid>
                    <Grid container alignItems="center">
                      <Grid item sm={4}>
                        <label
                          className={classes.fieldLabel}
                          htmlFor="companyUrl"
                        >
                          {t("companyURL")}:
                        </label>
                      </Grid>
                      <Grid item md={6} sm={8} xs={12}>
                        <Field
                          component={renderDenseTextField}
                          name="companyUrl"
                          id="companyUrl"
                        />
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
                <Grid item md={4} sm={12} style={{ marginTop: 30 }}>
                  <Field
                    name="logo_document"
                    component={renderDropzoneField}
                    type="file"
                    //  imagefile={
                    //   logo && !logo.path && logo[0] && logo[0].path !== ''
                    //     ? logo
                    //     : initialValues &&
                    //       initialValues.logo &&
                    //       initialValues.logo[0]
                    //       ? initialValues.logo_document[0].path
                    //       : ''
                    // } 
                    imagefile={typeof logo === 'string' ? logo : uploadedLogo}
                    btnText={t("addLogo")}
                    fullWidth
                    isLogo
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
                        change("companyProfile", "logo_document", undefined)
                      );
                      dispatch(clearCompanyLogo());
                    }}
                  >
                    <DeleteForeverIcon
                      fontSize="small"
                      style={{ marginRight: 5 }}
                    />
                    {t("deleteLogo")}
                  </Button>
                </Grid>
              </Grid>
              <Grid>
                <Grid item sm={4}>
                  <label
                    className={classes.fieldLabel}
                    htmlFor="profileDescription"
                  >
                    {t("companyDesc")}:
                  </label>
                </Grid>
                {/* <Grid item xs={10} sm={12} md={10}> */}
                <Grid item xs={12}>
                  <Field
                    component={TextEditor}
                    fullWidth
                    name="profileDescription"
                    placeholder={t("descPlaceholder")}
                    id="profileDescription"
                  />
                </Grid>
                <Grid item md={4} sm={12} />
              </Grid>
              <FieldArray
                name="companyUser"
                component={RenderAdditionalUsers}
                clientUserEmail={clientUserEmail}
                className={classes.additionalUsersField}
              />
            </CardContent>

            <CardActions>
              <Button
                type="submit"
                variant="contained"
                className={classes.formBtn}
                color="primary"
                style={{ margin: "20px auto" }}
                onClick={!invalid ? addCompanyProfile : null}
              >
                {t("common:saveBtn")}
              </Button>
            </CardActions>
          </Card>
        </form>
        <ChangePasswordContainer />
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
        open={
          (submitFailed && synchronousError) ||
          showFailedSnackbar ||
          showCustomError
        }
        //autoHideDuration={4000}
        onClose={() => {
          closeSnackbar();
        }}
      >
        <MySnackbarContentWrapper
          onClose={() => {
            closeSnackbar();
          }}
          variant="error"
          message={
            showCustomError
              ? errorMsg
              : showFailedSnackbar
              ? t("failedMsg")
              : invalid
              ? t("advertForm:errorMsg")
              : ""
          }
        />
      </Snackbar>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={showProfileWarning && !showCustomError && !showFailedSnackbar}
      >
        <MySnackbarContentWrapper variant="warning" message={t("warnMsg")} />
      </Snackbar>

      <CustomizedDialog
        showDialog={isToAddNewProfile}
        isToAddNewProfile
        addNewCompanyEnd={addNewCompanyEnd}
      />
    </div>
  );
};

export default withStyles(styles)(ProfileComponent);
