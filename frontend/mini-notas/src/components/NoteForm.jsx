import { useState } from "react";

const categories = ["Personal", "Trabajo", "Ideas", "Recordatorios"];

const emptyForm = {
  title: "",
  content: "",
  category: "Personal",
};

const NoteForm = ({ onAdd, onUpdate, editingNote, onCancelEdit }) => {
  const [form, setForm] = useState(editingNote ?? emptyForm);

  // 🔁 Si cambia la nota a editar, sincronizamos manualmente
  if (editingNote && form.id !== editingNote.id) {
    setForm(editingNote);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.content) return;

    if (editingNote) {
      onUpdate(form);
    } else {
      onAdd(form);
    }

    setForm(emptyForm);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/90 backdrop-blur p-6 rounded-xl shadow-lg space-y-4"
    >
      <h2 className="text-lg font-semibold text-gray-800">
        {editingNote ? "✏️ Editar nota" : "➕ Nueva nota"}
      </h2>

      <input
        className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400"
        placeholder="Título"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <textarea
        className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400"
        placeholder="Contenido"
        rows={4}
        value={form.content}
        onChange={(e) => setForm({ ...form, content: e.target.value })}
      />

      <div className="flex flex-col md:flex-row gap-3 items-center">
        <select
          className="border px-4 py-2 rounded-lg"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
          {editingNote ? "Guardar cambios" : "Agregar nota"}
        </button>

        {editingNote && (
          <button
            type="button"
            onClick={() => {
              setForm(emptyForm);
              onCancelEdit();
            }}
            className="text-gray-500 hover:underline"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default NoteForm;



