import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2)
    },
    valueContainer: {
        display: 'flex',
        alignItems: 'flex-end'
    }
}));

export default function MetricCard({ title, value, metric }) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <Typography variant="h6" gutterBottom>
                {title}
            </Typography>
            <div className={classes.valueContainer}>
                <Typography variant="h3">{value}</Typography>
                <Typography variant="h5">&nbsp;{metric}</Typography>
            </div>
        </Card>
    );
}
