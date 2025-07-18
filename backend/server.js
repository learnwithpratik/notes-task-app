//importing the modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

//telling the browser that now, for the purpose we are using the modules
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/notesDB');

// Note schema
const Note = mongoose.model('Note', {
  text: String
});

// Create a new note
app.post('/notes', async (req, res) => {
  const newNote = new Note({ text: req.body.text });
  await newNote.save();
  res.send(newNote);
});

// Read all notes
app.get('/notes', async (req, res) => {
  const notes = await Note.find();
  res.send(notes);
});

// Update a note
app.put('/notes/:id', async (req, res) => {
  const updated = await Note.findByIdAndUpdate(req.params.id, { text: req.body.text }, { new: true });
  res.send(updated);
});

// Delete a note
app.delete('/notes/:id', async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.send({ message: 'Note deleted' });
});

app.listen(5000, () => console.log('Server started on http://localhost:5000'));