import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import theme from '../util/Theme';

const styles = {
  search: {
    height: '40px',
  },

  icon: {
    width: '25px',
    height: '25px',
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
* component that represent a text field for a search input
*/
class SearchField extends Component {
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
        <TextField
          variant="outlined"
          type="text"
          onKeyPress={event => this.onEnter(event)}
          value={this.props.value}
          onChange={this.props.onChange}
          placeholder={this.placeholder}
          className={classNames(classes.search, this.className)}
          InputProps={{
            classes: {
              root: classes.cssOutlinedInput,
              focused: classes.cssFocused,
              notchedOutline: classes.notchedOutline,
            },
            startAdornment: (
              <InputAdornment position="start">
                <FontAwesomeIcon icon={faSearch} style={styles.icon} />
              </InputAdornment>
            ),
          }}
        />
      </MuiThemeProvider>
    );
  }
}

SearchField.propTypes = {
  placeholder: PropTypes.string.isRequired,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onEnter: PropTypes.func,
};

export default withStyles(styles)(SearchField);
