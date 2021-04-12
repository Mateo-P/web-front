import React, { useState } from 'react';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import List from '@material-ui/core/List';
import BillActions from './BillActions';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import BillDetail from './BillDetail';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        accordionDetail: {
            padding: 0
        },
        root: {
            paddingTop: 0,
            paddingLeft: theme.spacing(2),
            width: '100%',

            backgroundColor: theme.palette.background.paper,

            borderRadius: theme.spacing(1),
            paddingRight: theme.spacing(2)
        },
        heading: {
            display: 'flex',
            justifyContent: 'flex-end',
            fontSize: theme.typography.pxToRem(20),
            fontWeight: theme.typography.fontWeightRegular
        },
        totalBill: {
            display: 'flex',
            justifyContent: 'space-between'
        }
    })
);

type Props = {
    _id: string;
    orders: any;
    subTotal: number;
    tax: number;
    tip: number;
    paymentMethod: string;
    total: number;
    phone: String;
};

export default function BillAccordionDetail({
    _id,
    orders,
    tip,
    paymentMethod,
    total,
    phone
}: Props) {
    const classes = useStyles();
    const [tip2, setTip2] = useState(tip);
    const [paymentMethod2, setPaymentMethod2] = useState(paymentMethod);
    return (
        <AccordionDetails className={classes.accordionDetail}>
            <List className={classes.root}>
                <BillDetail
                    orders={orders}
                    total={total}
                    tip={tip2}
                    setTip={setTip2}
                    paymentMethod={paymentMethod2}
                    setPaymentMethod={setPaymentMethod2}
                />
                {phone && (
                    <Typography className={classes.heading}>
                        {'📞 '}
                        {phone}
                    </Typography>
                )}
                <BillActions _id={_id} tip={tip2} setTip={setTip2} paymentMethod={paymentMethod2} />
            </List>
        </AccordionDetails>
    );
}
