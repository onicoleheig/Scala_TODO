import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import theme from '../util/Theme';

const styles = {

  div: {
    display: 'flex',
    flexDirection: 'row',
  },

  title: {
    width: '100%',
  },

  button: {
    width: '20px',
    height: '40px',
    marginTop: 'auto',
    marginBottom: '10px',
    marginRight: '10px',
    marginLeft: 'auto',
  },

  // those three are for the green TextField's border
  cssFocused: {},
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderWidth: '0px',
    },
  },
  notchedOutline: {
    borderWidth: '0px',
  },
};

/*
* component that represent a text field for a search input
*/
class AddSubTaskField extends Component {
  constructor(props) {
    super(props);
    this.placeholder = props.placeholder;
    this.className = props.className;
    this.onEnter = props.onEnter;
  }

  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
          <div className={classes.div}>
            <TextField
              variant="outlined"
              type="text"
              onKeyPress={event => this.onEnter(event)}
              value={this.props.value}
              onChange={this.props.onChange}
              placeholder={'Add subtask'}
              className={classNames(classes.title, this.className)}
              InputProps={{
                classes: {
                  root: classes.cssOutlinedInput,
                  focused: classes.cssFocused,
                  notchedOutline: classes.notchedOutline,
                  input: classes.title
                },
              }}
            />
            <Button className={classes.button}>
              Add
            </Button>
          </div>
      </MuiThemeProvider>
    );
  }
}

AddSubTaskField.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
};

export default withStyles(styles)(AddSubTaskField);
