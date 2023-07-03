const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1] || "";
    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.verifiedUser = verified.user;
        next();
    } catch (error) {
        console.log(error)
        next();
    }
};


const getUserFromJWT = (req) => {
    const token = req.headers.authorization?.split(" ")[1] || "";
    if (token) {
        try {
            const verified = jwt.verify(token, JWT_SECRET);
            return verified.user;
        } catch (error) {
            console.log(error)
        }
    }
    return null
};


module.exports = {
    authenticate,
    getUserFromJWT,
};