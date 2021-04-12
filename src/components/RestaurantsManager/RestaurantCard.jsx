import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Createform from 'components/shared/Forms/Createform';
import Deleteform from 'components/shared/Forms/Deleteform';
import EditAndDeleteMenu from '../shared/EditAndDeleteMenu';
import Dialog from 'components/shared/Dialog';
import CancelAcceptButtons from 'components/shared/Dialog/CancelAcceptButtons';

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
        { label: 'Dirección', value: 'address' },
        { label: 'teléfono', value: 'phone' }
    ];
    const [formValues, setFormValues] = useState({});
    const [open, setopen] = useState(false);
    const [edit, setEdit] = useState(true);

    const updateRestaurantCallback = () => {
        // updateRestaurant({
        //     variables: {
        //         _id: props._id,
        //         name: formValues.name,
        //         address: formValues.address,
        //         phone: formValues.phone
        //     }
        // });
        setopen(false);
        props.editVenue({
            name: formValues.name,
            address: formValues.address
        });
    };
    const deleteRestaurantCallback = () => {
        setopen(false);
        props.deleteVenue();
    };

    const handleChange = (value) => (e) => {
        setFormValues({ ...formValues, [value]: e.target.value });
    };

    const handleOpenEdit = () => {
        setopen(true);
        setFormValues({
            name: props.name,
            address: props.address,
            phone: props.phone
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
            address: props.address,
            phone: props.phone
        });
    };
    return (
        <Card className={classes.root}>
            <CardContent>
                <div className={classes.header}>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Nombre:
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
                    Dirección:
                </Typography>
                <div className={classes.header}>
                    <Typography variant="h5" component="h2">
                        {props.address}
                    </Typography>
                </div>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Teléfono:
                </Typography>
                <div className={classes.header}>
                    <Typography variant="h5" component="h2">
                        {props.phone}
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
                    <Deleteform message={`Se eliminará ${props.name} de tus sedes`}></Deleteform>
                )}
            </Dialog>
        </Card>
    );
}
