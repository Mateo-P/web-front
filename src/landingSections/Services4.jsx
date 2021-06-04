import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FormattedMessage } from 'react-intl';

import Typography from '@material-ui/core/Typography';
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
    grid: {
        background: 'linear-gradient(72.77deg, #FFDC5F 11.72%, rgba(237, 238, 246, 0) 98.52%)',
        borderRadius: 40,
        padding: '32px 32px 180px 32px'
    },
    bills: {
        border: '8px solid #DCDEFE',
        borderRadius: '20px',
        position: 'relative'
    },
    billImage: {
        borderRadius: '12px',
        width: '100%'
    },
    dinerImage: {
        position: 'absolute',
        top: '45%',
        left: '44%',
        border: '8px solid #DCDEFE',
        borderRadius: '20px',

        width: '28%'
    }
}));

const Intro3 = () => {
    const classes = useStyles();

    return (
        <section className="section" id="intro3">
            <div className={classes.introWrapper}>
                <div className={classes.container}>
                    <Grid
                        className={classes.grid}
                        container
                        spacing={3}
                        justify="center"
                        alignItems="center">
                        <Grid item md={5}>
                            <Typography
                                style={{ fontWeight: '450' }}
                                color="secondary"
                                variant="h2">
                                <FormattedMessage id="dshRestauran" />
                            </Typography>

                            <Typography
                                style={{ fontWeight: '400' }}
                                color="secondary"
                                variant="h5">
                                <FormattedMessage id="statsMsg" />
                            </Typography>
                        </Grid>
                        <Grid item md={7}>
                            <div className={classes.bills}>
                                <img
                                    className={classes.billImage}
                                    src="/Bills.png"
                                    alt="DemoIphone.png"
                                />
                                <div className={classes.dinerImage}>
                                    <img
                                        style={{ width: '100%', borderRadius: 20 }}
                                        src="/dinermenu.png"
                                        alt="DemoIphone.png"
                                    />
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </section>
    );
};

export default Intro3;
