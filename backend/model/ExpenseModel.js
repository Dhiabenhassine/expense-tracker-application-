const {conn} = require('../db/db');

const ExpenseSchema = new conn.Schema({
    title: {
        type: String,
    },
    amount: {
        type: Number,
    },
    type: {
        type: String,
    },
    date: {
        type: Date,
    },
    category: {
        type: String,
    },
    description: {
        type: String,
    },
})
conn.model('expense',ExpenseSchema)
module.exports = ExpenseSchema