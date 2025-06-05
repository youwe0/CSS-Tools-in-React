export default function Sidebar({ selected, setSelected }) {
  return (
    <div className="w-full sm:w-48 bg-gray-800 text-white p-4 space-y-4">
      <h1 className="text-lg font-bold">Tools</h1>
      <button
        onClick={() => setSelected("gradient")}
        className={`block w-full text-left px-2 py-1 rounded ${
          selected === "gradient" ? "bg-gray-600" : "hover:bg-gray-700"
        }`}
      >
        Gradient Generator
      </button>
      <button
        onClick={() => setSelected("picker")}
        className={`block w-full text-left px-2 py-1 rounded ${
          selected === "picker" ? "bg-gray-600" : "hover:bg-gray-700"
        }`}
      >
        Color Picker
      </button>
    </div>
  );
}
