import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import theme from '../util/Theme';
import Link from '../components/Link';
import logo from '../assets/images/todo_logo.png';
import SignBackground from '../components/SignBackground';
import Avatar from '@material-ui/core/Avatar';

const styles = {
  background: {
    backgroundColor: theme.palette.background.main,
    width: '100%',
    position: 'relative',
    minHeight: '100vh',
    height: '100%',
  },

  content: {
    position: 'relative',
    width: '90%',
    left: '50%',
    transform: 'translateX(-50%)',
    minHeight: '100vh',
  },

  logo: {
    height: '150px',
    width: '150px',
    position: 'absolute',
    top: '50px',
    left: '50%',
    transform: 'translateX(-50%)',
  },

  text: {
    position: 'absolute',
    top: '200px',
    left: '50%',
    transform: 'translateX(-50%)',
  },

  link: {
    position: 'absolute',
    top: '300px',
    left: '50%',
    transform: 'translateX(-50%)',
  },

  icon: {
    height: '150px',
  },

  linkText: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
  },
};

/*
 * component that represent a page not found page
 */
class PageNotFound extends Component {
  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <main className={classes.background}>
          <SignBackground />
          <Avatar src={logo} className={classes.logo}/>
          <Typography
            className={classes.text}
            component="h2"
            variant="display3"
          >
            {'404\nPage not found'}
          </Typography>
          <Link href="/" className={classes.link}>
            <p className={classes.linkText}>Go to menu</p>
          </Link>
        </main>
      </MuiThemeProvider>
    );
  }
}

PageNotFound.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PageNotFound);
