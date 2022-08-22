const mongoose = require("mongoose");
const {Schema} = mongoose;
const bcrypt = require("bcrypt");
const Order = require("./Order");

// creates new customer instance
const customerSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        minLength: 8
    },
    address: {
        type: String,
        trim: true
    },
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: "Order"
        }
    ]
});

// pre-save middleware for password
customerSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });

// compares the password typed in with the hashed password
customerSchema.methods.isCorrectPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;