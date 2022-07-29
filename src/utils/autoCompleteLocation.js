import React from 'react';

import PlacesAutocomplete from 'react-places-autocomplete';
import { TextField, CircularProgress, withStyles } from '@material-ui/core';
import { renderDenseTextField as RenderDenseTextField, renderTextField as RenderTextField } from './wrappers';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const searchOptions = {
  //types: ['locality'],
  types: ['(regions)'],
  componentRestrictions: { country: 'ee' },
};
const styles = () => ({
  list: {
    borderBottom: '1px solid',
  },
  dropDownContainer: {
    boxShadow: '0 0 5px',
    position: 'absolute', // so it doesn't push the contents down
    width: '100%', // display full width as per the ouer div whose position is relative
    zIndex: 2,
  },
  activeItem: {
    padding: '5px 14px',
  },
  allItems: {
    padding: '5px 14px',
  },
  locationTextField: {
    backgroundColor: '#ffffff',
    borderRadius: 'none',
  },
});
const AutoCompleteLocation = ({ input, meta, label, required, margin, placeholder, classes, searchForm, jobseekerHome }) => {
  return window.google ? (
    <PlacesAutocomplete value={input.value} onChange={input.onChange} searchOptions={searchOptions} shouldFetchSuggestions={input.value.length >= 2}>
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
        return (
          <div style={{ position: 'relative' }}>
            <TextField
              variant="outlined"
              {...getInputProps({
                label,
                required,
                margin,
                placeholder,
              })}
              InputProps={{
                style: searchForm ? { borderRadius: 0 } : { borderRadius: '4px' }, // if used in searchForm.component, no radius should be given to match other fields
              }}
              style={jobseekerHome ? { backgroundColor: '#ffffff', margin: 0 } : { backgroundColor: '#ffffff', marginBottom: 0 }} // if used in homePage.component, no marginTop should be given to match other fields
            />
            {meta.touched && meta.error && (
              <label className="error" style={{ color: 'red', fontSize: 12 }}>
                {meta.error}
              </label>
            )}
            <div className={classes.dropDownContainer}>
              {loading && (
                <div>
                  <CircularProgress />
                </div>
              )}
              {suggestions.map(suggestion => {
                const className = suggestion.active ? classes.activeItem : classes.allItems;
                /*  ? 'suggestion-item--active'
                : 'suggestion-item'; */
                // inline style for demonstration purpose
                const style = suggestion.active ? { backgroundColor: '#fafafa', cursor: 'pointer' } : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                  key={suggestion.id}
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>
                      <LocationOnIcon style={{ marginRight: 8, fontSize: 14 }} />
                      {suggestion.description}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      }}
    </PlacesAutocomplete>
  ) : searchForm || jobseekerHome ? (
    <RenderDenseTextField input={input} meta={meta} searchForm={searchForm} placeholder={placeholder} />
  ) : (
    <RenderTextField input={input} meta={meta} searchForm={searchForm} label={label} />
  );
};

export default withStyles(styles)(AutoCompleteLocation);
