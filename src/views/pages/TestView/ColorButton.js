import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const ColorButton = withStyles(theme => ({
  root: {
    color: '#fff',
    backgroundColor: '#4FCF4F',
    '&:hover': {
      backgroundColor: '#4FCF4F'
    }
  }
}))(Button);

export default ColorButton;
