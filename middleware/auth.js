const jwt = require("jsonwebtoken");
const SECRET_KEY = 'NOT_SO_SECRET_KEY'



const auth = (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: "Not authorized User" })
        }
        token = token.split(" ")[1];
        let user = jwt.verify(token,SECRET_KEY);
        req.userId = user.id;
        next();
    } catch (error) {
        console.log(error)
    }
}

module.exports = auth;