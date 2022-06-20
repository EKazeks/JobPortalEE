import React, { useState } from 'react';
import { MenuItem, InputLabel, FormControl, Select } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { changeRowsPerPage, changeAdvertPage } from '../actions';
import store from '../store';

const styles = theme => ({
  formControl: {
    Width: 80,
    height: 40,
  },
  selectItems: {
    textAlign: 'center',
    margin: 'auto',
  },
});

const DropDownPagination = ({ rows }) => {
  const classes = styles();

  const [items, setItems] = useState(rows);

  const handleChange = event => {
    setItems(event.target.value);
    store.dispatch(changeRowsPerPage(event.target.value));
    store.dispatch(changeAdvertPage({ selected: 0 }));
  };
  const { t } = useTranslation('applicant');
  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">{t('showOption')}</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          className={classes.selectItems}
          value={items}
          onChange={handleChange}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={50}>50</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default withStyles(styles)(DropDownPagination);
