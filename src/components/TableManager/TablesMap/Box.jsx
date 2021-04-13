import { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import { UPDATE_TABLES } from '../updateTable';
import { useMutation } from '@apollo/client';

const style = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: '#ECBB30',
    padding: '0.5rem 1rem',
    cursor: 'move',
    minWidth: '50px',
    minHeight: '50px',
    borderRadius: '8px',
    fontWeight: 450
};

export const Box = ({ id, name, left, top, hideSourceOnDrag, onSelect }) => {
    const [{ isDragging }, drag] = useDrag({
        item: { id, left, top, type: ItemTypes.BOX },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    });
    const [updateTable] = useMutation(UPDATE_TABLES);

    useEffect(() => {
        updateTable({
            variables: {
                _id: id,
                name,
                top,
                left
            }
        });
    }, [name, left, top]);

    if (isDragging && hideSourceOnDrag) {
        return <div ref={drag} />;
    }

    return (
        <div
            onClick={() => onSelect(id, name, top, left)}
            ref={drag}
            style={{ ...style, left, top }}>
            {name}
        </div>
    );
};
