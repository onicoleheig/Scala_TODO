import { createMuiTheme } from '@material-ui/core/styles';

import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';
import lightBlue from '@material-ui/core/colors/lightBlue';
import grey from '@material-ui/core/colors/grey';

const theme = createMuiTheme({
  palette: {
    primary: {
      lighter: lightBlue[100],
      light: lightBlue[300],
      main: lightBlue[500],
    },

    secondary: {
      lighter: blue[50],
      light: blue[300],
      main: blue[500],
    },

    background: {
      light: grey[50],
      main: grey[200],
      dark: grey[400],
    },

    element: {
      light: grey[400],
      main: grey[500],
      dark: grey[700],
    },

    error: {
      main: red[500],
    },
  },

  typography: {
    useNextVariants: true,
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  fontSize: '16px',
});

export default theme;
