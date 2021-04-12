import { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import useRequestWaiter from './useRequestWaiter';
import useOwnerInfo from './useOwnerInfo';

const useStyles = makeStyles((theme) => ({
    iconButton: {
        padding: theme.spacing(0.5)
    },
    iconButtonLabel: {
        display: 'flex',
        flexDirection: 'column'
    }
}));

export default function MenuHeader({ restaurantName = 'Restaurante', restaurantId, tableId }) {
    const classes = useStyles();
    const [raisedHand, setRaisedhand] = useState(false);

    const { loading, user } = useOwnerInfo(restaurantId);

    const { handleRequest, isComing } = useRequestWaiter(
        tableId,
        restaurantName,
        user ? user.email : null
    );

    const handleWaiterClick = () => {
        if (!loading && !isComing) {
            handleRequest();
            setRaisedhand(!raisedHand);
        }
    };

    return (
        <IconButton
            color="secondary"
            onClick={handleWaiterClick}
            className={classes.iconButton}
            classes={{ label: classes.iconButtonLabel }}>
            <Badge variant="dot" badgeContent=" " color="error" invisible={!raisedHand || isComing}>
                {isComing ? '🏃' : '☝🏼'}
            </Badge>
            <Typography variant="subtitle2" display="block">
                {!raisedHand ? 'Mesero' : isComing ? 'En camino' : 'Solicitado'}
            </Typography>
        </IconButton>
    );
}
