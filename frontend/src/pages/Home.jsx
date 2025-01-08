import { useEffect, useState } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 200) alert("Note deleted successfully");
        else alert("Failed to deleting note");
      })
      .catch((error) => alert(error));
    getNotes;
  };

  const createNote = (e) => {
    e.preventDefault();
    api
      .post("/api/notes/", { content, title })
      .then((res) => {
        if (res.status === 201) alert("Note created successfully");
        else alert("Failed to create note");
      })
      .catch((error) => alert(error));
    getNotes();
  };

  return (
    <div className="flex flex-wrap justify-center">
      <div>
        <h2>Notes</h2>
        {notes.map((note) => (
          <Note note={note} onDelete={deleteNote} key={note.id} />
        ))}
      </div>
      <h2>Create a Note</h2>
      <form onSubmit={createNote}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          value={content}
          required
          onChange={(e) => setContent(e.target.value)}
        />
        <br />
        <input type="submit" value="Create Note" />
      </form>
    </div>
  );
}
