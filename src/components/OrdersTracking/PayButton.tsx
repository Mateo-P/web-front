import BottomFixedButton from '../shared/BottomFixedButton';
import { Typography } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    payButton: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center'
    }
});

export default function Paybutton({ setOpen }) {
    const classes = useStyles();

    return (
        <BottomFixedButton handleClick={() => setOpen(true)}>
            <div className={classes.payButton}>
                <Typography variant="h5" gutterBottom>
                <FormattedMessage id="requestBill" />
                </Typography>
            </div>
        </BottomFixedButton>
    );
}
