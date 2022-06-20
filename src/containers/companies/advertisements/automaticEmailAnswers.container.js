import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import AutomaticEmailAnswers from '../../../components/companies/advertisements/automaticEmailAnswers.component';
import { autoEmailToApplicant, populateEmailMessage } from '../../../actions';

const AutomaticEmailAnswersContainer = reduxForm({
  form: 'vacancy',
})(AutomaticEmailAnswers);

const mapStateToProps = state => ({
  automaticEmailToggleBtn: state.advertisement.automaticEmailToggleBtn,
  emailMessageTemplate: state.advertisement.emailMessageTemplate,
});

const mapDispatchToProps = {
  autoEmailToApplicant,
  populateEmailMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(AutomaticEmailAnswersContainer);
