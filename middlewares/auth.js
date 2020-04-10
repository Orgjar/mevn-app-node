import jwt from 'jsonwebtoken'

const verifyAuth = (req, res, next) => {
  const token = req.get('token');

  jwt.verify(token, 'haddersito', (error, decoded) => {
    if (error) {
      return res.status(401).json({
        message: 'Usuario no válido',
        error
      });
    }

    req.user = decoded.data

    next();

  })
}

const verifyAdmin = (req, res, next) => {
  const role = req.user.role;

  if (role === 'ADMIN') {
    next()
  } else {
    return res.status(401).json({
      message: 'Usuario no válido'
    });
  }
}

module.exports = { verifyAuth, verifyAdmin }