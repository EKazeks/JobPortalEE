import React from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import SearchFormComponent from '../../components/jobs/searchForm.component.js';
import { getAllJobCategory, filterJobs } from '../../actions';

class SearchFormContainer extends React.Component {
  componentDidMount() {
    this.props.getAllJobCategory();
  }

  render() {
    return <SearchFormComponent {...this.props} />;
  }
}
const urlParams = new URLSearchParams(window.location.search);
const SearchForm = reduxForm({
  form: 'searchCriteria',
  initialValues: {
    search_phrase: urlParams.get('searchPhrase') ? urlParams.get('searchPhrase') : '',
    job_location: urlParams.get('location') ? urlParams.get('location') : '',
    portal_category_id: [],
    job_type: [],
    job_hours: [],
    published: '',
  },
  destroyOnUnmount: false,
})(SearchFormContainer);

const mapStateToProps = state => ({
  jobCategories: state.jobCategories.jobCategories,
});

const mapDispatchToProps = {
  getAllJobCategory,
  filterJobs,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
