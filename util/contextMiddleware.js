const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../config/env.json");

module.exports = (context) => {
  // Check for auth header:
  if (context.req && context.req.headers.authorization) {
    // Remove 'Bearer ' from header:
    const token = context.req.headers.authorization.split("Bearer ")[1];
    jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
      // Check for errors:
      if (err) {
        // throw new AuthenticationError("Unauthenticated.");
      }

      context.user = decodedToken;
    });
  }

  return context;
};
