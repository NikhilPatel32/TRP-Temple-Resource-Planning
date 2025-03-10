const { body, validationResult } = require('express-validator');
const Transaction = require('../models/Transaction');

const getAllTransactions = async (req, res , next) => {
    try {
        // Extract filters from query parameters
        const { startDate, endDate, category, account } = req.query;

        // Create a filter object for MongoDB
        let filter = {};

        // Apply date range filter
        if (startDate || endDate) {
            filter.date = {};
            if (startDate) filter.date.$gte = new Date(startDate);
            if (endDate) filter.date.$lte = new Date(endDate);
        }

        // Apply category filter (only if provided)
        if (category) {
            filter.category = category;
        }

        // Apply account filter (only if provided)
        if (account) {
            filter.account = account;
        }

        // Fetch transactions based on filters
        const transactions = await Transaction.find(filter);

        if (!transactions.length) {
            return res.status(404).json({
                success: false,
                message: "No transactions found for the given filters",
            });
        }

        res.status(200).json({
            success: true,
            message: "Transactions fetched successfully",
            transactions,
        });

    } catch (error) {
        next(error);
        }
};

const getSingleTransaction = async(req , res , next) => {

    try{
       const currentId = req.params.id;

       console.log("id:" , currentId); //debug

       const data = await Transaction.findById(currentId);

       if(!data){
        return res.status(501).json({
            success : false,
            message : 'No transaction found',
        })
       }

       res.status(200).json({
        success : true,
        message : "transaction fetched successfully",
        data : data,
       })

    }catch(error){
        next(error);
    }
}
const addNewTransaction = async(req , res , next) => {
    try{

        //get data from user
        const { date, name, amount, category, account, costCentre } = req.body;

        //store in database
        const newTransaction = await Transaction.create({
            date : date ? new Date(date) : new Date(),
            name,
            amount,
            category,
            account,
            costCentre
        })

        if(!newTransaction){
            return res.status(500).json({
                success : false,
                message : 'unable to store transcation. Please try again'
            })
        }

        res.status(201).json({
            success : true,
            message : 'transaction stored successfully.'
        })

    }catch(error){
        next(error);
    }
}

const getStatistics = async (req, res , next) => {
    try {
        const transactions = await Transaction.find({});

        if (transactions.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No transactions found',
            });
        }

        // Calculate total amount spent
        const totalAmount = transactions.reduce((sum, txn) => sum + parseFloat(txn.amount || 0), 0);

        // Calculate category-wise spending
        const categoryStats = {};
        transactions.forEach(txn => {
            if (!categoryStats[txn.category]) {
                categoryStats[txn.category] = 0;
            }
            categoryStats[txn.category] += parseFloat(txn.amount || 0);
        });

        // Calculate account-wise spending
        const accountStats = {};
        transactions.forEach(txn => {
            if (!accountStats[txn.account]) {
                accountStats[txn.account] = 0;
            }
            accountStats[txn.account] += parseFloat(txn.amount || 0);
        });

        //month-wise expense
        const monthlyStats = {};
        transactions.forEach(txn => {
            const month = new Date(txn.date).toLocaleString('default', { month: 'long', year: 'numeric' });
            if (!monthlyStats[month]) {
                monthlyStats[month] = 0;
            }
            monthlyStats[month] += parseFloat(txn.amount || 0);
        });

        //cost centre-wise statistics

        const costCentreStats = {};
        transactions.forEach(txn => {
            if (!costCentreStats[txn.costCentre]) {
                costCentreStats[txn.costCentre] = 0;
            }
            costCentreStats[txn.costCentre] += parseFloat(txn.amount || 0);
        });


        return res.status(200).json({
            success: true,
            message: 'Statistics fetched successfully',
            totalTransactions: transactions.length,
            totalAmount,
            monthlyStats,
            categoryStats,
            accountStats,
            costCentreStats
        });

    } catch (error) {
        next(error);
    }
};

const deleteTransaction = async(req , res , next) => {
try{

    const currentId = req.params.id;

    const deletedTransaction = await Transaction.findByIdAndDelete(currentId);
 
    if(!deletedTransaction){
        return res.status(404).json({
            success : false,
            message : 'failed to delete. Transaction not found'
        })
    }
   
    res.status(200).json({
        success : true,
        message : 'Transaction deleted successfully'
    })

}catch(error){
    next(error);
}
}

const updateTransaction = async (req, res , next) => {
    try {

        const currentId = req.params.id;
        const updatedData = req.body;

        // Ensure at least one field is provided for update
        if (Object.keys(updatedData).length === 0) {
            return res.status(400).json({
                success: false,
                message: "No update data provided",
            });
        }

        const updatedTransaction = await Transaction.findByIdAndUpdate(
            currentId,
            { $set: updatedData }, // Using `$set` to update only provided fields
            { new: true, runValidators: true }
        );

        if (!updatedTransaction) {
            return res.status(404).json({
                success: false,
                message: "Failed to update. Transaction not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Transaction updated successfully",
            transaction: updatedTransaction, // Return updated transaction
        });

    } catch (error) {
        next(error);
    }
};

module.exports = { 
    getAllTransactions ,
    getSingleTransaction,
     addNewTransaction ,
      getStatistics , 
      deleteTransaction , 
      updateTransaction 
    };
