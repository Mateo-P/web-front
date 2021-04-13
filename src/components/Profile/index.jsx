import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DropzoneArea } from 'material-ui-dropzone';
import { Grid, TextField } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { ADD_IMAGE_USER } from './addImageUser';
import { useMutation } from '@apollo/client';
import ProfileImage from './ProfileImage';
import Dialog from 'components/shared/Dialog';
import CancelAcceptButtons from 'components/shared/Dialog/CancelAcceptButtons';

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
export default function Profile(props) {
    const classes = useStyles();
    const [file, setFile] = useState(null);
    const [open, setOpen] = useState(false);
    const [addUserImage] = useMutation(ADD_IMAGE_USER, {
        onCompleted: () => {
            window.location.reload();
        }
    });

    const { email, image } = props;

    const handleFileUpload = async (file) => {
        setFile(file[0]);
    };
    const handleClose = () => {
        setOpen(false);
        setFile(null);
    };
    const handleOpen = () => {
        setOpen(true);
    };
    const addCallback = () => {
        addUserImage({
            variables: {
                email,
                image: file
            }
        });
    };
    return (
        <>
            <Card className={classes.root}>
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                className={classes.label}
                                id="outlined-read-only-input"
                                label="Email"
                                defaultValue={email}
                                InputProps={{
                                    readOnly: true
                                }}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <ProfileImage
                                src={image}
                                width={100}
                                height={100}
                                callback={handleOpen}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}></Grid>
                    </Grid>
                </CardContent>
            </Card>
            <Dialog
                title={'Agregar Logo'}
                open={open}
                onClose={handleClose}
                action={<CancelAcceptButtons onCancel={handleClose} onAccept={addCallback} />}>
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
