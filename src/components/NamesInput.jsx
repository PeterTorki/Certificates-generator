export default function NamesInput({ names, setNames }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
      <label className="block text-sm font-medium text-gray-700 mb-2">1️⃣ أدخل الأسماء</label>
      <textarea
        className="w-full border border-gray-300 rounded p-3 focus:ring-2 focus:ring-blue-500"
        rows="6"
        placeholder="اكتب اسم كل طالب في سطر مستقل"
        value={names}
        onChange={(e) => setNames(e.target.value)}
        dir="rtl"
      />
    </div>
  );
}
