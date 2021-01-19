export default function header() {
  return (
    <div className="inline-flex justify-between items-center h-21 w-full bg-green-400 px-3 py-4 shadow-sm">
      <h1 className="text-4xl text-white">Logo</h1>
      <button className="text-2xl shadow-md bg-white p-4 rounded-lg transform hover:-translate-y-0.5 transition-all font-semibold text-black">
        Ferramentas
      </button>
    </div>
  );
}
