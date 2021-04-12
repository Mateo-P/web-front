import MetricCard from './MetricCard';
import Grid from '@material-ui/core/Grid';

export default function HistoryCards({ earnings, quantity, timeAverage }) {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
                <MetricCard title="Total de facturación" value={earnings} metric="COP" />
            </Grid>
            <Grid item xs={12} md={4}>
                <MetricCard title="Total de pedidos" value={quantity} metric="unidades" />
            </Grid>
            <Grid item xs={12} md={4}>
                <MetricCard
                    title="Promedio de entrega"
                    value={isNaN(timeAverage) ? 0 : timeAverage}
                    metric="mins"
                />
            </Grid>
        </Grid>
    );
}
