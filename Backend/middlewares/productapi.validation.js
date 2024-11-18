const jwt = require('jsonwebtoken');

const validate = (req,res,next) => {
    const auth = req.headers['authorization'];
    if(!auth){
        return res.status(500).json({message: 'token not here'})
    }
    try {
        const decode = jwt.verify(auth,process.env.JWT_SECRET_KEY);
        req.user = decode;
        next();
    } catch (error) {
        return  res.status(403).json({message: "jwt token wrong or expired"})
    }
}

module.exports = validate;