import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';

const Service7 = () => {
    return (
        <div className="section section-service7 bg-light-gray" id="service7">
            <div className="container">
                <Grid container alignItems="center" spacing={5}>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <div className="max-w-372 text-left">
                            <h2 className="mb-4">
                                <FormattedMessage id="service7Msg" />
                            </h2>
                            <p className="whitespace-pre-wrap">
                                {<FormattedMessage id="service7MsgL" />}
                            </p>

                            <Button variant="contained" color="primary" className="mt-4">
                                <FormattedMessage id="tryFree" />
                            </Button>
                        </div>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <img
                            className="max-h-280"
                            src="/landing-1.jpg"
                            alt="analyze"
                            style={{ borderRadius: '25px' }}
                        />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default Service7;
