import Applayout from '../../src/components/Layouts/Applayout';
import withAuth from '../../src/components/withAuth';
import MenuManager from '../../src/components/MenuManager/MenuManager';

const menuManager = (props) => {
    return (
        <Applayout user={props.user}>
            <MenuManager />
        </Applayout>
    );
};
export default withAuth(menuManager);
