import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { useStateValue } from 'State/StateProvider';
import Image from 'next/image';
import { formatCurrency } from 'shared/currencyFormat';
import Counter from 'components/shared/Counter';

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: theme.spacing(2),
        minWidth: theme.spacing(29)
    },
    content: {
        display: 'flex',
        height: '100%',
        margin: '10px'
    },
    icon: {
        width: '100%',
        objectFit: 'cover',
        borderRadius: '7px'
    },
    iconContainer: {
        marginRight: theme.spacing(1),
        width: '100%',
        flexBasis: '35%'
    },
    detail: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 2
    }
}));

export default function CheckoutItem({ item }) {
    const dispatch = useStateValue()[1];
    const classes = useStyles();

    const addToBasket = () => {
        dispatch({
            type: 'ADD_TO_BASKET',
            item
        });
    };

    const removeFromBasket = () => {
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            item
        });
    };

    const { quantity, name, price, image } = item;

    const handleCounterChange = (newQuantity) => {
        if (newQuantity > quantity) {
            addToBasket();
        } else if (newQuantity < quantity) {
            removeFromBasket();
        }
    };

    return (
        <Card className={classes.root}>
            <div className={classes.content}>
                <div className={classes.iconContainer}>
                    <Image
                        className={classes.icon}
                        alt="icon"
                        src={image}
                        layout="responsive"
                        width={100}
                        height={100}
                    />
                </div>
                <div className={classes.detail}>
                    <Typography variant="h6">{name}</Typography>
                    <div>
                        <Typography variant="h6">{formatCurrency(price)}</Typography>
                        <Counter value={quantity} setValue={handleCounterChange} />
                    </div>
                </div>
            </div>
        </Card>
    );
}
