import express from 'express'
import Note from "../models/note";

const router = express.Router();

router.post('/note/new',(req, res) => {
  const body = req.body;
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

router.get('/notes', (req, res) => {
  Note.find()
    .then(notes => {
      res.json(notes);
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


