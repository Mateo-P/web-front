import React from 'react';
import useLogoUri from 'components/shared/useLogoUri';
import Image from 'next/image';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    loading: {
        padding: theme.spacing(2),
        width: theme.drawerWidth,
        height: theme.drawerWidth
    },
    imageContainer: {
        padding: theme.spacing(2)
    }
}));

export default function DrawerLogo() {
    const classes = useStyles();
    const { loading, logoUri } = useLogoUri();

    if (loading || !logoUri) {
        return <div className={classes.loading}></div>;
    }

    return (
        <div className={classes.imageContainer}>
            <Image src={logoUri} alt="LOGO" width={240} height={240} />
        </div>
    );
}
