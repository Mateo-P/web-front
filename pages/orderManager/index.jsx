import Applayout from '../../src/components/Layouts/Applayout';
import withAuth from '../../src/components/withAuth';
import OrderManager from '../../src/components/Orders/OrderManager';
import RestaurantsUnavailable from '../../src/components/shared/RestaurantsUnavailable';

const OrderManagerPage = (props) => {
    return (
        <Applayout {...props}>
            <RestaurantsUnavailable>
                <OrderManager />
            </RestaurantsUnavailable>
        </Applayout>
    );
};
export default withAuth(OrderManagerPage);
