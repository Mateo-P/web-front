import { createMuiTheme } from '@material-ui/core/styles';

// Create a theme instance.
const theme = createMuiTheme({
    shadows: ['none'],
    drawerWidth: 240,
    palette: {
        primary: {
            //main: '#FF5763'
            //main: '#FFC529'
            main: '#F6C946'
        },
        secondary: {
            //main: '#00DAAC'
            //main: '#FE724C'
            main: '#000000'
        },
        info: {
            main: '#FE724C'
        },
        error: {
            main: '#E8344A'
        },
        background: {
            //default: '#F9F9FF'
            light: '#D7D7D7'
        },
        text: {
            //primary: '#272D2F'
            primary: '#141414'
        },
        action: {
            //disabledBackground: '#000000'
        }
    },
    overrides: {
        MuiButton: {
            containedPrimary: {
                color: '#21142F'
            },
            contained: {
                borderRadius: 16
            }
        },
        MuiChip: {
            root: {
                color: '#ffffff'
            },
            outlinedPrimary: {
                color: '#21142F'
            }
        },
        MuiCard: {
            root: {
                borderRadius: 12,
                marginBottom: 12
            }
        }
    },
    props: {
        MuiButton: {
            disableRipple: true,
            disableFocusRipple: true,
            disableTouchRipple: true
        },
        MuiPaper: {
            variant: 'outlined',
            elevation: '0 !important'
        }
    }
});

export default theme;
