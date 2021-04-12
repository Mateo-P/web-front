import { useState, useEffect } from 'react';
import Dropdown from '../Dropdown';
import useCurrentVenue from '../../hooks/useCurrentVenue';
import RestaurantDropdown from '../shared/RestaurantDropdown';
import PageHeader from '../shared/PageHeader';
import BillList from './BillList';
import FinishedOrders from './FinishedOrders';
import Grid from '@material-ui/core/Grid';

const allOptions = [
    { name: 'Todos', _id: null },
    { name: 'Fila', _id: 'line' },
    { name: 'Domicilio', _id: 'delivery' }
];
const SortOptions = [
    { name: 'Tiempo      ⬇️', _id: 'timeDown' },
    { name: 'Tiempo      ⬆️', _id: 'timeUp' }
];

export default function OrderManager() {
    const { currentRestaurant } = useCurrentVenue();
    const { tables } = currentRestaurant;
    const [currentOption, setcurrentOption] = useState(allOptions[0]);
    const [currentSort, setCurrentSort] = useState(SortOptions[1]);

    useEffect(() => {
        setcurrentOption(allOptions[0]);
        setCurrentSort(SortOptions[1]);
    }, [currentRestaurant]);

    return (
        <div>
            <PageHeader title="Facturación Mesas">
                <div>
                    <Dropdown
                        name="Orden"
                        items={SortOptions}
                        hook={[currentSort, setCurrentSort]}
                    />
                    <Dropdown
                        name="Origen"
                        items={[...allOptions, ...tables]}
                        hook={[currentOption, setcurrentOption]}
                    />
                    <RestaurantDropdown />
                </div>
            </PageHeader>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={8}>
                    <FinishedOrders
                        tables={tables}
                        currentSort={currentSort._id}
                        currentOptionId={currentOption._id}
                        restaurant={currentRestaurant._id}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <BillList restaurant={currentRestaurant.id} />
                </Grid>
            </Grid>
        </div>
    );
}
