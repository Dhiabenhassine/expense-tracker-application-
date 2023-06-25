const { conn } = require("../db/db");

const IncomeSchema = new conn.Schema({
  title: {
    type: String,
  },
  amount: {
    type: Number,
  },
  date: {
    type: String,
  },
  category: {
    type: String,
  },
  description: {
    type: String,
  },
});

const IncomeModel = conn.model("income", IncomeSchema);

module.exports = IncomeModel;
