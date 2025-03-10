
const express = require('express');
const validateTransaction = require('../middlewares/validateTransaction');
const { body } = require('express-validator'); 
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();
const {
    getAllTransactions,
    getSingleTransaction,
    addNewTransaction,
    getStatistics,
    deleteTransaction,
    updateTransaction
} = require('../controllers/transactionControllers');

//all routes for transaction

router.get('/get' , authMiddleware , roleMiddleware('admin') , getAllTransactions);
router.get('/get/:id' , authMiddleware , roleMiddleware('admin') , getSingleTransaction)
router.post('/add' ,
    [
        body('name').trim().notEmpty().withMessage('Name is required'),
        body('amount')
            .isFloat({ gt: 0 })
            .withMessage('Amount must be a positive number')
            .toFloat(),
        body('category').trim().notEmpty().withMessage('Category is required').toLowerCase(),
        body('account').trim().notEmpty().withMessage('Account is required'),
    ],
     authMiddleware ,  roleMiddleware('admin') ,validateTransaction , addNewTransaction);
router.get('/statistics' , authMiddleware , roleMiddleware('admin') , getStatistics);
router.delete('/delete/:id' , authMiddleware , roleMiddleware('admin') , deleteTransaction);
router.put('/update/:id' ,
    [
        body('name').optional().trim(),
        body('amount').optional().isFloat({ gt: 0 }).toFloat(),
        body('category').optional().trim().toLowerCase(),
        body('account').optional().trim(),
    ],
    authMiddleware ,  roleMiddleware('admin') , updateTransaction);

module.exports = router;
