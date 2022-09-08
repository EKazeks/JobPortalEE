import React from 'react';
import classNames from 'classnames';
import { Field } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import { Button, CircularProgress, TableCell, TableRow } from '@material-ui/core';
import { renderDenseTextField } from '../../utils/wrappers';
import CompanyListsModel from '../../utils/companyListsModel';
import { useTranslation } from 'react-i18next';
import TextEditor from '../../utils/textEditor';

/* const _onFormSubmit = () => {
    return false;
}; */

const styles = () => ({
  textField: {
    fontSize: 12,
  },
  profileRow: {
    borderBottom: '5px solid #f7f8fc',
    backgroundColor: 'white',
  },
  tableCell: {
    borderBottom: 0,
    paddingLeft: 20,
  },
  cancelBtn: {
    paddingLeft: 0,
  },
  dropDownListsTextField: {
    position: 'relative',
  },

  dropDownLists: {
    position: 'absolute',
    width: '100%',
    zIndex: 3,
    background: '#f9f9f9',
  },
});

const AdminContactFormComponent = ({
  loading,
  user,
  adminUpdateUserProfile,
  cancelEditContactDetails,
  classes,
  valid,
  searchCompanyDetails,
  companyLists,
  loadSelectedCompany,
  formName,
  closeCompanyLists,
  apiSuccess,
}) => {
  return user === 'company' ? (
    <CompanyContactForm
      loading={loading}
      classes={classes}
      valid={valid}
      adminUpdateUserProfile={adminUpdateUserProfile}
      cancelEditContactDetails={cancelEditContactDetails}
      searchCompanyDetails={searchCompanyDetails}
      apiSuccess={apiSuccess}
      companyLists={companyLists}
      loadSelectedCompany={loadSelectedCompany}
      closeCompanyLists={closeCompanyLists}
    />
  ) : (
    <ApplicantContactForm
      loading={loading}
      classes={classes}
      valid={valid}
      adminUpdateUserProfile={adminUpdateUserProfile}
      cancelEditContactDetails={cancelEditContactDetails}
    />
  );
};

const CompanyContactForm = ({
  adminUpdateUserProfile,
  cancelEditContactDetails,
  loading,
  valid,
  classes,
  searchCompanyDetails,
  companyLists,
  loadSelectedCompany,
  closeCompanyLists,
  apiSuccess,
}) => {
  const { t } = useTranslation('common');
  return (
    <>
      <TableRow>
        <TableCell className={classes.tableCell}>
          <div className={classes.dropDownListsTextField}>
            <Field
              component={renderDenseTextField}
              variant="outlined"
              name="company_name"
              className={classes.textField}
              onChange={e => (e.target.value.length > 1 ? searchCompanyDetails(e.target.value) : closeCompanyLists())}
              autoComplete="no"
            />
            <div className={classes.dropDownLists}>
              {apiSuccess && (
                <CompanyListsModel
                  companyLists={companyLists}
                  loadSelectedCompany={loadSelectedCompany}
                  closeCompanyLists={closeCompanyLists}
                  formName="adminContact"
                />
              )}
            </div>
          </div>
        </TableCell>
        <TableCell className={classes.tableCell}>
          <Field component={renderDenseTextField} variant="outlined" name="firstname" className={classes.textField} />
        </TableCell>
        <TableCell className={classes.tableCell}>
          <Field component={renderDenseTextField} variant="outlined" name="lastname" className={classes.textField} />
        </TableCell>
        <TableCell className={classes.tableCell}>
          <Field component={renderDenseTextField} variant="outlined" name="email" className={classes.textField} disabled />
        </TableCell>
        <TableCell className={classes.tableCell}>
          <Field component={renderDenseTextField} variant="outlined" name="telephone" className={classes.textField} />
        </TableCell>
        <TableCell className={classes.tableCell}>
          <Field component={renderDenseTextField} variant="outlined" name="business_id" className={classes.textField} />
        </TableCell>
        <TableCell className={classes.tableCell}>
          <Button type="submit" variant="contained" color="primary" disabled={!valid} onClick={valid ? () => adminUpdateUserProfile('company') : null}>
            {loading ? <CircularProgress size={20} color="white" /> : t('saveBtn')}
          </Button>
        </TableCell>
        <TableCell className={classNames(classes.tableCell, classes.cancelBtn)}>
          <Button onClick={cancelEditContactDetails}>{t('cancelBtn')}</Button>
        </TableCell>
      </TableRow>
      <TableRow className={classes.profileRow}>
        <TableCell colSpan={6} className={classes.tableCell}>
          <Field component={TextEditor} fullWidth name="profile_description" placeholder="Profile Description" id="profile_description" />
          {/* <Field
            component={renderDenseTextField}
            variant="outlined"
            name="profile_description"
            placeholder="Profile Description"
            className={classes.textField}
            multiline
            // style={{ width: '50%' }}
          /> */}
        </TableCell>
        <TableCell colSpan={2} />
      </TableRow>
    </>
  );
};

const ApplicantContactForm = ({ adminUpdateUserProfile, cancelEditContactDetails, loading, classes, valid }) => {
  const { t } = useTranslation('common');
  return (
    <TableRow className={classes.profileRow}>
      <TableCell className={classes.tableCell}>
        <Field component={renderDenseTextField} variant="outlined" name="firstname" className={classes.textField} />
      </TableCell>
      <TableCell className={classes.tableCell}>
        <Field component={renderDenseTextField} variant="outlined" name="lastname" className={classes.textField} />
      </TableCell>
      <TableCell className={classes.tableCell}>
        <Field component={renderDenseTextField} variant="outlined" name="email" className={classes.textField} disabled />
      </TableCell>
      <TableCell className={classes.tableCell}>
        <Field component={renderDenseTextField} variant="outlined" name="contact_number" className={classes.textField} />
      </TableCell>
      <TableCell className={classes.tableCell}>
        <Field component={renderDenseTextField} variant="outlined" name="linkedin" className={classes.textField} />
      </TableCell>
      <TableCell className={classes.tableCell}>
        <Field component={renderDenseTextField} variant="outlined" name="portfolio" className={classes.textField} />
      </TableCell>
      <TableCell className={classes.tableCell}>
        <Button variant="contained" color="primary" disabled={!valid} onClick={valid ? () => adminUpdateUserProfile('applicant') : null}>
          {loading ? <CircularProgress size={20} color="white" /> : t('saveBtn')}
        </Button>
      </TableCell>
      <TableCell className={classes.cancelBtn}>
        <Button onClick={cancelEditContactDetails}>{t('cancelBtn')}</Button>
      </TableCell>
    </TableRow>
  );
};

export default withStyles(styles)(AdminContactFormComponent);
