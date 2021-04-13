import { useStateValue } from 'State/StateProvider';
import { COMPLEAT_LOGO_URI } from 'shared/constants';

export default function useLogoUri() {
    const [{ user }] = useStateValue();

    if (!user || !user.image) {
        return { loading: true, logoUri: null };
    }

    return {
        loading: false,
        logoUri: user.image ? user.image : COMPLEAT_LOGO_URI
    };
}
