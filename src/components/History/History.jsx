import { useState } from 'react';
import Intervaldatepicker from '../Datepicker/Intervaldatepicker';
import { gql, useQuery } from '@apollo/client';
import WithApolloClient from '../WithApolloClient';
import { makeStyles } from '@material-ui/core/styles';
import RestaurantDropdown from '../shared/RestaurantDropdown';
import HistoryList from './HistoryList';
import useRestaurant from '../../hooks/useRestaurant';
import PageHeader from '../shared/PageHeader';
import { formatCurrency } from '../../shared/currencyFormat';

const GET_HISTORY_BY_RESTAURANTS = gql`
    query historyByRestaurant($date1: String, $date2: String, $restaurant: ID!) {
        historyByRestaurant(input: { date1: $date1, date2: $date2, restaurant: $restaurant }) {
            _id
            quantity
            createdTime
            finishedTime
            clientName
            line
            table {
                _id
                name
            }
            item {
                name
                price
                options {
                    entries {
                        name
                        price
                    }
                }
            }
        }
    }
`;

const useStyles = makeStyles({
    headerOptions: {
        display: 'flex',
        alignItems: 'center',
        borderSpacing: 4
    }
});

function History() {
    const classes = useStyles();
    const { currentRestaurant } = useRestaurant();
    const [lowdate, setLowdate] = useState(new Date('2020-01-02'));
    const [topdate, setTopdate] = useState(new Date(Date.now()));
    const { error, data } = useQuery(GET_HISTORY_BY_RESTAURANTS, {
        variables: { date1: lowdate, date2: topdate, restaurant: currentRestaurant._id }
    });
    function createData(_id, name, price, quantity, tableName, tiempoentrega) {
        return [_id, name, price, quantity, tableName, tiempoentrega];
    }

    var earnings = 0;
    var totalquantity = 0;
    var totalTime = 0;

    const generaterows = () => {
        const rows = [];
        if (data)
            data.historyByRestaurant.forEach(
                ({ _id, item, quantity, table, line, clientName, createdTime, finishedTime }) => {
                    let tableName = line ? clientName : table ? table.name : clientName;
                    let elapsedtime = Math.round(
                        (parseInt(finishedTime) - parseInt(createdTime)) / 60000
                    );
                    let totalItemPrice = item.price;
                    item.options?.forEach((option) =>
                        option.entries.forEach(({ price }) => (totalItemPrice += price))
                    );
                    rows.push(
                        createData(
                            _id,
                            item.name,
                            formatCurrency(totalItemPrice),
                            quantity,
                            tableName,
                            elapsedtime
                        )
                    );
                    formatCurrency((earnings += totalItemPrice * quantity));
                    totalquantity += quantity;
                    totalTime += elapsedtime;
                }
            );
        return rows;
    };

    if (error) return `Error! ${error.message}`;

    return (
        <>
            <PageHeader title="Historial de pedidos">
                <div className={classes.headerOptions}>
                    <Intervaldatepicker
                        uselowdate={[lowdate, setLowdate]}
                        usetopdate={[topdate, setTopdate]}
                    />
                    <RestaurantDropdown />
                </div>
            </PageHeader>
            <HistoryList
                rows={generaterows()}
                earnings={earnings}
                quantity={totalquantity}
                timeAverage={Math.round(totalTime / totalquantity)}
            />
        </>
    );
}

export default WithApolloClient(History);
