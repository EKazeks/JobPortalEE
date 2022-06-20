import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useTranslation } from 'react-i18next';
import EuroSymbolOutlinedIcon from '@material-ui/icons/EuroSymbolOutlined';
import { PaymentCheckBox } from '../../utils/wrappers';
import { isToDisableCheckBox, setCurrencyColor } from '../../utils/helperFunctions';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: 600,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  tableContainer: {
    marginTop: 15,
  },
  table: {
    maxWidth: 1400,
  },
});

export default function MarketingBudgetComponent({ marketingDetails, updatePaymentStatus, paymentToUpdateDetails }) {
  const classes = useStyles();
  const { t } = useTranslation('campaigns');
  const header = [
    {
      name: t('marketingBudget'),
    },
    {
      name: t('budgetAfterServiceFee'),
    },
    {
      name: t('added'),
    },
    {
      name: t('common:paymentStatus'),
    },
    {
      name: t('common:paymentReference'),
    },
    {
      name: t('common:isPaid'),
    },
  ];

  return (
    <TableContainer className={classes.tableContainer}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            {header.map((x, i) => (
              <StyledTableCell key={`thc-${i}`}>
                <span className={classes.tableHead}>{x.name}</span>
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {marketingDetails &&
            marketingDetails.map(detail => {
              const orderDetails = {
                company_id: detail.company_id,
                post_id: detail.post_id,
                payment_reference: detail.payment_reference,
                fetch: 'marketingBudget',
              };

              const currentBudgetRow = `${detail.company_id}JP${detail.post_id}JP${detail.budget_id}`;
              return (
                <StyledTableRow key={currentBudgetRow}>
                  <StyledTableCell>{detail.marketing_budget}€</StyledTableCell>
                  <StyledTableCell>{calculateBudgetAfterSeviceFee(detail.marketing_budget)}€</StyledTableCell>
                  <StyledTableCell>{convertToFI(detail.created)}</StyledTableCell>
                  <StyledTableCell>
                    <EuroSymbolOutlinedIcon
                      style={{
                        color: setCurrencyColor(detail.payment_reference, detail.payment_status),
                      }}
                    />
                  </StyledTableCell>
                  <StyledTableCell>{detail.payment_reference}</StyledTableCell>
                  <StyledTableCell>
                    <PaymentCheckBox
                      isToCheck={detail.payment_status === 1 ? true : false}
                      onChange={() => updatePaymentStatus(orderDetails)}
                      disabled={isToDisableCheckBox(detail.payment_reference, detail.payment_method)}
                      orderDetails={orderDetails}
                      paymentToUpdateDetails={paymentToUpdateDetails}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export const calculateBudgetAfterSeviceFee = budget => {
  const serviceFeePercentage = 10;
  const remainingAmount = (100 - serviceFeePercentage) / 100;
  return (remainingAmount * budget).toFixed(2);
};

const convertToFI = date => {
  return new Intl.DateTimeFormat('fi-FI').format(new Date(date));
};
