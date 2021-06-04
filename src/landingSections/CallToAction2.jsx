import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { FormattedMessage } from 'react-intl';

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
                    <h2 className="mb-8">
                        <FormattedMessage id="registerMsg" />
                    </h2>
                    <div className="text-center">
                        <Button
                            centered
                            className={clsx(
                                'bg-primary rounded text-13 px-7 py-11px',
                                classes.button
                            )}>
                            <span className="ml-2">
                                <FormattedMessage id="register" />
                            </span>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CallToAction2;
