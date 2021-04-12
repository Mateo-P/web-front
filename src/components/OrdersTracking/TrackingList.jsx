import Track from './Track';

function TrackingList({ orders }) {
    return (
        <div style={{ marginTop: '64px' }}>
            {orders.map((order, i) => (
                <Track key={i} {...order} />
            ))}
        </div>
    );
}

export default TrackingList;
