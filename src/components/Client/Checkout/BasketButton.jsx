import { useEffect } from 'react';
import { useStateValue } from '../../../State/StateProvider';
import { getBasketTotal } from 'shared/itemFunctions';
import BottomFixedButton from '../../shared/BottomFixedButton';
import { Typography } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { formatCurrency } from '../../../shared/currencyFormat';
import { useSnackbar } from 'notistack';

export default function BasketButton({ setOpen }) {
    const [{ basket }] = useStateValue();

    const { enqueueSnackbar } = useSnackbar();

    const isBasketEmpty = basket.length === 0;

    const handleClick = () => {
        if (isBasketEmpty) {
            enqueueSnackbar('Debes agregar algo a tu orden!', {
                variant: 'info',
                anchorOrigin: { vertical: 'top', horizontal: 'center' }
            });
        } else {
            setOpen(true);
        }
    };

    useEffect(() => {
        if (isBasketEmpty) {
            setOpen(false);
        }
    }, [isBasketEmpty]);

    return (
        <BottomFixedButton handleClick={handleClick}>
            <Badge badgeContent={basket.length} color="error">
                <ShoppingCartIcon />
            </Badge>
            <Typography variant="subtitle1" gutterBottom>
                {isBasketEmpty ? '¿Qué vas a pedir hoy?' : 'ordenar'}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                {formatCurrency(getBasketTotal(basket))}
            </Typography>
        </BottomFixedButton>
    );
}
