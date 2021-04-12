import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import Tooltip from '@material-ui/core/Tooltip';
import Link from '@material-ui/core/Link';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    toolbar: {
        paddingRight: theme.spacing(3)
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
        //border: 0
    },
    appBarShift: {
        [theme.breakpoints.down('md')]: {
            marginLeft: theme.drawerWidth,
            width: `calc(100% - ${theme.drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen
            })
        }
    },
    iconButton: {
        color: theme.palette.primary.main
    },
    menuButton: {
        marginRight: 36
    },
    menuButtonHidden: {
        display: 'none'
    },
    title: {
        flexGrow: 1
    }
}));

export default function LayoutAppBar({ open, handleDrawerOpen, mdOrDown }) {
    const classes = useStyles();

    return (
        <AppBar
            position="absolute"
            className={clsx(classes.appBar, open && classes.appBarShift)}
            color="secondary">
            <Toolbar className={classes.toolbar}>
                <IconButton
                    edge="start"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    className={clsx(
                        classes.menuButton,
                        open && classes.menuButtonHidden,
                        classes.iconButton
                    )}>
                    <MenuIcon />
                </IconButton>
                {!open || !mdOrDown ? (
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        className={classes.title}>
                        compl<span className={classes.iconButton}>eat</span>
                    </Typography>
                ) : (
                    <div className={classes.title} />
                )}
                <Tooltip title="Perfil">
                    <Link href="/Profile">
                        <IconButton className={classes.iconButton}>
                            <AccountCircleIcon />
                        </IconButton>
                    </Link>
                </Tooltip>
                <Tooltip title="Salir">
                    <Link href="/api/logout">
                        <IconButton className={classes.iconButton}>
                            <ExitToAppIcon />
                        </IconButton>
                    </Link>
                </Tooltip>
            </Toolbar>
        </AppBar>
    );
}
