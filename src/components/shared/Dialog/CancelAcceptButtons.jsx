import React from 'react';
import Button from '@material-ui/core/Button';
import { FormattedMessage } from 'react-intl';

export default function CancelAcceptButtons({ onCancel, onAccept }) {
    return (
        <>
            <Button variant="contained" color="secondary" onClick={onCancel}>
                <FormattedMessage id="cancel" />
            </Button>
            <Button variant="contained" onKeyDown={onAccept} onClick={onAccept} color="primary">
                <FormattedMessage id="accept" />
            </Button>
        </>
    );
}
