const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {

  try {

    const authHeader = req.headers.authorization;

    // Check token exists
    if (!authHeader) {

      return res.status(401).json({
        message: 'No token provided',
      });

    }

    // Remove "Bearer "
    const token = authHeader.split(' ')[1];

    // Verify JWT
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Store user data in request
    req.user = decoded;

    next();

  } catch (error) {

    console.log(error.message);

    res.status(401).json({
      message: 'Invalid token',
    });

  }

};

module.exports = authMiddleware;