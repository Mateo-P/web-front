import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import { formatCurrency } from '../../../shared/currencyFormat';

const useStyles = makeStyles({
    itemDetail: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between'
    },
    PriceQuantity: {
        display: 'flex',
        justifyContent: 'flex-end'
    }
});

type Props = {
    order: any;
    checked?: Array<any>;
    labelId?: string;
    handleToggle?: (order: any) => any;
};

export default function TableOrders({ order, checked, labelId, handleToggle }: Props) {
    const classes = useStyles();
    return (
        <ListItem key={order} role={undefined} dense button onClick={handleToggle(order)}>
            {checked && (
                <Checkbox
                    edge="start"
                    checked={checked.includes(order)}
                    color={'primary'}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                />
            )}
            <div className={classes.itemDetail}>
                <Typography variant="body2">{order.item.name}</Typography>
                <div className={classes.PriceQuantity}>
                    <Typography variant="body2">
                        {formatCurrency(order.item.price)} &nbsp;{' '}
                    </Typography>
                    <Typography variant="body2">x &nbsp;{order.quantity}</Typography>
                </div>
            </div>
        </ListItem>
    );
}
