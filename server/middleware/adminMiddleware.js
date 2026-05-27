const adminMiddleware = (req, res, next) => {

  try {

    if (req.user.role !== 'admin' && req.user.role!=="employee") {

      return res.status(403).json({

        message: 'Access denied. Admin only.',

      });

    }

    next();

  } catch (error) {

    console.log(error.message);

    res.status(500).json({

      message: 'Server Error',

    });

  }

};

module.exports = adminMiddleware;