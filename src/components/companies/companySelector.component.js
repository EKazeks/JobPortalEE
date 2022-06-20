import React from 'react';
import { Field } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import { renderSelectField } from '../../utils/wrappers';

const styles = theme => ({
  root: {
    '& .MuiInputBase-root': {
      color: 'inherit',
      fontSize: '18px',
    },
    '& .MuiSelect-select:not([multiple]) option, .MuiSelect-select:not([multiple]) optgroup': {
      color: theme.palette.custom.darkText,
    },
    '& .MuiSelect-icon': {
      color: 'inherit',
    },
  },
  navSelect: {
    marginLeft: 20,
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
  },
  addBtn: {
    margin: '30px auto',
    width: '100%',
  },
});

const CompanySelectorComp = ({ companiesList, classes, selectCompany, activeCompany }) => {
  return (
    <div className={classes.root}>
      <Field
        name="company_name"
        component={renderSelectField}
        margin="dense"
        displayEmpty
        className={classes.navSelect}
        onChange={(e, i) => {
          const companyData = companiesList.filter(item => item.company_name === i)[0];
          selectCompany(companyData);
        }}
      >
        <option value="">{activeCompany && activeCompany.company_name}</option>
        {companiesList
          .filter(comp => comp.company_id !== (activeCompany && activeCompany.id))
          .map((item, i) => {
            return (
              <option value={item.company_name} key={i}>
                {item.company_name}
              </option>
            );
          })}
      </Field>
    </div>
  );
};

export default withStyles(styles)(CompanySelectorComp);
