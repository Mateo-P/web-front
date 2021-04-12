import { useState } from 'react';
import AppBar from './AppBar';
import LayoutDrawer from './Drawer';
import mediaQuery from 'css-mediaquery';
import { useTheme } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useUserAgent, withUserAgent } from 'next-useragent';

function LayoutMenus({ ua }) {
    const ssrMatchMedia = (query) => ({
        matches: mediaQuery.match(query, {
            width: ua.isMobile ? 800 : 1800
        })
    });
    const theme = useTheme();
    const mdOrDown = useMediaQuery(theme.breakpoints.down('md'), { ssrMatchMedia });
    const defaultOpen = mdOrDown ? false : true;
    const [open, setOpen] = useState(defaultOpen);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <>
            <AppBar open={open} handleDrawerOpen={handleDrawerOpen} mdOrDown={mdOrDown} />
            <LayoutDrawer open={open} handleDrawerClose={handleDrawerClose} mdOrDown={mdOrDown} />
        </>
    );
}

export function getServerSideProps(context) {
    const ua = useUserAgent(context.req.headers['user-agent']);

    return {
        props: { ua, useragent: ua.source }
    };
}

export default withUserAgent(LayoutMenus);
