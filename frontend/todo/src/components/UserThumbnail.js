import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { withStyles, MuiThemeProvider } from '@material-ui/core/styles';
import UserAvatar from './UserAvatar';
import theme from '../util/Theme';
import userIcon from '../assets/images/user_icon.png';

const styles = {
  thumpnail: {
    width: '20%',
    minWidth: '200px',
    borderRadius: '2px',
    backgroundColor: theme.palette.background.light,
    margin: '10px',
    display: 'inline-block',
    position: 'relative',
    textAlign: 'center',
  },

  link: {
    textDecoration: 'none',
  },

  userAvatar: {
    marginTop: '10px',
    position: 'relative',
    margin: 'auto',
  },

  username: {
    marginTop: '10px',
    fontSize: '20px',
    color: theme.palette.secondary.main,
    marginBottom: '10px',
  },

  horizontalLine: {
    width: '75%',
    borderTop: '1px solid',
    borderColor: theme.palette.element.main,
  },
};

/*
 * component that represent a thumbnail for an user
 */
class UserThumbnail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
    };
    this.picture = !this.state.user.picture ? userIcon : this.state.user.picture;
  }

  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <Paper className={classes.thumpnail} color="secondary">
          <a href={`users/${this.state.user.id}`} alt={this.state.user.name} className={classes.link}>
            <UserAvatar className={classes.userAvatar} avatar={this.picture} />
            <hr style={styles.horizontalLine} />
            <Typography className={classes.username}>{this.state.user.name}</Typography>
          </a>
        </Paper>
      </MuiThemeProvider>
    );
  }
}

UserThumbnail.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserThumbnail);
