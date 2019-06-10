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
      tasks: [],
      finishedTasks: [],
      addTaskTitle: '',
      addTaskDate: '',
      addTaskDescription: ''
    }

    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleOnClickChecked = this.handleOnClickChecked.bind(this)
  }

  componentWillMount() {
    //const userId = this.props.match.params.userid;
    fetch(`http://localhost:9000/users/1/tasks`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(r => r.json())
      .then((data) => {
        let tasks = []
        let finishedTasks = []
        if (data.length > 0) {
          data.map((task) => {
            if (task.checked) finishedTasks.push(task)
            else tasks.push(task)
          });
        }

        this.setState({
          tasks: tasks,
          finishedTasks: finishedTasks
        }, () => console.log(this.state.tasks))
      });
  }

  handleOnClickChecked(event, task) {
    event.stopPropagation()

    let tasks = this.state.tasks
    let finishedTasks = this.state.finishedTasks

    if (task.checked) return
    let index = tasks.indexOf(task);

    task.checked = true
    // if (task.subtask.length > 0)
    // task.subtasks.forEach(subtask => subtask.checked = true);

    tasks.splice(index, 1)
    finishedTasks.push(task)

    this.setState({
      tasks: tasks,
      finishedTasks: finishedTasks,
    });

    let data = {
      title: task.title,
      date: task.date,
      description: task.description,
      checked: true,
      userId: task.userId
    }

    fetch(`http://localhost:9000/tasks/${task.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data)
    }).then();
  }

  handleOnChange(name, event) {
    if (name === 'addTaskDate')
      if (event.target.value.length === 11)
        return

    this.setState({
      [name]: event.target.value
    })


    let data = { login_id: 'lionel.nanchen@heig-vd.ch', password: 'lionel' }
  }

  handleAdd(event) {
    let tasks = this.state.tasks
    if (this.state.addTaskTitle === "") return
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

    let data = {
      title: this.state.addTaskTitle,
      date: this.state.addTaskDate,
      description: this.state.addTaskDescription,
      checked: false,
      userId: 1
    }

    fetch(`http://localhost:9000/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data)
    }).then(r => r.json());
  }

  render() {
    const { classes } = this.props;
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
          <hr className={classes.horizontalLine} />
          <div>
            <Typography className={classes.title}>
              Finished Tasks
            </Typography>
            <TaskList tasks={this.state.finishedTasks} handleOnClickChecked={this.handleOnClickChecked} />
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
