import { useState, useEffect } from 'react';
import Dropdown from '../Dropdown';
import Orders from './Orders';
import useRestaurant from '../../hooks/useRestaurant';
import RestaurantDropdown from '../shared/RestaurantDropdown';
import PageHeader from '../shared/PageHeader';

const allTablesOption = { name: 'Todas las mesas', _id: null };
const allStatesOption = { name: 'Todos los estados', _id: null };
const tableStates = [
    { name: 'Pendiente', _id: 'CREATED' },
    { name: 'En preparación', _id: 'PROGRESS' }
];

export default function OrderManager() {
    const { currentRestaurant } = useRestaurant();

    const { tables } = currentRestaurant;

    const [currentTable, setCurrentTable] = useState(allTablesOption);
    const [currentState, setCurrentState] = useState(allStatesOption);

    useEffect(() => {
        setCurrentTable(allTablesOption);
        setCurrentState(allStatesOption);
    }, [currentRestaurant]);

    return (
        <div>
            <PageHeader title="Pedidos">
                <div>
                    <Dropdown
                        name="Estado"
                        items={[allStatesOption, ...tableStates]}
                        hook={[currentState, setCurrentState]}
                    />
                    <Dropdown
                        name="Mesa"
                        items={[allTablesOption, ...tables]}
                        hook={[currentTable, setCurrentTable]}
                    />
                    <RestaurantDropdown />
                </div>
            </PageHeader>
            <Orders
                currentStateId={currentState._id}
                currentTableId={currentTable._id}
                restaurant={currentRestaurant._id}
            />
        </div>
    );
}
