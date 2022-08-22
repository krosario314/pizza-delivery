const mongoose = require("mongoose");
const {Schema} = mongoose;

const orderSchema = new Schema({
    status: {
        type: String,
        required: true,
        default: "In progress"
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    pizzas: [
        {
            type: Schema.Types.ObjectId,
            ref: "Pizza"
        }
    ],
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;