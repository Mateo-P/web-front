import React from 'react';
import Button from '@material-ui/core/Button';

export default function CancelAcceptButtons({ onCancel, onAccept, disableAccept }) {
    return (
        <>
            <Button variant="contained" color="secondary" onClick={onCancel}>
                Cancelar
            </Button>
            <Button
                variant="contained"
                onKeyDown={onAccept}
                onClick={onAccept}
                color="primary"
                disabled={disableAccept}>
                Aceptar
            </Button>
        </>
    );
}
