const IncomeModel = require("../model/incomeModel");
const ExpenseModel = require("../model/expenseModel");

module.exports.getBalance = async (req, res) => {
  try {
    const incomes = await IncomeModel.find();
    const expenses = await ExpenseModel.find();
    let totalIncomes = 0;
    let totalExpenses = 0;
    incomes.map((income) => (totalIncomes += income.amount));
    expenses.map((expense) => (totalExpenses += expense.amount));
    res.status(200).send({ balance: totalIncomes - totalExpenses });
  } catch (error) {
    console.log(error.message);
    res.status(500).json("can't get balance");
  }
};
