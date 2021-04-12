import Grid from '@material-ui/core/Grid';
import QRCard from './QRCard';
import { FC } from 'react';
interface Props {
    restaurantId: string;
}

const QRDelivery: FC<Props> = ({ restaurantId }) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={4} md={3} lg={2}>
                <QRCard url={`https://compleat.com.co/order/${restaurantId}/delivery`} />
            </Grid>
        </Grid>
    );
};
export default QRDelivery;
