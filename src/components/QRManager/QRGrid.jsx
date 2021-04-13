import Grid from '@material-ui/core/Grid';
import { useStateValue } from '../../State/StateProvider';
import QRCard from './QRCard';

export default function QRGrid({ restaurantId, tables, line }) {
    const [{ user }] = useStateValue();

    const renderQRs = () => {
        let entrance = !tables && !line;

        if (tables) {
            return tables.map((table, i) => (
                <Grid item xs={12} sm={4} md={3} lg={2} key={i}>
                    <QRCard
                        table={table}
                        url={`https://compleat.com.co/order/${restaurantId}/${table._id}`}
                        image={user.image ? user.image.uri : undefined}
                    />
                </Grid>
            ));
        } else if (entrance) {
            return (
                <Grid item xs={12} sm={4} md={3} lg={2}>
                    <QRCard url={`https://compleat.com.co/order/${restaurantId}`} />
                </Grid>
            );
        } else if (line) {
            return (
                <Grid item xs={12} sm={4} md={3} lg={2}>
                    <QRCard url={`https://compleat.com.co/order/${restaurantId}/line`} />
                </Grid>
            );
        }
    };

    return (
        <Grid container spacing={2}>
            {renderQRs()}
        </Grid>
    );
}
