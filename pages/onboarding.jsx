import { useEffect } from 'react';
import { gql } from '@apollo/client';
import { createApolloClientSSR } from '../apollo/client';
import auth0 from '../src/lib/auth0';

const SIGN_UP_MUTATION = gql`
    mutation SignUpMutation($email: String!) {
        signUp(input: { email: $email }) {
            user {
                createdAt
                email
            }
        }
    }
`;

async function registerUser(user) {
    try {
        const apolloClient = createApolloClientSSR();

        const { data } = await apolloClient.mutate({
            mutation: SIGN_UP_MUTATION,
            variables: { email: user.email }
        });

        return data.user;
    } catch (error) {
        console.log(error);
    }
}

function Onboarding({ user }) {
    useEffect(() => {
        if (user) {
            window.location.assign('/restaurants');
        }
    }, []);

    return <h5>Registering...</h5>;
}

Onboarding.getInitialProps = async (ctx) => {
    const session = await auth0.getSession(ctx.req);
    const user = session.user;

    if (user['https://new']) {
        await registerUser(user);
    }
    return { user };
};

export default Onboarding;
