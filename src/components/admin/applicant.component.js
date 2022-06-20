import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ReactPaginate from 'react-paginate';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import { useTranslation } from 'react-i18next';
import EditIcon from '@material-ui/icons/Edit';
import { IconButton } from '@material-ui/core';
import AdminContactFormContainer from '../../containers/admin/admin.contactForm.container';
import AdminSearchFormContainer from '../../containers/admin/admin.searchForm.container';

const styles = theme => ({
  tableHead: {
    color: theme.palette.primary.main,
    fontSize: '1em',
    fontWeight: 'bold',
  },
  tableCell: {
    borderBottom: 0,
    paddingLeft: 20,
  },
  header: {
    backgroundColor: 'lightgray',
    borderTop: `4px solid ${theme.palette.primary.main}`,
  },
  applicantsRow: {
    borderBottom: '5px solid #f7f8fc',
    backgroundColor: 'white',
  },
  editIcon: {
    color: theme.palette.secondary.main,
  },
});

const AdminApplicantComponent = ({
  adminSearchApplicant,
  applicants,
  classes,
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
      name: t('firstName'),
      id: 1,
    },
    {
      name: t('lastName'),
      id: 2,
    },
    {
      name: t('email'),
      id: 3,
    },
    {
      name: t('phone'),
      id: 4,
    },
    {
      name: t('linkedIn'),
      id: 5,
    },
    {
      name: t('portfolio'),
      id: 6,
    },
    {
      name: '',
      id: 7,
    },
    {
      name: '',
      id: 8,
    },
  ];
  return (
    <div>
      <div>
        <AdminSearchFormContainer search="applicants" searchBtnAction={() => adminSearchApplicant(false)} />
      </div>
      <div style={{ overflowX: 'auto' }}>
        <Table>
          <TableHead className={classes.header}>
            <TableRow>
              {header.map(x => (
                <TableCell key={`thc-${x.id}`} className={classes.tableCell}>
                  <span className={classes.tableHead}>{x.name}</span>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {applicants.map(applicant => {
              const details = {
                firstname: applicant.firstname,
                lastname: applicant.lastname,
                email: applicant.email,
                contact_number: applicant.contact_number,
                linkedin: applicant.linkedin,
                portfolio: applicant.portfolio,
                applicant_id: applicant.applicant_id,
              };
              return isEdit && isToEditId === applicant.applicant_id ? (
                <AdminContactFormContainer user="applicant" key={applicant.applicant_id} />
              ) : (
                <TableRow key={applicant.applicant_id} className={classes.applicantsRow}>
                  <TableCell className={classes.tableCell}>{applicant.firstname}</TableCell>
                  <TableCell className={classes.tableCell}>{applicant.lastname}</TableCell>
                  <TableCell className={classes.tableCell}>{applicant.email}</TableCell>
                  <TableCell className={classes.tableCell}>{applicant.contact_number}</TableCell>
                  <TableCell className={classes.tableCell}>
                    {applicant.linkedin ? (
                      <a
                        href={applicant.linkedin.includes('https' || 'http') ? applicant.linkedin : `https://${applicant.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {applicant.linkedin}
                      </a>
                    ) : (
                      '-'
                    )}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {applicant.portfolio ? (
                      <a
                        href={applicant.portfolio.includes('https' || 'http') ? applicant.portfolio : `https://${applicant.portfolio}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {applicant.portfolio}
                      </a>
                    ) : (
                      '-'
                    )}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    <IconButton onClick={() => editContactDetails(details, 'applicant')}>
                      <EditIcon className={classes.editIcon} />
                    </IconButton>
                  </TableCell>
                  <TableCell />
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
            adminSearchApplicant(true);
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

export default withStyles(styles)(AdminApplicantComponent);
