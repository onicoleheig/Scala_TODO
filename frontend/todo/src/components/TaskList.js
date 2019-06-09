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

    console.log("A", props.tasks, this.state.tasks)
  }

  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        { this.props.tasks.length > 0 ?
          this.props.tasks.map(task => (
            <div className={classes.task}>
              <Task
                task={task}
                handleOnClickChecked={this.props.handleOnClickChecked}
                />
            </div>
          ))
          :
          <Typography>
            No task
          </Typography>
        }
      </MuiThemeProvider>
    );
  }
}

Task.propTypes = {
  tasks: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  handleOnClickChecked: PropTypes.func.isRequired
};

export default withStyles(styles)(TaskList);
