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
              value={this.props.titleValue}
              onChange={this.props.onChangeTitle}
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
            <TextField
              variant="outlined"
              type="text"

              value={this.props.dateValue}
              onChange={this.props.onChangeDate}
              placeholder={'Deadline'}
              className={this.className}
              InputProps={{
                classes: {
                  root: classes.cssOutlinedInput,
                  focused: classes.cssFocused,
                  notchedOutline: classes.notchedOutline,
                },
              }}
            />
          <Button className={classes.button} onClick={this.props.onAdd}>
              Add
            </Button>
            <Button className={classes.button} onClick={this.props.onDismiss}>
              Cancel
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
  onAdd: PropTypes.func.isRequired,
  onDismiss: PropTypes.func.isRequired,
  titleValue: PropTypes.string.isRequired,
  dateValue: PropTypes.string.isRequired,
  onChangeTitle: PropTypes.func.isRequired,
  onChangeDate: PropTypes.func.isRequired,
};

export default withStyles(styles)(AddSubTaskField);
