import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

function App() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState('');
  const [editId, setEditId] = useState(null);

  // Get all notes
  useEffect(() => {
    axios.get('http://localhost:5000/notes').then(res => setNotes(res.data));
  }, []);

  // Add or Update note
  const saveNote = () => {
    if (editId) {
      axios.put(`http://localhost:5000/notes/${editId}`, { text }).then(res => {
        setNotes(notes.map(n => n._id === editId ? res.data : n));
        setEditId(null); setText('');
      });
    } else {
      axios.post('http://localhost:5000/notes', { text }).then(res => {
        setNotes([...notes, res.data]);
        setText('');
      });
    }
  };

  // Delete note
  const deleteNote = id => {
    axios.delete(`http://localhost:5000/notes/${id}`).then(() => {
      setNotes(notes.filter(n => n._id !== id));
    });
  };

  // Edit note
  const editNote = note => {
    setEditId(note._id);
    setText(note.text);
  };

  return (
    <div className='app-container'>
      <h2>📝 Notes</h2>
      <div className='input-area'>
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Type your note"

        />
      <button onClick={saveNote}>{editId ? 'Update' : 'Add'}</button>
      </div>

      <ul className='note-list'>
        {notes.map(note => (
          <li key={note._id} className='note-item'>
           <span> {note.text} </span>
            <button onClick={() => editNote(note)}>✔️</button>
            <button onClick={() => deleteNote(note._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
