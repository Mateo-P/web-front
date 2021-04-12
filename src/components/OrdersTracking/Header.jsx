import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import IconButton from '@material-ui/core/IconButton';
import MenuHeader from '../Client/MenuHeader';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    box: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',

        backgroundColor: '#ffffff'
    }
});

function Header() {
    const classes = useStyles();
    const router = useRouter();
    const backtoMenu = () => {
        return (
            <IconButton onClick={() => router.back()}>
                <ArrowBackIosIcon /> Volver
            </IconButton>
        );
    };
    return (
        <div className={classes.box}>
            <MenuHeader back={backtoMenu()} restaurantName={'Mis Ordenes'} />
        </div>
    );
}

export default Header;
