import React from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  RadioGroup,
  FormControlLabel,
  FormHelperText,
  Checkbox,
  Switch,
  FormGroup,
  LinearProgress,
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import moment from "../../node_modules/moment";

export const renderTextField = (props) => {
  const {
    input,
    meta: { touched, invalid, error },
    endAdornment,
    ...restProps
  } = props;

  return (
    <TextField
      {...input}
      {...restProps}
      variant="outlined"
      error={touched && invalid}
      helperText={touched && error}
      InputProps={{ inputProps: { defaultValue: "test" } }}
      // margin='dense'
    />
  );
};

export const renderDenseTextField = (props) => {
  const {
    input,
    meta: { touched, invalid, error },
    searchForm,
    endAdornment,
    maxLength,
    ...restProps
  } = props;
  return (
    <TextField
      {...input}
      {...restProps}
      variant="outlined"
      error={touched && invalid}
      helperText={touched && error}
      margin="dense"
      inputProps={{ maxLength }}
      InputProps={{
        endAdornment,
        style: searchForm
          ? { borderRadius: 0, backgroundColor: "#ffffff" }
          : { borderRadius: "4px" }, // if used in searchForm.component, no radius should be given to match other fields
      }}
    />
  );
};

export const renderSelectField = ({
  input,
  label,
  meta: { touched, error, invalid },
  children,
  id,
  name,
  placeholder,
  viewBy,
  marginLeft,
  ...custom
}) => {
  return (
    <FormControl variant="outlined">
      <InputLabel
        htmlFor={id}
        style={{
          backgroundColor: viewBy === "admin" ? "transparent" : "white", // For select element, label shows on top of the border, so giving background color to hide that
        }}
      >
        {label}
      </InputLabel>
      <Select
        native
        {...input}
        {...custom}
        inputProps={{
          name,
          id,
        }}
        error={touched && invalid}
      >
        {children}
      </Select>
      {renderFormHelper({ touched, error, marginLeft })}
    </FormControl>
  );
};

export const renderSearchSelectField = ({
  input,
  label,
  meta: { touched, error, invalid },
  children,
  id,
  name,
  placeholder,
  searchForm,
  ...custom
}) => (
  <FormControl variant="outlined">
    <InputLabel
      htmlFor={id}
      style={{ backgroundColor: "white", color: "#999" }}
      classes={{
        outlined: searchForm,
      }}
    >
      {" "}
      {/* To match the stylings in search form passing searchForm props */}
      {label}
    </InputLabel>
    <Select
      native
      {...input}
      {...custom}
      inputProps={{
        name,
        id,
      }}
      error={touched && invalid}
      margin="dense"
      style={{
        borderRadius: 0,
      }}
    >
      {children}
    </Select>
    {renderFormHelper({ touched, error })}
  </FormControl>
);

export const renderRadioButton = ({
  input,
  label,
  meta: { touched, error },
  ...props
}) => (
  <FormControl>
    <RadioGroup
      {...input}
      {...props}
      value={input.value}
      onChange={(e, value) => input.onChange(value)}
    />

    {renderFormHelper({ touched, error })}
  </FormControl>
);

export const renderCheckbox = ({
  input,
  label,
  meta: { error, touched },
  isChecked,
  margin,
  ...props
}) => {
  return (
    <div>
      <FormControlLabel
        control={
          <Checkbox
            checked={!!input.value}
            onChange={input.onChange}
            {...props}
          />
        }
        label={label}
        error={touched && error ? "true" : "false"}
        style={{ margin }}
      />
      {renderFormHelper({ touched, error })}
    </div>
  );
};

export const renderDatePicker = ({
  input: { onChange, value, name },
  meta: { touched, error, invalid },
  label,
  dense,
}) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        autoOk
        variant="inline"
        inputVariant="outlined"
        format="dd.MM.yyyy"
        helperText={
          touched && error ? <p style={{ color: "#f44336" }}>{error}</p> : ""
        }
        error={touched && invalid}
        disableToolbar
        label={label}
        value={value || null}
        // maxDate={new Date().setDate(new Date().getDate() + 4 * 7 + 1)}
        maxDate={moment().add(29, "days")} // maximum about 4 weeks
        minDate={moment().add(1, "days")}
        name={name}
        onChange={onChange}
        /* KeyboardButtonProps={{
          'aria-label': 'change date'
        }} */
        required
        margin={dense}
      />
    </MuiPickersUtilsProvider>
  );
};
export const renderAdminDatePicker = ({
  input: { onChange, value, name },
  meta: { touched, error, invalid },
  label,
  role,
  disabled,
}) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        autoOk
        variant="inline"
        inputVariant="outlined"
        format="dd.MM.yyyy"
        helperText={touched && error}
        disableToolbar
        margin="dense"
        label={label}
        value={value || null}
        name={name}
        minDate={role === "interview" && new Date()}
        onChange={onChange}
        error={touched && invalid}
        style={{
          backgroundColor: "white",
          width: role === "interview" ? "100%" : 200,
          margin: role === "interview" ? "8px 0" : 10,
        }}
        disabled={disabled}
      />
    </MuiPickersUtilsProvider>
  );
};
export const renderTimePicker = ({
  input: { onChange, value },
  meta: { touched, error, invalid },
  disabled,
}) => {
  return (
    <TextField
      variant="outlined"
      margin="dense"
      id="time"
      type="time"
      //defaultValue="10:00"
      inputProps={{
        step: 300, // 5 min
      }}
      value={value || ""}
      onChange={onChange}
      error={touched && invalid}
      helperText={touched && error}
      disabled={disabled}
    />
  );
};
export const renderInterviewDatePicker = ({ input: { onChange, value } }) => {
  return (
    <TextField
      variant="outlined"
      margin="dense"
      id="date"
      type="date"
      //value={value || null}
      //defaultValue={new Date()}
      onChange={onChange}
    />
  );
};

export const renderFormHelper = ({ touched, error, marginLeft }) => {
  if (!(touched && error)) {
  } else {
    return (
      <FormHelperText style={{ color: "#ff0000", marginLeft: marginLeft }}>
        {touched && error}
      </FormHelperText>
    );
  }
};

export const renderSwitchLabels = ({
  isNotificationOn,
  toggleChecked,
  label,
  switchBaseStyle,
}) => {
  return (
    <FormGroup row style={{ justifyContent: "center" }}>
      <FormControlLabel
        control={
          <Switch
            checked={isNotificationOn}
            onChange={toggleChecked}
            classes={{
              switchBase: switchBaseStyle,
            }}
          />
        }
        label={label}
      />
    </FormGroup>
  );
};

export function filterObj(keys, obj) {
  const newObj = {};
  for (const key in obj) {
    if (!keys.includes(key)) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
}

export const PaymentCheckBox = ({
  isToCheck,
  onChange,
  disabled,
  orderDetails,
  paymentToUpdateDetails,
}) => {
  return (
    <div>
      {orderDetails?.company_id === paymentToUpdateDetails?.company_id &&
      orderDetails?.post_id === paymentToUpdateDetails?.post_id &&
      orderDetails?.payment_reference ===
        paymentToUpdateDetails?.payment_reference ? (
        <LinearProgress color="primary" />
      ) : (
        <Checkbox checked={isToCheck} onChange={onChange} disabled={disabled} />
      )}
    </div>
  );
};
