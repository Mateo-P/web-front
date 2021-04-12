import { useSnackbar } from 'notistack';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

const ToastCloseButton = (key) => {
    const { closeSnackbar } = useSnackbar();

    const onClickDismiss = (key) => () => {
        closeSnackbar(key);
    };

    return (
        <IconButton
            aria-label="close"
            color="inherit"
            //className={classes.close}
            onClick={onClickDismiss(key)}>
            <CloseIcon />
        </IconButton>
    );
};

export default ToastCloseButton;
