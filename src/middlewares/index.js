const { expressjwt: jwt } = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const { JWKSURI, AUDIENCE, ISSUER } = require("../config/server-config");

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: JWKSURI,
  }),
  audience: AUDIENCE,
  issuer: ISSUER,
  algorithms: ["RS256"],
});



module.exports = checkJwt