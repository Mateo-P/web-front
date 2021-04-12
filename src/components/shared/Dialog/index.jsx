import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from 'components/shared/Dialog/DialogTitle';
import DialogContent from 'components/shared/Dialog/DialogContent';
import DialogActions from 'components/shared/Dialog/DialogActions';

export default function CustomizedDialog({ open, onClose, title, children, action }) {
    return (
        <Dialog
            onClose={onClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            scroll="paper">
            <DialogTitle id="customized-dialog-title" onClose={onClose}>
                {title}
            </DialogTitle>
            <DialogContent>{children}</DialogContent>
            <DialogActions>{action}</DialogActions>
        </Dialog>
    );
}
