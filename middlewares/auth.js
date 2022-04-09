const User = require('../models/user');
const jwt = require('jsonwebtoken');


const Auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWTSECRET)
    
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token});
    
        if (!user){
            throw new Error('aqui');
        }

        req.user = user

        next();
    } catch (e) {
        console.log(e.message);
        res.status(401).send({ error: "Não foi possível autenticar!"});
    }
};


module.exports = Auth;