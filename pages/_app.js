import { useEffect } from 'react';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../apollo/client';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/assets/theme';
import { StateProvider } from '../src/State/StateProvider';
import reducer from '../src/State/reducer';
import initialStates from '../src/State/initialStates';
import { SnackbarProvider } from 'notistack';
import Pixel from '../src/components/Pixel/index';

export default function App({ Component, pageProps }) {
    const apolloClient = useApollo(pageProps.initialApolloState);

    // eslint-disable-next-line no-undef
    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    return (
        <StateProvider initialState={initialStates} reducer={reducer}>
            <ApolloProvider client={apolloClient}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <SnackbarProvider
                        maxSnack={4}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right'
                        }}>
                        <Pixel name="FACEBOOK_PIXEL_1" />
                        <Component {...pageProps} />
                    </SnackbarProvider>
                </ThemeProvider>
            </ApolloProvider>
        </StateProvider>
    );
}
