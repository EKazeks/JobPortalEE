import React from "react";
import { connect } from "react-redux";
import ExtraServiceButton from "../../../components/companies/advertisements/extraServiceButton.component";
import { addExtraService } from "../../../actions";

class ExtraServiceButtonContainer extends React.Component {
  render() {
    return <ExtraServiceButton {...this.props} />;
  }
}

const mapStateToProps = (state) => ({
  extraService: state.advertisement.extraService,
  userRole: state.client.user.data.user_type,
});

const mapDispatchToProps = {
  addExtraService,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExtraServiceButtonContainer);
