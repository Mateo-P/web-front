import React from 'react';
import { useEffect } from 'react';
import auth0 from '../lib/auth0';
import { fetchUser } from '../lib/user';
import createLoginUrl from '../lib/url-helper';
import RedirectToLogin from './login-redirect';
import { useStateValue } from 'State/StateProvider';

export default function withAuth(InnerComponent) {
    function Authenticated(props) {
        const [{ token }, dispatch] = useStateValue();

        if (!props.user) {
            return <RedirectToLogin />;
        }

        useEffect(() => {
            if (props.idToken) {
                dispatch({
                    type: 'SET_TOKEN',
                    token: props.idToken
                });
            }
        }, [props.idToken]);

        if (!token) {
            return <div>Cargando...</div>;
        }

        return <div>{<InnerComponent {...props} />}</div>;
    }

    Authenticated.getInitialProps = async (ctx) => {
        let user;

        if (!ctx.req) {
            user = await fetchUser();

            return {
                user
            };
        }

        const session = await auth0.getSession(ctx.req);

        if (!session || !session.user) {
            ctx.res.writeHead(302, {
                Location: createLoginUrl(ctx.req.url)
            });
            ctx.res.end();
            return;
        }

        user = session.user;

        const { idToken } = session;
        console.log(idToken);
        return { user, idToken };
    };

    return Authenticated;
}
