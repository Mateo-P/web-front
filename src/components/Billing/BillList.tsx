import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Bill from './Bill/Bill';
import useBills from '../../hooks/useBills';
import EmptyItemsMessage from '../shared/EmptyItemsMessage';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper
        }
    })
);

export default function BillList({ restaurant }) {
    const params = { states: ['CREATED'], restaurant };
    const { loading, error, bills } = useBills(params);
    const classes = useStyles();
    if (loading) return <div>Cargando...</div>;

    if (error) return `Error! ${error.message}`;

    if (bills.length === 0 || !bills) {
        return <EmptyItemsMessage text="¡Todavía no Hay Facturas! Factura primero una mesa." />;
    }

    if (bills) {
        return (
            <Grid container spacing={3}>
                {bills.map((bill, i) => (
                    <Grid key={i} item xs={12}>
                        <Bill {...bill} />
                    </Grid>
                ))}
            </Grid>
        );
    }
}
