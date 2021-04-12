import React from 'react';
import Paper from '@material-ui/core/Paper';
import EnhancedTable from 'components/shared/EnhancedTable';
import HistoryCards from './HistoryCards';
import { formatCurrency } from 'shared/currencyFormat';

const headCells = [
    { id: 'name', numeric: false, label: 'Item' },
    { id: 'price', numeric: true, label: 'Precio' },
    { id: 'quantity', numeric: true, label: 'Cantidad' },
    { id: 'tableName', numeric: true, label: 'Mesa' },
    { id: 'tiempo entrega', numeric: true, label: 'Tiempo entrega (min)' }
];

export default function HistoryList({ rows, earnings, quantity, timeAverage }) {
    return (
        <>
            <HistoryCards
                earnings={formatCurrency(earnings)}
                quantity={quantity}
                timeAverage={timeAverage}
            />
            <Paper style={{ marginTop: '8px', borderRadius: '12px' }}>
                <EnhancedTable title="Historial de pedidos" rows={rows} headCells={headCells} />
            </Paper>
        </>
    );
}
