import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import { formatCurrency } from 'shared/currencyFormat';
import { FormattedMessage, useIntl } from 'react-intl';
const intl = useIntl();
const useStyles = makeStyles(({ spacing, palette }) => ({
    card: {
        padding: spacing(2),
        '& .card-header-highlighted': {
            background: 'rgba(var(--primary),1)',
            '& span': {
                color: palette.secondary.main
            }
        },
        '&:hover': {
            transform: 'translateY(-20px)'
        },
        border: '24px'
    },
    header: {
        display: 'flex',
        justifyContent: 'flex-start'
    },
    month: {
        alignItems: 'flex-end'
    },
    container: {
        maxWidth: '1170px',
        margin: '0 auto',
        marginBottom: spacing(4),
        backgroundImage: ` linear-gradient(rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.6)) , url(./pricing.png)`,
        backgroundSize: '100%',
        padding: '32px',
        position: 'relative',
        borderRadius: 40
    },
    priceTitle: {
        marginTop: '3rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        color: '#FFFF',
        marginBottom: '2rem'
    },
    priceOff: {
        display: 'flex',
        position: 'absolute',
        width: '250px',
        height: '90px',
        top: '3%',
        left: '76%',
        background: palette.primary.main,
        borderRadius: 64,
        justifyContent: 'center',
        alignItems: 'center'
    },
    pricemobileSize: {
        width: '100px',
        height: '36px',
        top: '1%',
        left: '66%'
    },

    price: {
        display: 'flex',
        justifyContent: 'flex-end',
        textDecoration: 'line-through',
        textDecorationColor: palette.info.main
    },
    planFeatures: {
        padding: '0.5rem 0.75rem 0.5rem 0.75rem'
    },
    chooseButton: {
        width: '100%'
    }
}));

const Pricing1 = () => {
    const [state, setState] = useState({
        switchToggled: false,
        plan: 'Mes',
        off: 30
    });

    const classes = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const priceOff = clsx({
        [classes.priceOff]: true,
        [classes.pricemobileSize]: isMobile
    });
    const pricingList = [
        {
            title: intl.formatMessage({ id: 'basic' }),
            subtitle: 'Hasta 20 mesas',
            price: 180,
            allowedOfferIndexList: [0, 1, 2]
        },
        {
            title: intl.formatMessage({ id: 'medium' }),
            subtitle: 'De 20 a 100 mesas',
            price: 240,
            allowedOfferIndexList: [0, 1, 2, 3]
        },
        {
            title: intl.formatMessage({ id: 'big' }),
            subtitle: 'De 100 a 300 mesas',
            price: 370,
            allowedOfferIndexList: [0, 1, 2, 3, 4]
        },
        {
            title: intl.formatMessage({ id: 'chain' }),
            subtitle: '301 mesas o más',
            price: 690,
            allowedOfferIndexList: [0, 1, 2, 3, 4, 5]
        }
    ];

    const offerList = [
        intl.formatMessage({ id: 'manageMenu' }),
        intl.formatMessage({ id: 'makeQr' }),
        intl.formatMessage({ id: 'processOrders' }),
        intl.formatMessage({ id: 'customB' }),
        intl.formatMessage({ id: 'attEsp' }),
        intl.formatMessage({ id: 'ilimtQr' })
    ];

    const getPriceList = () => {
        let { switchToggled, off } = state;

        if (switchToggled) {
            return [...pricingList].map((item) => {
                let plan = { ...item };
                let { price } = plan;

                if (price !== 'Free') {
                    price = price * 12;
                    price = Math.round(price - (price * off) / 100);
                }
                plan.price = price;
                return plan;
            });
        }
        return pricingList;
    };

    return (
        <div className={classes.container}>
            <div className={classes.priceTitle}>
                <Typography variant="h3" gutterBottom>
                    <FormattedMessage id="prices" />
                </Typography>
                <Typography variant="h5" gutterBottom>
                    <FormattedMessage id="bestPrices" />
                </Typography>
                <div className={priceOff}>
                    <Typography color="secondary" variant={isMobile ? 'h5' : 'h2'}>
                        50%OFF
                    </Typography>
                </div>
            </div>

            <Grid container spacing={2}>
                {getPriceList().map((plan) => {
                    let { title, subtitle, price, allowedOfferIndexList } = plan;

                    return (
                        <Grid item lg={3} md={3} sm={6} xs={12} key={title}>
                            <Card className={clsx('text-center card', classes.card)}>
                                <div>
                                    <div className={classes.header}>
                                        <Typography color="secondary" variant="h6">
                                            {title}
                                        </Typography>
                                    </div>
                                    <div className={classes.header}>
                                        <div>
                                            <Typography
                                                className={classes.price}
                                                color="secondary"
                                                variant="h5">
                                                {formatCurrency(price)}mil
                                            </Typography>
                                            <Typography color="secondary" variant="h3">
                                                {formatCurrency(price / 2)}mil
                                            </Typography>
                                        </div>
                                        <div className={clsx(classes.header, classes.month)}>
                                            <Typography color="secondary" variant="subtitle">
                                                / MES
                                            </Typography>
                                        </div>
                                    </div>
                                </div>

                                <CardContent>
                                    {offerList.map((offer, index) => (
                                        <div
                                            key={index}
                                            className={clsx(classes.header, {
                                                'text-muted': !allowedOfferIndexList.includes(index)
                                            })}>
                                            <div className={classes.planFeatures}>
                                                <CheckCircleRoundedIcon
                                                    style={{ marginRight: '12px' }}
                                                />
                                                {offer}
                                            </div>
                                        </div>
                                    ))}

                                    <Fab
                                        className={classes.chooseButton}
                                        color="primary"
                                        variant="outlined"
                                        size="large"
                                        width="100%">
                                        <FormattedMessage id="shousePlan" />
                                    </Fab>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </div>
    );
};

export default Pricing1;
