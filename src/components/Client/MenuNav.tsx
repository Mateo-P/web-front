import { FC } from 'react';
import CategoriesNav from './CategoriesNav/CategoriesNav';
import MenuHeader from './MenuHeader';
import useOwnerInfo from './useOwnerInfo';
import { Badge, Typography, IconButton, Box } from '@material-ui/core';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import useLocalStorage from '../../hooks/useLocalStorage';
const useStyles = makeStyles((theme) => ({
    box: {
        position: 'fixed',
        zIndex: 1000,
        width: '100%',
        backgroundColor: '#ffffff'
    },
    iconButton: {
        padding: theme.spacing(0.5)
    },
    iconButtonLabel: {
        display: 'flex',
        flexDirection: 'column'
    }
}));
type Props = {
    restaurantName: string;
    restaurantPhone: string;
    restaurantId: string;
    originId: string;
    viewonly: boolean;
    categories: any;
};
const MenuNav: FC<Props> = ({
    restaurantName = 'Restaurante',
    restaurantPhone,
    categories,
    restaurantId,
    originId,
    viewonly
}) => {
    const classes = useStyles();
    useOwnerInfo(restaurantId);
    const router = useRouter();
    const key = 'clientOrders';
    const [orders] = useLocalStorage(key);

    const goToOrdersTracking = () => {
        if (orders && orders.length != 0 && !viewonly) {
            return (
                <IconButton
                    color="secondary"
                    className={classes.iconButton}
                    classes={{ label: classes.iconButtonLabel }}
                    onClick={() => router.push('/ordersTracking')}>
                    <Badge variant="dot" color="error" invisible={false}>
                        {'🧾'}
                    </Badge>
                    <Typography variant="subtitle2" display="block">
                        Ordenes
                    </Typography>
                </IconButton>
            );
        }
    };
    return (
        <Box className={classes.box} boxShadow={3}>
            <MenuHeader
                back={goToOrdersTracking()}
                restaurantName={restaurantName}
                restaurantPhone={restaurantPhone}
                restaurantId={restaurantId}
                tableId={originId}
            />
            <CategoriesNav categories={categories} />
        </Box>
    );
};
export default MenuNav;
