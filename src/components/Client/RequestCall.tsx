import { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
    iconButton: {
        padding: theme.spacing(0.5)
    },
    iconButtonLabel: {
        display: 'flex',
        flexDirection: 'column'
    }
}));
type Props = {
    restaurantPhone: string;
};
const RequestCall: FC<Props> = ({ restaurantPhone }) => {
    const classes = useStyles();

    return (
        <IconButton
            color="secondary"
            href={`tel:${restaurantPhone}`}
            className={classes.iconButton}
            classes={{ label: classes.iconButtonLabel }}>
            📞
        </IconButton>
    );
};
export default RequestCall;
