import Applayout from '../../src/components/Layouts/Applayout';
import withAuth from '../../src/components/withAuth';
import Profile from '../../src/components/Profile/index';

const ProfilePage = (props) => {
    return (
        <Applayout {...props}>
            <Profile {...props} />
        </Applayout>
    );
};

export default withAuth(ProfilePage);
