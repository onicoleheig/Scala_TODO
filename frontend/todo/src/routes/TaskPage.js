import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import theme from '../util/Theme';
import TaskList from '../components/TaskList';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import IconButton from '@material-ui/core/IconButton';
import AddTaskField from '../components/AddTaskField';

const styles = {
  title: {
    fontSize: '40px',
    marginBottom: '30px',
    marginLeft: '10px',
  },

  addTask: {
    marginBottom: '50px',
  },

  horizontalLine: {
    borderWidth: '0px',
    height: '2px',
    marginTop: '50px',
    marginBottom: '50px',
    width: '80%',
    backgroundColor: theme.palette.secondary.main,
  },

  iconButtonContainer: {
    textAlign: 'right',
    margin: '20px',
  },

  iconButton: {
    width: '50px',
    height: '50px',
    position: 'relative',
  },

  icon: {
    color: theme.palette.secondary.dark,
  },
};

class TaskPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tasks: props.tasks
    }
  }

  handleAdd(event) {

  }

  render() {
    const {classes} = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <div>
            <Typography className={classes.title}>
              Current tasks
            </Typography>
            <div className={classes.addTask}>
              <AddTaskField/>
            </div>
            <TaskList tasks={this.state.tasks}/>
          </div>
          <div className={classes.iconButtonContainer}>
            <IconButton
              color="secondary"
              className={classes.iconButton}
              onClick={event => this.handleAdd(event)}
            >
              <FontAwesomeIcon icon={faPlus} className={classes.icon} />
            </IconButton>
          </div>
          <hr className={classes.horizontalLine}/>
          <div>
            <Typography className={classes.title}>
              Finished Tasks
            </Typography>
            <TaskList tasks={this.state.tasks}/>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

TaskPage.propTypes = {
  tasks: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TaskPage);
