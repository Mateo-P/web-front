import React from 'react';
import { Grid, Button, Icon } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InstagramIcon from '@material-ui/icons/Instagram';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import clsx from 'clsx';
import { FormattedMessage } from 'react-intl';

const useStyles = makeStyles(({ palette }) => ({
    container: {
        maxWidth: '1170px',
        margin: '0 auto',
        padding: '32px',
        position: 'relative',
        borderRadius: 40,
        backgroundColor: 'rgba(0, 0, 0, 1)'
    },
    footerSection: {
        background: palette.secondary.main,
        color: palette.background.light,
        borderRadius: '40px 40px 0px 0px',
        '& h4:after': {
            content: '" "',
            position: 'absolute',
            bottom: -8,
            left: 0,
            height: 2,
            width: 64,
            background: palette.primary.main
        }
    }
}));

const Footer1 = () => {
    const classes = useStyles();

    return (
        <div className={clsx(classes.footerSection)}>
            <div className={classes.container}>
                <Grid container>
                    <Grid item lg={6} md={6} sm={12}>
                        <div className="p-8 h-full elevation-z3">
                            <h4 className="text-20 mb-6 relative">
                                <FormattedMessage id="abourUs" />
                            </h4>
                            <p className="text-inherit">
                                <em>Compleat </em> <FormattedMessage id="aboutUsMsg" />
                            </p>
                            <Button
                                href="https://instagram.com/compleat.com.co?igshid=9h1672tnnvcq"
                                variant="contained"
                                color="primary">
                                <FormattedMessage id="contactUs" />
                            </Button>
                        </div>
                    </Grid>
                    <Grid item lg={3} md={3} sm={12}>
                        <div className="p-8 h-full elevation-z3">
                            <div className="px-4 my-8 flex items-center mx--4">
                                <Icon className="text-primary">mail</Icon>
                                <div className="pl-4">
                                    <p className="m-0 p-0 text-inherit">admin@compleat.com.co</p>
                                </div>
                            </div>
                            <a
                                href="https://instagram.com/compleat.com.co?igshid=9h1672tnnvcq"
                                className="px-4 my-8 flex items-center mx--4">
                                <InstagramIcon className="text-primary" />
                                <div className="pl-4">
                                    <p className="m-0 p-0 text-inherit">compleat.com.co</p>
                                </div>
                            </a>
                            <div className="px-4 my-8 flex items-center mx--4">
                                <WhatsAppIcon className="text-primary" />
                                <div className="pl-4">
                                    <p className="m-0 p-0 text-inherit">+57 (319) 587-1793 </p>
                                </div>
                            </div>
                        </div>
                    </Grid>
                    <Grid item lg={3} md={3} sm={12}>
                        <div className="p-8 h-full elevation-z3">
                            <h4 className="text-20 mb-6 relative">
                                <FormattedMessage id="bestAl" />
                            </h4>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default Footer1;
