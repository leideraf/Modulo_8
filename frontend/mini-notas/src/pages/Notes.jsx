import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";

import Header from "../components/Header";
import Footer from "../components/Footer";
import FilterBar from "../components/FilterBar";
import NoteForm from "../components/NoteForm";
import NoteCard from "../components/NoteCard";

const Notes = () => {
  const navigate = useNavigate();

  // ===============================
  // STATE
  // ===============================
  const [notes, setNotes] = useState([]);
  const [filter, setFilter] = useState("Todas");
  const [editingNote, setEditingNote] = useState(null);
  const [loading, setLoading] = useState(true);

  // ===============================
  // OBTENER NOTAS DESDE API
  // ===============================
  const fetchNotes = async () => {
    try {
      const response = await axiosClient.get("/notes");
      setNotes(response.data);
    } catch (error) {
      console.error("Error al obtener notas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // ===============================
  // CREAR NOTA (POST)
  // ===============================
  const addNote = async (data) => {
    try {
      const newNote = {
        ...data,
        date: new Date().toLocaleDateString(),
      };

      const response = await axiosClient.post("/notes", newNote);

      setNotes((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Error al crear nota:", error);
    }
  };

  // ===============================
  // ACTUALIZAR NOTA (PUT)
  // ===============================
  const updateNote = async (updatedNote) => {
    try {
      await axiosClient.put(`/notes/${updatedNote.id}`, updatedNote);

      setNotes((prev) =>
        prev.map((n) => (n.id === updatedNote.id ? updatedNote : n))
      );

      setEditingNote(null);
    } catch (error) {
      console.error("Error al actualizar nota:", error);
    }
  };

  // ===============================
  // ELIMINAR NOTA (DELETE)
  // ===============================
  const deleteNote = async (id) => {
    try {
      await axiosClient.delete(`/notes/${id}`);

      setNotes((prev) => prev.filter((n) => n.id !== id));
    } catch (error) {
      console.error("Error al eliminar nota:", error);
    }
  };

  // ===============================
  // LOGOUT
  // ===============================
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // ===============================
  // FILTRADO
  // ===============================
  const filteredNotes =
    filter === "Todas"
      ? notes
      : notes.filter((n) => n.category === filter);

  // ===============================
  // CONTADOR POR CATEGORÍA
  // ===============================
  const categoryCounts = notes.reduce(
    (acc, note) => {
      acc[note.category] = (acc[note.category] || 0) + 1;
      acc.Todas += 1;
      return acc;
    },
    { Todas: 0 }
  );

  // ===============================
  // RENDER
  // ===============================
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-100 to-blue-50">
      <Header onLogout={logout} />

      <main className="flex-1 p-6 max-w-6xl mx-auto w-full">
        <FilterBar
          value={filter}
          onChange={setFilter}
          counts={categoryCounts}
        />

        <NoteForm
          onAdd={addNote}
          onUpdate={updateNote}
          editingNote={editingNote}
          onCancelEdit={() => setEditingNote(null)}
        />

        {loading ? (
          <p className="text-center text-gray-500 mt-12">Cargando notas...</p>
        ) : filteredNotes.length === 0 ? (
          <p className="text-center text-gray-500 mt-12">
            No hay notas para esta categoría 📭
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
            {filteredNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onDelete={deleteNote}
                onEdit={() => setEditingNote(note)}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Notes;



