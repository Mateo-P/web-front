import React from 'react';
import Paper from '@material-ui/core/Paper';
import EnhancedTable from 'components/shared/EnhancedTable';
import HistoryCards from './HistoryCards';
import { formatCurrency } from 'shared/currencyFormat';
import { useIntl } from 'react-intl';

export default function HistoryList({ rows, earnings, quantity, timeAverage }) {
    const intl = useIntl();
    const headCells = [
        { id: 'name', numeric: false, label: intl.formatMessage({ id: 'item' }) },
        { id: 'price', numeric: true, label: intl.formatMessage({ id: 'price' }) },
        { id: 'quantity', numeric: true, label: intl.formatMessage({ id: 'ct' }) },
        { id: 'tableName', numeric: true, label: intl.formatMessage({ id: 'table' }) },
        { id: 'tiempo entrega', numeric: true, label: intl.formatMessage({ id: 'deliverTime' }) }
    ];
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
