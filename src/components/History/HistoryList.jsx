import React from 'react';
import Paper from '@material-ui/core/Paper';
import EnhancedTable from 'components/shared/EnhancedTable';
import HistoryCards from './HistoryCards';
import { formatCurrency } from 'shared/currencyFormat';
import { useIntl } from 'react-intl';

const headCells = [
    { id: 'name', numeric: false, label: useIntl().formatMessage({ id: 'item' }) },
    { id: 'price', numeric: true, label: useIntl().formatMessage({ id: 'price' }) },
    { id: 'quantity', numeric: true, label: useIntl().formatMessage({ id: 'ct' }) },
    { id: 'tableName', numeric: true, label: useIntl().formatMessage({ id: 'table' }) },
    { id: 'tiempo entrega', numeric: true, label: useIntl().formatMessage({ id: 'deliverTime' }) }
];

export default function HistoryList({ rows, earnings, quantity, timeAverage }) {
    const intl = useIntl();

    return (
        <>
            <HistoryCards
                earnings={formatCurrency(earnings)}
                quantity={quantity}
                timeAverage={timeAverage}
            />
            <Paper style={{ marginTop: '8px', borderRadius: '12px' }}>
                <EnhancedTable
                    title={intl.formatMessage({ id: 'historyOrder' })}
                    rows={rows}
                    headCells={headCells}
                />
            </Paper>
        </>
    );
}
