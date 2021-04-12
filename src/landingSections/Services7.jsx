import React from 'react';
import { Grid, Button } from '@material-ui/core';

const Service7 = () => {
    return (
        <div className="section section-service7 bg-light-gray" id="service7">
            <div className="container">
                <Grid container alignItems="center" spacing={5}>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <div className="max-w-372 text-left">
                            <h2 className="mb-4">Crea un menú digital sencillo e intuitivo.</h2>
                            <p className="whitespace-pre-wrap">
                                {`El menú de tu restaurante tendrá un aspecto familiar y sencillo para que tu clientela pueda navegar con facilidad a través de él.
              \nSimplifica la operación de tu restaurante y facilita a tus clientes el proceso de pedido con la funcionalidad de realizar pedidos desde tu menú digital.`}
                            </p>

                            <Button variant="contained" color="primary" className="mt-4">
                                ¡Pruébalo Gratis!
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
