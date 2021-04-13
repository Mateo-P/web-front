import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiDialogContent from '@material-ui/core/DialogContent';

const StyledDialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        minWidth: '70vw'
    }
}))(MuiDialogContent);

export default function DialogContent({ children }) {
    return <StyledDialogContent dividers>{children}</StyledDialogContent>;
}
