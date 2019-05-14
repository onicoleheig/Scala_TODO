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
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";

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
 * component that represent a Task
 */
class Task extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: false,
      subtasks: props.subtasks
    };

    this.onClickCheckbox = this.onClickCheckbox.bind(this);
    this.onClickSubtask = this.onClickSubtask.bind(this);
  }

  onClickCheckbox(event) {
    event.stopPropagation();
    this.setState({
      checked: !this.state.checked
    });
  }

  onClickSubtask = subtask => () => {
    let array = this.state.subtasks;
    let index = array.indexOf(subtask);
    array[index].checked = !array[index].checked;
    this.setState({ subtasks: array });
  };

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
                  checked={this.state.checked}
                  color="primary"
                  onClick={event => this.onClickCheckbox(event)}
                />
              </Grid>
              {this.props.date ? (
                <Grid item xs={1} className={classes.dateGrid}>
                  <Typography className={classes.date}>
                    {this.props.date}
                  </Typography>
                </Grid>
              ) : null}
              <Grid item xs={this.props.date ? 10 : 11}>
                <Typography className={classes.title}>
                  {this.props.title}
                </Typography>
              </Grid>
            </Grid>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details}>
            {this.props.description ? (
              <Typography className={classes.description}>
                {this.props.description}
              </Typography>
            ) : null}
            <List className={classes.subtasks}>
              {this.state.subtasks.map(subtask => (
                <ListItem key={subtask.title} onClick={this.onClickSubtask(subtask)}>
                  <Checkbox checked={subtask.checked} />
                    {subtask.date ? (
                      <Grid item xs={1} className={classes.subtaskDateGrid}>
                        <Typography className={classes.subtaskDate}>
                          {subtask.date}
                        </Typography>
                      </Grid>
                    ) : null}
                    <Grid item xs={this.state.date ? 10 : 11}>
                      <ListItemText primary={subtask.title} />
                    </Grid>
                </ListItem>
              ))}
            </List>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </MuiThemeProvider>
    );
  }
}

Task.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  date: PropTypes.string,
  subtasks: PropTypes.array,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Task);
