import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const styles = {
  link: {
    fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif"',
    fontStyle: 'italic',
    fontSize: '0.875rem',
    color: 'black',
    textDecoration: 'none',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
};

/*
 * component that represent a link
 */
class Link extends Component {
  constructor(props) {
    super(props);
    this.children = props.children;
    this.href = props.href;
    this.className = props.className;
  }

  render() {
    const { classes } = this.props;
    return (
      <a href={this.href} className={classNames(classes.link, this.className)}>
        {this.children}
      </a>
    );
  }
}

Link.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Link);
