import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import classNames from 'classnames';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import theme from '../util/Theme';
import SignBackground from '../components/SignBackground';
import PasswordField from '../components/PasswordField';
import Util from '../util/Util';
import logo from '../assets/images/todo_logo.png';

const styles = {
  panel: {
    textAlign: 'center',
    borderRadius: '2px',
    backgroundColor: theme.palette.background.main,
    verticalAlign: 'middle',
    overflow: 'scroll',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translateX(-50%) translateY(-50%)',
    width: '400px',
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
    margin: '10px',
    width: '70%',
    height: '40px',
  },

  signup: {
    marginBottom: '20px',
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
 * component that represent the signup page
 */
class SignupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorText: '', // the error text to display
      email: '', // the user's input for the email
      username: '', // the user's input for the username
      password: '', // the user's input for the password
      repeatPassword: '', // the user's input for the repeat password
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  /*
   * executed when the component is mounted
   */
  componentDidMount() {
    document.title = 'Cookbook - Sign up';
  }

  /*
   * handle the change of the value of an input
   * name - the name of the input reference in the state
   * event - the button action's event
   */
  handleChange(name, event) {
    this.setState({
      [name]: event.target.value,
    });
  }

  /*
   * control the inputs and sign in the user
   */
  handleSignup() {
    // let hasError = false;
    // let errorText = '';
    // // check if the email is valid, contains a @
    // if (!Util.checkIsValidEmail(this.state.email)) {
    //   hasError = true;
    //   errorText = 'This is not a valid email.';
    // }
    // // check if the passwords inputs are equals
    // if (this.state.password !== this.state.repeatPassword) {
    //   hasError = true;
    //   errorText = 'Your password and repeat password does not match.';
    // }
    // // check if all the field are filled
    // if (
    //   this.state.email === ''
    //   || this.state.username === ''
    //   || this.state.password === ''
    //   || this.state.repeatPassword === ''
    // ) {
    //   hasError = true;
    //   errorText = 'Some fields are not filled.';
    // }
    // // update the state
    // this.setState({
    //   errorText,
    // });
    //
    // if (!hasError) {
    //   const query = `mutation{
    //     create_user(
    //       name: "${this.state.username}",
    //       email: "${this.state.email}",
    //       password: "${this.state.password}"){
    //         name
    //       }
    //     }`;
    //
    //   fetch(`${apiURI}/graphql`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Accept: 'application/json',
    //     },
    //     body: JSON.stringify({
    //       query,
    //     }),
    //   })
    //     .then(r => r.json())
    //     .then(); // (window.location.href = '/')
    // }
  }

  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <SignBackground />
          <Paper id="signup-panel" className={classes.panel}>
            <Avatar src={logo} className={classes.avatar} />
            <Typography variant="h4" className={classes.title}>
              Please Sign up
            </Typography>
            <TextField
              variant="outlined"
              id="signup-email"
              className={classes.inputs}
              placeholder="Email Address"
              type="email"
              margin="normal"
              value={this.state.email}
              onChange={event => this.handleChange('email', event)}
              InputProps={{
                classes: {
                  root: classes.cssOutlinedInput,
                  focused: classes.cssFocused,
                  notchedOutline: classes.notchedOutline,
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <FontAwesomeIcon className={classes.icon} icon={faAt} />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              variant="outlined"
              id="signup-username"
              className={classes.inputs}
              placeholder="Username"
              type="text"
              margin="normal"
              value={this.state.username}
              onChange={event => this.handleChange('username', event)}
              InputProps={{
                classes: {
                  root: classes.cssOutlinedInput,
                  focused: classes.cssFocused,
                  notchedOutline: classes.notchedOutline,
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <FontAwesomeIcon className={classes.icon} icon={faUser} />
                  </InputAdornment>
                ),
              }}
            />
            <PasswordField
              id="signup-password"
              className={classes.inputs}
              value={this.state.password}
              onChange={event => this.handleChange('password', event)}
              placeholder="Password"
            />
            <PasswordField
              id="signup-repeat-password"
              className={classes.inputs}
              value={this.state.repeatPassword}
              onChange={event => this.handleChange('repeatPassword', event)}
              placeholder="Repeat password"
            />
            <Button
              id="signup-button-signup"
              variant="contained"
              className={classNames(classes.inputs, classes.signup)}
              onClick={this.handleSignup}
            >
              Sign up
            </Button>
            <Typography color="error">{this.state.errorText}</Typography>
          </Paper>
        </div>
      </MuiThemeProvider>
    );
  }
}

SignupPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignupPage);
