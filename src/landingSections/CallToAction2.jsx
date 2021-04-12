import React from 'react';
import { TextField, Button, Icon } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles(({ palette, ...theme }) => ({
    button: {
        // position: 'absolute',
        // right: 3,
        // zIndex: 2
    }
}));

const CallToAction2 = () => {
    const classes = useStyles();

    return (
        <section className="section section-cta2 bg-light-gray" id="cta2">
            <div className="container text-center">
                <div className="max-w-770 mx-auto text-center">
                    <h2 className="mb-8">Regístrate e inicia tu período de prueba</h2>
                    <div className="text-center">
                        <Button
                            centered
                            className={clsx(
                                'bg-primary rounded text-13 px-7 py-11px',
                                classes.button
                            )}>
                            <span className="ml-2">REGÍSTRATE</span>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CallToAction2;
