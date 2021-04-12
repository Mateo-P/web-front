export default function fetcher(url, method, body, token, options) {
    fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((res) => res.json()),
        { ...options };
}
