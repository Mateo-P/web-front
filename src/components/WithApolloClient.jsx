import React from 'react';
import { ApolloConsumer } from '@apollo/client';

const WithApolloClient = (Wrappedcomponent) => {
    return (props) => (
        <ApolloConsumer>
            {(client) => {
                return <Wrappedcomponent client={client} {...props} />;
            }}
        </ApolloConsumer>
    );
};

export default WithApolloClient;
