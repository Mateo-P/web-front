import React, { useState } from 'react';
import Fade from '@material-ui/core/Fade';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CloseIcon from '@material-ui/icons/Close';

export default function EditAndDeleteMenu({ handleOpenDelete, handleOpenEdit }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        if (anchorEl) {
            setAnchorEl(null);
        } else {
            setAnchorEl(event.currentTarget);
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            size="small"
            onClick={handleClick}>
            <MoreVertIcon />
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}>
                <MenuItem onClick={() => handleOpenEdit()}>
                    <EditIcon />
                    &nbsp;Editar
                </MenuItem>
                <MenuItem onClick={() => handleOpenDelete()}>
                    <CloseIcon />
                    &nbsp;Eliminar
                </MenuItem>
            </Menu>
        </IconButton>
    );
}
