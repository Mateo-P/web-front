import withAuth from '../src/components/withAuth';
import Onboarding from '../src/components/Onboarding';

const OnboardingPage = (props) => {
    return <Onboarding {...props} />;
};

export default withAuth(OnboardingPage);
