const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    env: {
        AUTH0_DOMAIN: process.env.NEXT_PUBLIC_AUTH0_DOMAIN,
        AUTH0_CLIENT_ID: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
        AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
        AUTH0_SCOPE: 'openid email profile',
        REDIRECT_URI: process.env.NEXT_PUBLIC_REDIRECT_URI,
        POST_LOGOUT_REDIRECT_URI: process.env.NEXT_PUBLIC_POST_LOGOUT_REDIRECT_URI,
        SESSION_COOKIE_SECRET: process.env.SESSION_COOKIE_SECRET,
        SESSION_COOKIE_LIFETIME: 7200 // 2 hours,
    },
    app: {
        storageDir: 'tmp'
    },
    images: {
        domains: ['img.icons8.com', 'mi-menu.s3.us-east-2.amazonaws.com']
    }
};
