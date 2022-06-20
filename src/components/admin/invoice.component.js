import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ReactPaginate from 'react-paginate';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import { useTranslation } from 'react-i18next';
import AdminSearchFormContainer from '../../containers/admin/admin.searchForm.container';

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
  invoiceRow: {
    borderBottom: '5px solid #f7f8fc',
    backgroundColor: 'white',
  },
});

const AdminInvoiceComponent = ({ classes, invoices, adminSearchInvoice, advertPages, changeAdvertPage, selectedPage }) => {
  const { t } = useTranslation('adminInvoice', 'common');
  const header = [
    {
      name: t('common:email'),
    },
    {
      name: t('common:companyName'),
    },
    {
      name: t('invoiceNum'),
    },
    {
      name: t('invoiceRef'),
    },
    {
      name: t('sum'),
    },
    {
      name: t('dueDate'),
    },
    {
      name: t('status'),
    },
    {
      name: t('invoicePayment'),
    },
  ];
  return (
    <div>
      <div>
        <AdminSearchFormContainer search="invoice" searchBtnAction={adminSearchInvoice} />
      </div>
      <div>
        <Table>
          <TableHead className={classes.header}>
            <TableRow>
              {header.map((x, i) => (
                <TableCell key={`thc-${i}`}>
                  <span className={classes.tableHead}>{x.name}</span>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices.slice(selectedPage * 5, selectedPage * 5 + 5).map((invoice, i) => (
              <TableRow key={i} className={classes.invoiceRow}>
                <TableCell>{invoice.email}</TableCell>
                <TableCell>{invoice.company_name}</TableCell>
                <TableCell>{invoice.job_post_invoice_id}</TableCell>
                <TableCell>{invoice.invoice_reference}</TableCell>
                <TableCell>
                  {new Intl.NumberFormat('fi-FI', {
                    style: 'currency',
                    currency: 'EUR',
                  }).format(invoice.job_post_invoice_money)}
                </TableCell>
                <TableCell>{new Intl.DateTimeFormat('fi-FI').format(new Date(invoice.due_date))}</TableCell>
                <TableCell>{invoice.status === 1 ? t('handling') : ''}</TableCell>
                <TableCell>
                  <Checkbox />
                  <PictureAsPdfIcon />
                  <NotificationsIcon style={{ marginLeft: 8 }} />
                </TableCell>
              </TableRow>
            ))}
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
          onPageChange={changeAdvertPage}
          containerClassName="pagination"
          subContainerClassName="pages pagination"
          activeClassName="active"
          forcePage={selectedPage}
        />
      </div>
    </div>
  );
};

export default withStyles(styles)(AdminInvoiceComponent);
