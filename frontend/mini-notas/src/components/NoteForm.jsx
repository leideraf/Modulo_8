import React, { useEffect } from 'react';
import useNoteFormValidation from '../hooks/useNoteFormValidation.js';

const NoteForm = ({ onSubmit, onCancel, initialNote = null, categories }) => {
  const { values, getFieldProps, validateAll, reset, setIsSubmitting } =
    useNoteFormValidation(
      initialNote || {
        titulo: '',
        contenido: '',
        categoria: ''
      }
    );

  const tituloProps = getFieldProps('titulo');
  const contenidoProps = getFieldProps('contenido');
  const categoriaProps = getFieldProps('categoria');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateAll()) {
      setIsSubmitting(true);
      try {
        await onSubmit(values);
        reset();
      } catch (error) {
        console.error('Error al guardar nota:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {initialNote ? 'Editar Nota' : 'Crear Nueva Nota'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Campo Título */}
        <div>
          <label htmlFor="titulo" className="block text-sm font-semibold text-gray-700 mb-2">
            Título
          </label>
          <input
            id="titulo"
            type="text"
            placeholder="Ej: Mi nueva tarea importante"
            {...tituloProps}
          />
          {tituloProps.hasError && (
            <p className="mt-2 text-sm text-red-600 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {tituloProps.error}
            </p>
          )}
          {tituloProps.isValid && (
            <p className="mt-2 text-sm text-green-600 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Título válido
            </p>
          )}
        </div>

        {/* Campo Contenido */}
        <div>
          <label htmlFor="contenido" className="block text-sm font-semibold text-gray-700 mb-2">
            Contenido
          </label>
          <textarea
            id="contenido"
            placeholder="Escribe los detalles de tu nota..."
            rows="5"
            {...contenidoProps}
            className={contenidoProps.className.replace('px-4 py-2', 'px-4 py-3')}
          />
          <p className="mt-1 text-xs text-gray-500">
            {values.contenido.length}/500 caracteres
          </p>
          {contenidoProps.hasError && (
            <p className="mt-2 text-sm text-red-600 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {contenidoProps.error}
            </p>
          )}
          {contenidoProps.isValid && (
            <p className="mt-2 text-sm text-green-600 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Contenido válido
            </p>
          )}
        </div>

        {/* Campo Categoría */}
        <div>
          <label htmlFor="categoria" className="block text-sm font-semibold text-gray-700 mb-2">
            Categoría
          </label>
          <select
            id="categoria"
            {...categoriaProps}
            className={categoriaProps.className}
          >
            <option value="">Selecciona una categoría</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {categoriaProps.hasError && (
            <p className="mt-2 text-sm text-red-600 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {categoriaProps.error}
            </p>
          )}
          {categoriaProps.isValid && (
            <p className="mt-2 text-sm text-green-600 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Categoría seleccionada
            </p>
          )}
        </div>

        {/* Botones */}
        <div className="flex gap-3 justify-end pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-300"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {initialNote ? 'Actualizar Nota' : 'Crear Nota'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoteForm;