import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1)
        }
    },
    chip: {
        width: '100%'
    },
    label: { display: 'flex', alignItems: 'center', width: '100%' },
    icon: { margin: 0 }
}));

type Props = {
    label?: string;
    fill?: boolean;
    clickable?: boolean;
    icon?: React.ReactNode;
    light?: boolean;
    fullWidth?: boolean;
};

export default function CustomChip({
    label,
    fill,
    clickable = false,
    icon,
    light,
    fullWidth
}: Props) {
    const classes = useStyles();

    return (
        <div className={classes.root} style={{ width: fullWidth ? '100%' : 'auto' }}>
            <Chip
                className={classes.chip}
                clickable={clickable}
                label={
                    light ? (
                        <div className={classes.label}>
                            {icon ? <h4 className={classes.icon}>{icon}&nbsp;&nbsp;</h4> : <></>}
                            {label}
                        </div>
                    ) : (
                        <b className={classes.label}>
                            {icon ? <h4 className={classes.icon}>{icon}&nbsp;&nbsp;</h4> : <></>}
                            {label}
                        </b>
                    )
                }
                color={fill ? 'secondary' : clickable ? 'primary' : 'secondary'}
                variant={fill ? 'default' : 'outlined'}
            />
        </div>
    );
}
