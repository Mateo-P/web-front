import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Counter from 'components/shared/Counter';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
    },
    counterContainer: {
        display: 'flex',
        marginBottom: theme.spacing(1),
        alignItems: 'center'
    }
}));

export default function MinMaxSelector({ min, setMin, max, setMax }) {
    const classes = useStyles();

    const handleMinChange = (newMin) => {
        if (newMin <= max && newMin >= 0) {
            setMin(newMin);
        }
    };

    const handleMaxChange = (newMax) => {
        if (newMax >= min && newMax >= 1) {
            setMax(newMax);
        }
    };

    return (
        <div className={classes.root}>
            <div className={classes.counterContainer}>
                <Typography variant="subtitle2">Min.&nbsp;</Typography>
                <Counter value={min} setValue={handleMinChange} />
            </div>
            <div className={classes.counterContainer}>
                <Typography variant="subtitle2">Max.&nbsp;</Typography>
                <Counter value={max} setValue={handleMaxChange} />
            </div>
        </div>
    );
}
