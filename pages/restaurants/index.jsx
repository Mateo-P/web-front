import Applayout from '../../src/components/Layouts/Applayout';
import withAuth from '../../src/components/withAuth';
import RestaurantsManager from '../../src/components/RestaurantsManager/RestaurantsManager';

const restaurantManager = (props) => {
    console.log(props.idToken);
    return (
        <Applayout user={props.user} idToken={props.idToken}>
            <RestaurantsManager email={props.user.email} />
        </Applayout>
    );
};

export default withAuth(restaurantManager);
