import React, { Component } from "react";
import PropTypes from "prop-types";
import { MuiThemeProvider, withStyles } from "@material-ui/core/styles";
import theme from "../util/Theme";
import Typography from '@material-ui/core/Typography';

import Task from '../components/Task'

const styles = {
  task: {
    marginTop: '10px',
    marginBottom: '10px',
  },
};

/*
 * component that represent a list of Task
 */
class TaskList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: props.tasks
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        { this.state.tasks ?
          this.state.tasks.map(task => (
            <div className={classes.task}>
              <Task task={task}/>
            </div>
          ))
          :
          <Typography>
            No task yet
          </Typography>
        }
      </MuiThemeProvider>
    );
  }
}

Task.propTypes = {
  tasks: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TaskList);
