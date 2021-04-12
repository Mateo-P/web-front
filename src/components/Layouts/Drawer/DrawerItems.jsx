import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
//import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import ReceiptIcon from '@material-ui/icons/Receipt';
import AssessmentIcon from '@material-ui/icons/Assessment';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import Link from 'next/link';
import Icon from '@material-ui/core/Icon';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import { useRouter } from 'next/router';
import List from '@material-ui/core/List';

const sideMenu = [
    { path: '/restaurants', name: 'Sedes', icon: <RestaurantIcon /> },
    { path: '/menuManager', name: 'Menú', icon: <MenuBookIcon /> },
    {
        path: '/availabilityManager',
        name: 'Disponibilidades',
        icon: <FastfoodIcon />
    },
    { path: '/tableManager', name: 'Mesas', icon: <PeopleIcon /> },
    { path: '/qrs', name: 'QRs', icon: <Icon>qr_code</Icon> },
    { path: '/orderManager', name: 'Pedidos', icon: <ShoppingCartIcon /> },
    { path: '/billing ', name: 'Facturacion', icon: <ReceiptIcon /> },
    { path: '/history', name: 'Historial', icon: <AssessmentIcon /> }
];
export default function mainListItems() {
    const router = useRouter();

    return (
        <List>
            {sideMenu.map(({ path, name, icon }, i) => (
                <Link key={i} href={path}>
                    <ListItem button selected={router.pathname === path}>
                        <ListItemIcon>{icon}</ListItemIcon>
                        <ListItemText primary={name} />
                    </ListItem>
                </Link>
            ))}
        </List>
    );
}
