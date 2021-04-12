import Applayout from '../../src/components/Layouts/Applayout';
import withAuth from '../../src/components/withAuth';
import AvailabilityManager from '../../src/components/AvailabilityManager/AvailabilityManager';
import RestaurantsUnavailable from '../../src/components/shared/RestaurantsUnavailable';

const AvailabilityPage = (props) => {
    return (
        <Applayout {...props}>
            <RestaurantsUnavailable>
                <AvailabilityManager />
            </RestaurantsUnavailable>
        </Applayout>
    );
};
export default withAuth(AvailabilityPage);
