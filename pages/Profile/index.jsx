import Applayout from '../../src/components/Layouts/Applayout';
import withAuth from '../../src/components/withAuth';
import Profile from '../../src/components/Profile/index';
import { useStateValue } from '../../src/State/StateProvider';

const ProfilePage = (props) => {
    const [{ user }] = useStateValue();
    return (
        <Applayout user={props.user}>
            <Profile {...user} />
        </Applayout>
    );
};

export default withAuth(ProfilePage);
