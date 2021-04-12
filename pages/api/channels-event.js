const Channels = require('pusher');

const {
    NEXT_PUBLIC_PUSHER_APP_ID: appId,
    NEXT_PUBLIC_PUSHER_KEY: key,
    PUSHER_SECRET: secret,
    NEXT_PUBLIC_PUSHER_CLUSTER: cluster
} = process.env;

const channels = new Channels({
    appId,
    key,
    secret,
    cluster
});

async function handler(req, res) {
    const data = req.body;

    const { channel, event, params } = data;

    try {
        await channels.trigger(channel, event, params);
        res.status(200).end('sent event successfully');
    } catch (err) {
        res.status(500).end(err);
    }
}

export default handler;
