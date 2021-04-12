import { useState, useEffect } from 'react';
import Dropdown from '../Dropdown';
import Orders from './Orders';
import useCurrentVenue from '../../hooks/useCurrentVenue';
import RestaurantDropdown from '../shared/RestaurantDropdown';
import PageHeader from '../shared/PageHeader';

const allOptions = [
    { name: 'Todos', _id: null },
    { name: 'Fila', _id: 'line' },
    { name: 'Domicilio', _id: 'delivery' }
];
const allStatesOption = { name: 'Todos los estados', _id: null };
const tableStates = [
    { name: 'Pendiente', _id: 'CREATED' },
    { name: 'En preparación', _id: 'PROGRESS' }
];

export default function OrderManager() {
    const { currentRestaurant } = useCurrentVenue();

    const { tables } = currentRestaurant;

    const [currentOption, setcurrentOption] = useState(allOptions[0]);
    const [currentState, setCurrentState] = useState(allStatesOption);

    useEffect(() => {
        setcurrentOption(allOptions[0]);
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
                        name="Origen"
                        items={[...allOptions, ...tables]}
                        hook={[currentOption, setcurrentOption]}
                    />
                    <RestaurantDropdown />
                </div>
            </PageHeader>
            <Orders
                currentStateId={currentState._id}
                currentTableId={currentOption._id}
                restaurant={currentRestaurant._id}
            />
        </div>
    );
}
