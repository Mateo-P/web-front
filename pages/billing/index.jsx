import Applayout from '../../src/components/Layouts/Applayout';
import withAuth from '../../src/components/withAuth';
import BillManager from '../../src/components/Billing/BillManager';
import RestaurantsUnavailable from '../../src/components/shared/RestaurantsUnavailable';

function BillingManagePage(props) {
    return (
        <Applayout {...props}>
            <RestaurantsUnavailable>
                <BillManager />
            </RestaurantsUnavailable>
        </Applayout>
    );
}

export default withAuth(BillingManagePage);
