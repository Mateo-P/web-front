import List from '@material-ui/core/List';
import OrderRow from './OrderRow';
import Card from '@material-ui/core/Card';

export default function OrderList({ orders, currentStateId, currentTableId }) {
    return (
        <Card>
            <List>
                {orders
                    .filter(
                        (ord) =>
                            (ord.state !== 'FINISHED' || ord.state !== 'DECLINED') &&
                            (currentStateId === null || currentStateId === ord.state) &&
                            (currentTableId === null || currentTableId === ord.table._id)
                    )
                    .map((order, i) => (
                        <OrderRow order={order} key={i} />
                    ))}
            </List>
        </Card>
    );
}
