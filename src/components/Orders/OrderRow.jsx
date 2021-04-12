import OrderItem from './OrderItem/OrderItem';
import moment from 'moment';

const parseState = (state) => {
    if (state == 'CREATED') {
        return 'Pendiente';
    } else if (state == 'PROGRESS') {
        return 'En preparación';
    } else {
        return 'Finalizada';
    }
};
export default function OrderRow({ order }) {
    return (
        <OrderItem
            key={'o-' + order._id}
            _id={order._id}
            image={
                order.image ? order.image : 'https://img.icons8.com/color/296/000000/food-bar.png'
            }
            table={
                order.line ? order.clientName : order.table ? order.table.name : order.clientName
            }
            name={order.product_name}
            options={order.options ? order.options : []}
            quantity={order.quantity}
            state={parseState(order.state)}
            time={moment(parseInt(order.createdTime)).locale('es').fromNow()}
        />
    );
}
