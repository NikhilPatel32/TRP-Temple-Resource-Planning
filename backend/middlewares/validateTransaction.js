const { body, validationResult } = require('express-validator');

const validateTransaction = [
    body('name').notEmpty().withMessage('Name is required'),
    body('amount').isNumeric().withMessage('Amount must be a number'),
    body('category').notEmpty().withMessage('Category is required'),
    body('account').notEmpty().withMessage('Account is required'),
    body('costCentre').notEmpty().withMessage('Cost Centre is required'),

    // Middleware function to handle errors
    (req, res, next) => {
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array(),
            });
        }
        
        next(); 
    }
];

module.exports = validateTransaction;
