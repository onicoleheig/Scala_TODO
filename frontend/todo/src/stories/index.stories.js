import React from 'react';
import { storiesOf } from '@storybook/react';
import PasswordField from '../components/PasswordField';
import Link from '../components/Link';
import UserAvatar from '../components/UserAvatar';
import SignBackground from '../components/SignBackground';
import backgroundImg from '../assets/images/background.jpg';
import Task from '../components/Task';
import AddTaskField from '../components/AddTaskField';
import TaskList from '../components/TaskList';
import LoginPage from '../routes/LoginPage';
import SignupPage from '../routes/SignupPage';
import TaskPage from '../routes/TaskPage';
import PageNotFound from '../routes/PageNotFound';
import AddSubTaskField from '../components/AddSubTaskField';

let subtasks = [
  {
    title: 'Subtask 1',
    date: '01.01.2020',
    checked: false
  },
  {
    title: 'Subtask 2',
    checked: false
  },
];

let tasks = [
  {
    title: 'Task 1',
    date: '01.01.2020',
    description: 'Description 1',
    checked: false,
    subtasks: subtasks
  },
  {
    title: 'Task 2',
    date: '',
    description: '',
    checked: false,
    subtasks: []
  },
  {
    title: 'Task 3',
    date: '01.01.2020',
    description: '',
    checked: false,
    subtasks: []
  },
]

let finishedTasks = [
  {
    title: 'Finished Task 1',
    date: '01.01.2020',
    description: 'Description 1',
    checked: true,
    subtasks: subtasks
  },
  {
    title: 'Finished Task 2',
    date: '01.01.2020',
    description: '',
    checked: true,
    subtasks: []
  },
]

storiesOf('Fields', module)
  .add('AddTaskField', () => <AddTaskField />)
  .add('AddSubTaskField', () => <AddSubTaskField/>)
  .add('PasswordField', () => <PasswordField placeholder="password" />)
  .add('Task', () => <Task task={{title:"Task", description:"Some description", date:"01.01.2020", subtasks:subtasks}}/>)
  .add('TaskList', () => <TaskList tasks={tasks} />)
  .add('Link', () => <Link href="#">Link</Link>);

storiesOf('Pages', module)
  .add('LoginPage', () => <LoginPage/>)
  .add('SignupPage', () => <SignupPage/>)
  .add('TaskPage', () => <TaskPage tasks={tasks} finishedTasks={finishedTasks}/>)
  .add('PageNotFound', () => <PageNotFound/>);

storiesOf('Images', module)
  .add('UserAvatar', () => <UserAvatar avatar={backgroundImg} />)
  .add('SignBackground', () => <SignBackground src={backgroundImg} />);
