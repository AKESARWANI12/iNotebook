// Import the 'jsonwebtoken' library
var jwt = require('jsonwebtoken');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

const JWT_SECRET = process.env.JWT_SECRET || 'Gadha hai kya aishe sikhoge secret key generate karna';
// Middleware function to fetch and verify user from JWT token
const fetchuser = (req, res, next) => {
 
  // Get the user token from the request headers
  const tokendata = req.header('authtoken');

  // If no token is present, send a 401 Unauthorized response
  if (!tokendata) {
    return res.status(401).send({ error: "Please authenticate using a valid token" });
  }

  try {
    // Verify the token using the JWT_SECRET
    const data = jwt.verify(tokendata, JWT_SECRET);

    // Add the decoded user information to the request object
    req.user = data.user;
  
    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    // If the token is invalid, send a 401 Unauthorized response
    res.status(401).send({ error: "Invalid token" });
  }
};

// Export the middleware function for use in other parts of the application
module.exports = fetchuser;
