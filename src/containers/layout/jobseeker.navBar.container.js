import { connect } from 'react-redux';
import JobseekerNavBarComponent from '../../components/layout/jobseeker.navBar.component';
import { logout } from '../../actions';

const mapStateToProps = state => ({
  isUserLoggedIn: state.client.user,
});
const mapDispatchToProps = {
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(JobseekerNavBarComponent);
