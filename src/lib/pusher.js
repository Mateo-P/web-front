import Pusher from 'pusher-js';

const key = process.env.NEXT_PUBLIC_PUSHER_KEY;
const cluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER;

// Initialize Channels client
export const channels = new Pusher(key, {
    cluster
});

export async function pushData(data) {
    const res = await fetch('/api/channels-event', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if (!res.ok) {
    }
}
