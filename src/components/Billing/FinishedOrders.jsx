import CurrentOpenTables from './CurrentOpenTables';
import useOrders from '../../hooks/useOrders';
import EmptyItemsMessage from 'components/shared/EmptyItemsMessage';

const FinishedOrders = ({ currentSort, restaurant, tables, currentTableId }) => {
    const params = { states: ['FINISHED'], restaurant };
    const { loading, error, orders } = useOrders(params);
    const currentOpenTables = new Array(tables.length).fill({});

    if (loading) return <div>Cargando...</div>;

    if (error) return `Error! ${error.message}`;

    if (orders.length === 0 || !orders)
        return (
            <EmptyItemsMessage text="¡Todavía no tienes pedidos! Estos se pueden realizar desde los QRs asignados para cada mesa o desde el QR de fila." />
        );
    if (orders) {
        orders.forEach((order) => {
            if (order.table) {
                const tableIndex = tables.findIndex(({ _id }) => _id === order.table._id);
                let tableInfo = tables[tableIndex];

                let tempTable = currentOpenTables[tableIndex];
                if (tempTable?.orders) {
                    currentOpenTables.splice(tableIndex, 1, {
                        tableInfo,
                        orders: [...tempTable.orders, order]
                    });
                } else {
                    tableInfo &&
                        currentOpenTables.splice(tableIndex, 1, { tableInfo, orders: [order] });
                }
            }
        });
        return (
            <CurrentOpenTables
                currentTableId={currentTableId}
                currentSort={currentSort}
                tables={currentOpenTables.filter((value) => Object.keys(value).length !== 0)}
            />
        );
    }
};
export default FinishedOrders;
