require("dotenv").config()
module.exports = {
    PORT: process.env.PORT,
    REDIS_HOST:  process.env.REDIS_HOST,
    REDIS_PASS: process.env.REDIS_PASS,
    REDIS_PORT: process.env.REDIS_PORT,
    JWKSURI: process.env.JWKSURI,
    ISSUER: process.env.ISSUER,
    AUDIENCE: process.env.AUDIENCE,
}