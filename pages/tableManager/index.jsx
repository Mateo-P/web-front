import Applayout from '../../src/components/Layouts/Applayout';
import withAuth from '../../src/components/withAuth';
import TableManager from '../../src/components/TableManager/TableManager';
import RestaurantsUnavailable from '../../src/components/shared/RestaurantsUnavailable';

const tableManager = (props) => {
    return (
        <Applayout user={props.user}>
            <RestaurantsUnavailable>
                <TableManager />
            </RestaurantsUnavailable>
        </Applayout>
    );
};
export default withAuth(tableManager);
