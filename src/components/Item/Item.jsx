import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Image from 'next/image';
import ItemButton from '../Client/Checkout/AddToBasketButton';
import LazyLoad from 'react-lazyload';
import { formatCurrency } from '../../shared/currencyFormat';
import EditAndDeleteMenu from '../shared/EditAndDeleteMenu';
import dynamic from 'next/dynamic';

const ItemDetail = dynamic(() => import('components/Client/ItemDetail'));

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
        minHeight: 110,
        marginBottom: theme.spacing(4)
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
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
        flexBasis: '25%'
    },
    detail: {
        flexBasis: '75%'
    },
    footer: {
        display: 'flex',
        justifyContent: 'space-between'
    }
}));

export default function Item({
    _id,
    name,
    image,
    description,
    price,
    editable,
    options,
    availabilitySwitch,
    viewonly,
    handleOpenEdit,
    handleOpenDelete
}) {
    const classes = useStyles();
    const addToBasket = () => {
        setOpen(true);
    };
    const [open, setOpen] = useState(false);

    const isOrderPossible = !(editable || availabilitySwitch);

    return (
        <LazyLoad once offset={600}>
            <Card className={classes.root} onClick={isOrderPossible ? addToBasket : null}>
                <div className={classes.content}>
                    <div className={classes.iconContainer}>
                        <Image
                            layout="responsive"
                            //unsized
                            className={classes.icon}
                            alt={name}
                            src={image}
                            width={100}
                            height={100}
                        />
                    </div>
                    <div className={classes.detail}>
                        <div className={classes.header}>
                            <Typography variant="h6" gutterBottom>
                                {name}
                            </Typography>
                            {availabilitySwitch}
                            {editable && (
                                <EditAndDeleteMenu
                                    handleOpenDelete={handleOpenDelete}
                                    handleOpenEdit={handleOpenEdit}
                                />
                            )}
                        </div>
                        <Typography variant="body2" color="textSecondary" gutterBottom>
                            {description}
                        </Typography>
                        <div className={classes.footer}>
                            <Typography variant="h6">{formatCurrency(price)}</Typography>
                            {isOrderPossible && <ItemButton viewonly={viewonly} />}
                        </div>
                    </div>
                </div>
            </Card>
            {open && (
                <ItemDetail
                    item={{ _id, name, description, image, price, options }}
                    open={open}
                    setOpen={setOpen}
                    viewonly={viewonly}
                />
            )}
        </LazyLoad>
    );
}
