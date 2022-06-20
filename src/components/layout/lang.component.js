import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleChangeLang } from '../../actions/index';
import store from '../../store';
import i18n from '../../utils/i18n';

class LanguageComponent extends Component {
  state = {
    lang: i18n.language,
  };
  render() {
    return (
      <select
        name="langOpt"
        className="language-select"
        onChange={name => {
          store.dispatch(handleChangeLang(name.target.value));
          this.setState({
            lang: name.target.value,
          });
        }}
        value={this.state.lang}
        style={{ outline: 'none' }}
      >
        <option value="ee">Eesti</option>
        <option value="en">English</option>
        <option value="ru">Russian</option>
      </select>
    );
  }
}
const mapStateToProps = state => {
  return {
    lang: state.language.lang,
  };
};

const mapDispatchToProps = {
  handleChangeLang,
};
const Language = connect(mapStateToProps, mapDispatchToProps)(LanguageComponent);

export default Language;
