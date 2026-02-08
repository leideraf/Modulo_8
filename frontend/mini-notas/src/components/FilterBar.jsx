const categories = [
  { name: "Todas", color: "gray" },
  { name: "Personal", color: "blue" },
  { name: "Trabajo", color: "green" },
  { name: "Ideas", color: "yellow" },
  { name: "Recordatorios", color: "red" },
];

const colorClasses = {
  gray: "border-gray-400 text-gray-700 hover:bg-gray-100",
  blue: "border-blue-500 text-blue-600 hover:bg-blue-50",
  green: "border-green-500 text-green-600 hover:bg-green-50",
  yellow: "border-yellow-500 text-yellow-600 hover:bg-yellow-50",
  red: "border-red-500 text-red-600 hover:bg-red-50",
};

const activeClasses = {
  gray: "bg-gray-200",
  blue: "bg-blue-100",
  green: "bg-green-100",
  yellow: "bg-yellow-100",
  red: "bg-red-100",
};

const FilterBar = ({ value, onChange, counts = {} }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map((cat) => {
        const isActive = value === cat.name;
        const count = counts[cat.name] || 0;

        return (
          <button
            key={cat.name}
            onClick={() => onChange(cat.name)}
            className={`
              px-4 py-2 rounded-full border text-sm font-medium transition
              flex items-center gap-2
              ${colorClasses[cat.color]}
              ${isActive ? activeClasses[cat.color] : "bg-white"}
            `}
          >
            <span>{cat.name}</span>

            {/* Badge contador */}
            <span
              className={`
                text-xs font-semibold px-2 py-0.5 rounded-full
                ${isActive ? "bg-white/70" : "bg-gray-100"}
              `}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default FilterBar;


