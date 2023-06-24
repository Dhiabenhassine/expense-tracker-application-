const { addIncome, getIncome, deleteIncome } = require('../controller/income');
const { addExpense, getExpense, deleteExpense } = require('../controller/expense');
const router = require('express').Router();

router.post('/addIncome', addIncome);
router.get('/getIncome', getIncome);
router.delete('/deleteIncome/:id', deleteIncome);

router.post('/addExpense', addExpense);
router.get('/getExpense', getExpense);
router.delete('/deleteExpense/:id', deleteExpense);

module.exports = router;
