import { gql } from "@apollo/client";

export const LOGIN = gql`
mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    token
    customer {
      username
    }
  }
}
`;

export const ADD_CUSTOMER = gql`
  mutation addCustomer(
    $username: String!
    $email: String!
    $password: String!
    $address: String!
  ) {
    addCustomer(
      username: $username
      address: $address
      email: $email
      password: $password
    ) {
      token
      customer {
        _id
      }
    }
  }
`;
export const ADD_PIZZA = gql `
mutation addPizza ($size: String!, $crust: String, $meats: String, $veggies: String) {
  addPizza (size: $size, crust: $crust, meats:$meats, veggies: $veggies) {
    _id
    size
    crust
    meats
    veggies
  }
}`;


export const DELETE_PIZZA = gql `
mutation deletePizza ($id: ID!) {
  deletePizza (_id: $id) {
    _id
  }
}`;