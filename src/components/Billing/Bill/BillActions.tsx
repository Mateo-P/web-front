import CancelAcceptButtons from '../../shared/Dialog/CancelAcceptButtons';
import { useSnackbar } from 'notistack';
import { useMutation } from '@apollo/client';
import { UPDATE_BILL } from '../updateBill';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        actions: {
            marginTop: theme.spacing(2),
            display: 'flex',
            justifyContent: 'flex-end'
        }
    })
);

function BillActions({ _id, paymentMethod, tip, setTip }) {
    const classes = useStyles();

    const [updateBill] = useMutation(UPDATE_BILL);
    const { enqueueSnackbar } = useSnackbar();

    const handleUpdate = (state) => {
        if (paymentMethod) {
            updateBill({
                variables: {
                    tip,
                    paymentMethod,
                    _id,
                    state
                }
            });
            if (state == 'PAID') {
                enqueueSnackbar('Factura pagada!', {
                    variant: 'success'
                });
            } else if (state == 'DECLINED') {
                enqueueSnackbar('Factura rechazada!', {
                    variant: 'error'
                });
            }
            setTip(0);
        } else {
            enqueueSnackbar('Selecciona un metodo de pago!', {
                variant: 'warning'
            });
        }
    };

    return (
        <div className={classes.actions}>
            <CancelAcceptButtons
                onCancel={() => handleUpdate('DECLINED')}
                onAccept={() => handleUpdate('PAID')}
            />
        </div>
    );
}

export default BillActions;
