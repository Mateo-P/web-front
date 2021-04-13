import { useState, useEffect } from 'react';
import Dropdown from '../Dropdown';
import useRestaurant from '../../hooks/useRestaurant';
import RestaurantDropdown from '../shared/RestaurantDropdown';
import PageHeader from '../shared/PageHeader';
import BillList from './BillList';
import FinishedOrders from './FinishedOrders';
import Grid from '@material-ui/core/Grid';

const allTablesOption = { name: 'Todas las mesas', _id: null };
const SortOptions = [
    { name: 'Tiempo      ⬇️', _id: 'timeDown' },
    { name: 'Tiempo      ⬆️', _id: 'timeUp' }
];

export default function OrderManager() {
    const { currentRestaurant } = useRestaurant();
    const { tables } = currentRestaurant;
    const [currentTable, setCurrentTable] = useState(allTablesOption);
    const [currentSort, setCurrentSort] = useState(SortOptions[1]);

    useEffect(() => {
        setCurrentTable(allTablesOption);
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
                        name="Mesa"
                        items={[allTablesOption, ...tables]}
                        hook={[currentTable, setCurrentTable]}
                    />
                    <RestaurantDropdown />
                </div>
            </PageHeader>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={8}>
                    <FinishedOrders
                        tables={tables}
                        currentSort={currentSort._id}
                        currentTableId={currentTable._id}
                        restaurant={currentRestaurant._id}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <BillList restaurant={currentRestaurant._id} />
                </Grid>
            </Grid>
        </div>
    );
}
