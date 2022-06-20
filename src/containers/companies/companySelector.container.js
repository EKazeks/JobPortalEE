import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import CompanySelectorComp from '../../components/companies/companySelector.component';
import { selectCompany } from '../../actions';

const mapStateToProps = state => {
  const { usersCompanyList } = state;

  const { companiesList } = usersCompanyList;

  return {
    state,
    companiesList,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    selectCompany: data => dispatch(selectCompany(data)),
  };
};

let CompanySelectorContainer = reduxForm({
  form: 'companySelector',
  destroyOnUnmount: false,
  enableReinitialize: true,
  //initialValues: {}
})(CompanySelectorComp);

CompanySelectorContainer = connect(mapStateToProps, mapDispatchToProps)(CompanySelectorContainer);

export default CompanySelectorContainer;
