import Applayout from '../../src/components/Layouts/Applayout';
import withAuth from '../../src/components/withAuth';
import RestaurantsManager from '../../src/components/RestaurantsManager/RestaurantsManager';

const restaurantManager = (props) => {
    return (
        <Applayout {...props}>
            <RestaurantsManager />
        </Applayout>
    );
};

export default withAuth(restaurantManager);
