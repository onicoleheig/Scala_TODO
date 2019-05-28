import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import theme from '../util/Theme';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '60%',
    margin: 'auto',
  },

  text: {
    fontSize: '25px',
    marginLeft: '12px',
    marginTop: '5px',
  },

  title: {
    fontSize: '22px',
    marginBottom: '-5px',
  },

  div: {
    display: 'flex',
    flexDirection: 'row',
  },

  description: {
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
class AddTaskField extends Component {
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
        <Paper className={classes.container}>
          <Typography className={classes.text}>Add new task</Typography>
          <TextField
            variant="outlined"
            type="text"
            value={this.props.titleValue}
            onChange={this.props.onChangeTitle}
            placeholder={'Title'}
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
          <div className={classes.div}>
            <TextField
              variant="outlined"
              type="text"
              multiline
              value={this.props.descriptionValue}
              onChange={this.props.onChangeDescription}
              placeholder={'Description'}
              className={classNames(classes.description, this.className)}
              InputProps={{
                classes: {
                  root: classes.cssOutlinedInput,
                  focused: classes.cssFocused,
                  notchedOutline: classes.notchedOutline,
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
          <Button className={classes.button} onClick={this.props.onClick}>
              Add
            </Button>
          </div>
        </Paper>
      </MuiThemeProvider>
    );
  }
}

AddTaskField.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  onChangeTitle: PropTypes.func.isRequired,
  onChangeDescription: PropTypes.func.isRequired,
  onChangeDate: PropTypes.func.isRequired,
  titleValue: PropTypes.string.isRequired,
  dateValue: PropTypes.string.isRequired,
  descriptionValue: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(AddTaskField);
