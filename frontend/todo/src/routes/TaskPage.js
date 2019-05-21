import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import theme from '../util/Theme';
import TaskList from '../components/TaskList';

const styles = {

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
          <TaskList tasks={this.state.tasks}/>
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
