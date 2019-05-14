import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import backgroundImage from '../assets/images/background.jpg';

const styles = {
  background: {
    height: '100vh',
    width: '100%',
    backgroundImage: `url(${backgroundImage})`,
    filter: 'opacity(30%)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    overflow: 'hidden',
  },
};

/*
 * component that represent the background image for the signin/ signup pages
 */
class SignBackground extends Component {
  render() {
    return <div className={this.props.classes.background} />;
  }
}

SignBackground.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignBackground);
