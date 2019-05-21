import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import theme from '../util/Theme';
import TaskList from '../components/TaskList';
import Typography from '@material-ui/core/Typography';

const styles = {
  title: {
    fontSize: '40px',
    marginBottom: '30px',
    marginLeft: '10px',
  },

  horizontalLine: {
    borderWidth: '0px',
    height: '2px',
    marginTop: '50px',
    marginBottom: '50px',
    width: '80%',
    backgroundColor: theme.palette.secondary.main,
  }
};

class TaskPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tasks: props.tasks
    }
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
            <TaskList tasks={this.state.tasks}/>
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
