import { useEffect } from 'react';
import PaymentMethod from './PaymentMethod';
import { formatCurrency } from '../../../shared/currencyFormat';
import Typography from '@material-ui/core/Typography';
import TableOrders from '../OpenTable/TableOrders';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    totalBill: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    tip: {
        marginTop: theme.spacing(1),
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: theme.spacing(1)
    }
}));
function BillDetail({ orders, total, tip, setTip, paymentMethod, setPaymentMethod }) {
    const classes = useStyles();
    const taxes = 0.08;
    let subTotal = total / (1 + taxes);
    let tax = subTotal * taxes;
    let newTotal = total + tip;

    useEffect(() => {
        if (!tip) {
            setTip(0);
        }
    }, []);
    return (
        <>
            {orders?.map((order, i) => {
                return <TableOrders key={i} order={order} handleToggle={() => {}} />;
            })}
            <div className={classes.totalBill}>
                <Typography variant="subtitle1">Subtotal:</Typography>
                <Typography variant="subtitle1">{formatCurrency(subTotal)}</Typography>
            </div>
            <div className={classes.totalBill}>
                <Typography variant="subtitle1">Tax:</Typography>
                <Typography variant="subtitle1">{formatCurrency(tax)}</Typography>
            </div>
            <PaymentMethod hook={[paymentMethod, setPaymentMethod]} />
            <CurrencyTextField
                className={classes.tip}
                label="Propina"
                variant="outlined"
                value={tip}
                currencySymbol="$"
                minimumValue="0"
                decimalCharacter=","
                digitGroupSeparator="."
                onChange={(event, value) => setTip(value)}
            />

            <div className={classes.totalBill}>
                <Typography variant="h6">Total:</Typography>
                <Typography variant="h6">{formatCurrency(newTotal)}</Typography>
            </div>
        </>
    );
}

export default BillDetail;
