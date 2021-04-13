import React from 'react';
import CheckoutItem from './CheckoutItem';
import { formatCurrency } from '../../../shared/currencyFormat';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
    createStyles({
        nameField: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1)
        }
    })
);

export default function CheckoutContent({
    itemsBasket,
    total,
    clientName,
    setClientName,
    clientAddress,
    setClientAddress,
    clientPhoneHook,
    line
}) {
    const classes = useStyles();
    const [clientPhone, setClientPhone] = clientPhoneHook;
    return (
        <>
            {itemsBasket.map((item) => (
                <CheckoutItem key={item._id} item={item} />
            ))}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h5" gutterBottom>
                    Total:
                </Typography>
                <Typography variant="h4" gutterBottom>
                    {formatCurrency(total)}
                </Typography>
            </Box>
            {line && (
                <>
                    <TextField
                        id="outlined-basic"
                        label="Nombre para recibir el pedido..."
                        variant="outlined"
                        fullWidth
                        value={clientName}
                        onChange={(event) => {
                            setClientName(event.target.value);
                        }}
                        className={classes.nameField}
                        color="secondary"
                    />
                    <TextField
                        id="outlined-basic"
                        label="Dirección"
                        variant="outlined"
                        fullWidth
                        value={clientAddress}
                        onChange={(event) => {
                            setClientAddress(event.target.value);
                        }}
                        className={classes.nameField}
                        color="secondary"
                    />
                    <TextField
                        id="outlined-basic"
                        label="Celular"
                        variant="outlined"
                        fullWidth
                        value={clientPhone}
                        onChange={(event) => {
                            setClientPhone(event.target.value);
                        }}
                        className={classes.nameField}
                        color="secondary"
                    />
                </>
            )}
        </>
    );
}
