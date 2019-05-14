import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import ReactSVG from 'react-svg';
import { withStyles, MuiThemeProvider } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Popover from '@material-ui/core/Popover';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUser } from '@fortawesome/free-regular-svg-icons';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import SearchField from './SearchField';
import theme from '../util/Theme';
import Notification from './Notification';
import cookbookIcon from '../assets/svg/cookbook_icon.svg';
import cookbookLogo from '../assets/svg/cookbook_logo.svg';

const styles = {
  navigator: {
    backgroundColor: theme.palette.background.light,
    borderBottom: `1px solid${theme.palette.element.main}`,
    width: '100%',
    height: '70px',
    position: 'fixed',
    top: '0px',
    left: '0px',
    zIndex: '10',
  },

  logo: {
    height: '50px',
    width: '200px',
    display: 'inline-block',
  },

  cookbookIcon: {
    height: '100%',
    width: '65px',
    display: 'inline-block',
    position: 'relative',
    left: '5px',
    top: '2px',
  },

  cookbookLogo: {
    height: '100%',
    width: '100px',
    position: 'absolute',
    left: '80px',
    top: '0px',
  },

  verticalLine: {
    borderLeft: `1px solid${theme.palette.element.main}`,
    height: '50%',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    left: '75px',
  },

  search: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translateX(-50%) translateY(-50%)',
    width: '400px',
    display: 'flex',
  },

  searchCheckbox: {
    position: 'relative',
    left: '0px',
    height: '40px',
    width: '30%',
    marginLeft: '0px',
    marginRight: '5px',
  },

  searchField: {
    width: '70%',
  },

  buttons: {
    position: 'absolute',
    width: '200px',
    display: 'inline',
    top: '50%',
    right: '-10%',
    transform: 'translateX(-50%) translateY(-50%)',
  },

  iconButton: {
    width: '50px',
    position: 'relative',
  },

  icon: {
    color: theme.palette.element.dark,
  },

  notificationCircle: {
    color: theme.palette.secondary.main,
    position: 'absolute',
    height: '11px',
    top: '8px',
    right: '2px',
  },

  // for the green color of the search type checkbox
  switchColorBase: {
    color: theme.palette.primary.main,
    '& + $switchColorBar': {
      backgroundColor: theme.palette.primary.main,
    },
  },

  switchColorBar: {},
};

/*
 * component that represent the navigator
 */
class Navigator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUserSearch: false,
      hasNotification: props.user.notifications.length > 0, // if there is new notifications
      notificationMenuAnchorEl: null, // for the notification menu
      userMenuAnchorEl: null, // for the user menu
      searchValue: '', // the search value
      user: props.user,
    };
    this.handleSearchType = this.handleSearchType.bind(this);
    this.handleOpenNotificationMenu = this.handleOpenNotificationMenu.bind(this);
    this.handleCloseNotificationMenu = this.handleCloseNotificationMenu.bind(this);
    this.handleOpenUserMenu = this.handleOpenUserMenu.bind(this);
    this.handleCloseUserMenu = this.handleCloseUserMenu.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /*
   * handle the search type, between recipe or user
   * event - the button action's event
   */
  handleSearchType(event) {
    this.setState({ isUserSearch: event.target.checked });
  }

  /*
   * open the notifications menu
   * event - the button action's event
   */
  handleOpenNotificationMenu(event) {
    if (this.state.hasNotification) {
      this.setState({
        notificationMenuAnchorEl: event.currentTarget,
      });
    }
  }

  /*
   * close the notification menu
   */
  handleCloseNotificationMenu() {
    this.setState({ notificationMenuAnchorEl: null });
  }

  /*
   * open the user menu
   * event - the button action's event
   */
  handleOpenUserMenu(event) {
    this.setState({ userMenuAnchorEl: event.currentTarget });
  }

  /*
   * close the user menu
   * event - the button action's event
   */
  handleCloseUserMenu() {
    this.setState({ userMenuAnchorEl: null });
  }

  /*
   * change the page location
   * location - the path to the next page
   */
  goToLocation(location) {
    window.location.href = location;
  }

  /*
   * handle when the user push Enter in the search bar
   * event - the button action's event
   */
  handleEnter(event) {
    if (event.key === 'Enter') {
      const location = this.state.isUserSearch
        ? `/usersearch?search=${this.state.searchValue}` : `/search?search=${this.state.searchValue}`;
      window.location.href = location;
      event.preventDefault();
    }
  }

  /*
   * handle the change of the value of the search field
   * event - the button action's event
   */
  handleChange(event) {
    this.setState({
      searchValue: event.target.value,
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <nav className={classes.navigator}>
          <a href="/" className={classes.logo}>
            <ReactSVG src={cookbookIcon} svgStyle={styles.cookbookIcon} />
            <span className={classes.verticalLine} />
            <ReactSVG src={cookbookLogo} svgStyle={styles.cookbookLogo} />
          </a>
          <div className={classes.search}>
            <FormControlLabel
              className={classes.searchCheckbox}
              labelPlacement="start"
              control={(
                <Switch
                  checked={this.state.isUserSearch}
                  onChange={event => this.handleSearchType(event)}
                  classes={{
                    switchBase: classes.switchColorBase,
                    bar: classes.switchColorBar,
                  }}
                />
            )}
              label={this.state.isUserSearch ? 'User' : 'Recipe'}
            />
            <SearchField value={this.state.searchValue} onChange={event => this.handleChange(event)} placeholder="Search" className={classes.searchField} onEnter={event => this.handleEnter(event)} />
          </div>
          <div className={classes.buttons}>
            <IconButton color="secondary" className={classes.iconButton}>
              {this.state.hasNotification ? (
                <FontAwesomeIcon icon={faCircle} className={classes.notificationCircle} />
              ) : null}
              <FontAwesomeIcon
                icon={faBell}
                className={classes.icon}
                onClick={event => this.handleOpenNotificationMenu(event)}
              />
            </IconButton>
            <Popover
              open={Boolean(this.state.notificationMenuAnchorEl)}
              anchorEl={this.state.notificationMenuAnchorEl}
              onClose={this.handleCloseNotificationMenu}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <List>
                {this.state.user.notifications.map(notification => (
                  <Notification
                    notification={notification}
                    user={this.state.user}
                  />
                ))}
              </List>
            </Popover>

            <IconButton
              color="secondary"
              className={classes.iconButton}
              onClick={event => this.handleOpenUserMenu(event)}
            >
              <FontAwesomeIcon icon={faUser} className={classes.icon} />
            </IconButton>
            <Popover
              open={Boolean(this.state.userMenuAnchorEl)}
              anchorEl={this.state.userMenuAnchorEl}
              onClose={this.handleCloseUserMenu}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <List>
                <ListItem button onClick={() => this.goToLocation('/')}>
                  <ListItemText primary="Profile" />
                </ListItem>
              </List>
            </Popover>
          </div>
        </nav>
      </MuiThemeProvider>
    );
  }
}

Navigator.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigator);
