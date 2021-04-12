import Accordion from '@material-ui/core/Accordion';
import BillSummary from './BillSummary';
import BillAccordionDetail from './BillAccordionDetail';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import PaymentMethod from './PaymentMethod';
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%'
        },
        header: {
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between'
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightRegular
        }
    })
);

export default function Bill(bill) {
    const classes = useStyles();
    const phone = bill.orders[0].clientPhone;
    const originofOrder = bill.orders[0].table
        ? bill.orders[0].table.name
        : bill.orders[0].clientName;
    return (
        <div className={classes.root}>
            <Accordion>
                <BillSummary _id={bill._id} table={originofOrder} fromTable={bill.paymentMethod} />
                <BillAccordionDetail {...bill} phone={phone} />
            </Accordion>
        </div>
    );
}
