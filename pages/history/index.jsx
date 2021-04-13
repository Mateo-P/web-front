import Applayout from '../../src/components/Layouts/Applayout';
import withAuth from '../../src/components/withAuth';
import History from '../../src/components/History/History';
import RestaurantsUnavailable from '../../src/components/shared/RestaurantsUnavailable';

const HistoryPage = (props) => {
    return (
        <Applayout user={props.user}>
            <RestaurantsUnavailable>
                <History user={props.user} />
            </RestaurantsUnavailable>
        </Applayout>
    );
};
export default withAuth(HistoryPage);
