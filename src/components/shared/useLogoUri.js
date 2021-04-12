import { useStateValue } from 'State/StateProvider';
import { COMPLEAT_LOGO_URI } from 'shared/constants';

export default function useLogoUri() {
    const [{ restaurant }] = useStateValue();

    return {
        logoUri: restaurant.logo ? restaurant.logo : COMPLEAT_LOGO_URI
    };
}
