import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt } from '@fortawesome/free-solid-svg-icons';
import theme from '../util/Theme';
import SignBackground from '../components/SignBackground';
import PasswordField from '../components/PasswordField';
import logo from '../assets/images/todo_logo.png';

const styles = {
  panel: {
    textAlign: 'center',
    borderRadius: '8px',
    backgroundColor: theme.palette.background.main,
    verticalAlign: 'middle',
    overflow: 'scroll',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translateX(-50%) translateY(-50%)',
    width: '400px',
    filter: 'opacity(90%)',
  },

  avatar: {
    margin: 'auto',
    marginTop: '20px',
    marginBottom: '10px',
    width: '72px',
    height: '72px',
  },

  title: {
    margin: '10px 10px',
  },

  inputs: {
    width: '70%',
    height: '40px',
  },

  inputsSignin: {
    marginTop: '20px',
    marginBottom: '10px',
  },

  bottomInputs: {
    width: '70%',
    height: '40px',
    marginBottom: '20px',
  },

  horizontalLine: {
    borderWidth: '1px',
    width: '70%',
  },

  icon: {
    color: theme.palette.element.main,
  },

  error: {
    color: theme.palette.error.main,
  },

  // those three are for the blue TextField's border
  cssFocused: {},
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: theme.palette.secondary.main,
    },
  },
  notchedOutline: {},
};

/*
* component that represent the signin page
*/
class SigninPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    }

    this.setValue = this.setValue.bind(this)
  }

  setValue(name, event) {
    this.setState({
      [name]: event.target.value
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <SignBackground />
          <Paper className={classes.panel}>
            <Avatar src={logo} className={classes.avatar} />
            <Typography variant="h4" className={classes.title}>
              Welcome to ToDo
            </Typography>
            <form>
              <TextField
                value={this.state.email}
                onChange={event => this.setValue('email', event)}
                variant="outlined"
                id="signin-email"
                className={classes.inputs}
                placeholder="Email Address"
                type="email"
                margin="normal"
                InputProps={{
                  classes: {
                    root: classes.cssOutlinedInput,
                    focused: classes.cssFocused,
                    notchedOutline: classes.notchedOutline,
                  },
                  startAdornment: (
                    <InputAdornment position="start">
                      <FontAwesomeIcon
                        className={classes.icon}
                        icon={faAt}
                        />
                    </InputAdornment>
                  ),
                }}
                />

              <PasswordField
                value={this.state.password}
                onChange={event => this.setValue('password', event)}
                id="signin-password"
                className={classes.inputs}
                placeholder="Password"
                />

              <div className={classes.inputsSignin}>
                <Button
                  id="signin-button-signin"
                  variant="contained"
                  className={classes.inputs}
                  type="submit"
                  >
                  Sign in
                </Button>
              </div>
              <p className={classes.error}>{''}</p>
            </form>
            <hr className={classes.horizontalLine} />
            <Button
              id="signin-button-signin"
              variant="contained"
              className={classes.bottomInputs}
              href="/signup"
              >
              Sign up
            </Button>
          </Paper>
        </div>
      </MuiThemeProvider>
    );
  }

}

SigninPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SigninPage);
