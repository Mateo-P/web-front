import MetricCard from './MetricCard';
import Grid from '@material-ui/core/Grid';
import { useIntl } from 'react-intl';

export default function HistoryCards({ earnings, quantity, timeAverage }) {
    const intl = useIntl();

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
                <MetricCard title="" value={earnings} metric="COP" />
            </Grid>
            <Grid item xs={12} md={4}>
                <MetricCard
                    title={intl.formatMessage({ id: 'totalBill' })}
                    value={quantity}
                    metric="unidades"
                />
            </Grid>
            <Grid item xs={12} md={4}>
                <MetricCard
                    title={intl.formatMessage({ id: 'avgDeliver' })}
                    value={isNaN(timeAverage) ? 0 : timeAverage}
                    metric="mins"
                />
            </Grid>
        </Grid>
    );
}
