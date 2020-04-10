import express from 'express'
import Note from "../models/note"
import { verifyAuth } from '../middlewares/auth'

const router = express.Router();

router.post('/note/new', verifyAuth, (req, res) => {
  const body = req.body;

  body.userId = req.user._id

  Note.create(body)
    .then(note => {
      res.status(200).json(note);
    })
    .catch (error => {
      return res.status(500).json({
        message: 'Ocurrió un error',
        error: error
      });
    })
});

router.get('/note/:id', (req, res) => {
  const id = req.params.id;

  Note.findById(id)
    .then(note => {
      res.json(note);
    })
    .catch (error => {
      return res.status(400).json({
        message: 'Ocurrió un error',
        error: error
      });
    })
});

// router.get('/notes', verifyAuth, (req, res) => {
//
//   const userId = req.user._id;
//
//   Note.find({userId})
//     .then(notes => {
//       res.json(notes);
//     })
//     .catch (error => {
//       return res.status(400).json({
//         message: 'Ocurrió un error',
//         error: error
//       });
//     })
// });

router.get('/notes', verifyAuth, (req, res) => {

  const userId = req.user._id;
  const limit = Number(req.query.limit) || 0;
  const offset = Number(req.query.offset) || 0;

  Note.find({userId}).limit(limit).skip(offset)
    .then(notes => {
      Note.find({userId}).countDocuments()
        .then(totalNotes => {
          res.json({
            notes,
            totalNotes
          });
        })

    })
    .catch (error => {
      return res.status(400).json({
        message: 'Ocurrió un error',
        error: error
      });
    })
});

router.delete('/note/:id', (req, res) => {
  const id = req.params.id;

  Note.findByIdAndDelete(id)
    .then(note => {
      res.json(note);
    })
    .catch (error => {
      return res.status(400).json({
        message: 'Ocurrió un error',
        error: error
      });
    })
});

router.put('/note/:id', (req, res) => {
  const id = req.params.id;
  const body = req.body;

  Note.findByIdAndUpdate(id, body, {new: true})
    .then(note => {
      res.json(note);
    })
    .catch (error => {
      return res.status(400).json({
        message: 'Ocurrió un error',
        error: error
      });
    })
});

module.exports = router;


