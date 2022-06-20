import { createTheme } from '@material-ui/core/styles';

const defaultTheme = createTheme();

const theme = createTheme({
  typography: {
    // fontSize: '1rem',
    //fontFamily: ['Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(',')
    fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
  },
  palette: {
    primary: {
      main: '#34495E',
    },
    secondary: {
      main: '#88C0F7',
    },
    custom: {
      main: '',
      white: '#fafafa',
      activeBtn: 'green',
      jobListHoverColor: '#E1F0FA',
      darkText: '#222',
      rejectBtn: '#FF0000',
      background: '#F9FAFB',
      dialogBorder: 'lightgray',
      activeGreen: '#48AD45',
      inactiveGreen: '#1F561E',
    },
  },

  overrides: {
    // Style sheet name ⚛️
    MuiButton: {
      // Name of the rule
      root: {
        textTransform: 'none',
        fontWeight: 600,
      },
      outlinedPrimary: {
        '&:hover': {
          backgroundColor: '#34495e',
          color: '#fafafa',
        },
      },

      outlinedSecondary: {
        color: '#34495e',
        '&:hover': {
          backgroundColor: '#88C0F7',
          color: '#34495e',
        },
      },
    },

    MuiSnackbarContent: {
      action: {
        paddingLeft: 0,
      },
    },

    MuiFormControl: {
      root: {
        // minWidth: '-webkit-fill-available',
        width: '100%',
      },
    },
    MuiTable: {
      root: {
        marginBottom: 20,
      },
    },
    MuiTableCell: {
      root: {
        paddingLeft: 75,
      },
    },
    MuiToolbar: {
      root: {
        [defaultTheme.breakpoints.down('xs')]: {
          display: 'block',
        },
      },
      gutters: {
        [defaultTheme.breakpoints.down('xs')]: {
          padding: 0,
        },
      },
    },
    /* MuiContainer: {
      maxWidthXs: {
        maxWidth: '490px !important'
      }
    }, */
    PrivateSwitchBase: {
      root: {
        paddingLeft: 0,
      },
    },
  },
});

export default theme;
