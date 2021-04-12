import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import RequestWaiter from './RequestWaiter';
import RequestCall from './RequestCall';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        minHeight: theme.spacing(7)
    },
    title: {
        justifyContent: 'flex-start'
    },
    thirds: {
        minWidth: '33.33%'
    },
    titleCenter: {
        justifyContent: 'center'
    }
}));

export default function MenuHeader({
    back,
    restaurantName = 'Restaurante',
    restaurantPhone,
    restaurantId,
    tableId
}) {
    const classes = useStyles();

    const thirds = clsx({
        [classes.thirds]: back !== null && (!tableId || tableId === 'line')
    });

    const Nav = clsx({
        [classes.root]: true,
        [classes.title]: back !== null && (!tableId || tableId === 'line'),
        [classes.titleCenter]: back === undefined && tableId === undefined
    });
    const renderCallRequest = () => {
        if (tableId && tableId != 'line' && tableId != 'delivery') {
            return (
                <div>
                    <RequestWaiter
                        restaurantId={restaurantId}
                        restaurantName={restaurantName}
                        tableId={tableId}
                    />
                </div>
            );
        } else if (tableId == 'delivery') {
            return (
                <div>
                    <RequestCall restaurantPhone={restaurantPhone} />
                </div>
            );
        }
    };
    return (
        <div className={Nav}>
            {back && <div className={thirds}>{back}</div>}
            <div>
                <Typography align="center" variant="h5">
                    {restaurantName}
                </Typography>
            </div>
            {renderCallRequest()}
        </div>
    );
}
