
const jwt = require('jsonwebtoken');

const authMiddleware = (req , res , next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if(!token){
        return res.status(401).json({
            success : false,
            message : "login to continue"
        })
    }

     //decode this token
     try{
        const decodedUserInfo = jwt.verify(token , process.env.JWT_SECRET_KEY);
    
        //store user information in req
        req.userInfo = decodedUserInfo;
        next();
        }catch(error){
            console.log(error);
            return res.status(501).json({
                success : false,
                message : "error in fetching details"
            }) 
        }
}

module.exports = authMiddleware;