import { gql } from '@apollo/client';

export const UPDATE_BILL = gql`
    mutation updateBill($tip: Int!, $paymentMethod: PaymentMethod!, $state: String!, $_id: ID!) {
        updateBill(input: { tip: $tip, paymentMethod: $paymentMethod, state: $state, _id: $_id }) {
            bill {
                _id
            }
        }
    }
`;
