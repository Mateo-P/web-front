import { FC } from 'react';
import Grid from '@material-ui/core/Grid';
import QRCard from './QRCard';
interface Props {
    restaurantId: string;
}

const QRLine: FC<Props> = ({ restaurantId }) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={4} md={3} lg={2}>
                <QRCard url={`https://compleat.com.co/order/${restaurantId}/line`} />
            </Grid>
        </Grid>
    );
};
export default QRLine;
