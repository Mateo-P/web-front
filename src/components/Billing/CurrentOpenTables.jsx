import Grid from '@material-ui/core/Grid';
import OpenTable from './OpenTable/OpenTable';
function CurrentOpenTables({ currentTableId, currentSort, tables }) {
    if (currentSort === 'timeUp') {
        tables.sort((a, b) => a.orders[0].createdTime - b.orders[0].createdTime);
    } else {
        tables.sort((a, b) => b.orders[0].createdTime - a.orders[0].createdTime);
    }

    return (
        <Grid container spacing={3}>
            {tables
                .filter(
                    ({ tableInfo }) => currentTableId === null || currentTableId === tableInfo._id
                )
                .map((table, i) => (
                    <Grid key={i} item xs={12} md={6}>
                        <OpenTable table={table} />
                    </Grid>
                ))}
        </Grid>
    );
}

export default CurrentOpenTables;
