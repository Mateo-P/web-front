import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DropzoneArea } from 'material-ui-dropzone';
import { Grid, TextField } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import fetcher from 'shared/fetcher';
import ProfileImage from './ProfileImage';
import Dialog from 'components/shared/Dialog';
import CancelAcceptButtons from 'components/shared/Dialog/CancelAcceptButtons';
import { useStateValue } from 'State/StateProvider';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        flexGrow: 1
    },
    label: {
        width: '100%'
    },
    dropzone: {
        width: '100%',
        marginTop: '15px'
    }
});
export default function Profile({ user }) {
    const classes = useStyles();
    const { email } = user;
    const [file, setFile] = useState(null);
    const [open, setOpen] = useState(false);
    const [{ restaurant, token }] = useStateValue();

    const handleFileUpload = async (file) => {
        setFile(file[0]);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const addCallback = async () => {
        handleClose();

        await fetcher(`restaurants/${restaurant.id}/`, 'PATCH', token, {
            logo: file
        });
        setFile(null);
        location.reload();
    };
    console.log(file);

    const { name, logo, plan_display } = restaurant;

    return (
        <>
            <Card className={classes.root}>
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                className={classes.label}
                                id="outlined-read-only-input"
                                label="Nombre del restaurante"
                                defaultValue={name}
                                InputProps={{
                                    readOnly: true
                                }}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                className={classes.label}
                                id="outlined-read-only-input"
                                label="Mi Plan"
                                defaultValue={plan_display}
                                InputProps={{
                                    readOnly: true
                                }}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                className={classes.label}
                                id="outlined-read-only-input"
                                label="Correo"
                                defaultValue={email}
                                InputProps={{
                                    readOnly: true
                                }}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="subtitle1">Logo:</Typography>
                            <ProfileImage
                                src={logo}
                                width={100}
                                height={100}
                                callback={() => setOpen(true)}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <Dialog
                title={'Agregar Logo'}
                open={open}
                onClose={handleClose}
                action={
                    <CancelAcceptButtons
                        onCancel={handleClose}
                        onAccept={addCallback}
                        disableAccept={!file}
                    />
                }>
                <div className={classes.dropzone}>
                    <DropzoneArea
                        dropzoneText={<>&nbsp;Arrastra una imagen aquí&nbsp;</>}
                        onChange={handleFileUpload}
                        filesLimit={1}
                    />
                </div>
            </Dialog>
        </>
    );
}
