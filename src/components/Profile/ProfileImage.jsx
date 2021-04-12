import Image from 'next/image';
import EditIcon from '@material-ui/icons/Edit';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        flexGrow: 1
    },
    label: {
        width: '100%'
    },
    Dropzone: {
        width: '100%',
        marginTop: '15px'
    },
    editbuttons: {
        minWidth: '36px'
    },
    image: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        overflow: 'hidden',
        border: '2px solid lightgray',
        borderRadius: '8px'
    }
});

export default function ProfileImage({ src, alt, width, height, callback }) {
    const classes = useStyles();
    return (
        <div className={classes.image}>
            <Image
                //layout="responsive"
                //unsized
                alt={alt}
                src={src}
                width={width}
                height={height}
            />

            <Button
                className={classes.editbuttons}
                size="small"
                color="secondary"
                onClick={callback}>
                <EditIcon />
            </Button>
        </div>
    );
}
