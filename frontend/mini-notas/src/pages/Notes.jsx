import React, { useState, useMemo } from 'react';
import NoteForm from '../components/NoteForm.jsx';
import NoteCard from '../components/NoteCard.jsx';
import FilterBar from '../components/FilterBar.jsx';
import useNotes from '../hooks/useNotes.js';

// Colores por categoría
const CATEGORY_COLORS = {
  Personal: 'border-blue-500 bg-blue-100 text-blue-800',
  Trabajo: 'border-green-500 bg-green-100 text-green-800',
  Ideas: 'border-yellow-500 bg-yellow-100 text-yellow-800',
  Recordatorios: 'border-red-500 bg-red-100 text-red-800'
};

const Notes = () => {
  const { notes, loading, error, createNote, updateNote, deleteNote, getNotesByCategory, CATEGORIES } =
    useNotes();
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [showForm, setShowForm] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [submitError, setSubmitError] = useState(null);

  // Filtrar notas por categoría
  const filteredNotes = useMemo(() => {
    return getNotesByCategory(selectedCategory);
  }, [notes, selectedCategory]);

  // Contar notas por categoría
  const notesByCategory = useMemo(() => {
    const counts = { Todas: notes.length };
    CATEGORIES.forEach((category) => {
      counts[category] = notes.filter((note) => note.categoria === category).length;
    });
    return counts;
  }, [notes]);

  // Manejar creación de nota
  const handleCreateNote = async (formData) => {
    try {
      setSubmitError(null);
      await createNote(formData);
      setShowForm(false);
    } catch (err) {
      setSubmitError(err.message);
    }
  };

  // Manejar edición de nota
  const handleEditNote = (note) => {
    setEditingNote(note);
    setShowForm(true);
  };

  // Manejar actualización de nota
  const handleUpdateNote = async (formData) => {
    try {
      setSubmitError(null);
      await updateNote(editingNote.id, formData);
      setEditingNote(null);
      setShowForm(false);
    } catch (err) {
      setSubmitError(err.message);
    }
  };

  // Manejar eliminación de nota
  const handleDeleteNote = async (noteId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta nota?')) {
      try {
        setSubmitError(null);
        await deleteNote(noteId);
      } catch (err) {
        setSubmitError(err.message);
      }
    }
  };

  // Manejar cierre del formulario
  const handleCancelForm = () => {
    setShowForm(false);
    setEditingNote(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Cargando notas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Encabezado */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Mis Notas Personales</h1>
          <p className="text-gray-600">Organiza tus notas por categoría</p>
        </div>

        {/* Mensaje de error general */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <p className="text-red-800 font-medium">Error: {error}</p>
          </div>
        )}

        {/* Mensaje de error en operación */}
        {submitError && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <p className="text-red-800 font-medium">Error: {submitError}</p>
          </div>
        )}

        {/* Estadísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <div className="text-3xl font-bold text-blue-600">{notes.length}</div>
            <p className="text-gray-600 text-sm mt-2">Notas totales</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <div className="text-3xl font-bold text-green-600">
              {CATEGORIES.length}
            </div>
            <p className="text-gray-600 text-sm mt-2">Categorías</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <div className="text-3xl font-bold text-purple-600">
              {selectedCategory === 'Todas' ? notes.length : filteredNotes.length}
            </div>
            <p className="text-gray-600 text-sm mt-2">
              {selectedCategory === 'Todas' ? 'Todas' : selectedCategory}
            </p>
          </div>
        </div>

        {/* Botón para crear nota */}
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="mb-6 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300 shadow-md"
          >
            + Nueva Nota
          </button>
        )}

        {/* Formulario de creación/edición */}
        {showForm && (
          <NoteForm
            onSubmit={editingNote ? handleUpdateNote : handleCreateNote}
            onCancel={handleCancelForm}
            initialNote={editingNote}
            categories={CATEGORIES}
          />
        )}

        {/* Filtro de categorías */}
        {notes.length > 0 && (
          <FilterBar
            categories={CATEGORIES}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            notesByCategory={notesByCategory}
          />
        )}

        {/* Lista de notas */}
        <div>
          {filteredNotes.length === 0 ? (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <p className="mt-4 text-gray-500">
                {notes.length === 0
                  ? 'No tienes notas aún. ¡Crea tu primera nota!'
                  : `No hay notas en la categoría "${selectedCategory}"`}
              </p>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {selectedCategory === 'Todas' ? 'Todas las notas' : `Notas - ${selectedCategory}`}
              </h2>
              {filteredNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onEdit={handleEditNote}
                  onDelete={handleDeleteNote}
                  categoryColors={CATEGORY_COLORS}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notes;