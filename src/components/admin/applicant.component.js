import React, { useEffect, useState } from 'react';
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
import axios from 'axios';
import { useSelector } from 'react-redux';

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
            {applicants && applicants.map(applicant => {
              const details = {
                firstname: applicant.firstName,
                lastname: applicant.lastName,
                email: applicant.email,
                contact_number: applicant.contactNumber,
                linkedin: applicant.linkedIn,
                portfolio: applicant.portfolio,
                applicant_id: applicant.id,
              };
              return isEdit && isToEditId === applicant.id ? (
                <AdminContactFormContainer user="applicant" key={applicant.id} />
              ) : (
                <TableRow key={applicant.applicant_id} className={classes.applicantsRow}>
                  <TableCell className={classes.tableCell}>{applicant.firsName}</TableCell>
                  <TableCell className={classes.tableCell}>{applicant.lastName}</TableCell>
                  <TableCell className={classes.tableCell}>{applicant.email}</TableCell>
                  <TableCell className={classes.tableCell}>{applicant.contactNumber}</TableCell>
                  <TableCell className={classes.tableCell}>
                    {applicant.linkedIn ? (
                      <a
                        href={applicant.linkedIn.includes('https' || 'http') ? applicant.linkedIn : `https://${applicant.linkedIn}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {applicant.linkedIn}
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
