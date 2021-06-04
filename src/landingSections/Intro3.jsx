import React from 'react';
import { Grid, Icon, Fab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Image from 'next/image';
import Typography from '@material-ui/core/Typography';
import { FormattedMessage } from 'react-intl';

const useStyles = makeStyles(({ ...theme }) => ({
    introWrapper: {
        padding: '5rem 0px !important',
        overflow: 'visible !important',

        [theme.breakpoints.down('sm')]: {
            padding: '1rem 0 !important',
            textAlign: 'center',
            '& .list': {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }
        }
    },
    container: {
        maxWidth: '1170px',
        margin: '0 auto'
    },
    title: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: theme.spacing(8),
        fontWeight: '500'
    }
}));

const Intro3 = () => {
    const classes = useStyles();

    return (
        <section className="section" id="intro3">
            <div className={classes.introWrapper}>
                <div className={classes.container}>
                    <Typography className={classes.title} color="secondary" variant="h1">
                        <FormattedMessage id="howWorks" />
                    </Typography>
                    <Grid container spacing={3} justify="center" alignItems="center">
                        <Grid item md={6}>
                            <div className="flex justify-center items-center max-w-360 mx-auto">
                                <Image
                                    className="w-full"
                                    priority
                                    width={268.8}
                                    height={554}
                                    src="/DemoIphone.png"
                                    alt="DemoIphone.png"
                                />
                            </div>
                        </Grid>
                        <Grid item md={6}>
                            <Fab href="/api/login" variant="extended" size="small" color="primary">
                                <FormattedMessage id="mkAccount" />
                            </Fab>
                            <Typography
                                style={{ fontWeight: '500' }}
                                color="secondary"
                                variant="h2">
                                <FormattedMessage id="uploadMenu" />
                            </Typography>

                            <Typography color="secondary" variant="h5">
                                <FormattedMessage id="extMsg" />
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </section>
    );
};

export default Intro3;
