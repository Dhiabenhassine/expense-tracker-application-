const ExpenseModel = require("../model/expenseModel");

module.exports.addExpense = async (req, res) => {
  const { title, amount, category, description, date } = req.body;

  const expense = new ExpenseModel({
    title,
    amount,
    category,
    description,
    date,
  });

  try {
    // Validations
    if (!title || !category || !description || !date) {
      return res.status(400).json("Please fill in the form");
    }
    if (amount <= 0) {
      return res.status(400).json("Amount must be a positive number");
    }
    await expense.save();
    res.status(200).json("Expense Added");
  } catch (error) {
    res.status(500).json("Server Error");
  }
  console.log(expense);
};

module.exports.getExpense = async (req, res) => {
  try {
    const expenses = await ExpenseModel.find();
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json("Server Error");
  }
};

module.exports.deleteExpense = async (req, res) => {
  const { id } = req.params;

  try {
    await ExpenseModel.deleteOne({ _id: id });
    res.status(200).json({ message: "Expense Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
