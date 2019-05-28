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
      tasks: props.tasks,
      finishedTasks: props.finishedTasks,
      addTaskTitle: '',
      addTaskDate: '',
      addTaskDescription: ''
    }

    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleOnClickChecked = this.handleOnClickChecked.bind(this)
  }

  handleOnClickChecked(event, task) {
    event.stopPropagation()

    let tasks = this.state.tasks
    let finishedTasks = this.state.finishedTasks
    if (task.checked) return
    let index = tasks.indexOf(task);

    task.checked = true
    task.subtasks.forEach(subtask => subtask.checked = true);

    tasks.splice(index, 1)
    finishedTasks.push(task)

    this.setState({
      tasks: tasks,
      finishedTasks: finishedTasks,
    });
  }

  handleOnChange(name, event) {
    if (name === 'addTaskDate')
      if (event.target.value.length === 11)
        return

    this.setState({
      [name]: event.target.value
    })
  }

  handleAdd(event) {
    let tasks = this.state.tasks
    tasks.push({
      title: this.state.addTaskTitle,
      description: this.state.addTaskDescription,
      date: this.state.addTaskDate,
      checked: false,
      subtask: []
    });
    this.setState({
      tasks: tasks,
      addTaskTitle: '',
      addTaskDate: '',
      addTaskDescription: ''
    });
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
              <AddTaskField
                onChangeTitle={event => this.handleOnChange('addTaskTitle', event)}
                onChangeDescription={event => this.handleOnChange('addTaskDescription', event)}
                onChangeDate={event => this.handleOnChange('addTaskDate', event)}
                titleValue={this.state.addTaskTitle}
                descriptionValue={this.state.addTaskDescription}
                dateValue={this.state.addTaskDate}
                onClick={event => this.handleAdd(event)}
              />
            </div>
            <TaskList
              tasks={this.state.tasks}
              handleOnClickChecked={this.handleOnClickChecked}
              />
          </div>
          <hr className={classes.horizontalLine}/>
          <div>
            <Typography className={classes.title}>
              Finished Tasks
            </Typography>
            <TaskList tasks={this.state.finishedTasks}/>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

TaskPage.propTypes = {
  tasks: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  finishedTasks: PropTypes.object.isRequired,
};

export default withStyles(styles)(TaskPage);
