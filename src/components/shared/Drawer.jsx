import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        borderTopLeftRadius: theme.spacing(3),
        borderTopRightRadius: theme.spacing(3),
        maxHeight: '90%',
        borderStyle: 'none'
    }
}));
export default function CustomDrawer({ children, open, setOpen, anchor = 'bottom' }) {
    const styles = useStyles();
    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setOpen(open);
    };

    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

    return (
        <Drawer
            classes={{ paper: styles.paper }}
            disableBackdropTransition={!iOS}
            disableDiscovery={iOS}
            disableSwipeToOpen
            anchor={anchor}
            open={open}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}>
            {children}
        </Drawer>
    );
}
