import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useStateValue } from '../../../State/StateProvider';
import CheckoutContent from './CheckoutContent';
import { gql, useMutation } from '@apollo/client';
import Dialog from 'components/shared/Dialog';
import CheckoutButton from 'components/Client/Checkout/CheckoutButton';
import { useSnackbar } from 'notistack';
import BasketButton from 'components/Client/Checkout/BasketButton';
import { getBasketTotal, areItemsEqual } from 'shared/itemFunctions';
import useLocalStorage from '../../../hooks/useLocalStorage';
import useOrderNotifications from './useOrderNotifications';

const ADD_ORDERS = gql`
    mutation AddOrders($input: [OrderInput]!) {
        addOrders(input: $input) {
            orders {
                _id
            }
        }
    }
`;

function countUnique(basket, item) {
    let count = 0;
    for (let i = 0; i < basket.length; i++) {
        if (areItemsEqual(basket[i], item)) {
            count++;
        }
    }

    return count;
}

const createItemsBasket = (basket) => {
    let items = [];

    basket.forEach((it) => {
        const newItem = { ...it };
        newItem['quantity'] = countUnique(basket, newItem);

        if (items.filter((ite) => areItemsEqual(it, ite)).length === 0) {
            items.push(newItem);
        }
    });

    return items;
};

export default function Checkout() {
    const [{ basket }, dispatch] = useStateValue();
    const [disableButton, setDisableButton] = useState(false);
    const [clientName, setClientName] = useState('');
    const [clientAddress, setClientAddress] = useState('');
    const [clientPhone, setClientPhone] = useState('');
    const key = 'clientOrders';
    const [orders, setOrders] = useLocalStorage(key, []);
    const itemsBasket = createItemsBasket(basket);
    const [open, setOpen] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const router = useRouter();
    const restaurant = router.query.restaurant;
    const tableId = router.query.table;
    const { sendOrderNotification } = useOrderNotifications(restaurant);

    useEffect(() => {
        if (tableId === 'line') {
            if (clientName) {
                setDisableButton(false);
            } else {
                setDisableButton(true);
            }
        }
    }, [clientName]);

    const [addOrders] = useMutation(ADD_ORDERS, {
        onCompleted({ addOrders }) {
            onOrder(addOrders);
        }
    });

    const handleOrder = () => {
        setDisableButton(true);
        const orderInput = [];

        itemsBasket.forEach(({ _id, name, price, options, image, quantity }) => {
            const itemVariables = {
                restaurant,
                tableId: tableId === 'line' ? null : tableId,
                line: tableId === 'line',
                quantity,
                image,
                clientName: clientName + ' (' + clientAddress + ') .',
                clientPhone,
                item: {
                    _id,
                    name,
                    price,
                    options
                }
            };

            orderInput.push(itemVariables);
        });

        const variables = {
            input: orderInput
        };

        addOrders({ variables });
    };

    const onOrder = (addOrders) => {
        let ids = addOrders.orders.map(({ _id }) => {
            return { _id: _id };
        });
        setOrders([...orders, ...ids]);
        dispatch({ type: 'EMPTY_BASKET' });

        setOpen(false);
        enqueueSnackbar('¡Pedido exitoso!', {
            variant: 'success',
            anchorOrigin: { vertical: 'top', horizontal: 'center' },
            autoHideDuration: 2000
        });
        setDisableButton(false);
        sendOrderNotification();
        router.push('/ordersTracking');
    };

    return (
        <>
            {!open && <BasketButton setOpen={setOpen} />}
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                title="Confirmar pedido"
                action={
                    <CheckoutButton
                        disable={disableButton}
                        basket={basket}
                        handleOrder={handleOrder}
                    />
                }>
                <CheckoutContent
                    line={tableId === 'line'}
                    itemsBasket={itemsBasket}
                    total={getBasketTotal(basket)}
                    clientName={clientName}
                    setClientName={setClientName}
                    clientAddress={clientAddress}
                    setClientAddress={setClientAddress}
                    clientPhoneHook={[clientPhone, setClientPhone]}
                />
            </Dialog>
        </>
    );
}
