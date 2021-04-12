import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    buttonCheckout: {
        margin: theme.spacing(1),
        height: theme.spacing(6),
        borderRadius: theme.spacing(2)
    },
    basketQuantity: {
        borderRadius: '8px',
        width: '32px',
        justifyContent: 'center',
        alignItems: 'center'
    }
}));

export default function CheckoutButton({ handleOrder, disable, textButton = '¡pedir ya!' }) {
    const classes = useStyles();
    const onOrdering = () => {
        handleOrder();
    };
    return (
        <Button
            disabled={disable}
            fullWidth
            className={classes.buttonCheckout}
            variant="contained"
            color="primary"
            onClick={onOrdering}>
            <Typography variant="h6">{textButton}</Typography>
        </Button>
    );
}
