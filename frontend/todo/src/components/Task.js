import React, { Component } from "react";
import PropTypes from "prop-types";
import { MuiThemeProvider, withStyles } from "@material-ui/core/styles";
import theme from "../util/Theme";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import IconButton from '@material-ui/core/IconButton';

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
    marginRight: "10px"
  },

  subtaskDate: {
    backgroundColor: theme.palette.primary.lighter,
    borderRadius: "20px",
    paddingRight: "15px",
    paddingLeft: "5px"
  },

  details: {
    flexDirection: "column"
  },

  buttons: {
    textAlign: 'right',
  },

  iconButton: {
    width: '50px',
    height: '50px',
    position: 'relative',
  },

  icon: {
    color: theme.palette.secondary.light,
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
  },
};

/*
 * component that represent a Task
 */
class Task extends Component {
  constructor(props) {
    super(props);

    this.state = {
      task: props.task
    };

    this.onClickCheckbox = this.onClickCheckbox.bind(this);
    this.onClickSubtask = this.onClickSubtask.bind(this);
  }

  onClickCheckbox(event) {
    event.stopPropagation();
    let task = this.task
    task.checked = !task.checked
    this.setState({
      task: task
    });
  }

  onClickSubtask = subtask => () => {
    let task = this.state.task
    let array = task.subtasks;
    let index = array.indexOf(subtask);
    array[index].checked = !array[index].checked;
    task.subtask = array
    this.setState({ task: task });
  };

  handleAdd(event) {
    event.stopPropagation();
  }

  handleEdit(event) {
    event.stopPropagation();
  }

  handleDelete(event) {
    event.stopPropagation();
  }

  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Grid container>
              <Grid item>
                <Checkbox
                  className={classes.checkbox}
                  checked={this.state.task.checked}
                  color="primary"
                  onClick={event => this.onClickCheckbox(event)}
                />
              </Grid>
              {this.state.task.date ? (
                <Grid item xs={1} className={classes.dateGrid}>
                  <Typography className={classes.date}>
                    {this.state.task.date}
                  </Typography>
                </Grid>
              ) : null}
              <Grid item xs={this.state.task.date ? 8 : 9}>
                <Typography className={classes.title}>
                  {this.state.task.title}
                </Typography>
              </Grid>
              <Grid item xs={2} className={classes.buttons}>
                <IconButton
                  color="secondary"
                  className={classes.iconButton}
                  onClick={event => this.handleAdd(event)}
                >
                  <FontAwesomeIcon icon={faPlus} className={classes.icon} />
                </IconButton>

                <IconButton
                  color="secondary"
                  className={classes.iconButton}
                  onClick={event => this.handleEdit(event)}
                >
                  <FontAwesomeIcon icon={faEdit} className={classes.icon} />
                </IconButton>

                <IconButton
                  color="secondary"
                  className={classes.iconButton}
                  onClick={event => this.handleDelete(event)}
                >
                  <FontAwesomeIcon icon={faTrashAlt} className={classes.icon} />
                </IconButton>
              </Grid>
            </Grid>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details}>
            <div>
              {this.state.task.description ? (
                <Typography className={classes.description}>
                  {this.state.task.description}
                </Typography>
              ) : null}
            </div>
            <List className={classes.subtasks}>
              {this.state.task.subtasks
                ? this.state.task.subtasks.map(subtask => (
                    <ListItem
                      key={subtask.title}
                      onClick={this.onClickSubtask(subtask)}
                    >
                      <Checkbox checked={subtask.checked} />
                      {subtask.date ? (
                        <Grid item xs={1} className={classes.subtaskDateGrid}>
                          <Typography className={classes.subtaskDate}>
                            {subtask.date}
                          </Typography>
                        </Grid>
                      ) : null}
                      <Grid item xs={subtask.date ? 9 : 10}>
                        <ListItemText primary={subtask.title} />
                      </Grid>
                      <Grid item xs={2} className={classes.buttons}>
                        <IconButton
                          color="secondary"
                          className={classes.iconButton}
                          onClick={event => this.handleEdit(event)}
                        >
                          <FontAwesomeIcon icon={faEdit} className={classes.icon} />
                        </IconButton>

                        <IconButton
                          color="secondary"
                          className={classes.iconButton}
                          onClick={event => this.handleDelete(event)}
                        >
                          <FontAwesomeIcon icon={faTrashAlt} className={classes.icon} />
                        </IconButton>
                      </Grid>
                    </ListItem>
                  ))
                : null}
            </List>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </MuiThemeProvider>
    );
  }
}

Task.propTypes = {
  task: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Task);
