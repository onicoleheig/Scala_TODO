import React, { Component } from "react";
import PropTypes from "prop-types";
import { MuiThemeProvider, withStyles } from "@material-ui/core/styles";
import theme from "../util/Theme";

import Task from '../components/Task'

const styles = {
  title: {
    position: "relative",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "20px",
    paddingLeft: "10px"
  },

  checkbox: {
    position: "relative",
    top: "50%",
    transform: "translateY(-50%)"
  },

  dateGrid: {
    textAlign: "center"
  },

  date: {
    position: "relative",
    top: "50%",
    transform: "translateY(-50%)",
    backgroundColor: theme.palette.primary.lighter,
    borderRadius: "20px"
  },

  subtaskDateGrid: {
    textAlign: "center",
    marginRight: "10px",
  },

  subtaskDate: {
    backgroundColor: theme.palette.primary.lighter,
    borderRadius: "20px",
    paddingRight: "15px",
    paddingLeft: "5px",
  },

  details: {
    flexDirection: "column"
  },

  description: {
    paddingLeft: "20px",
    paddingRight: "20px",
    wordWrap: "break-word",
    marginBottom: "10px",
    display: "block"
  },

  subtasks: {
    display: "block"
  }
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
            <Task task={task}/>
          ))
          : null
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
