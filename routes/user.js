import express from 'express'
import User from "../models/user";
import bcrypt from 'bcryptjs'
import _ from 'underscore'
import { verifyAuth, verifyAdmin } from '../middlewares/auth'

const router = express.Router();
const saltRounds = 10;

router.post('/user/new',(req, res) => {
  const body = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role
  }

  body.password = bcrypt.hashSync(req.body.password, saltRounds)

  User.create(body)
    .then(user => {
      res.status(200).json(user);
    })
    .catch (error => {
      return res.status(500).json({
        message: 'Ocurrió un error',
        error: error
      });
    })
});

router.get('/user/:id', (req, res) => {
  const id = req.params.id;

  User.findById(id)
    .then(user => {
      res.json(user);
    })
    .catch (error => {
      return res.status(400).json({
        message: 'Ocurrió un error',
        error: error
      });
    })
});

router.get('/users', (req, res) => {
  User.find()
    .then(users => {
      res.json(users);
    })
    .catch (error => {
      return res.status(400).json({
        message: 'Ocurrió un error',
        error: error
      });
    })
});

router.delete('/user/:id', (req, res) => {
  const id = req.params.id;

  User.findByIdAndDelete(id)
    .then(user => {
      res.json(user);
    })
    .catch (error => {
      return res.status(400).json({
        message: 'Ocurrió un error',
        error: error
      });
    })
});

router.put('/user/:id', [verifyAuth, verifyAdmin], (req, res) => {
  const id = req.params.id;
  const body = _.pick(req.body, ['name', 'email', 'password', 'active']);

  if (body.password) {
    body.password = bcrypt.hashSync(req.body.password, saltRounds)
  }

  User.findByIdAndUpdate(id, body, {new: true, runValidators: true})
    .then(user => {
      res.json(user);
    })
    .catch (error => {
      return res.status(400).json({
        message: 'Ocurrió un error',
        error: error
      });
    })
});

module.exports = router;


