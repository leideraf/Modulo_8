import { useState, useEffect } from 'react';
import { noteAPI } from '../api/api.js';

const CATEGORIES = ['Personal', 'Trabajo', 'Ideas', 'Recordatorios'];

const useNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar notas desde la API
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        setError(null);

        // Por ahora, simularemos con datos locales
        // Cuando tengas la API lista, descomenta las líneas con noteAPI
        const mockNotes = [
          {
            id: 1,
            titulo: 'Comprar groceries',
            contenido: 'Leche, pan, huevos',
            categoria: 'Personal',
            fechaCreacion: new Date().toISOString()
          },
          {
            id: 2,
            titulo: 'Proyecto React',
            contenido: 'Implementar CRUD de notas',
            categoria: 'Trabajo',
            fechaCreacion: new Date().toISOString()
          }
        ];

        // const data = await noteAPI.getNotes();
        setNotes(mockNotes);
      } catch (err) {
        console.error('Error cargando notas:', err);
        setError(err.message);
        setNotes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  // Crear una nueva nota
  const createNote = async (noteData) => {
    try {
      setError(null);
      // const newNote = await noteAPI.createNote(noteData);
      const newNote = {
        id: Date.now(),
        ...noteData,
        fechaCreacion: new Date().toISOString()
      };
      setNotes([newNote, ...notes]);
      return newNote;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Actualizar una nota
  const updateNote = async (noteId, updatedData) => {
    try {
      setError(null);
      // await noteAPI.updateNote(noteId, updatedData);
      setNotes(notes.map(note =>
        note.id === noteId ? { ...note, ...updatedData } : note
      ));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Eliminar una nota
  const deleteNote = async (noteId) => {
    try {
      setError(null);
      // await noteAPI.deleteNote(noteId);
      setNotes(notes.filter(note => note.id !== noteId));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Filtrar notas por categoría
  const getNotesByCategory = (category) => {
    if (category === 'Todas') return notes;
    return notes.filter(note => note.categoria === category);
  };

  return {
    notes,
    loading,
    error,
    createNote,
    updateNote,
    deleteNote,
    getNotesByCategory,
    CATEGORIES
  };
};

export default useNotes;