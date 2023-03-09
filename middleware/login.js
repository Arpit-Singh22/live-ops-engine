const getTokenFromHeader = require("../utils/getTokenFromHeader");
const verifyToken = require("../utils/verifyToken");

const login = (req, res, next) => {
    const token = getTokenFromHeader(req)

    const decodedToken = verifyToken(token)
    req.userAuth = decodedToken.id
    if (!decodedToken) {
        return res.json('invalid/expired token')
    }
    return next()
}

module.exports = login 