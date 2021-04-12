import { useState, useEffect } from 'react';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import { CREATE_BILL } from '../createBill';
import { totalBill } from '../../../shared/utils';
import { useMutation } from '@apollo/client';
import OpenTableHeader from './OpenTableHeader';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import TableOrders from '../OpenTable/TableOrders';
import { formatCurrency } from '../../../shared/currencyFormat';
import { Typography } from '@material-ui/core';
import OpenTableActions from './OpenTableActions';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            paddingLeft: theme.spacing(2),
            width: '100%',

            backgroundColor: theme.palette.background.paper,
            border: '1px solid #D3D3D3',
            borderRadius: theme.spacing(1),
            paddingRight: theme.spacing(2)
        },
        totalBill: {
            display: 'flex',
            justifyContent: 'space-between'
        }
    })
);

type Props = {
    table: any;
};

export default function OpenTable({ table }: Props) {
    const classes = useStyles();
    const [checked, setChecked] = useState(table.orders);
    const { enqueueSnackbar } = useSnackbar();
    const [createBill] = useMutation(CREATE_BILL, {
        onCompleted: () => {
            enqueueSnackbar('Factura creada con exito!', {
                variant: 'success',
                anchorOrigin: { vertical: 'top', horizontal: 'right' }
            });
        }
    });

    useEffect(() => {
        setChecked(table.orders);
    }, [table]);

    const total = totalBill(checked);
    const handleToggle = (order) => () => {
        const currentIndex = checked.indexOf(order);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(order);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };
    const firstOrderTime = moment(parseInt(table.orders[table.orders.length - 1].createdTime))
        .locale('es')
        .fromNow();
    const createBillCallback = () => {
        const billOrdersInput = [];
        checked.forEach(
            ({ _id, quantity, createdTime, state, restaurant, item, table, clientName }) => {
                let { name, price } = item;
                billOrdersInput.push({
                    _id,
                    quantity,
                    table: { _id: table._id, name: table.name },
                    createdTime,
                    state,
                    restaurant,
                    item: { name, price },
                    clientName
                });
            }
        );
        const variables = {
            total,
            orders: billOrdersInput
        };
        createBill({
            variables
        });
    };

    return (
        <List className={classes.root}>
            <OpenTableHeader name={table.tableInfo.name} time={firstOrderTime} />
            {table.orders.map((order) => {
                const labelId = `checkbox-list-label-${order._id}`;

                return (
                    <TableOrders
                        order={order}
                        checked={checked}
                        labelId={labelId}
                        handleToggle={handleToggle}
                    />
                );
            })}
            <div className={classes.totalBill}>
                <Typography variant="h6">Total:</Typography>
                <Typography variant="h6">{formatCurrency(total)}</Typography>
            </div>
            <OpenTableActions createBill={createBillCallback} />
        </List>
    );
}
