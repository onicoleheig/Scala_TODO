import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import theme from '../util/Theme';

const styles = {
  step: {
    display: 'block',
  },

  title: {
    fontSize: '20px',
    marginBottom: '10px',
  },

  text: {
    paddingLeft: '10px',
    paddingRight: '20px',
    wordWrap: 'break-word',
    marginBottom: '10px',
  },
};

/*
 * component that represent a step for a recipe
 */
class Step extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.step}>
          <Typography className={classes.title}>
            Step&nbsp;
            {this.props.step.stepNumber}
          </Typography>
          <Typography className={classes.text}>{this.props.step.description}</Typography>
        </div>
      </MuiThemeProvider>
    );
  }
}

Step.propTypes = {
  step: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Step);
