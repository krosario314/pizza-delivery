const db = require('./connection');
const { Customer, Pizza, Employee, Order } = require('../models');

db.once('open', async () => {
  await Pizza.deleteMany();

  const pizzas = await Pizza.insertMany([
    { size: "Large",
      crust: "Deep Dish",
      meats: "Pepperoni",
      veggies: "Mushrooms"  
    },
    { size: "Medium",
      crust: "Pan",
      meats: "Sausage",
      veggies: "Green Peppers"   
    },
    { size: "Small",
      crust: "Hand-Tossed",
      meats: "Onions",
      veggies: "Olives"   
    },
    { size: "Small",
      crust: "Thin Crust",
      meats: "Onions",
      veggies: "Olives"   
    },
    { size: "Medium",
      crust: "Pan",
      meats: "Bacon",
      veggies: "Mushrooms, Olives"   
    },
    
  ]);

  console.log('Pizza seeded');

  await Order.deleteMany();

  const orders = await Order.insertMany([
    {
      status: "In progress",
      pizzas: [ pizzas[0]._id, pizzas[1]._id ]
    },
    {
      status: "In progress",
      pizzas: [ pizzas[2]._id, pizzas[3]._id ]
    },
    {
      status: "Complete",
      pizzas: [ pizzas[1]._id, pizzas[4]._id ]
    } 
  ]);
  console.log('orders seeded');



  await Customer.deleteMany();

  await Customer.create({
    username: "mikeyMike",
    email: 'mike@testmail.com',
    password: 'secret12345',
    address: "123 Memory Lane, Dover, NJ",
    orders: [orders[0]._id]
  });

  await Customer.create({
    username: "iamcara",
    email: 'cara@testmail.com',
    password: 'secret12345',
    address: "456 Mountain Dr, Orange, NJ",
    orders: [orders[1]._id, orders[2]._id]
  });

  console.log('Customer seeded');

  // employee
  await Employee.deleteMany();

  await Employee.create({
    username: "BobBurger",
    email: 'bob@testmail.com',
    password: 'secret12345',
    address: "123 Ocean Dr, Dover, NJ",
    orders: [orders[0]._id, orders[1]._id, orders[2]._id]
  });

  await Employee.create({
    username: "Ian",
    email: 'ian@testmail.com',
    password: 'secret12345',
    address: "456 Lake Dr, Orange, NJ",
    orders: [orders[0]._id, orders[1]._id, orders[2]._id]
  });

  await Employee.create({
    username: "Chris",
    email: 'chris@testmail.com',
    password: 'secret12345',
    address: "789 Hillside Dr, Orange, NJ",
    orders: [orders[0]._id, orders[1]._id, orders[2]._id]
  });
  console.log('Employee seeded');

  

  process.exit();
});
