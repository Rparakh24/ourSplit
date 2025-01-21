const express = require('express');
const router = express.Router();
const userRouter = require('./userRouter');
const expenseRouter = require('./expenseRouter');
const groupRouter = require('./groupRouter');

router.use('/user',userRouter);
router.use('/expense',expenseRouter);
router.use('/group',groupRouter);


module.exports = router;