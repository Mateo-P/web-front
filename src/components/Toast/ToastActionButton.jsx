import { useSnackbar } from 'notistack';
import Button from '@material-ui/core/Button';

const ToastActionButton = ({ key, children, callback }) => {
    const { closeSnackbar } = useSnackbar();

    const onClickDismiss = (key) => () => {
        closeSnackbar(key);
        if (callback) {
            callback();
        }
    };

    return (
        <Button aria-label="action-button" color="inherit" onClick={onClickDismiss(key)}>
            {children}
        </Button>
    );
};

export default ToastActionButton;
