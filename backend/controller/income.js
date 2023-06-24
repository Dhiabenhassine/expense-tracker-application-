const IncomeModel = require('../model/incomeModel');

module.exports.addIncome = async (req, res) => {
  const { title, amount, category, description, date } = req.body;

  const income = new IncomeModel({
    title,
    amount,
    category,
    description,
    date,
  });

  try {
    // Validations
    if (!title || !category || !description || !date) {
      return res.status(400).json('Please fill in the form');
    }
    if (amount <= 0) {
      return res.status(400).json('Amount must be a positive number!');
    }

    await income.save();
    res.status(200).json('Income Added');
  } catch (error) {
    res.status(500).json('Server Error');
  }

  console.log(income);
};

module.exports.getIncome = async (req, res) => {
  try {
    const incomes = await IncomeModel.find();
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json('Server Error');
  }
};

module.exports.deleteIncome = async (req, res) => {
  const { id } = req.params;

  try {
    await IncomeModel.deleteOne({ _id: id });
    res.status(200).json({ message: 'Income Deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
