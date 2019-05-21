import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import PropTypes from 'prop-types';
import UserAvatar from './UserAvatar';
import theme from '../util/Theme';
import userIcon from '../assets/images/user_icon.png';

const styles = {
  listItem: {
    backgroundColor: theme.palette.background.light,
    border: '1px solid',
    borderColor: theme.palette.background.main,
  },

  avatar: {
    width: '50px',
    height: '50px',
  },
};

/*
 * component that represent a notification
 */
class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notification: props.notification,
    };
    this.onClick = this.onClick.bind(this);
    this.date = new Date(this.state.notification.date).toDateString();
    this.picture = !this.state.notification.authorPicture ? userIcon : this.state.notification.authorPicture;
  }

  onClick() {
    const query = `mutation{
      delete_notification(user:"${this.props.user.id}", notification:"${this.state.notification.id}"){
        id
      }
    }`;

    window.location.href = `/${this.state.notification.path}`;
  }

  render() {
    const { classes } = this.props;
    return (
      <ListItem button alignItems="flex-start" className={classes.listItem} onClick={this.onClick}>
        <ListItemAvatar>
          <UserAvatar avatar={this.picture} className={classes.avatar} />
        </ListItemAvatar>
        <ListItemText
          primary={`${this.state.notification.authorName} ${this.state.notification.text}`}
          secondary={`${this.date}`}
        />
      </ListItem>
    );
  }
}

Notification.propTypes = {
  notification: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  user: PropTypes.object,
};

export default withStyles(styles)(Notification);
