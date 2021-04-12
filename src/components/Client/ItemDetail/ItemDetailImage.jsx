import Image from 'next/image';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles({
    image: {
        width: '102vw',
        marginTop: -15
    },
    container: {
        position: 'relative'
    },
    btn: {
        position: 'absolute',
        top: '1%',
        left: '88%'
    }
});

function ItemDetailImage({ src, onClick }) {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <Image src={src} width={414} height={300} />
            <IconButton aria-label="close" className={classes.btn} onClick={onClick}>
                <CloseIcon />
            </IconButton>
        </div>
    );
}

export default ItemDetailImage;
