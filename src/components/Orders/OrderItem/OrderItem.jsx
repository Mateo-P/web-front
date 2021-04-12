import { useMutation } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Image from 'next/image';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useSnackbar } from 'notistack';
import { UPDATE_ORDER } from '../updateOrder';
import OrderAttribute from './OrderAttributes';
import OrderOptions from './OrderOptions';
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        flexBasis: '25%',
        flexGrow: '0',
        borderBottom: '1px solid lightgrey'
    },
    body: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    icon: {
        borderRadius: '7px'
    },
    avatar: {
        marginRight: theme.spacing(1)
    },
    actionButtons: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly'
    },
    mainButton: {
        marginBottom: theme.spacing(1)
    }
}));

export default function OrderItem({ _id, image, name, options, state, table, time, quantity }) {
    const classes = useStyles();

    const [updateOrder] = useMutation(UPDATE_ORDER);
    const { enqueueSnackbar } = useSnackbar();

    const handleUpdate = () => {
        let updatedstatus = '';
        let toastMessage = '';

        if (state == 'Pendiente') {
            updatedstatus = 'PROGRESS';
            toastMessage = `${name} en preparación!`;
        } else if (state == 'En preparación') {
            updatedstatus = 'FINISHED';
            toastMessage = `${name} Entregado!`;
        }

        updateOrder({
            variables: {
                _id: _id,
                state: updatedstatus
            }
        });

        enqueueSnackbar(toastMessage, {
            variant: 'success'
        });
    };
    const handleDelete = () => {
        updateOrder({
            variables: {
                _id: _id,
                state: 'DECLINED'
            }
        });
        enqueueSnackbar('Orden rechazada', {
            variant: 'error'
        });
    };
    return (
        <ListItem className={classes.root}>
            <ListItemAvatar className={classes.avatar}>
                <Image
                    width={150}
                    height={150}
                    //unsized
                    className={classes.icon}
                    alt={'IMAGE' + _id}
                    src={image}
                />
            </ListItemAvatar>
            <Grid container item spacing={2}>
                <Grid className={classes.title} item xs={12} sm={6} lg={3}>
                    <Typography variant="h1" gutterBottom>
                        {quantity}&nbsp;
                    </Typography>
                    <Typography variant="h4" gutterBottom>
                        {name}
                    </Typography>
                </Grid>
                <Grid className={classes.body} item xs={12} sm={6} lg={3}>
                    <OrderAttribute table={table} time={time} state={state} />
                </Grid>
                <Grid className={classes.body} item xs={12} sm={9} lg={4}>
                    <OrderOptions options={options ? options : []} />
                </Grid>
                <Grid className={classes.body} item xs={12} sm={3} lg={2}>
                    <div className={classes.actionButtons}>
                        <Button
                            className={classes.mainButton}
                            variant="contained"
                            size="large"
                            color="primary"
                            fullWidth
                            onClick={handleUpdate}>
                            {state == 'Pendiente' ? 'Aceptar' : 'Entregar'}
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            size="large"
                            fullWidth
                            onClick={handleDelete}>
                            {state == 'Pendiente' ? 'Rechazar' : 'Cancelar'}
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </ListItem>
    );
}
