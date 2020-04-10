import express from 'express'
import User from "../models/user";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const router = express.Router();

router.post('/',(req, res) => {
  const body = req.body
  User.findOne({email: body.email})
    .then(user => {
      if (!user) {
        return res.status(400).json({
          message: 'Email no encontrado',
        });
      }

      if (!bcrypt.compareSync(body.password, user.password)) {
        return res.status(400).json({
          message: 'Contraseña incorrecta',
        });
      }
      const token = jwt.sign({
        data: user
      }, 'haddersito', { expiresIn: 60 * 60 * 24 * 30 });
      res.json({user, token})
    })
    .catch (error => {
      return res.status(400).json({
        message: 'Ocurrió un error',
        error: error
      });
    })
});

module.exports = router;


