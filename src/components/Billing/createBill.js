import { gql } from '@apollo/client';

export const CREATE_BILL = gql`
    mutation createBill(
        $tip: Int
        $paymentMethod: PaymentMethod
        $total: Int!
        $orders: [OrderBillInput]!
    ) {
        createBill(
            input: { tip: $tip, paymentMethod: $paymentMethod, total: $total, orders: $orders }
        ) {
            bill {
                _id
            }
        }
    }
`;
