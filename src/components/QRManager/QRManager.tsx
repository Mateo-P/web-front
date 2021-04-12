import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import RestaurantDropdown from '../shared/RestaurantDropdown';
import useCurrentVenue from '../../hooks/useCurrentVenue';
import PageHeader from '../shared/PageHeader';
import QREntrance from './QREntrance';
import QRLine from './QRLine';
import QRTables from './QRTables';
import QRDelivery from './QRDelivery';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            display: 'flex',
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2)
        }
    })
);

export default function QRManager() {
    const classes = useStyles();

    const { currentRestaurant } = useCurrentVenue();
    console.log(currentRestaurant);

    return (
        <div>
            <PageHeader title="QRs por mesa">
                <RestaurantDropdown />
            </PageHeader>
            {currentRestaurant && (
                <>
                    <QRTables
                        restaurantId={currentRestaurant.id}
                        tables={currentRestaurant.tables}
                    />
                    <Typography className={classes.title} variant="h4">
                        Entrada
                    </Typography>
                    <QREntrance restaurantId={currentRestaurant.id} />
                    <Typography className={classes.title} variant="h4">
                        Fila
                    </Typography>
                    <QRLine restaurantId={currentRestaurant.id} />
                    <Typography className={classes.title} variant="h4">
                        Domicilio
                    </Typography>
                    <QRDelivery restaurantId={currentRestaurant.id} />
                </>
            )}
        </div>
    );
}
