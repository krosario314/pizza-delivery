const {gql} = require("apollo-server-express");

const typeDefs = gql`
    type Customer {
      _id: ID
      username: String
      email: String
      phone: String
      address: String
      orders: [Order]
    }

    type Pizza {
      _id: ID
      size: String
      crust: String
      meats: [String]
      veggies: [String]
    }

    type Order {
      _id: ID
      status: String
      createdDate: String
      pizzas: [Pizza]
    }

    type Employee {
      _id: ID
      username: String
      email: String
      password: String
    }

    type Checkout {
       session: ID
    }
    
    type CustAuth {
      token: ID
      customer: Customer
    }

    # type LoginAuth {
    #   token: ID
    #   customer: Customer
    # }

    type EmpAuth {
      token: ID
      employee: Employee
    }
    
    type Query {
      customers: [Customer]
      pizzas: [Pizza]
      # pizzas(_id: ID): [Pizza]
      orders: [Order]
      pizza(_id: ID!): Pizza
      customer(_id: ID!): Customer
      order(_id: ID!): Order
      # checkout(pizzas: [ID]!): Checkout
    }
    
    type Mutation {
      addCustomer(username: String!, phone: String, email: String, password: String, address: String): CustAuth
      addPizza(size: String!, crust: String, meats: String, veggies: String): Pizza
      updatePizza(_id: ID!, size: String, crust: String, meats: String, veggies: String): Pizza
      deletePizza(_id: ID!): Pizza
      addOrder(_id: ID!, status: String!): Order
      updateOrder(_id: ID!, status: String): Order
      deleteOrder(_id: ID!): Order
      login(username: String!, password: String!): CustAuth
    }
`;

module.exports = typeDefs;