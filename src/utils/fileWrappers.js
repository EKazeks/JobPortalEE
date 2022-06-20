import React, { Component } from 'react';

export default class renderFileInputField extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const {
      input: { onChange },
    } = this.props;
    onChange(e.target.files[0]);
  }

  render() {
    const { input, label } = this.props; // whatever props you send to the component from redux-form Field
    return (
      <div>
        <label>{label}</label>
        <div>
          <input type="file" accept=".jpg, .png, .jpeg" onChange={this.onChange} />
        </div>
      </div>
    );
  }
}

/* const renderFileInputField = ({
  input,
  label,
  meta: { touched, error },
  ...props
}) => (
  <TextField
    hintText={label}
    type='file'
    errorText={error}
    {...input}
    {...props}
  />
);

export default renderFileInputField; */
