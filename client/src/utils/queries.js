import { gql } from "@apollo/client";

export const QUERY_ORDERS = gql`
    query {
        orders {
        _id
        status
        createdDate
        pizzas {
            _id
            size
            crust 
            meats
            veggies
        }
    }
    }
`;


export const QUERY_PIZZAS = gql`
query getPizzas {
    pizzas {
      _id
      size
      crust
      meats
      veggies
    }
  }`;



export const QUERY_CUSTOMERS = gql`
    query customers {
        customers {
          _id
          username
        }
    }`;