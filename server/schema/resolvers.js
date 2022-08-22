const { AuthenticationError } = require('apollo-server-express');

const { Customer, Pizza, Employee, Order } = require('../models');
const { signToken } = require('../utils/auth');

// const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
    Query: {
        customers: async () => {
            return await Customer.find({}).populate("orders").populate({
                path: "orders",
                populate: "pizzas"
            });
        },
        pizzas: async () => {
            return await Pizza.find({}); 
        },
        orders: async () => {

            console.log((new AuthenticationError("resolver orders")).message )
            try {
                return await Order.find({}).populate("pizzas");
            }
            catch(err) {
                console.log(new AuthenticationError("orders error") )
                return;
            }
        },
        pizza: async (parent, args) => {
            return await Pizza.findById(args.id).populate("customer");
        },
        customer: async (parent, args, context) => {
            if (context.user) {
                const customer = await Customer.findById(args.id).populate("orders").populate({
                    path: "orders",
                    populate: "pizzas"
                });
                return customer;
            }

            throw new AuthenticationError("Please login!");

        },
        order: async (parent, args) => {
            return await Order.findById(args.id).populate("pizza");
        }
    },
    Mutation: {
        addCustomer: async (parent, args) => {
            const customer = await Customer.create(args);
            const token = signToken(customer);

            return { token, customer }
        },
        addPizza: async (parent, { size, crust, meats, veggies }, context) => {
            // console.log(context);
            if (context.user) {
                const pizza = new Pizza({size, crust, meats, veggies});
                const pizzaDb = await pizza.save();
                console.log((new AuthenticationError(`**PizzaDb: ${pizzaDb}`)).message )
                const orderDb = Order.create({$push: {pizzas: pizzaDb._id}})
                
                await Customer.findOneAndUpdate(context.user._id, { $push: {pizzas: pizzaDb._id} });

                return pizzaDb;
            }

            throw new AuthenticationError("Please login!");
        },
        updatePizza: async (parent, {_id, size, crust, meats, veggies}, context) => {
            console.log((new AuthenticationError(`**updatePizza: ${context.user}`)).message );
            if (context.user) {
                // const pizzaData = new Pizza({ size, crust, meats, veggies});
                // console.log((new AuthenticationError(`**PizzaData: ${pizzaData}`)).message );
                return await Pizza.findByIdAndUpdate(_id, { size, crust, meats, veggies}, {new: true});
                // return pizzaData;
            }

            throw new AuthenticationError("pizza not updated!");
            
        },
        deletePizza: async (parent, {_id}) => {
            await Pizza.findOneAndDelete( {_id} );
            return "Order deleted!"
        },
        // deletePizza: async (parent, {pizzaId}, context) => {
        //     return await Pizza.findOneAndDelete(pizzaId, {$pull: {pizzas: }});
        // },
        addOrder: async (parent, { _id, status }, context) => {
            if (context.user) {
                const orderDb = new Order({_id, status});
                await Customer.findByIdAndUpdate(context.user._id, {$push: {orders: orderDb}});

                return orderDb;
            }
        },
        updateOrder: async (parent, {_id, status}, context) => {
            if (context.user) {
                const orderDb = new Order({_id, status});
                await Customer.findByIdAndUpdate(context.user._id, {$set: {orders: orderDb}});
                return orderDb;
            }

            throw new AuthenticationError('Not logged in');
        },
        deleteOrder: async (parent, {_id}) => {
            await Order.findOneAndDelete( {_id} );
            return "Order deleted!"
        },
        login: async (parent, { username, password }) => {
            console.log(username, password);
            const customer = await Customer.findOne({ username });
      
            if (!customer) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const correctPw = await customer.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const token = signToken(customer);
      
            return { token, customer };
          }
    }
};

module.exports = resolvers;