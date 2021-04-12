import { FC } from 'react';

import { Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        Header: {
            display: 'flex',
            justifyContent: 'space-between',
            borderBottom: '1px solid #D3D3D3'
        }
    })
);

interface Props {
    name: String;
    time: String;
}
const OpenTableHeader: FC<Props> = ({ name, time }) => {
    const classes = useStyles();

    return (
        <div className={classes.Header}>
            <Typography variant={'h6'}>
                👥 &nbsp;
                {name}
            </Typography>
            <Typography variant={'h6'}>
                🕓&nbsp;
                {time}
            </Typography>
        </div>
    );
};

export default OpenTableHeader;
