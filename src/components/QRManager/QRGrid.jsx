import Grid from '@material-ui/core/Grid';
import QRCard from './QRCard';

export default function QRGrid({ restaurantId, tables, line }) {
    const renderQRs = () => {
        let entrance = !tables && !line;

        if (tables) {
            return tables.map((table, i) => (
                <Grid item xs={12} sm={4} md={3} lg={2} key={i}>
                    <QRCard
                        table={table}
                        url={`${window.location.origin}/${restaurantId}/${table.id}`}
                    />
                </Grid>
            ));
        } else if (entrance) {
            return (
                <Grid item xs={12} sm={4} md={3} lg={2}>
                    <QRCard url={`${window.location.origin}/${restaurantId}`} />
                </Grid>
            );
        } else if (line) {
            return (
                <Grid item xs={12} sm={4} md={3} lg={2}>
                    <QRCard url={`${window.location.origin}/${restaurantId}/line`} />
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
