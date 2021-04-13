import Typography from '@material-ui/core/Typography';
import dynamic from 'next/dynamic';
import { makeStyles } from '@material-ui/core/styles';
import RestaurantDropdown from '../shared/RestaurantDropdown';
import useRestaurant from '../../hooks/useRestaurant';
import PageHeader from '../shared/PageHeader';

const LoadingComponent = () => <p>Cargando...</p>;
const QRGrid = dynamic(() => import('./QRGrid'), {
    ssr: false,
    loading: LoadingComponent
});

const useStyles = makeStyles((theme) => ({
    title: {
        display: 'flex',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    }
}));

export default function QRManager() {
    const classes = useStyles();

    const { currentRestaurant } = useRestaurant();

    return (
        <div>
            <PageHeader title="QRs por mesa">
                <RestaurantDropdown />
            </PageHeader>
            {currentRestaurant && (
                <>
                    <QRGrid
                        restaurantId={currentRestaurant._id}
                        tables={currentRestaurant.tables}
                    />
                    <Typography className={classes.title} variant="h4">
                        Entrada
                    </Typography>
                    <QRGrid restaurantId={currentRestaurant._id} />
                    <Typography className={classes.title} variant="h4">
                        Fila
                    </Typography>
                    <QRGrid restaurantId={currentRestaurant._id} line={true} />
                </>
            )}
        </div>
    );
}
