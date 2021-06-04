import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { totalBill } from '../../shared/utils';
import Dialog from '../shared/Dialog';

import Paybutton from './PayButton';
import BillResume from './BillResume.tsx';
import TrackingList from './TrackingList';
import CheckoutButton from '../Client/Checkout/CheckoutButton';
import { makeStyles } from '@material-ui/core/styles';
import { useMutation } from '@apollo/client';
import { useSnackbar } from 'notistack';
import { CREATE_BILL } from '../Billing/createBill';
import useLocalStorage from '../../hooks/useLocalStorage';
import BillDetail from '../Billing/Bill/BillDetail';
import { useIntl } from 'react-intl';
const intl = useIntl();

const useStyles = makeStyles((theme) => ({
    root: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        paddingBottom: theme.spacing(10)
    }
}));
function OrdersTraking({ orders }) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [tip, setTip] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const key = 'clientOrders';
    const [, setOrders] = useLocalStorage(key);
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const [createBill] = useMutation(CREATE_BILL, {
        onCompleted: () => {
            enqueueSnackbar('Tu factura se ha generado con exito!', {
                variant: 'success',
                anchorOrigin: { vertical: 'top', horizontal: 'center' }
            });
            setOrders([]);
            router.back();
        }
    });
    useEffect(() => {
        const interval = setInterval(() => {
            checkAllOrdersBilled();
        }, 15000);
        return () => clearInterval(interval);
    }, []);
    const checkAllOrdersBilled = () => {
        let billedOrders = 0;
        orders.forEach((order) => {
            if (order.state === 'BILLED') billedOrders++;
        });
        if (billedOrders == orders.length) {
            setOrders([]);
            router.back();
        }
    };
    const filteredOrders = orders.filter(
        (order) => order.state !== 'BILLED' && order.state !== 'DECLINED'
    );

    const nonDeclinedOrders = orders.filter((order) => order.state !== 'DECLINED');
    const total = totalBill(filteredOrders);
    const totalnonDeclinedOrders = totalBill(nonDeclinedOrders);
    const createBillCallback = () => {
        if (paymentMethod) {
            const billOrdersInput = [];
            filteredOrders.forEach(
                ({
                    _id,
                    quantity,
                    createdTime,
                    state,
                    restaurant,
                    item,
                    table,
                    clientName,
                    clientPhone
                }) => {
                    let { name, price } = item;

                    billOrdersInput.push({
                        _id,
                        quantity,
                        table: table && { _id: table._id, name: table.name },
                        createdTime,
                        state,
                        restaurant,
                        item: { name, price },
                        clientName,
                        clientPhone
                    });
                }
            );
            const variables = {
                tip,
                paymentMethod,
                total,
                orders: billOrdersInput
            };
            createBill({
                variables
            });
        } else {
            enqueueSnackbar('Escoje un metodo de pago!', {
                variant: 'warning',
                anchorOrigin: { vertical: 'top', horizontal: 'center' }
            });
        }
    };

    return (
        <div className={classes.root}>
            <TrackingList orders={orders} />

            <BillResume total={totalnonDeclinedOrders} />
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                title={intl.formatMessage({ id: 'requestBill' })}
                action={
                    <CheckoutButton
                        disable={false}
                        basket={[]}
                        handleOrder={createBillCallback}
                        textButton={intl.formatMessage({ id: 'requestBill' })}
                    />
                }>
                <BillDetail
                    className={classes.root}
                    orders={filteredOrders}
                    total={total}
                    tip={tip}
                    setTip={setTip}
                    paymentMethod={paymentMethod}
                    setPaymentMethod={setPaymentMethod}
                />
            </Dialog>
            {!open && filteredOrders.length !== 0 && <Paybutton setOpen={setOpen} />}
        </div>
    );
}

export default OrdersTraking;
