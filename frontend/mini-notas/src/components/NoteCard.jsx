const colors = {
  Personal: "border-blue-500 bg-blue-50",
  Trabajo: "border-green-500 bg-green-50",
  Ideas: "border-yellow-500 bg-yellow-50",
  Recordatorios: "border-red-500 bg-red-50",
};

const NoteCard = ({ note, onDelete, onEdit }) => {
  return (
    <div
      className={`p-5 rounded-xl shadow-md border-l-4 transition hover:shadow-lg ${colors[note.category]}`}
    >
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-lg text-gray-800">{note.title}</h3>
        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-white">
          {note.category}
        </span>
      </div>

      <p className="text-xs text-gray-500 mt-1">{note.date}</p>

      <p className="mt-3 text-gray-700">{note.content}</p>

      <div className="flex gap-4 mt-4 text-sm">
        <button
          onClick={onEdit}
          className="text-blue-600 hover:underline"
        >
          ✏️ Editar
        </button>

        <button
          onClick={() => onDelete(note.id)}
          className="text-red-600 hover:underline"
        >
          🗑 Eliminar
        </button>
      </div>
    </div>
  );
};

export default NoteCard;

