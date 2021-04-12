import { Card, Grid, Typography } from '@material-ui/core';
import moment from 'moment';
import { formatCurrency } from '../../shared/currencyFormat';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(1),
        minHeight: theme.spacing(10)
    },
    itembottom: {
        display: 'flex',
        spacing: theme.spacing(1)
    }
}));

function Track({ createdTime, confirmedTime, finishedTime, item, quantity, state }) {
    const classes = useStyles();
    const { name, price } = item;
    const parseState = () => {
        if (state == 'CREATED') {
            return '🛎 Enviado';
        } else if (state == 'PROGRESS') {
            return '👨🏻‍🍳 En preparación';
        } else if (state == 'FINISHED') {
            return '✅ Entregado';
        } else if (state == 'DECLINED') {
            return '❌ Cancelada';
        } else if (state == 'BILLED') {
            return '🧾 Facturada';
        }
    };
    const parseTime = () => {
        let time = createdTime;
        if (finishedTime) {
            time = finishedTime;
        } else if (confirmedTime) {
            time = confirmedTime;
        }
        return moment(parseInt(time)).format('LT');
    };
    return (
        <Card className={classes.root}>
            <Grid container spacing={1}>
                <Grid item xs={7}>
                    <Typography variant="h6" gutterBottom>
                        {name}
                    </Typography>
                    <div className={classes.itembottom}>
                        <Typography variant="subtitle1">{formatCurrency(price)}</Typography>
                        <Typography variant="subtitle1">&nbsp;x{quantity}</Typography>
                    </div>
                </Grid>

                <Grid item xs={5}>
                    <Typography variant="h6" gutterBottom>
                        {parseState()}
                    </Typography>
                    <Typography variant="subtitle1">{parseTime()}</Typography>
                </Grid>
            </Grid>
        </Card>
    );
}

export default Track;
