import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

const CustomTooltip = withStyles(theme => ({
  arrow: {
    color: theme.palette.secondary.main,
  },
  tooltip: {
    backgroundColor: theme.palette.secondary.main,
    fontSize: 14,
    padding: 10,
    lineHeight: '1.5',
    color: theme.palette.common.black,
  },
}))(Tooltip);

export default CustomTooltip;
