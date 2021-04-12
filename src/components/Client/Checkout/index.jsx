import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useStateValue } from '../../../State/StateProvider';
import fetcher from '../../../shared/fetcher';
import Dialog from 'components/shared/Dialog';
import CheckoutButton from 'components/Client/Checkout/CheckoutButton';
import { useSnackbar } from 'notistack';
import BasketButton from 'components/Client/Checkout/BasketButton';
import { getBasketTotal, areItemsEqual } from 'shared/itemFunctions';
import useLocalStorage from '../../../hooks/useLocalStorage';
import useOrderNotifications from './useOrderNotifications';
import Checkout from './Checkout';
import { validateForm } from '../../../shared/utils';

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

export default function index() {
    const [{ basket }, dispatch] = useStateValue();
    const [disableButton, setDisableButton] = useState(false);
    const [formFields, setFormfields] = useState([]);
    const [resourcetype, setResourcetype] = useState('TableOrder');
    const [formValues, setFormValues] = useState({});
    const key = 'clientOrders';
    const [orders, setOrders] = useLocalStorage(key, []);
    const itemsBasket = createItemsBasket(basket);
    const [open, setOpen] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const router = useRouter();
    const venue = router.query.restaurant;
    const originId = router.query.origin;
    const { sendOrderNotification } = useOrderNotifications(venue);

    useEffect(() => {
        if (originId === 'line') {
            setDisableButton(false);
            setResourcetype('LineOrder');
            setFormfields([{ label: 'Nombre para recibir el pedido...', value: 'name' }]);
        } else if (originId === 'delivery') {
            setDisableButton(false);
            setResourcetype('DeliveryOrder');
            setFormfields([
                { label: 'Nombre para recibir el pedido...', value: 'name' },
                { label: 'Dirección', value: 'address' },
                { label: 'Celular', value: 'phone' }
            ]);
        }
    }, []);

    const handleChange = (value) => (e) => {
        setFormValues({ ...formValues, [value]: e.target.value });
    };

    const handleOrder = async () => {
        if (validateForm(formFields, formValues, setFormfields)) {
            setDisableButton(true);

            let items = itemsBasket.map(({ id, name, price, options, image, quantity }) => {
                let orderChoices = [];
                options.forEach(({ name, choices }) => {
                    choices.forEach((choice) => {
                        orderChoices.push({
                            option_name: name,
                            name: choice.name,
                            extra_cost: choice.extra_cost
                        });
                    });
                });
                return {
                    item_id: id,
                    product_name: name,
                    quantity,
                    comments: 'sapo',
                    choices: orderChoices,
                    image_url: image,
                    price
                };
            });
            const body = { resourcetype, venue, items, table_id: originId };
            console.log(body);
            const order = await fetcher(`orders/`, 'POST', null, body);

            onOrder(order);
        }
    };

    const onOrder = (order) => {
        console.log(order);
        // let ids = order.items.map(({ id }) => {
        //     return { id };
        // });
        // setOrders([...orders, ...ids]);
        // dispatch({ type: 'EMPTY_BASKET' });
        setOpen(false);
        enqueueSnackbar('¡Pedido exitoso!', {
            variant: 'success',
            anchorOrigin: { vertical: 'top', horizontal: 'center' },
            autoHideDuration: 2000
        });
        setDisableButton(false);
        sendOrderNotification();
        // router.push('/ordersTracking');
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
                <Checkout
                    itemsBasket={itemsBasket}
                    total={getBasketTotal(basket)}
                    formFields={formFields}
                    formValues={formValues}
                    handleChange={handleChange}
                />
            </Dialog>
        </>
    );
}
