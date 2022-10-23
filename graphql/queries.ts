import { gql } from '@apollo/client';

export const GET_CUSTOMERS = gql`
query GET_CUSTOMERS {
    getCustomers {
      name
      value {
        email
        name
      }
    }
  }
`;

export const GET_ORDERS = gql`
query GET_ORDERS {
    getOrders {
      name
      value {
        carrier
        createdAt
        trackingId
        shippingCost
        Lng
        Lat
        City
        Address
        trackingItems {
          customer_id
          customer {
            name
            email
          }
          items {
            item_id
            name
            price
            quantity
          }
        }
      }
    }
  }
`;