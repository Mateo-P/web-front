import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Createform from 'components/shared/Forms/Createform';
import Deleteform from 'components/shared/Forms/Deleteform';
import { DELETE_RESTAURANT_MUTATION } from './deleteRestaurant';
import { UPDATE_RESTAURANT_MUTATION } from './updateRestaurant';
import { GET_USER_RESTAURANTS } from './getUserRestaurants';
import { useMutation } from '@apollo/client';
import { useStateValue } from '../../State/StateProvider';
import EditAndDeleteMenu from '../shared/EditAndDeleteMenu';
import Dialog from 'components/shared/Dialog';
import CancelAcceptButtons from 'components/shared/Dialog/CancelAcceptButtons';
import { FormattedMessage } from 'react-intl';
import { useIntl } from 'react-intl';

const useStyles = makeStyles({
    root: {
        minWidth: 275
    },

    title: {
        fontSize: 14
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between'
    }
});

export default function SimpleCard(props) {
    const classes = useStyles();
    const formFields = [
        { label: 'Nombre', value: 'name' },
        { label: 'Dirección', value: 'address' }
    ];
    const intl = useIntl();

    const [formValues, setFormValues] = useState({});
    const [{ user }] = useStateValue();
    const [open, setopen] = useState(false);
    const [edit, setEdit] = useState(true);
    const [updateRestaurant] = useMutation(UPDATE_RESTAURANT_MUTATION);

    const [deleteRestaurant] = useMutation(DELETE_RESTAURANT_MUTATION, {
        update(cache, { data: { deleteRestaurant } }) {
            let email = user.email;
            const existingRestaurants = cache.readQuery({
                query: GET_USER_RESTAURANTS,
                variables: {
                    email
                }
            });

            let oldRestaurants = existingRestaurants.restaurantsByOwner;
            let deletedRestaurant = deleteRestaurant.restaurant;
            cache.writeQuery({
                query: GET_USER_RESTAURANTS,
                variables: {
                    email
                },
                data: {
                    restaurantsByOwner: oldRestaurants.filter(
                        (rest) => rest._id !== deletedRestaurant._id
                    )
                }
            });
        }
    });
    const updateRestaurantCallback = () => {
        updateRestaurant({
            variables: {
                _id: props._id,
                name: formValues.name,
                address: formValues.address
            }
        });
        setopen(false);
    };
    const deleteRestaurantCallback = () => {
        deleteRestaurant({
            variables: {
                _id: props._id
            }
        });
        setopen(false);
    };

    const handleChange = (value) => (e) => {
        setFormValues({ ...formValues, [value]: e.target.value });
    };

    const handleOpenEdit = () => {
        setopen(true);
        setFormValues({
            name: props.name,
            address: props.address
        });
    };
    const handleopenDelete = () => {
        setopen(true);
        setEdit(false);
    };

    const handleClose = () => {
        setopen(false);
        setEdit(true);
        setFormValues({
            name: props.name,
            address: props.address
        });
    };
    return (
        <Card className={classes.root}>
            <CardContent>
                <div className={classes.header}>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        <FormattedMessage id="name" />:
                    </Typography>
                    <EditAndDeleteMenu
                        handleOpenEdit={handleOpenEdit}
                        handleOpenDelete={handleopenDelete}
                    />
                </div>
                <Typography variant="h5" component="h2">
                    {props.name}
                </Typography>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    <FormattedMessage id="address" />:
                </Typography>
                <div className={classes.header}>
                    <Typography variant="h5" component="h2">
                        {props.address}
                    </Typography>
                </div>
            </CardContent>
            <Dialog
                open={open}
                onClose={handleClose}
                title={edit ? 'Editar Sede' : 'Eliminar Sede'}
                action={
                    <CancelAcceptButtons
                        onCancel={handleClose}
                        onAccept={edit ? updateRestaurantCallback : deleteRestaurantCallback}
                    />
                }>
                {edit ? (
                    <Createform
                        fields={formFields}
                        handleChange={handleChange}
                        formValues={formValues}></Createform>
                ) : (
                    <Deleteform
                        message={`${intl.formatMessage({ id: 'delete' })} ${
                            props.name
                        } ${intl.formatMessage({ id: 'fromS' })}`}></Deleteform>
                )}
            </Dialog>
        </Card>
    );
}
