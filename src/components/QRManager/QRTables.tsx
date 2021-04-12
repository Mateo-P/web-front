import { FC } from 'react';
import Grid from '@material-ui/core/Grid';
import QRCard from './QRCard';

interface Props {
    restaurantId: string;
    tables: [Table];
}
interface Table {
    left: Number;
    name: string;
    top: Number;
    __typename: string;
    id: string;
}

const QRTables: FC<Props> = ({ restaurantId, tables }) => {
    return (
        <Grid container spacing={2}>
            {tables.map((table, i) => (
                <Grid item xs={12} sm={4} md={3} lg={2} key={i}>
                    <QRCard
                        id={table.id}
                        name={table.name}
                        url={`https://compleat.com.co/order/${restaurantId}/${table.id}`}
                    />
                </Grid>
            ))}
        </Grid>
    );
};
export default QRTables;
