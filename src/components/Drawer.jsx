import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    fullList: {
        width: 'auto'
    },
    drawer: {
        borderTopLeftRadius: theme.spacing(2),
        borderTopRightRadius: theme.spacing(2),
        overflow: 'hidden'
    }
});

export default function Drawer(props) {
    const classes = useStyles();
    const [state, setState] = useState(false);

    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    return (
        <div className={classes.drawer}>
            <Button
                size={props.size}
                variant={props.variant}
                color={props.color}
                onClick={toggleDrawer('bottom', true)}>
                {props.button}
            </Button>
            <SwipeableDrawer
                anchor={'bottom'}
                open={state['bottom']}
                onClose={toggleDrawer('bottom', false)}
                onOpen={toggleDrawer('bottom', true)}>
                {props.children}
            </SwipeableDrawer>
        </div>
    );
}
