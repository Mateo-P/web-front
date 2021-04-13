import OrderList from './OrderList';
import useOrders from '../../hooks/useOrders';
import EmptyItemsMessage from 'components/shared/EmptyItemsMessage';

const Orders = ({ currentStateId, restaurant, currentTableId }) => {
    const params = { states: ['CREATED', 'PROGRESS'], restaurant };
    const { loading, error, orders } = useOrders(params);

    if (loading) return <div>Cargando...</div>;

    if (error) return `Error! ${error.message}`;

    if (orders.length === 0 || !orders)
        return (
            <EmptyItemsMessage text="¡Todavía no tienes pedidos! Estos se pueden realizar desde los QRs asignados para cada mesa o desde el QR de fila." />
        );

    return (
        <OrderList
            currentStateId={currentStateId}
            currentTableId={currentTableId}
            orders={orders}
        />
    );
};
export default Orders;
