import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import theme from '../util/Theme';

const styles = {
  icon: {
    color: theme.palette.element.main,
    marginRight: '5px',
    width: '16px',
  },

  password: {
    height: '40px',
  },

  eyeButton: {
    color: theme.palette.element.main,
  },

  // those three are for the green TextField's border
  cssFocused: {},
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: theme.palette.secondary.main,
    },
  },
  notchedOutline: {},
};

/*
 * component that represent a text field for a password input
 */
class PasswordField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false, // if the password has to be displayed insdead of circles
    };
    this.placeholder = props.placeholder;
    this.className = props.className;
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
  }

  /*
   * change the state of the display of the password (text or circles)
   */
  handleClickShowPassword() {
    this.setState(state => ({ showPassword: !state.showPassword }));
  }

  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <TextField
          variant="outlined"
          type={this.state.showPassword ? 'text' : 'password'}
          className={classNames(classes.password, this.className)}
          placeholder={this.placeholder}
          value={this.props.value}
          onChange={this.props.onChange}
          InputProps={{
            classes: {
              root: classes.cssOutlinedInput,
              focused: classes.cssFocused,
              notchedOutline: classes.notchedOutline,
            },
            startAdornment: (
              <InputAdornment position="start">
                <FontAwesomeIcon className={classes.icon} icon={faKey} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={this.handleClickShowPassword}
                  className={classes.eyeButton}
                >
                  {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </MuiThemeProvider>
    );
  }
}

PasswordField.propTypes = {
  placeholder: PropTypes.string.isRequired,
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PasswordField);
