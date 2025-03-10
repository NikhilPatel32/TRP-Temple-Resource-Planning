const roleMiddleware = (requiredRole) => {
    return (req, res, next) => {
       
        if (!req.userInfo || req.userInfo.role !== requiredRole) {
            return res.status(403).json({
                success: false,
                message: 'Access denied',
            });
        }
        next();
    };
};

module.exports = roleMiddleware;