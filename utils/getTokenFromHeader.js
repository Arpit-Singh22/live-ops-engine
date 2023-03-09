const getTokenFromHeader = req => {
    const headerObj = req.headers

    const token = headerObj['authorization'].split(" ")[1]
    if (token !== undefined) {
        return token
    }
    return false
}

module.exports = getTokenFromHeader