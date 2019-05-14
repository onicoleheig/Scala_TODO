import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const styles = {
  avatar: {
    width: '150px',
    height: '150px',
  },
};

/*
 * component that represent an avatar
 */
class UserAvatar extends Component {
  constructor(props) {
    super(props);
    this.avatar = props.avatar;
    this.className = props.className;
  }

  render() {
    const { classes } = this.props;
    return (
      <Avatar src={this.avatar} className={classNames(classes.avatar, this.className)} />
    );
  }
}

UserAvatar.propTypes = {
  avatar: PropTypes.string.isRequired,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserAvatar);
