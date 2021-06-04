import React from 'react';
import clsx from 'clsx';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
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
    },
    dinerImage: {
        border: '10px solid #DCDEFE',
        borderRadius: '34px',
        float: 'left',
        width: '44%'
    },
    dinermobilesize: {
        width: '100%'
    }
}));

const Intro3 = () => {
    const classes = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const mobiles = clsx({
        [classes.dinerImage]: true,
        [classes.dinermobilesize]: isMobile
    });
    return (
        <section className="section" id="intro3">
            <div className={classes.introWrapper}>
                <div className={classes.container}>
                    <Grid container spacing={3} justify="center" alignItems="center">
                        <Grid style={{ display: 'flex', justifyContent: 'center' }} item md={6}>
                            <div className={mobiles}>
                                <img
                                    style={{ width: '100%', borderRadius: 20 }}
                                    src="/order.png"
                                    alt="DemoIphone.png"
                                />
                            </div>
                        </Grid>
                        <Grid item md={6}>
                            <Typography style={{ fontWeight: '450' }} color="primary" variant="h5">
                                <FormattedMessage id="anyBrowser" />
                            </Typography>
                            <Typography
                                style={{ fontWeight: '500' }}
                                color="secondary"
                                variant="h2">
                                <FormattedMessage id="fromCell" />
                            </Typography>

                            <Typography color="secondary" variant="h5">
                                <FormattedMessage id="service5Msg" />
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </section>
    );
};

export default Intro3;
