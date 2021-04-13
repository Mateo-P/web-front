import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: theme.spacing(2),
        alignItems: 'center'
    },
    title: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
}));

export default function PageHeader({ title, titleOption, children }) {
    const classes = useStyles();

    return (
        <div className={classes.header}>
            <div className={classes.title}>
                <Typography variant="h4">{title}</Typography>
                {titleOption && <>&nbsp; {titleOption}</>}
            </div>
            {children}
        </div>
    );
}
