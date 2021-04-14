import React from 'react';
//import Chip from 'components/shared/Chip';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default function OrderAttributes({ table, time, state }) {
    return (
        <Box
            display="flex"
            justifyContent="space-between"
            flexDirection="column"
            height="100%"
            paddingY="8px">
            {/* <Chip fullWidth icon={'👥'} label={table} />
            <Chip fullWidth icon={state === 'Pendiente' ? '🤚' : '👨‍🍳'} label={state} />
            <Chip fullWidth icon={'🕓'} label={time} /> */}
            <Typography variant="h6" gutterBottom>
                <span role="img" aria-label="table-icon">
                    {/*table.includes('(') ? '🏠' : '👥'*/}
                </span>{' '}
                &nbsp;&nbsp;
                {table}
            </Typography>
            <Typography variant="h6" gutterBottom>
                <span role="img" aria-label="table-icon">
                    {state === 'Pendiente' ? '🤚' : '👨‍🍳'}
                </span>{' '}
                &nbsp;&nbsp;
                {state}
            </Typography>
            <Typography variant="h6" gutterBottom>
                <span role="img" aria-label="table-icon">
                    🕓
                </span>{' '}
                &nbsp;&nbsp;
                {time}
            </Typography>
        </Box>
    );
}
