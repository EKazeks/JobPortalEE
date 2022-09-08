import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ReactPaginate from 'react-paginate';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import { useTranslation } from 'react-i18next';
import { IconButton } from '@material-ui/core';
import AdminSearchFormContainer from '../../containers/admin/admin.searchForm.container';
import AdminContactFormContainer from '../../containers/admin/admin.contactForm.container';
import { API_SERVER } from '../../constants';
import { MySnackbarContentWrapper } from '../../utils/snackbar.utils';
import { Button } from '@material-ui/core';
const styles = theme => ({
  tableHead: {
    color: theme.palette.primary.main,
    fontSize: '1em',
    fontWeight: 'bold',
  },
  header: {
    backgroundColor: 'lightgray',
    borderTop: `4px solid ${theme.palette.primary.main}`,
  },
  tableCell: {
    borderBottom: 0,
    paddingLeft: 20,
  },
  companyRow: {
    borderBottom: '5px solid #f7f8fc',
    backgroundColor: 'white',
  },
  editIcon: {
    color: theme.palette.secondary.main,
  },
});
let IsMsg = false;
const deleteCompanyDetails = companyID => {
  const url = `${API_SERVER}/DeleteCompanyProfileByAdmin`;
  const formValues = companyID;

  const body = JSON.stringify({
    ...formValues,
  });
  fetch(url, { method: 'POST', body: body }).then(alert('Email id blocked successfully!'));
  // .then(res => res.json())
  window.location.reload(false);
};
const AdminCompanyComponent = ({
  companies,
  classes,
  adminSearchCompany,
  advertPages,
  changeAdvertPage,
  selectedPage,
  isEdit,
  isToEditId,
  editContactDetails,
}) => {
  const { t } = useTranslation('common');
  const header = [
    {
      name: t('companyName'),
    },

    {
      name: t('firstName'),
    },
    {
      name: t('lastName'),
    },
    {
      name: t('email'),
    },
    {
      name: t('contact'),
    },
    {
      name: t('businessId'),
    },
    {
      name: '',
    },
    {
      name: '',
    },
    {
      name: '',
    },
  ];
  return (
    <div>
      <div>
        <AdminSearchFormContainer search="company" searchBtnAction={() => adminSearchCompany(false)} />
      </div>
      {IsMsg ? (
        <div>
          <MySnackbarContentWrapper variant="success" message="Blocked" />
        </div>
      ) : null}

      <div style={{ overflowX: 'auto' }}>
        <Table>
          <TableHead className={classes.header}>
            <TableRow>
              {header.map((x, i) => (
                <TableCell key={`thc-${i}`} className={classes.tableCell}>
                  <span className={classes.tableHead}>{x.name}</span>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {companies.map((company, i) => {
              const details = {
                company_name: company.companyName,
                firstname: company.firstName,
                lastname: company.lastName,
                email: company.email,
                business_id: company.companyBusinessId,
                company_id: company.id,
                telephone: company.telephone,
                profile_description: company.profileDescription,
              };
              return isEdit && isToEditId === company.id ? (
                <AdminContactFormContainer user="company" key={i} />
              ) : (
                <TableRow key={i} className={classes.companyRow}>
                  <TableCell className={classes.tableCell}>{company.companyName}</TableCell>
                  <TableCell className={classes.tableCell}>{company.firstName}</TableCell>
                  <TableCell className={classes.tableCell}>{company.lastName}</TableCell>
                  <TableCell className={classes.tableCell}>{company.email}</TableCell>
                  <TableCell className={classes.tableCell}>{company.telephone ? company.telephone : '-'}</TableCell>
                  <TableCell className={classes.tableCell}>{company.companyBusinessId ? company.companyBusinessId : '-'}</TableCell>
                  <TableCell className={classes.tableCell}>
                    <IconButton onClick={() => editContactDetails(details, 'company')}>
                      <EditIcon className={classes.editIcon} />
                    </IconButton>
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    <Button variant="contained" color="secondary" onClick={() => deleteCompanyDetails(details, 'company')}>
                      {t('Block')}
                    </Button>
                  </TableCell>
                  <TableCell className={classes.tableCell} />
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <div className="pagination-body">
        <ReactPaginate
          previousLabel={<NavigateBeforeIcon />}
          nextLabel={<NavigateNextIcon />}
          breakLabel="..."
          breakClassName="break-me"
          pageCount={advertPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={data => {
            changeAdvertPage({
              selected: data.selected,
            });
            adminSearchCompany(true);
          }}
          containerClassName="pagination"
          subContainerClassName="pages pagination"
          activeClassName="active"
          forcePage={selectedPage}
        />
      </div>
    </div>
  );
};

export default withStyles(styles)(AdminCompanyComponent);
