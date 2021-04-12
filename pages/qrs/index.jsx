import Applayout from '../../src/components/Layouts/Applayout';
import withAuth from '../../src/components/withAuth';
import QRManager from '../../src/components/QRManager/QRManager';
import RestaurantsUnavailable from '../../src/components/shared/RestaurantsUnavailable';

const menuManager = (props) => {
    return (
        <Applayout {...props}>
            <RestaurantsUnavailable>
                <QRManager />
            </RestaurantsUnavailable>
        </Applayout>
    );
};
export default withAuth(menuManager);
