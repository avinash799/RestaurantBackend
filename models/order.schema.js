import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    foods: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Food'
        }
    ],
    payment: {
        // type: Map, // assuming payment details are stored as key-value pairs
        // of: String, // adjust to appropriate types for payment details if needed
    },
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['preparing', 'prepare', 'on the way', 'delivered'],
        default: 'preparing' // setting 'process' as the default status
    }
}, { timestamps: true }); // corrected option name to 'timestamps'

const Order = mongoose.model('Order', orderSchema);

export default Order;
