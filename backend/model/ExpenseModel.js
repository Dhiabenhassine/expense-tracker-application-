const { conn } = require('../db/db');

const ExpenseSchema = new conn.Schema({
  title: {
    type: String,
  },
  amount: {
    type: Number,
  },
  category: {
    type: String,
  },
  description: {
    type: String,
  },
  date: {
    type: String,
  },
});

const ExpenseModel = conn.model('Expense', ExpenseSchema);

module.exports = ExpenseModel;
