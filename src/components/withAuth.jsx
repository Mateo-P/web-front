import React from 'react';

import auth0 from '../lib/auth0';
import { fetchUser } from '../lib/user';
import createLoginUrl from '../lib/url-helper';
import RedirectToLogin from './login-redirect';

export default function withAuth(InnerComponent) {
    function Authenticated(props) {
        if (!props.user) {
            return <RedirectToLogin />;
        }

        return <div>{<InnerComponent {...props} user={props.user} />}</div>;
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

        return { user };
    };

    return Authenticated;
}
