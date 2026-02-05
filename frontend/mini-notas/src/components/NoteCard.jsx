import React from 'react';

const NoteCard = ({ note, onEdit, onDelete, categoryColors }) => {
  // Formatear fecha
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  const borderColor = categoryColors[note.categoria] || 'border-gray-300';
  const badgeColor = categoryColors[note.categoria] || 'bg-gray-100 text-gray-800';

  return (
    <div
      className={`bg-white rounded-lg shadow-md p-5 mb-4 border-l-4 ${borderColor} hover:shadow-lg transition-shadow duration-300`}
    >
      {/* Encabezado: Título y Categoría */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900 flex-1 pr-4 break-words">
          {note.titulo}
        </h3>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${badgeColor}`}
        >
          {note.categoria}
        </span>
      </div>

      {/* Contenido */}
      <p className="text-gray-700 text-sm mb-4 line-clamp-3">{note.contenido}</p>

      {/* Fecha */}
      <p className="text-xs text-gray-500 mb-4">{formatDate(note.fechaCreacion)}</p>

      {/* Acciones */}
      <div className="flex gap-2 justify-end">
        <button
          onClick={() => onEdit(note)}
          className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
          title="Editar nota"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(note.id)}
          className="px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-300"
          title="Eliminar nota"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default NoteCard;