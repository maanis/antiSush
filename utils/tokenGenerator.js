const jwt = require('jsonwebtoken')

const tokenGenerator = (data) => {
    const token = jwt.sign({ email: data.email }, process.env.JWT_SECRET)
    return token
}


module.exports = tokenGenerator