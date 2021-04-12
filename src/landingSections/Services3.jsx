import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Image from 'next/image';
import { Typography, Button } from '@material-ui/core';
const useStyles = makeStyles(({ ...theme }) => ({
    introWrapper: {
        overflow: 'visible !important',

        [theme.breakpoints.down('sm')]: {
            textAlign: 'center',
            '& .list': {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }
        }
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: theme.spacing(10),
        paddingBottom: theme.spacing(2),
        maxWidth: '100%',
        margin: '0 auto',
        backgroundImage: ` linear-gradient(rgba(0, 0, 0, 1),rgba(0, 0, 0, 0.9),rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.5)) , url(./Top.png)`,
        borderRadius: '0px 0px 40px 40px'
    },
    title: {
        display: 'flex',
        justifyContent: 'flex-start',

        marginBottom: theme.spacing(2),
        fontWeight: '500',
        color: '#FFFF'
    },
    buttons: {
        display: 'flex',
        marginTop: theme.spacing(8)
    },
    button: {
        padding: '8px 8px 8px 8px',
        borderRadius: 4,
        marginRight: 32
    }
}));

const Intro3 = () => {
    const classes = useStyles();

    return (
        <section className="section" id="intro3">
            <div className={classes.introWrapper}>
                <div className={classes.container}>
                    <Grid
                        style={{ maxWidth: '1170px', margin: 'auto' }}
                        container
                        spacing={3}
                        justify="center"
                        alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Image
                                className="w-full"
                                priority
                                width={350}
                                height={150}
                                src="/compleat.svg"
                                alt="DemoIphone.png"
                            />

                            <Typography className={classes.title} color="secondary" variant="h4">
                                Crea tu menú virtual y empieza a usarlo hoy mismo
                            </Typography>

                            <Typography
                                className={classes.title}
                                style={{ fontWeight: '300' }}
                                color="secondary"
                                variant="h5">
                                ¡Que la pandemia no te quite mas clientes, acelera tus ordenes y
                                aumenta tus ganancias!
                            </Typography>
                            <div className={classes.buttons}>
                                <Button
                                    className={classes.button}
                                    variant="contained"
                                    color="primary">
                                    Crea tu menú gratis hoy
                                </Button>
                                <Button
                                    className={classes.button}
                                    href="/api/login"
                                    variant="contained"
                                    color="secondary">
                                    Inicia Sesión
                                </Button>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={6}>
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
                    </Grid>
                </div>
            </div>
        </section>
    );
};

export default Intro3;
