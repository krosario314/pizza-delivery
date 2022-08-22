const mongoose = require("mongoose");
const {Schema} = mongoose;
const bcrypt = require("bcrypt");
// const Orders = require("./Orders");

const employeeSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    orders: [{
        type: Schema.Types.ObjectId,
        ref: "Order"
    }] 
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;