const {
  addIncome,
  getIncome,
  deleteIncome,
  updateIncome,
} = require("../controller/income");
const {
  addExpense,
  getExpense,
  deleteExpense,
  updateExpense,
} = require("../controller/expense");
const { getBalance } = require("../controller/balance");
const router = require("express").Router();

router.post("/addIncome", addIncome);
router.get("/getIncome", getIncome);
router.delete("/deleteIncome/:id", deleteIncome);
router.put("/updateIncome", updateIncome);

router.post("/addExpense", addExpense);
router.get("/getExpense", getExpense);
router.delete("/deleteExpense/:id", deleteExpense);
router.put("/updateExpense/:id", updateExpense);

router.get("/balance", getBalance);
module.exports = router;
